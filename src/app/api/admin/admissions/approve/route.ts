import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function POST(request: Request) {
  const session = await getSession();
  if (!session || (session.role !== 'ADMIN' && session.role !== 'SUPER_ADMIN')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: 'Application ID is required' }, { status: 400 });
    }

    const application = await prisma.admissionApplication.findUnique({
      where: { id },
    });

    if (!application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    // Update status to APPROVED
    await prisma.admissionApplication.update({
      where: { id },
      data: { status: 'APPROVED' },
    });

    // Find class & default section
    const targetClass = await prisma.class.findFirst({
      where: { numericValue: application.applyingClass || 6 },
      include: { sections: true },
    });

    const activeSession = await prisma.academicSession.findFirst({
      where: { isCurrent: true },
    }) || await prisma.academicSession.findFirst();

    if (targetClass && activeSession) {
      // Find real section ID
      let sectionId: string = targetClass.sections[0]?.id || '';
      if (!sectionId) {
        const sec = await prisma.section.findFirst({ where: { classId: targetClass.id } });
        sectionId = sec?.id || '';
      }
      if (!sectionId) {
        const anySec = await prisma.section.findFirst();
        sectionId = anySec?.id || '';
      }
      if (!sectionId) {
        const newSec = await prisma.section.create({
          data: {
            nameBn: 'ক শাখা',
            nameEn: 'Section A',
            classId: targetClass.id,
            capacity: 40,
          },
        });
        sectionId = newSec.id;
      }

      // Determine highest roll to avoid duplicate roll numbers in the same class
      const lastStudentInClass = await prisma.student.findFirst({
        where: { classId: targetClass.id },
        orderBy: { roll: 'desc' },
        select: { roll: true },
      });
      const newRoll = (lastStudentInClass?.roll || 0) + 1;
      let studentId = `MSC-${activeSession.year}-${targetClass.numericValue * 100 + newRoll}`;
      const existingId = await prisma.student.findUnique({ where: { studentId } });
      if (existingId) {
        studentId = `MSC-${activeSession.year}-${targetClass.numericValue * 100 + newRoll}-${Date.now().toString().slice(-4)}`;
      }

      // Check if student for this application is already enrolled
      const existingStudent = await prisma.student.findFirst({
        where: {
          OR: [
            { admissionNo: application.applicationNo },
            { phone: application.guardianPhone, nameEn: application.applicantEn },
          ],
        },
      });

      if (!existingStudent) {
        // Guarantee unique admissionNo
        let finalAdmissionNo = application.applicationNo;
        const dupCheck = await prisma.student.findUnique({ where: { admissionNo: finalAdmissionNo } });
        if (dupCheck) {
          finalAdmissionNo = `MSC-ENR-${activeSession.year}-${targetClass.numericValue * 100 + newRoll}`;
        }
        const dupCheck2 = await prisma.student.findUnique({ where: { admissionNo: finalAdmissionNo } });
        if (dupCheck2) {
          finalAdmissionNo = `MSC-ENR-${Date.now().toString().slice(-6)}`;
        }

        await prisma.student.create({
          data: {
            studentId,
            admissionNo: finalAdmissionNo,
            roll: newRoll,
            nameBn: application.applicantBn,
            nameEn: application.applicantEn,
            classId: targetClass.id,
            sectionId,
            sessionId: activeSession.id,
            group: application.group || 'GENERAL',
            gender: application.gender || 'MALE',
            dob: application.dob,
            phone: application.guardianPhone,
            address: application.address,
            enrollStatus: 'ACTIVE',
          },
        });
      }
    }

    // Audit log
    await prisma.auditLog.create({
      data: {
        userId: session.userId,
        action: 'ADMISSION_APPROVED',
        entity: 'AdmissionApplication',
        entityId: application.id,
        details: `Approved application ${application.applicationNo} (${application.applicantEn})`,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Approval failed' }, { status: 500 });
  }
}

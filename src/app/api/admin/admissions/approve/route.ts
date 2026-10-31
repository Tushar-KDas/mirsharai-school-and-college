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
      const sectionId = targetClass.sections[0]?.id || targetClass.id;
      const countInClass = await prisma.student.count({
        where: { classId: targetClass.id },
      });
      const newRoll = countInClass + 1;
      const studentId = `MSC-${activeSession.year}-${targetClass.numericValue * 100 + newRoll}`;

      // Check if student with this studentId already exists
      const existingStudent = await prisma.student.findUnique({
        where: { studentId },
      });

      if (!existingStudent) {
        await prisma.student.create({
          data: {
            studentId,
            admissionNo: application.applicationNo,
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

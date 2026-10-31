import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function POST(request: Request) {
  const session = await getSession();
  if (!session || (session.role !== 'ADMIN' && session.role !== 'SUPER_ADMIN')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { nameBn, nameEn, classId, sectionId, roll, group, gender, phone, address } = body;

    if (!nameBn || !nameEn || !classId || !roll) {
      return NextResponse.json({ error: 'Name, Class, and Roll are required' }, { status: 400 });
    }

    const targetClass = await prisma.class.findUnique({
      where: { id: classId },
      include: { sections: true },
    });

    if (!targetClass) {
      return NextResponse.json({ error: 'Selected class not found' }, { status: 404 });
    }

    const activeSession = await prisma.academicSession.findFirst({
      where: { isCurrent: true },
    }) || await prisma.academicSession.findFirst();

    if (!activeSession) {
      return NextResponse.json({ error: 'No active session found' }, { status: 500 });
    }

    // Find valid sectionId
    let secId = sectionId;
    if (secId) {
      const validSec = await prisma.section.findUnique({ where: { id: secId } });
      if (!validSec) secId = null;
    }
    if (!secId && targetClass.sections && targetClass.sections.length > 0) {
      secId = targetClass.sections[0].id;
    }
    if (!secId) {
      const classSec = await prisma.section.findFirst({ where: { classId: targetClass.id } });
      secId = classSec?.id;
    }
    if (!secId) {
      const anySec = await prisma.section.findFirst();
      secId = anySec?.id;
    }
    if (!secId) {
      const newSec = await prisma.section.create({
        data: {
          nameBn: 'ক শাখা',
          nameEn: 'Section A',
          classId: targetClass.id,
          capacity: 40,
        },
      });
      secId = newSec.id;
    }

    const parsedRoll = parseInt(roll) || 1;
    let studentId = `MSC-${activeSession.year}-${targetClass.numericValue * 100 + parsedRoll}`;
    const idCheck = await prisma.student.findUnique({ where: { studentId } });
    if (idCheck) {
      studentId = `MSC-${activeSession.year}-${targetClass.numericValue * 100 + parsedRoll}-${Date.now().toString().slice(-4)}`;
    }

    let admissionNo = `MSC-ADM-${activeSession.year}-${targetClass.numericValue * 100 + parsedRoll}`;
    const admCheck = await prisma.student.findUnique({ where: { admissionNo } });
    if (admCheck) {
      admissionNo = `MSC-ADM-${activeSession.year}-${Date.now().toString().slice(-6)}`;
    }

    const newStudent = await prisma.student.create({
      data: {
        studentId,
        admissionNo,
        roll: parsedRoll,
        nameBn,
        nameEn,
        classId: targetClass.id,
        sectionId: secId,
        sessionId: activeSession.id,
        group: group || 'GENERAL',
        gender: gender || 'MALE',
        phone: phone || null,
        address: address || null,
        enrollStatus: 'ACTIVE',
      },
      include: {
        class: true,
        section: true,
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: session.userId,
        action: 'STUDENT_ENROLLED',
        entity: 'Student',
        entityId: newStudent.id,
        details: `Enrolled student ${nameEn} in Class ${targetClass.numericValue}, Roll ${parsedRoll}`,
      },
    });

    return NextResponse.json({ success: true, student: newStudent });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Enrollment failed' }, { status: 500 });
  }
}

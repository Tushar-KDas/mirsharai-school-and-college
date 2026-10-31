import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function POST(request: Request) {
  const session = await getSession();
  if (!session || (session.role !== 'ADMIN' && session.role !== 'SUPER_ADMIN' && session.role !== 'TEACHER')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { classId, sectionId, date, records } = await request.json();

    if (!classId || !records || !Array.isArray(records)) {
      return NextResponse.json({ error: 'Class and attendance records required' }, { status: 400 });
    }

    const rawDate = date ? new Date(date) : new Date();
    const startOfDay = new Date(rawDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(rawDate);
    endOfDay.setHours(23, 59, 59, 999);

    // Ensure fallback section exists in case sectionId is missing
    let fallbackSectionId: string | null = null;
    if (sectionId) {
      const sec = await prisma.section.findUnique({ where: { id: sectionId } });
      if (sec) fallbackSectionId = sec.id;
    }
    if (!fallbackSectionId) {
      const sec = await prisma.section.findFirst({ where: { classId } });
      fallbackSectionId = sec?.id || null;
    }
    if (!fallbackSectionId) {
      const anySec = await prisma.section.findFirst();
      fallbackSectionId = anySec?.id || null;
    }

    // Batch upsert / create attendances
    for (const item of records) {
      if (!item.studentId) continue;

      // Determine valid sectionId for this student
      let studentSectionId = item.sectionId;
      let studentClassId = classId;

      if (!studentSectionId) {
        const studentObj = await prisma.student.findUnique({
          where: { id: item.studentId },
          select: { sectionId: true, classId: true },
        });
        studentSectionId = studentObj?.sectionId || fallbackSectionId;
        if (studentObj?.classId) studentClassId = studentObj.classId;
      }

      if (!studentSectionId) {
        studentSectionId = fallbackSectionId;
      }

      const existing = await prisma.attendance.findFirst({
        where: {
          studentId: item.studentId,
          date: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
      });

      if (existing) {
        await prisma.attendance.update({
          where: { id: existing.id },
          data: { status: item.status || 'PRESENT' },
        });
      } else if (studentSectionId) {
        await prisma.attendance.create({
          data: {
            studentId: item.studentId,
            classId: studentClassId,
            sectionId: studentSectionId,
            date: startOfDay,
            status: item.status || 'PRESENT',
          },
        });
      }
    }

    return NextResponse.json({ success: true, count: records.length });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Saving attendance failed' }, { status: 500 });
  }
}

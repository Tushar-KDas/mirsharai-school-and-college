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

    const attendanceDate = new Date(date || Date.now());

    // Batch upsert / create attendances
    for (const item of records) {
      const existing = await prisma.attendance.findFirst({
        where: {
          studentId: item.studentId,
          date: {
            gte: new Date(attendanceDate.setHours(0, 0, 0, 0)),
            lte: new Date(attendanceDate.setHours(23, 59, 59, 999)),
          },
        },
      });

      if (existing) {
        await prisma.attendance.update({
          where: { id: existing.id },
          data: { status: item.status },
        });
      } else {
        await prisma.attendance.create({
          data: {
            studentId: item.studentId,
            classId,
            sectionId: sectionId || classId,
            date: attendanceDate,
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

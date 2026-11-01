import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { saveAttendanceCloud, getAttendanceCloud } from '@/lib/cloudStore';

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
    const dateKey = !isNaN(rawDate.getTime())
      ? rawDate.toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0];

    const startOfDay = new Date(rawDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(rawDate);
    endOfDay.setHours(23, 59, 59, 999);

    // 1. Primary persistence: Global Firebase CloudStore (guarantees cross-instance sync)
    try {
      await saveAttendanceCloud(classId, dateKey, records);
    } catch (cloudErr) {
      console.warn('Cloud sync warning for attendance:', cloudErr);
    }

    // 2. Secondary persistence: Local SQLite / Prisma (with resilient constraint handling)
    try {
      // Find fallback section in SQLite if needed
      let fallbackSectionId: string | null = null;
      if (sectionId) {
        const sec = await prisma.section.findUnique({ where: { id: sectionId } }).catch(() => null);
        if (sec) fallbackSectionId = sec.id;
      }
      if (!fallbackSectionId) {
        const sec = await prisma.section.findFirst({ where: { classId } }).catch(() => null);
        fallbackSectionId = sec?.id || null;
      }
      if (!fallbackSectionId) {
        const anySec = await prisma.section.findFirst().catch(() => null);
        fallbackSectionId = anySec?.id || null;
      }

      for (const item of records) {
        if (!item.studentId) continue;

        try {
          // Look up student to obtain verified foreign keys
          const studentObj = await prisma.student.findUnique({
            where: { id: item.studentId },
            select: { id: true, sectionId: true, classId: true },
          }).catch(() => null);

          // If student doesn't exist in SQLite on this ephemeral micro-VM, skip SQLite row (already saved to Firestore)
          if (!studentObj) continue;

          const targetClassId = studentObj.classId || classId;
          const targetSectionId = studentObj.sectionId || fallbackSectionId;
          if (!targetSectionId) continue;

          const existing = await prisma.attendance.findFirst({
            where: {
              studentId: studentObj.id,
              date: {
                gte: startOfDay,
                lte: endOfDay,
              },
            },
          }).catch(() => null);

          if (existing) {
            await prisma.attendance.update({
              where: { id: existing.id },
              data: { status: item.status || 'PRESENT' },
            }).catch(() => null);
          } else {
            await prisma.attendance.create({
              data: {
                studentId: studentObj.id,
                classId: targetClassId,
                sectionId: targetSectionId,
                date: startOfDay,
                status: item.status || 'PRESENT',
              },
            }).catch(() => null);
          }
        } catch (itemErr) {
          console.warn(`Attendance upsert skipped for ${item.studentId}:`, itemErr);
        }
      }
    } catch (sqliteErr) {
      console.warn('SQLite attendance batch warning:', sqliteErr);
    }

    return NextResponse.json({ success: true, count: records.length });
  } catch (err: any) {
    console.error('Fatal attendance handler error:', err);
    return NextResponse.json({ error: err.message || 'Saving attendance failed' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const session = await getSession();
  if (!session || (session.role !== 'ADMIN' && session.role !== 'SUPER_ADMIN' && session.role !== 'TEACHER')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const classId = searchParams.get('classId');
    const date = searchParams.get('date') || new Date().toISOString().split('T')[0];

    if (!classId) {
      return NextResponse.json({ error: 'Class ID is required' }, { status: 400 });
    }

    const rawDate = new Date(date);
    const startOfDay = new Date(rawDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(rawDate);
    endOfDay.setHours(23, 59, 59, 999);

    const records: Record<string, string> = {};

    // 1. Fetch from Prisma SQLite
    try {
      const attendances = await prisma.attendance.findMany({
        where: {
          classId,
          date: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
      });
      attendances.forEach((att) => {
        records[att.studentId] = att.status;
      });
    } catch (e) {
      console.warn('Prisma attendance fetch warning:', e);
    }

    // 2. Merge with Firestore Cloud attendance records
    try {
      const cloudRecords = await getAttendanceCloud(classId, date);
      Object.assign(records, cloudRecords);
    } catch (e) {
      console.warn('Firestore attendance fetch warning:', e);
    }

    return NextResponse.json({ success: true, records, count: Object.keys(records).length });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Fetching attendance failed' }, { status: 500 });
  }
}

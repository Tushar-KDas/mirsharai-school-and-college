import React from 'react';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Locale, isValidLocale, defaultLocale } from '@/lib/i18n';
import AdminAttendanceClient from './AdminAttendanceClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminAttendancePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ classId?: string; date?: string }>;
}) {
  const resolvedParams = await params;
  const locale: Locale = isValidLocale(resolvedParams.locale)
    ? (resolvedParams.locale as Locale)
    : defaultLocale;

  const session = await getSession();
  if (!session || (session.role !== 'ADMIN' && session.role !== 'SUPER_ADMIN' && session.role !== 'TEACHER')) {
    redirect(`/${locale}/login?redirect=/${locale}/admin/attendance`);
  }

  const resolvedSearch = searchParams ? await searchParams : {};

  const classes = await prisma.class.findMany({
    orderBy: { numericValue: 'asc' },
    include: { sections: true },
  });

  const selectedClassId = resolvedSearch?.classId || classes[9]?.id || classes[0]?.id; // Default Class 10
  const selectedDate = resolvedSearch?.date || new Date().toISOString().split('T')[0];

  const rawDate = new Date(selectedDate);
  const startOfDay = new Date(rawDate);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(rawDate);
  endOfDay.setHours(23, 59, 59, 999);

  const [students, existingAttendance] = await Promise.all([
    prisma.student.findMany({
      where: { classId: selectedClassId },
      orderBy: { roll: 'asc' },
      include: { class: true, section: true },
    }),
    prisma.attendance.findMany({
      where: {
        classId: selectedClassId,
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    }),
  ]);

  const initialRecords: Record<string, 'PRESENT' | 'ABSENT' | 'LATE'> = {};
  existingAttendance.forEach((att) => {
    initialRecords[att.studentId] = att.status as 'PRESENT' | 'ABSENT' | 'LATE';
  });

  return (
    <DashboardLayout user={session}>
      <AdminAttendanceClient
        classes={classes}
        students={students}
        initialClassId={selectedClassId}
        initialDate={selectedDate}
        initialRecords={initialRecords}
      />
    </DashboardLayout>
  );
}

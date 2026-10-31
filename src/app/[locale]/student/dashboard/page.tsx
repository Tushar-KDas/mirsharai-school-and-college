import React from 'react';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import StudentDashboardClient from '@/components/dashboard/StudentDashboardClient';
import { Locale, isValidLocale, defaultLocale } from '@/lib/i18n';

export default async function StudentDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale: Locale = isValidLocale(resolvedParams.locale)
    ? (resolvedParams.locale as Locale)
    : defaultLocale;

  const session = await getSession();
  if (!session) {
    redirect(`/${locale}/login?redirect=/${locale}/student/dashboard`);
  }

  // Find student record for user or demo student
  let student = null;
  if (session.studentId) {
    student = await prisma.student.findUnique({
      where: { id: session.studentId },
      include: { class: true, section: true },
    });
  }

  if (!student) {
    student = await prisma.student.findFirst({
      where: { roll: 1 },
      include: { class: true, section: true },
    });
  }

  if (!student) {
    return <div>No student profile found</div>;
  }

  // Query student's routines, invoices, marks, and notices
  const [routines, invoices, marks, notices] = await Promise.all([
    prisma.routine.findMany({
      where: {
        classId: student.classId,
        sectionId: student.sectionId,
        dayOfWeek: 'SUNDAY',
      },
      include: {
        subject: true,
        teacher: true,
      },
      orderBy: { period: 'asc' },
    }),
    prisma.invoice.findMany({
      where: { studentId: student.id },
      orderBy: { dueDate: 'desc' },
    }),
    prisma.mark.findMany({
      where: { studentId: student.id },
      include: { subject: true, exam: true },
    }),
    prisma.notice.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { publishedAt: 'desc' },
      take: 4,
    }),
  ]);

  return (
    <DashboardLayout user={session}>
      <StudentDashboardClient
        student={student}
        routines={routines}
        invoices={invoices}
        marks={marks}
        notices={notices}
      />
    </DashboardLayout>
  );
}

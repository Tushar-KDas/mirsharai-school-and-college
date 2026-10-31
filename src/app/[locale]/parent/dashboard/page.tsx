import React from 'react';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import StudentDashboardClient from '@/components/dashboard/StudentDashboardClient';
import { Locale, isValidLocale, defaultLocale } from '@/lib/i18n';

export default async function ParentDashboardPage({
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
    redirect(`/${locale}/login?redirect=/${locale}/parent/dashboard`);
  }

  // Find linked student (Default to Class 10 student Tanvir Ahmed)
  const student =
    (await prisma.student.findFirst({
      where: { studentId: 'MSC-2026-1001' },
      include: { class: true, section: true },
    })) ||
    (await prisma.student.findFirst({
      where: { roll: 1 },
      include: { class: true, section: true },
    }));

  if (!student) {
    return <div>No linked student profile found</div>;
  }

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
      <div className="space-y-4 mb-2">
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between text-xs font-semibold text-emerald-800">
          <span>
            {locale === 'bn'
              ? 'সন্তান নির্বাচন: তানভীর আহমেদ (১০ম শ্রেণি - বিজ্ঞান, রোল: ১)'
              : 'Active Child Profile: Tanvir Ahmed (Class 10 - Science, Roll: 1)'}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px]">
            {locale === 'bn' ? 'সক্রিয় শিক্ষার্থী' : 'Active Student'}
          </span>
        </div>
      </div>

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

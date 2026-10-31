import React from 'react';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Locale, isValidLocale, defaultLocale } from '@/lib/i18n';
import TeacherMarksClient from './TeacherMarksClient';

export default async function TeacherMarksPage({
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
    redirect(`/${locale}/login?redirect=/${locale}/teacher/marks`);
  }

  const [classes, exams, students] = await Promise.all([
    prisma.class.findMany({ orderBy: { numericValue: 'asc' } }),
    prisma.exam.findMany({ orderBy: { startDate: 'desc' } }),
    prisma.student.findMany({
      where: { class: { numericValue: 10 } },
      orderBy: { roll: 'asc' },
    }),
  ]);

  return (
    <DashboardLayout user={session}>
      <TeacherMarksClient
        classes={classes}
        exams={exams}
        students={students}
      />
    </DashboardLayout>
  );
}

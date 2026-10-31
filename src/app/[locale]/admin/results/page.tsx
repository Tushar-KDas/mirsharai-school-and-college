import React from 'react';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Locale, isValidLocale, defaultLocale } from '@/lib/i18n';
import AdminResultsClient from './AdminResultsClient';

export default async function AdminResultsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale: Locale = isValidLocale(resolvedParams.locale)
    ? (resolvedParams.locale as Locale)
    : defaultLocale;

  const session = await getSession();
  if (!session || (session.role !== 'ADMIN' && session.role !== 'SUPER_ADMIN')) {
    redirect(`/${locale}/login?redirect=/${locale}/admin/results`);
  }

  const [classes, exams, marks] = await Promise.all([
    prisma.class.findMany({ orderBy: { numericValue: 'asc' } }),
    prisma.exam.findMany({ orderBy: { startDate: 'desc' } }),
    prisma.mark.findMany({
      include: {
        student: { include: { class: true } },
        subject: true,
        exam: true,
      },
      orderBy: { totalMarks: 'desc' },
      take: 200,
    }),
  ]);

  return (
    <DashboardLayout user={session}>
      <AdminResultsClient
        classes={classes}
        exams={exams}
        initialMarks={marks as any}
      />
    </DashboardLayout>
  );
}

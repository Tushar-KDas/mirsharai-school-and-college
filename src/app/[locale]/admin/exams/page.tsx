import React from 'react';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Locale, isValidLocale, defaultLocale } from '@/lib/i18n';
import AdminExamsClient from './AdminExamsClient';

export default async function AdminExamsPage({
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
    redirect(`/${locale}/login?redirect=/${locale}/admin/exams`);
  }

  const exams = await prisma.exam.findMany({
    orderBy: { startDate: 'asc' },
    include: {
      schedules: {
        include: { subject: true },
        orderBy: { examDate: 'asc' },
      },
    },
  });

  return (
    <DashboardLayout user={session}>
      <AdminExamsClient exams={exams as any} />
    </DashboardLayout>
  );
}

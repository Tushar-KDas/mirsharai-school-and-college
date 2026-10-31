import React from 'react';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Locale, isValidLocale, defaultLocale } from '@/lib/i18n';
import CMSClient from './CMSClient';

export default async function SuperAdminCMSPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale: Locale = isValidLocale(resolvedParams.locale)
    ? (resolvedParams.locale as Locale)
    : defaultLocale;

  const session = await getSession();
  if (!session || (session.role !== 'SUPER_ADMIN' && session.role !== 'ADMIN')) {
    redirect(`/${locale}/login?redirect=/${locale}/super-admin/cms`);
  }

  const [notices, events] = await Promise.all([
    prisma.notice.findMany({ orderBy: { publishedAt: 'desc' } }),
    prisma.academicEvent.findMany({ orderBy: { startDate: 'desc' } }),
  ]);

  return (
    <DashboardLayout user={session}>
      <CMSClient initialNotices={notices} initialEvents={events} />
    </DashboardLayout>
  );
}

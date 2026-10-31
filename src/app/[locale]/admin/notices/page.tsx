import React from 'react';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Locale, isValidLocale, defaultLocale } from '@/lib/i18n';
import AdminNoticesClient from './AdminNoticesClient';

export default async function AdminNoticesPage({
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
    redirect(`/${locale}/login?redirect=/${locale}/admin/notices`);
  }

  const notices = await prisma.notice.findMany({
    orderBy: { publishedAt: 'desc' },
  });

  return (
    <DashboardLayout user={session}>
      <AdminNoticesClient initialNotices={notices} />
    </DashboardLayout>
  );
}

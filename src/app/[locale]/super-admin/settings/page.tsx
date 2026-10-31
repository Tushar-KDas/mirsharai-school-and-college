import React from 'react';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Locale, isValidLocale, defaultLocale } from '@/lib/i18n';
import SuperAdminSettingsClient from './SuperAdminSettingsClient';

export default async function SuperAdminSettingsPage({
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
    redirect(`/${locale}/login?redirect=/${locale}/super-admin/settings`);
  }

  const setting = await prisma.schoolSetting.findFirst();

  return (
    <DashboardLayout user={session}>
      <SuperAdminSettingsClient initialSetting={setting} />
    </DashboardLayout>
  );
}

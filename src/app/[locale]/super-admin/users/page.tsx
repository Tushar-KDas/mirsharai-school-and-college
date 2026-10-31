import React from 'react';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Locale, isValidLocale, defaultLocale } from '@/lib/i18n';
import SuperAdminUsersClient from './SuperAdminUsersClient';

export default async function SuperAdminUsersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale: Locale = isValidLocale(resolvedParams.locale)
    ? (resolvedParams.locale as Locale)
    : defaultLocale;

  const session = await getSession();
  if (!session || session.role !== 'SUPER_ADMIN') {
    redirect(`/${locale}/login?redirect=/${locale}/super-admin/users`);
  }

  const users = await prisma.user.findMany({
    include: {
      teacherProfile: true,
      studentProfile: true,
      guardianProfile: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <DashboardLayout user={session}>
      <SuperAdminUsersClient initialUsers={users} currentUserId={session.userId} />
    </DashboardLayout>
  );
}

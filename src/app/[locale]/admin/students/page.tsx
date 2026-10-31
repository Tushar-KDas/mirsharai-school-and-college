import React from 'react';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Locale, isValidLocale, defaultLocale } from '@/lib/i18n';
import StudentsClient from './StudentsClient';

export default async function AdminStudentsPage({
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
    redirect(`/${locale}/login?redirect=/${locale}/admin/students`);
  }

  const [classes, students] = await Promise.all([
    prisma.class.findMany({
      orderBy: { numericValue: 'asc' },
      include: { sections: true },
    }),
    prisma.student.findMany({
      include: {
        class: true,
        section: true,
      },
      orderBy: [{ class: { numericValue: 'asc' } }, { roll: 'asc' }],
    }),
  ]);

  return (
    <DashboardLayout user={session}>
      <StudentsClient initialStudents={students} classes={classes} />
    </DashboardLayout>
  );
}

import React from 'react';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Locale, isValidLocale, defaultLocale } from '@/lib/i18n';
import AdminLibraryClient from './AdminLibraryClient';

export default async function AdminLibraryPage({
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
    redirect(`/${locale}/login?redirect=/${locale}/admin/library`);
  }

  const [books, recentLoans] = await Promise.all([
    prisma.libraryBook.findMany({
      orderBy: { title: 'asc' },
      include: { _count: { select: { loans: true } } },
    }),
    prisma.bookLoan.findMany({
      orderBy: { borrowDate: 'desc' },
      take: 6,
      include: {
        book: true,
        student: true,
      },
    }),
  ]);

  return (
    <DashboardLayout user={session}>
      <AdminLibraryClient
        initialBooks={books}
        recentLoans={recentLoans as any}
      />
    </DashboardLayout>
  );
}

import React from 'react';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Locale, isValidLocale, defaultLocale } from '@/lib/i18n';
import AdminExpensesClient from './AdminExpensesClient';

export default async function AdminExpensesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale: Locale = isValidLocale(resolvedParams.locale)
    ? (resolvedParams.locale as Locale)
    : defaultLocale;

  const session = await getSession();
  if (!session || (session.role !== 'ADMIN' && session.role !== 'SUPER_ADMIN' && session.role !== 'ACCOUNTANT')) {
    redirect(`/${locale}/login?redirect=/${locale}/admin/expenses`);
  }

  const expenses = await prisma.expense.findMany({
    orderBy: { expenseDate: 'desc' },
  });

  return (
    <DashboardLayout user={session}>
      <AdminExpensesClient initialExpenses={expenses} />
    </DashboardLayout>
  );
}

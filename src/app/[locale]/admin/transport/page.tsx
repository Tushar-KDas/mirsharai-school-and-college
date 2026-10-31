import React from 'react';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Locale, isValidLocale, defaultLocale } from '@/lib/i18n';
import AdminTransportClient from './AdminTransportClient';

export default async function AdminTransportPage({
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
    redirect(`/${locale}/login?redirect=/${locale}/admin/transport`);
  }

  const [routes, vehicles] = await Promise.all([
    prisma.transportRoute.findMany({
      orderBy: { routeCode: 'asc' },
      include: {
        stops: { orderBy: { order: 'asc' } },
        vehicles: true,
      },
    }),
    prisma.transportVehicle.findMany({
      orderBy: { vehicleNo: 'asc' },
      include: { route: true },
    }),
  ]);

  return (
    <DashboardLayout user={session}>
      <AdminTransportClient routes={routes as any} vehicles={vehicles as any} />
    </DashboardLayout>
  );
}

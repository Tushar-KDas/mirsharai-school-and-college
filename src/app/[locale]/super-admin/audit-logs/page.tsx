import React from 'react';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Locale, isValidLocale, defaultLocale } from '@/lib/i18n';
import { formatDate } from '@/lib/utils';
import { Shield, Clock, Search, Filter } from 'lucide-react';

export default async function SuperAdminAuditLogsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ entity?: string; search?: string }>;
}) {
  const resolvedParams = await params;
  const locale: Locale = isValidLocale(resolvedParams.locale)
    ? (resolvedParams.locale as Locale)
    : defaultLocale;

  const session = await getSession();
  if (!session || (session.role !== 'SUPER_ADMIN' && session.role !== 'ADMIN')) {
    redirect(`/${locale}/login?redirect=/${locale}/super-admin/audit-logs`);
  }

  const resolvedSearch = searchParams ? await searchParams : {};
  const entityFilter = resolvedSearch?.entity;
  const search = resolvedSearch?.search?.toLowerCase();

  const auditLogs = await prisma.auditLog.findMany({
    where: {
      ...(entityFilter ? { entity: entityFilter } : {}),
      ...(search
        ? {
            OR: [
              { action: { contains: search } },
              { details: { contains: search } },
            ],
          }
        : {}),
    },
    include: {
      user: true,
    },
    orderBy: { createdAt: 'desc' },
    take: 50,
  });

  return (
    <DashboardLayout user={session}>
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 text-rose-600 text-xs font-bold uppercase tracking-wider mb-1">
            <Shield className="w-4 h-4" />
            <span>{locale === 'bn' ? 'নিরাপত্তা ও অডিট ট্রেইল' : 'System Security & Compliance'}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {locale === 'bn' ? 'সিস্টেম অডিট ইভেন্ট ও ট্র্যাকিং লগ' : 'System Audit Trails & Event Logs'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {locale === 'bn'
              ? 'সিস্টেমে ব্যবহারকারীদের সকল লগইন, ফি আদায়, ভর্তি অনুমোদন ও সেটিংস পরিবর্তনের পূর্ণাঙ্গ প্রমাণপত্র'
              : 'Tamper-evident logs of authentications, payments, admissions, and admin interventions'}
          </p>
        </div>

        {/* Audit Log Table */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">
              {locale === 'bn' ? `মোট ${auditLogs.length} টি অডিট ইভেন্ট সংরক্ষিত` : `Showing latest ${auditLogs.length} audit entries`}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">{locale === 'bn' ? 'তারিখ ও সময়' : 'Timestamp'}</th>
                  <th className="py-3 px-4">{locale === 'bn' ? 'অ্যাকশন' : 'Action'}</th>
                  <th className="py-3 px-4">{locale === 'bn' ? 'মডিউল / এনটিটি' : 'Entity'}</th>
                  <th className="py-3 px-4">{locale === 'bn' ? 'ব্যবহারকারী' : 'Actor / Role'}</th>
                  <th className="py-3 px-4">{locale === 'bn' ? 'বিস্তারিত তথ্য' : 'Event Details'}</th>
                  <th className="py-3 px-4">{locale === 'bn' ? 'আইপি' : 'IP / Client'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {auditLogs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-10 text-center text-slate-400">
                      {locale === 'bn' ? 'কোনো অডিট লগ পাওয়া যায়নি।' : 'No audit entries found.'}
                    </td>
                  </tr>
                ) : (
                  auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                        {formatDate(log.createdAt, locale)}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 font-mono">
                          {log.action}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-700">
                        {log.entity}
                      </td>
                      <td className="py-3 px-4">
                        <p className="font-bold text-slate-900">{log.user?.username || 'SYSTEM'}</p>
                        <p className="text-[10px] text-slate-400">{log.user?.role || 'AUTO'}</p>
                      </td>
                      <td className="py-3 px-4 text-slate-700 max-w-md truncate">
                        {log.details || '—'}
                      </td>
                      <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">
                        {log.ipAddress || '127.0.0.1'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

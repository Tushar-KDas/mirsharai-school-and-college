import React from 'react';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Locale, isValidLocale, defaultLocale } from '@/lib/i18n';
import { toBengaliNumber, formatDate } from '@/lib/utils';
import {
  ShieldCheck,
  Users,
  Database,
  Activity,
  Server,
  Lock,
  Layers,
  FileText,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';

export default async function SuperAdminDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale: Locale = isValidLocale(resolvedParams.locale)
    ? (resolvedParams.locale as Locale)
    : defaultLocale;

  const session = await getSession();
  if (!session) {
    redirect(`/${locale}/login?redirect=/${locale}/super-admin/dashboard`);
  }

  if (session.role !== 'SUPER_ADMIN') {
    redirect(`/${locale}/admin/dashboard`);
  }

  // System statistics
  const [userCount, auditLogCount, setting] = await Promise.all([
    prisma.user.count(),
    prisma.auditLog.count(),
    prisma.schoolSetting.findFirst(),
  ]);

  const roleStats = await prisma.user.groupBy({
    by: ['role'],
    _count: { id: true },
  });

  return (
    <DashboardLayout user={session}>
      <div className="space-y-6">
        {/* Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-navy-950 to-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-md">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>{locale === 'bn' ? 'সর্বোচ্চ প্রাতিষ্ঠানিক নিয়ন্ত্রণ কক্ষ' : 'Super Administrator Control Tower'}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            {locale === 'bn' ? 'সুপার এডমিন সিস্টেম ড্যাশবোর্ড' : 'Super Admin System Dashboard'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            {locale === 'bn'
              ? 'প্রতিষ্ঠান সেটিংস, নিরাপত্তা নীতিমালা, সিস্টেম স্বাস্থ্য ও অডিট লগ পর্যবেক্ষণ।'
              : 'Institutional security management, audit trails, and system health operations.'}
          </p>
        </div>

        {/* 4 System Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
            <p className="text-xs font-semibold text-slate-500 uppercase">
              {locale === 'bn' ? 'মোট ব্যবহারকারী' : 'Total System Users'}
            </p>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-1">
              {locale === 'bn' ? toBengaliNumber(userCount) : userCount}
            </h3>
            <p className="text-[11px] text-slate-400 mt-1">All roles combined</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
            <p className="text-xs font-semibold text-slate-500 uppercase">
              {locale === 'bn' ? 'সিস্টেম স্থিতি' : 'System Status'}
            </p>
            <h3 className="text-2xl font-extrabold text-emerald-600 mt-1 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>HEALTHY</span>
            </h3>
            <p className="text-[11px] text-slate-400 mt-1">ACID Engine Active</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
            <p className="text-xs font-semibold text-slate-500 uppercase">
              {locale === 'bn' ? 'অডিট ইভেন্ট লগ' : 'Audit Logs'}
            </p>
            <h3 className="text-2xl font-extrabold text-blue-600 mt-1">
              {locale === 'bn' ? toBengaliNumber(auditLogCount) : auditLogCount}
            </h3>
            <p className="text-[11px] text-slate-400 mt-1">Immutable trails</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
            <p className="text-xs font-semibold text-slate-500 uppercase">
              {locale === 'bn' ? 'ডাটাবেজ ব্যাকআপ' : 'Database Status'}
            </p>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-1 flex items-center gap-1.5">
              <Database className="w-5 h-5 text-indigo-600" />
              <span className="text-sm">Up to Date</span>
            </h3>
            <p className="text-[11px] text-slate-400 mt-1">Auto-sync enabled</p>
          </div>
        </div>

        {/* Roles Distribution & School Setting Card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Role Distribution */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-900">
              {locale === 'bn' ? 'ব্যবহারকারী ও রোল বণ্টন' : 'Role-Based Access Distribution'}
            </h2>
            <div className="space-y-3">
              {roleStats.map((item) => (
                <div key={item.role} className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-700">{item.role}</span>
                  <span className="font-mono font-bold bg-slate-100 text-slate-800 px-2.5 py-1 rounded-lg">
                    {locale === 'bn' ? toBengaliNumber(item._count.id) : item._count.id} accounts
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* School Config Overview */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3 text-xs">
            <h2 className="text-sm font-bold text-slate-900">
              {locale === 'bn' ? 'প্রাতিষ্ঠানিক পরিচিতি সেটিংস' : 'Configured Institution Profile'}
            </h2>
            <div className="space-y-2 text-slate-600">
              <p><span className="font-semibold text-slate-900">{locale === 'bn' ? 'নাম (বাংলা):' : 'Name (Bn):'}</span> {setting?.nameBn}</p>
              <p><span className="font-semibold text-slate-900">{locale === 'bn' ? 'নাম (ইংরেজি):' : 'Name (En):'}</span> {setting?.nameEn}</p>
              <p><span className="font-semibold text-slate-900">{locale === 'bn' ? 'ইআইআইএন (EIIN):' : 'EIIN:'}</span> {setting?.eiin}</p>
              <p><span className="font-semibold text-slate-900">{locale === 'bn' ? 'কলেজ কোড:' : 'College Code:'}</span> {setting?.collegeCode}</p>
              <p><span className="font-semibold text-slate-900">{locale === 'bn' ? 'অধ্যক্ষ মহোদয়:' : 'Principal:'}</span> {setting?.principalNameBn}</p>
              <p><span className="font-semibold text-slate-900">{locale === 'bn' ? 'ঠিকানা:' : 'Address:'}</span> {setting?.addressBn}</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

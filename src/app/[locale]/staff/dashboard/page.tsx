import React from 'react';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Locale, isValidLocale, defaultLocale } from '@/lib/i18n';
import { formatDate } from '@/lib/utils';
import { CalendarCheck, Clock, Bell, CheckCircle2, FileText } from 'lucide-react';

export default async function StaffDashboardPage({
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
    redirect(`/${locale}/login?redirect=/${locale}/staff/dashboard`);
  }

  const notices = await prisma.notice.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { publishedAt: 'desc' },
    take: 3,
  });

  return (
    <DashboardLayout user={session}>
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-navy-950 via-primary-navy to-slate-900 text-white p-6 rounded-3xl shadow-sm">
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            {locale === 'bn' ? `স্বাগতম, ${session.displayName}!` : `Welcome, ${session.displayName}!`}
          </h1>
          <p className="text-xs sm:text-sm text-blue-200 mt-1">
            {locale === 'bn' ? 'অফিস সহকারী ও কর্মকর্তা ড্যাশবোর্ড' : 'Staff Operations & Daily Activity Portal'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500">
                {locale === 'bn' ? 'দৈনিক উপস্থিতি' : 'Daily Attendance'}
              </p>
              <h3 className="text-xl font-extrabold text-emerald-600 mt-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-5 h-5" />
                <span>{locale === 'bn' ? 'উপস্থিত' : 'Present'}</span>
              </h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CalendarCheck className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500">
                {locale === 'bn' ? 'ছুটি স্থিতি' : 'Leave Balance'}
              </p>
              <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                {locale === 'bn' ? '১৮ দিন বাকি' : '18 Days Available'}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500">
                {locale === 'bn' ? 'অ্যাসাইনড টাস্ক' : 'Assigned Duties'}
              </p>
              <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                {locale === 'bn' ? 'ল্যাব ও নথিপত্র ব্যবস্থাপনা' : 'Lab & Records in-charge'}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Notices */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
          <h2 className="text-sm font-bold text-slate-900">
            {locale === 'bn' ? 'দাপ্তরিক ও প্রাতিষ্ঠানিক নোটিশ' : 'Administrative Notices'}
          </h2>
          <div className="space-y-3">
            {notices.map((n) => (
              <div key={n.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <h3 className="text-xs font-bold text-slate-900">
                  {locale === 'bn' ? n.titleBn : n.titleEn}
                </h3>
                <p className="text-[10px] text-slate-400 mt-1">
                  {formatDate(n.publishedAt, locale)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

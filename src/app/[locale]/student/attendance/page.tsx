import React from 'react';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Locale, isValidLocale, defaultLocale } from '@/lib/i18n';
import { CalendarCheck, CheckCircle2, XCircle, Clock } from 'lucide-react';

export default async function StudentAttendancePage({
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
    redirect(`/${locale}/login?redirect=/${locale}/student/attendance`);
  }

  return (
    <DashboardLayout user={session}>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {locale === 'bn' ? 'আমার উপস্থিতি খাতা ও পরিসংখ্যান' : 'My Attendance Record'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {locale === 'bn' ? 'মাসিক ও বাৎসরিক উপস্থিতির হার ও রিপোর্ট' : 'Monthly and yearly presence logs & regularity report'}
          </p>
        </div>

        {/* 3 Metric cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
            <p className="text-xs font-semibold text-slate-500">{locale === 'bn' ? 'উপস্থিতির হার' : 'Attendance Rate'}</p>
            <h3 className="text-2xl font-extrabold text-emerald-600 mt-1">96.4%</h3>
            <p className="text-[11px] text-slate-400 mt-1">Excellent Regularity</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
            <p className="text-xs font-semibold text-slate-500">{locale === 'bn' ? 'মোট কার্যদিবস' : 'Total Working Days'}</p>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-1">112 Days</h3>
            <p className="text-[11px] text-slate-400 mt-1">Academic Session 2026</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
            <p className="text-xs font-semibold text-slate-500">{locale === 'bn' ? 'অনুপস্থিত' : 'Total Absent'}</p>
            <h3 className="text-2xl font-extrabold text-rose-600 mt-1">4 Days</h3>
            <p className="text-[11px] text-slate-400 mt-1">Excused medical leave</p>
          </div>
        </div>

        {/* Recent Attendance Logs */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 space-y-4">
          <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
            {locale === 'bn' ? 'সর্বশেষ সাপ্তাহিক উপস্থিতি লগ' : 'Recent Daily Attendance Logs'}
          </h2>
          <div className="space-y-2 text-xs">
            {[
              { date: 'Thursday, 29 October 2026', status: 'PRESENT' },
              { date: 'Wednesday, 28 October 2026', status: 'PRESENT' },
              { date: 'Tuesday, 27 October 2026', status: 'PRESENT' },
              { date: 'Monday, 26 October 2026', status: 'PRESENT' },
              { date: 'Sunday, 25 October 2026', status: 'PRESENT' },
            ].map((d, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-semibold text-slate-800">{d.date}</span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>PRESENT</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

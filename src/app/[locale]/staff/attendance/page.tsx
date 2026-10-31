import React from 'react';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Locale, isValidLocale, defaultLocale } from '@/lib/i18n';
import { CalendarCheck, CheckCircle2, Clock } from 'lucide-react';

export default async function StaffAttendancePage({
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
    redirect(`/${locale}/login?redirect=/${locale}/staff/attendance`);
  }

  return (
    <DashboardLayout user={session}>
      <div className="space-y-6 max-w-3xl">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {locale === 'bn' ? 'কর্মকর্তা উপস্থিতি ও লগ' : 'Staff Daily Attendance Logs'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {locale === 'bn' ? 'অফিস আগমন ও প্রস্থান সময়সূচি' : 'Clock-in, clock-out, and daily office activity'}
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs font-bold text-emerald-800">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>{locale === 'bn' ? 'আজকের উপস্থিতি নিশ্চিত হয়েছে (সকাল ৯:০০)' : "Today's presence confirmed at 09:00 AM"}</span>
            </div>
            <span className="font-mono bg-emerald-600 text-white px-2.5 py-0.5 rounded-full text-[10px]">
              ON DUTY
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <h3 className="font-bold text-slate-800">Recent Attendance Logs:</h3>
            {[
              { day: 'Thursday, 29 Oct 2026', in: '09:02 AM', out: '04:30 PM' },
              { day: 'Wednesday, 28 Oct 2026', in: '08:58 AM', out: '04:35 PM' },
              { day: 'Tuesday, 27 Oct 2026', in: '09:00 AM', out: '04:30 PM' },
              { day: 'Monday, 26 Oct 2026', in: '08:55 AM', out: '04:30 PM' },
            ].map((d, i) => (
              <div key={i} className="flex justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-semibold text-slate-800">{d.day}</span>
                <span className="font-mono text-slate-600">{d.in} - {d.out} (Present)</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

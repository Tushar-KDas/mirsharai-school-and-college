import React from 'react';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Locale, isValidLocale, defaultLocale } from '@/lib/i18n';
import { Clock, BookOpen, Printer } from 'lucide-react';

export default async function TeacherRoutinePage({
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
    redirect(`/${locale}/login?redirect=/${locale}/teacher/routine`);
  }

  const routines = await prisma.routine.findMany({
    include: { class: true, section: true, subject: true },
    orderBy: { period: 'asc' },
  });

  const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY'];

  return (
    <DashboardLayout user={session}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {locale === 'bn' ? 'সাপ্তাহিক শিক্ষক ক্লাস রুটিন' : 'Weekly Faculty Routine'}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              {locale === 'bn'
                ? 'রবিবার থেকে বৃহস্পতিবার পিরিয়ডভিত্তিক ক্লাস ও পাঠপরিকল্পনা'
                : 'Sunday through Thursday period timetable & room allocations'}
            </p>
          </div>
          <button
            onClick={undefined}
            className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-xs font-bold transition-all self-start sm:self-auto"
          >
            <Printer className="w-4 h-4" />
            <span>{locale === 'bn' ? 'রুটিন প্রিন্ট' : 'Print Routine'}</span>
          </button>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-4">{locale === 'bn' ? 'বার / দিন' : 'Day'}</th>
                  <th className="py-3.5 px-4">{locale === 'bn' ? '১ম পিরিয়ড (১০:০০-১০:৪৫)' : 'P-1 (10:00-10:45)'}</th>
                  <th className="py-3.5 px-4">{locale === 'bn' ? '২য় পিরিয়ড (১০:৪৫-১১:৩০)' : 'P-2 (10:45-11:30)'}</th>
                  <th className="py-3.5 px-4">{locale === 'bn' ? '৩য় পিরিয়ড (১১:৩০-১২:১৫)' : 'P-3 (11:30-12:15)'}</th>
                  <th className="py-3.5 px-4">{locale === 'bn' ? '৪র্থ পিরিয়ড (০১:০০-০১:৪৫)' : 'P-4 (01:00-01:45)'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {days.map((day) => (
                  <tr key={day} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-4 font-bold text-slate-900 bg-slate-50/50">
                      {day}
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-bold text-navy-900">Mathematics</p>
                      <p className="text-[11px] text-blue-600 font-semibold">Class 10 (Padma)</p>
                      <p className="text-[10px] text-slate-400">Room 1001</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-bold text-navy-900">Physics</p>
                      <p className="text-[11px] text-blue-600 font-semibold">Class 10 (Padma)</p>
                      <p className="text-[10px] text-slate-400">Science Lab</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-bold text-navy-900">ICT Practical</p>
                      <p className="text-[11px] text-blue-600 font-semibold">Class 12 (Science)</p>
                      <p className="text-[10px] text-slate-400">Computer Lab</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-bold text-navy-900">General Science</p>
                      <p className="text-[11px] text-blue-600 font-semibold">Class 9 (Meghna)</p>
                      <p className="text-[10px] text-slate-400">Room 202</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

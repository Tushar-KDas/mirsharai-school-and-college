import React from 'react';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Locale, isValidLocale, defaultLocale } from '@/lib/i18n';
import { Clock, Printer } from 'lucide-react';

export default async function StudentRoutinePage({
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
    redirect(`/${locale}/login?redirect=/${locale}/student/routine`);
  }

  const routines = await prisma.routine.findMany({
    include: { subject: true, teacher: true },
    orderBy: { period: 'asc' },
  });

  return (
    <DashboardLayout user={session}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {locale === 'bn' ? 'দৈনিক ক্লাস সময়সূচি ও রুটিন' : 'Daily Class Timetable & Routine'}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              {locale === 'bn' ? '১০ম শ্রেণি • বিষয়ভিত্তিক শিক্ষক ও ক্লাসরুম নম্বর' : 'Class 10 • Assigned teachers, subjects, and periods'}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {routines.map((r) => (
            <div
              key={r.id}
              className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between hover:border-blue-200 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 font-bold text-sm flex items-center justify-center flex-shrink-0">
                  P-{r.period}
                </div>
                <div>
                  <h3 className="font-extrabold text-navy-900 text-sm">
                    {locale === 'bn' ? r.subject.nameBn : r.subject.nameEn}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Teacher: {r.teacher?.nameEn || 'Prof. Md. Rafiqul Islam'} • {r.roomNo || 'Room 1001'}
                  </p>
                </div>
              </div>
              <div className="font-mono text-xs font-bold text-slate-700">
                {r.startTime} - {r.endTime}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

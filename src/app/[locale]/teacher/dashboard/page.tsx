import React from 'react';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Locale, isValidLocale, defaultLocale } from '@/lib/i18n';
import { toBengaliNumber, formatDate } from '@/lib/utils';
import {
  BookOpen,
  CalendarCheck,
  Clock,
  Award,
  Users,
  Bell,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

export default async function TeacherDashboardPage({
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
    redirect(`/${locale}/login?redirect=/${locale}/teacher/dashboard`);
  }

  // Teacher profile
  const teacher = await prisma.staff.findFirst({
    where: { isTeacher: true },
  });

  // Query assigned classes & routines
  const routines = await prisma.routine.findMany({
    where: { dayOfWeek: 'SUNDAY' },
    include: {
      class: true,
      section: true,
      subject: true,
    },
    orderBy: { period: 'asc' },
  });

  const notices = await prisma.notice.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { publishedAt: 'desc' },
    take: 3,
  });

  return (
    <DashboardLayout user={session}>
      <div className="space-y-6">
        {/* Banner */}
        <div className="bg-gradient-to-r from-navy-950 via-primary-navy to-indigo-900 text-white p-6 rounded-3xl shadow-sm">
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            {locale === 'bn' ? `স্বাগতম, ${teacher?.nameBn || session.displayName}!` : `Welcome, ${teacher?.nameEn || session.displayName}!`}
          </h1>
          <p className="text-xs sm:text-sm text-blue-200 mt-1">
            {locale === 'bn'
              ? `${teacher?.designationBn || 'শিক্ষক'} • বিভাগ: ${teacher?.department || 'বিজ্ঞান'}`
              : `${teacher?.designationEn || 'Teacher'} • Department: ${teacher?.department || 'Science'}`}
          </p>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500">
                {locale === 'bn' ? 'আজকের ক্লাস সংখ্যা' : "Today's Classes"}
              </p>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-1">
                {locale === 'bn' ? toBengaliNumber(routines.length || 3) : routines.length || 3} {locale === 'bn' ? 'টি' : 'Periods'}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500">
                {locale === 'bn' ? 'মোট পাঠদানরত শিক্ষার্থী' : 'Total Students Taught'}
              </p>
              <h3 className="text-2xl font-extrabold text-indigo-600 mt-1">
                {locale === 'bn' ? '১২০+' : '120+'}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500">
                {locale === 'bn' ? 'আজকের হাজিরা' : 'Attendance Status'}
              </p>
              <h3 className="text-xl font-extrabold text-emerald-600 mt-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-5 h-5" />
                <span>{locale === 'bn' ? 'গৃহীত' : 'Completed'}</span>
              </h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CalendarCheck className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500">
                {locale === 'bn' ? 'আসন্ন মূল্যায়ন' : 'Upcoming Exam'}
              </p>
              <h3 className="text-base font-extrabold text-slate-800 mt-1">
                {locale === 'bn' ? 'বার্ষিক পরীক্ষা ২০২৬' : 'Annual Exam 2026'}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Schedule */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                {locale === 'bn' ? 'আজকের পাঠদান সময়সূচি' : "Today's Teaching Schedule"}
              </h2>
              <p className="text-[11px] text-slate-400">
                {locale === 'bn' ? 'পিরিয়ডভিত্তিক পাঠপরিকল্পনা ও ক্লাসরুম' : 'Assigned period routine'}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {routines.map((r) => (
              <div
                key={r.id}
                className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100/60 text-blue-700 font-bold text-xs flex items-center justify-center flex-shrink-0">
                    P-{r.period}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">
                      {locale === 'bn' ? r.subject.nameBn : r.subject.nameEn}
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      {locale === 'bn' ? r.class.nameBn : r.class.nameEn} ({locale === 'bn' ? r.section.nameBn : r.section.nameEn}) • {r.roomNo}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-semibold text-slate-700">
                    {r.startTime} - {r.endTime}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

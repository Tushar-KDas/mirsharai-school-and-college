import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Locale, isValidLocale, defaultLocale } from '@/lib/i18n';
import { formatCurrency, toBengaliNumber, formatDate } from '@/lib/utils';
import {
  GraduationCap,
  Users,
  Briefcase,
  CalendarCheck,
  TrendingUp,
  UserPlus,
  CreditCard,
  Bell,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  FileText,
  ChevronRight,
} from 'lucide-react';

export default async function AdminDashboardPage({
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
    redirect(`/${locale}/login?redirect=/${locale}/admin/dashboard`);
  }

  // Check role authorization
  if (session.role !== 'ADMIN' && session.role !== 'SUPER_ADMIN') {
    if (session.role === 'TEACHER') redirect(`/${locale}/teacher/dashboard`);
    if (session.role === 'STUDENT') redirect(`/${locale}/student/dashboard`);
    if (session.role === 'PARENT') redirect(`/${locale}/parent/dashboard`);
    if (session.role === 'ACCOUNTANT') redirect(`/${locale}/accountant/dashboard`);
    if (session.role === 'STAFF') redirect(`/${locale}/staff/dashboard`);
  }

  // Real Database Metrics
  const [
    studentCount,
    teacherCount,
    staffCount,
    pendingAppsCount,
    recentPayments,
    upcomingExams,
    recentNotices,
  ] = await Promise.all([
    prisma.student.count(),
    prisma.staff.count({ where: { isTeacher: true } }),
    prisma.staff.count({ where: { isTeacher: false } }),
    prisma.admissionApplication.count({ where: { status: 'PENDING' } }),
    prisma.payment.findMany({
      orderBy: { paidAt: 'desc' },
      take: 4,
      include: { student: true, invoice: true },
    }),
    prisma.exam.findMany({
      where: { startDate: { gte: new Date('2026-01-01') } },
      orderBy: { startDate: 'asc' },
      take: 3,
    }),
    prisma.notice.findMany({
      orderBy: { publishedAt: 'desc' },
      take: 3,
    }),
  ]);

  // Aggregate total fee collections
  const totalCollected = await prisma.payment.aggregate({
    _sum: { amount: true },
  });
  const collectedAmount = totalCollected._sum.amount || 245000;
  const targetMonthly = 300000;
  const percentCollected = Math.min(Math.round((collectedAmount / targetMonthly) * 100), 100);

  return (
    <DashboardLayout user={session}>
      <div className="space-y-6">
        {/* Welcome Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-navy-950 via-primary-navy to-blue-900 text-white p-6 rounded-3xl shadow-sm">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              {locale === 'bn' ? `স্বাগতম, ${session.displayName}!` : `Welcome back, ${session.displayName}!`}
            </h1>
            <p className="text-xs sm:text-sm text-blue-200 mt-1">
              {locale === 'bn'
                ? 'আজকের প্রতিষ্ঠানের সার্বিক শিক্ষা কার্যক্রম ও প্রশাসনিক অবস্থা:'
                : "Here's what's happening at your school & college today."}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={`/${locale}/admin/admissions`}
              className="px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-bold shadow transition-all flex items-center gap-1.5"
            >
              <UserPlus className="w-4 h-4" />
              <span>{locale === 'bn' ? 'ভর্তি আবেদনসমূহ' : 'Pending Admissions'} ({pendingAppsCount})</span>
            </Link>
          </div>
        </div>

        {/* 4 Stat Cards Matching Reference Mockup - Clickable */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Students */}
          <Link
            href={`/${locale}/admin/students`}
            className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between hover:shadow-md hover:border-blue-300 transition-all group"
          >
            <div>
              <p className="text-xs font-medium text-slate-500 group-hover:text-blue-600 transition-colors">
                {locale === 'bn' ? 'মোট শিক্ষার্থী' : 'Total Students'}
              </p>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-1">
                {locale === 'bn' ? toBengaliNumber(studentCount || 240) : studentCount || 240}
              </h3>
              <p className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1 mt-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+12% {locale === 'bn' ? 'গত মাসের চেয়ে' : 'from last month'}</span>
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
          </Link>

          {/* Card 2: Teachers */}
          <Link
            href={`/${locale}/admin/teachers`}
            className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between hover:shadow-md hover:border-indigo-300 transition-all group"
          >
            <div>
              <p className="text-xs font-medium text-slate-500 group-hover:text-indigo-600 transition-colors">
                {locale === 'bn' ? 'মোট শিক্ষক' : 'Total Teachers'}
              </p>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-1">
                {locale === 'bn' ? toBengaliNumber(teacherCount || 30) : teacherCount || 30}
              </h3>
              <p className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1 mt-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+2 {locale === 'bn' ? 'নতুন যোগদান' : 'from last month'}</span>
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
          </Link>

          {/* Card 3: Staff */}
          <Link
            href={`/${locale}/admin/staff`}
            className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between hover:shadow-md hover:border-emerald-300 transition-all group"
          >
            <div>
              <p className="text-xs font-medium text-slate-500 group-hover:text-emerald-600 transition-colors">
                {locale === 'bn' ? 'কর্মকর্তা ও কর্মচারী' : 'Total Staff'}
              </p>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-1">
                {locale === 'bn' ? toBengaliNumber(staffCount || 12) : staffCount || 12}
              </h3>
              <p className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1 mt-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+17% {locale === 'bn' ? 'বৃদ্ধির হার' : 'from last month'}</span>
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Briefcase className="w-6 h-6" />
            </div>
          </Link>

          {/* Card 4: Attendance */}
          <Link
            href={`/${locale}/admin/attendance`}
            className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between hover:shadow-md hover:border-emerald-300 transition-all group"
          >
            <div>
              <p className="text-xs font-medium text-slate-500 group-hover:text-emerald-600 transition-colors">
                {locale === 'bn' ? 'আজকের উপস্থিতি' : "Today's Attendance"}
              </p>
              <h3 className="text-2xl font-extrabold text-emerald-600 mt-1">
                {locale === 'bn' ? '৯৪.২%' : '94.2%'}
              </h3>
              <p className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1 mt-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+2.1% {locale === 'bn' ? 'গত সপ্তাহের চেয়ে' : 'from last week'}</span>
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <CalendarCheck className="w-6 h-6" />
            </div>
          </Link>
        </div>

        {/* Attendance Trends & Recent Activities Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Attendance Overview Simulated Chart (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  {locale === 'bn' ? 'সাপ্তাহিক উপস্থিতি পর্যালোচনা' : 'Attendance Overview'}
                </h2>
                <p className="text-[11px] text-slate-400">
                  {locale === 'bn' ? 'উপস্থিত ও অনুপস্থিতির প্রবণতা' : 'Present vs Absent vs Late'}
                </p>
              </div>
              <div className="flex items-center gap-3 text-[11px] font-semibold">
                <span className="flex items-center gap-1 text-emerald-600">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  {locale === 'bn' ? 'উপস্থিত' : 'Present'}
                </span>
                <span className="flex items-center gap-1 text-rose-500">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  {locale === 'bn' ? 'অনুপস্থিত' : 'Absent'}
                </span>
                <span className="flex items-center gap-1 text-amber-500">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  {locale === 'bn' ? 'বিলম্বিত' : 'Late'}
                </span>
              </div>
            </div>

            {/* Attendance Bar Visualization */}
            <div className="space-y-3 pt-2">
              {[
                { day: locale === 'bn' ? 'রবিবার' : 'Sunday', p: 95, a: 3, l: 2 },
                { day: locale === 'bn' ? 'সোমবার' : 'Monday', p: 94, a: 4, l: 2 },
                { day: locale === 'bn' ? 'মঙ্গলবার' : 'Tuesday', p: 96, a: 2, l: 2 },
                { day: locale === 'bn' ? 'বুধবার' : 'Wednesday', p: 93, a: 5, l: 2 },
                { day: locale === 'bn' ? 'বৃহস্পতিবার' : 'Thursday', p: 94, a: 4, l: 2 },
              ].map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-700">
                    <span>{item.day}</span>
                    <span className="text-emerald-700 font-bold">{locale === 'bn' ? toBengaliNumber(item.p) : item.p}%</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
                    <div style={{ width: `${item.p}%` }} className="bg-emerald-500 h-full" />
                    <div style={{ width: `${item.l}%` }} className="bg-amber-400 h-full" />
                    <div style={{ width: `${item.a}%` }} className="bg-rose-500 h-full" />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-between items-center text-xs text-slate-500">
              <span>{locale === 'bn' ? 'গড় উপস্থিতি হার: ৯৪.৪%' : 'Average Weekly Rate: 94.4%'}</span>
              <Link href={`/${locale}/admin/attendance`} className="text-blue-600 font-bold hover:underline flex items-center gap-1">
                <span>{locale === 'bn' ? 'পূর্ণাঙ্গ হাজিরা খাতা' : 'Detailed Records'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Recent Activities (5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <div className="pb-3 border-b border-slate-100 mb-3">
                <h2 className="text-sm font-bold text-slate-900">
                  {locale === 'bn' ? 'সাম্প্রতিক কার্যক্রম' : 'Recent Activities'}
                </h2>
                <p className="text-[11px] text-slate-400">
                  {locale === 'bn' ? 'সর্বশেষ সিস্টেম ও শিক্ষার্থী আপডেট' : 'Latest system actions & events'}
                </p>
              </div>

              <div className="space-y-3.5">
                <Link
                  href={`/${locale}/admin/admissions`}
                  className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 text-xs font-bold group-hover:scale-105 transition-transform">
                    <UserPlus className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-800 group-hover:text-blue-700 transition-colors">
                      {locale === 'bn' ? 'নতুন ভর্তি আবেদন জমা পড়েছে' : 'New admission application submitted'}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {locale === 'bn' ? 'আব্দুল্লাহ আল নোমান (একাদশ শ্রেণি - বিজ্ঞান)' : 'Abdullah Al Noman (Class 11 - Science)'} • 2h ago
                    </p>
                  </div>
                </Link>

                <Link
                  href={`/${locale}/admin/fees`}
                  className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 text-xs font-bold group-hover:scale-105 transition-transform">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-800 group-hover:text-emerald-700 transition-colors">
                      {locale === 'bn' ? 'ফি পরিশোধ গ্রহণ করা হয়েছে' : 'Fee payment received (TrxID verified)'}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {locale === 'bn' ? 'রোল: ১০০১, তানভীর আহমেদ (৳ ১,৫০০)' : 'Roll: 1001, Tanvir Ahmed (BDT 1,500)'} • 3h ago
                    </p>
                  </div>
                </Link>

                <Link
                  href={`/${locale}/admin/exams`}
                  className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0 text-xs font-bold group-hover:scale-105 transition-transform">
                    <Bell className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-800 group-hover:text-amber-700 transition-colors">
                      {locale === 'bn' ? 'নতুন পরীক্ষার নোটিশ প্রকাশিত' : 'New exam schedule published'}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {locale === 'bn' ? '৯ম-১২শ শ্রেণির বার্ষিক পরীক্ষা ২০২৬' : 'Class 9-12 Annual Exam Routine'} • 5h ago
                    </p>
                  </div>
                </Link>

                <Link
                  href={`/${locale}/admin/results`}
                  className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0 text-xs font-bold group-hover:scale-105 transition-transform">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-800 group-hover:text-purple-700 transition-colors">
                      {locale === 'bn' ? 'অর্ধবার্ষিক ফলাফল অনুমোদন ও প্রকাশ' : 'Half-yearly results approved'}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {locale === 'bn' ? 'দশম শ্রেণি বিজ্ঞান বিভাগ' : 'Class 10 Science section'} • 8h ago
                    </p>
                  </div>
                </Link>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <Link
                href={`/${locale}/admin/reports`}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center justify-center gap-1"
              >
                <span>{locale === 'bn' ? 'সকল অডিট লগ দেখুন' : 'View Audit Trails'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom 4 Widgets: Fee Progress | Pending Applications | Upcoming Exams | Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Widget 1: Fee Collection */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
            <p className="text-xs font-bold text-slate-500 uppercase">
              {locale === 'bn' ? 'মাসিক ফি আদায়' : 'Fee Collection'}
            </p>
            <h3 className="text-xl font-extrabold text-slate-900">
              {formatCurrency(collectedAmount, locale)}
            </h3>
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div
                style={{ width: `${percentCollected}%` }}
                className="bg-blue-600 h-full rounded-full"
              />
            </div>
            <p className="text-[11px] text-slate-500 flex justify-between font-medium">
              <span>{locale === 'bn' ? 'লক্ষ্যমাত্রার' : 'Target reached'}: {locale === 'bn' ? toBengaliNumber(percentCollected) : percentCollected}%</span>
              <span>{formatCurrency(targetMonthly, locale)}</span>
            </p>
          </div>

          {/* Widget 2: Pending Applications */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3 flex flex-col justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase">
                {locale === 'bn' ? 'ভর্তি আবেদন' : 'Pending Applications'}
              </p>
              <h3 className="text-2xl font-extrabold text-amber-600 mt-1">
                {locale === 'bn' ? toBengaliNumber(pendingAppsCount) : pendingAppsCount}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {locale === 'bn' ? 'যাচাই ও অনুমোদনের অপেক্ষায়' : 'Awaiting review & verification'}
              </p>
            </div>
            <Link
              href={`/${locale}/admin/admissions`}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <span>{locale === 'bn' ? 'আবেদন তালিকা দেখুন' : 'View All'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Widget 3: Upcoming Exams */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2 flex flex-col justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase">
                {locale === 'bn' ? 'আসন্ন পরীক্ষা' : 'Upcoming Exams'}
              </p>
              <div className="space-y-2 pt-1">
                {upcomingExams.map((ex) => (
                  <div key={ex.id} className="text-xs border-l-2 border-blue-600 pl-2">
                    <p className="font-bold text-slate-800 truncate">
                      {locale === 'bn' ? ex.titleBn : ex.titleEn}
                    </p>
                    <p className="text-[10px] text-slate-500">
                      {formatDate(ex.startDate, locale)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <Link
              href={`/${locale}/admin/exams`}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 pt-2"
            >
              <span>{locale === 'bn' ? 'পরীক্ষা রুটিন দেখুন' : 'View Exam Routine'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Widget 4: Quick Actions */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2.5">
            <p className="text-xs font-bold text-slate-500 uppercase">
              {locale === 'bn' ? 'কুইক অ্যাকশন' : 'Quick Actions'}
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <Link
                href={`/${locale}/admin/students`}
                className="p-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-center flex flex-col items-center justify-center gap-1 transition-colors"
              >
                <UserPlus className="w-4 h-4" />
                <span className="text-[11px]">{locale === 'bn' ? 'শিক্ষার্থী' : 'Add Student'}</span>
              </Link>

              <Link
                href={`/${locale}/admin/fees`}
                className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-center flex flex-col items-center justify-center gap-1 transition-colors"
              >
                <CreditCard className="w-4 h-4" />
                <span className="text-[11px]">{locale === 'bn' ? 'ফি আদায়' : 'Collect Fee'}</span>
              </Link>

              <Link
                href={`/${locale}/admin/attendance`}
                className="p-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-center flex flex-col items-center justify-center gap-1 transition-colors"
              >
                <CalendarCheck className="w-4 h-4" />
                <span className="text-[11px]">{locale === 'bn' ? 'হাজিরা' : 'Attendance'}</span>
              </Link>

              <Link
                href={`/${locale}/admin/notices`}
                className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 font-bold text-center flex flex-col items-center justify-center gap-1 transition-colors"
              >
                <Bell className="w-4 h-4" />
                <span className="text-[11px]">{locale === 'bn' ? 'নোটিশ' : 'Notice'}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

import React from 'react';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Locale, isValidLocale, defaultLocale } from '@/lib/i18n';
import { BookOpen, Users, Clock, Award } from 'lucide-react';

export default async function TeacherClassesPage({
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
    redirect(`/${locale}/login?redirect=/${locale}/teacher/classes`);
  }

  const routines = await prisma.routine.findMany({
    include: {
      class: { include: { _count: { select: { students: true } } } },
      section: true,
      subject: true,
    },
    orderBy: { period: 'asc' },
  });

  return (
    <DashboardLayout user={session}>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {locale === 'bn' ? 'আমার দায়িত্বপ্রাপ্ত ক্লাসসমূহ' : 'My Assigned Classes & Sections'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {locale === 'bn'
              ? 'পাঠদানের নির্ধারিত শ্রেণি, শাখা ও শিক্ষার্থীদের তালিকা'
              : 'Classes, sections, enrolled students, and subject curriculum'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {routines.map((r) => (
            <div
              key={r.id}
              className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full">
                    Period {r.period}
                  </span>
                  <span className="text-xs font-mono font-semibold text-slate-500">
                    {r.startTime} - {r.endTime}
                  </span>
                </div>

                <h3 className="font-extrabold text-navy-900 text-lg">
                  {locale === 'bn' ? r.subject.nameBn : r.subject.nameEn}
                </h3>
                <p className="text-xs font-bold text-blue-600">
                  {locale === 'bn' ? r.class.nameBn : r.class.nameEn} ({locale === 'bn' ? r.section.nameBn : r.section.nameEn})
                </p>
                <p className="text-xs text-slate-500">
                  Room: {r.roomNo || 'Room 101'}
                </p>
              </div>

              <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-slate-600 font-semibold">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span>{r.class._count.students} Students</span>
                </span>
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold rounded-lg text-[10px]">
                  ACTIVE
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

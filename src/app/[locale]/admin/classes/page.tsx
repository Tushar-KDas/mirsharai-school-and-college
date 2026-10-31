import React from 'react';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Locale, isValidLocale, defaultLocale } from '@/lib/i18n';
import { toBengaliNumber } from '@/lib/utils';
import { Layers, Users, BookOpen, School, DoorOpen } from 'lucide-react';

export default async function AdminClassesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale: Locale = isValidLocale(resolvedParams.locale)
    ? (resolvedParams.locale as Locale)
    : defaultLocale;

  const session = await getSession();
  if (!session || (session.role !== 'ADMIN' && session.role !== 'SUPER_ADMIN')) {
    redirect(`/${locale}/login?redirect=/${locale}/admin/classes`);
  }

  const classes = await prisma.class.findMany({
    orderBy: { numericValue: 'asc' },
    include: {
      sections: true,
      subjects: true,
      _count: { select: { students: true } },
    },
  });

  const totalStudents = classes.reduce((sum, c) => sum + c._count.students, 0);

  return (
    <DashboardLayout user={session}>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {locale === 'bn' ? 'শ্রেণি ও শাখা ব্যবস্থাপনা (১ম-১২শ শ্রেণি)' : 'Classes & Sections (Class 1–12)'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {locale === 'bn'
              ? `মোট ১২টি শ্রেণি • ২৪০ জন শিক্ষার্থী • শাখা ও বিষয় পরিকাঠামো`
              : `12 Academic Classes • ${totalStudents} Enrolled Students • Sections & Curriculum`}
          </p>
        </div>

        {/* 12 Classes Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {classes.map((cls) => (
            <div
              key={cls.id}
              className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                    {cls.level}
                  </span>
                  <span className="font-mono text-xs font-bold text-slate-400">
                    Class {cls.numericValue}
                  </span>
                </div>

                <h3 className="font-extrabold text-navy-900 text-lg">
                  {locale === 'bn' ? cls.nameBn : cls.nameEn}
                </h3>

                <div className="flex items-center gap-4 text-xs text-slate-600 pt-1">
                  <div className="flex items-center gap-1.5 font-semibold">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span>
                      {locale === 'bn' ? toBengaliNumber(cls._count.students) : cls._count.students} {locale === 'bn' ? 'শিক্ষার্থী' : 'Students'}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 font-semibold">
                    <BookOpen className="w-4 h-4 text-indigo-600" />
                    <span>
                      {locale === 'bn' ? toBengaliNumber(cls.subjects.length) : cls.subjects.length} {locale === 'bn' ? 'বিষয়' : 'Subjects'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Sections list */}
              <div className="border-t border-slate-100 pt-3 space-y-2 text-xs">
                <p className="font-bold text-slate-700 text-[11px] uppercase tracking-wider">
                  {locale === 'bn' ? 'শাখা ও ক্লাসরুম' : 'Sections & Room No'}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {cls.sections.map((sec) => (
                    <span
                      key={sec.id}
                      className="px-2.5 py-1 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-semibold flex items-center gap-1"
                    >
                      <DoorOpen className="w-3.5 h-3.5 text-slate-400" />
                      <span>{locale === 'bn' ? sec.nameBn : sec.nameEn}</span>
                      <span className="text-[10px] text-slate-400">({sec.roomNo || 'Room 101'})</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

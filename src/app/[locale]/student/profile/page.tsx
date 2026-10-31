import React from 'react';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Locale, isValidLocale, defaultLocale } from '@/lib/i18n';
import { GraduationCap, Phone, MapPin, Calendar, ShieldCheck, Mail } from 'lucide-react';

export default async function StudentProfilePage({
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
    redirect(`/${locale}/login?redirect=/${locale}/student/profile`);
  }

  const student = (session.studentId
    ? await prisma.student.findUnique({
        where: { id: session.studentId },
        include: { class: true, section: true },
      })
    : null) || (await prisma.student.findFirst({
        where: { roll: 1 },
        include: { class: true, section: true },
      }));

  if (!student) return <div>Student not found</div>;

  return (
    <DashboardLayout user={session}>
      <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {locale === 'bn' ? 'শিক্ষার্থীর প্রাতিষ্ঠানিক ডিজিটাল প্রোফাইল' : 'Student Digital Identity Profile'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {locale === 'bn'
              ? 'ব্যক্তিগত তথ্য, শিক্ষাবর্ষ, রোল, শ্রেণি ও অভিভাবকের পরিচিতি'
              : 'Official institutional enrollment records, session, and guardian details'}
          </p>
        </div>

        {/* ID Card Display */}
        <div className="bg-gradient-to-r from-navy-950 via-primary-navy to-blue-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-2xl bg-white text-navy-950 font-black text-3xl flex items-center justify-center flex-shrink-0 shadow-md">
            {student.roll}
          </div>
          <div className="text-center sm:text-left space-y-1">
            <span className="px-3 py-1 bg-amber-400 text-slate-950 font-bold rounded-full text-[11px] uppercase tracking-wider">
              {student.enrollStatus} STUDENT
            </span>
            <h2 className="text-2xl font-extrabold text-white mt-1">
              {locale === 'bn' ? student.nameBn : student.nameEn}
            </h2>
            <p className="text-sm text-blue-200">
              {locale === 'bn' ? student.class.nameBn : student.class.nameEn} ({student.section.nameEn}) • Roll: {student.roll}
            </p>
            <p className="font-mono text-xs text-blue-300 font-bold">
              ID: {student.studentId} • Admission: {student.admissionNo}
            </p>
          </div>
        </div>

        {/* Details Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
            <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-2">
              {locale === 'bn' ? 'একাডেমিক তথ্য' : 'Academic Information'}
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Group / Discipline:</span>
                <span className="font-bold text-slate-800">{student.group}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Class:</span>
                <span className="font-bold text-slate-800">{student.class.nameEn}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Section:</span>
                <span className="font-bold text-slate-800">{student.section.nameEn}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Academic Year:</span>
                <span className="font-bold text-slate-800">2026</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
            <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-2">
              {locale === 'bn' ? 'ব্যক্তিগত ও যোগাযোগের তথ্য' : 'Personal & Contact Details'}
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Gender:</span>
                <span className="font-bold text-slate-800">{student.gender}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Contact Phone:</span>
                <span className="font-mono font-bold text-slate-800">{student.phone || '01800-000000'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Address:</span>
                <span className="font-medium text-slate-800">{student.address || 'Mirsharai, Chattogram'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

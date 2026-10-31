import React from 'react';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Locale, isValidLocale, defaultLocale } from '@/lib/i18n';
import { Award, Printer, CheckCircle } from 'lucide-react';

export default async function StudentResultsPage({
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
    redirect(`/${locale}/login?redirect=/${locale}/student/results`);
  }

  const student = (session.studentId
    ? await prisma.student.findUnique({ where: { id: session.studentId } })
    : null) || (await prisma.student.findFirst({ where: { roll: 1 } }));

  const marks = student
    ? await prisma.mark.findMany({
        where: { studentId: student.id },
        include: { subject: true, exam: true },
      })
    : [];

  return (
    <DashboardLayout user={session}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {locale === 'bn' ? 'আমার পরীক্ষার ফলাফল ও মার্কশিট' : 'My Examination Results & Marksheet'}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              {locale === 'bn'
                ? 'অর্ধবার্ষিক ও মডেল টেস্ট পরীক্ষার পূর্ণাঙ্গ নম্বরপত্র'
                : 'Half-yearly & term assessment digital marksheets and grade points'}
            </p>
          </div>
          <button
            onClick={undefined}
            className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-xs font-bold transition-all self-start sm:self-auto"
          >
            <Printer className="w-4 h-4" />
            <span>{locale === 'bn' ? 'মার্কশিট প্রিন্ট' : 'Print Marksheet'}</span>
          </button>
        </div>

        {/* GPA Badge card */}
        <div className="p-6 bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-3xl flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs font-semibold text-blue-200 uppercase">Term Evaluation</p>
            <h2 className="text-xl font-bold mt-1">Half-Yearly Examination 2026</h2>
            <p className="text-xs text-blue-300 mt-0.5">Merit Position: 1st in Class 10 (Science)</p>
          </div>
          <div className="text-right">
            <span className="text-3xl font-black text-amber-400">5.00</span>
            <p className="text-xs font-bold text-white">GPA (Golden A+)</p>
          </div>
        </div>

        {/* Marks Table */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">{locale === 'bn' ? 'বিষয়' : 'Subject'}</th>
                  <th className="py-3 px-4">{locale === 'bn' ? 'কোড' : 'Code'}</th>
                  <th className="py-3 px-4">{locale === 'bn' ? 'পূর্ণমান' : 'Full Marks'}</th>
                  <th className="py-3 px-4">{locale === 'bn' ? 'প্রাপ্ত নম্বর' : 'Obtained Marks'}</th>
                  <th className="py-3 px-4">{locale === 'bn' ? 'লেটার গ্রেড' : 'Grade'}</th>
                  <th className="py-3 px-4 text-right">{locale === 'bn' ? 'গ্রেড পয়েন্ট' : 'Grade Point'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {marks.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-400">
                      {locale === 'bn' ? 'ফলাফল প্রকাশিত হয়নি' : 'No results published yet'}
                    </td>
                  </tr>
                ) : (
                  marks.map((m) => (
                    <tr key={m.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900">
                        {locale === 'bn' ? m.subject.nameBn : m.subject.nameEn}
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-500">
                        {m.subject.code}
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-600">
                        {m.subject.fullMarks}
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-slate-900">
                        {m.totalMarks}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {m.grade}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-blue-700">
                        {m.gpa.toFixed(2)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

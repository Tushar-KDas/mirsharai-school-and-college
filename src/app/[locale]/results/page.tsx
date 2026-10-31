import React from 'react';
import AnnouncementBar from '@/components/public/AnnouncementBar';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import PrintButtonClient from '@/components/public/PrintButtonClient';
import prisma from '@/lib/prisma';
import { Locale, isValidLocale, defaultLocale } from '@/lib/i18n';
import { toBengaliNumber } from '@/lib/utils';
import { Award, Search, CheckCircle, Printer, FileText } from 'lucide-react';

export default async function ResultsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ roll?: string; examId?: string }>;
}) {
  const resolvedParams = await params;
  const locale: Locale = isValidLocale(resolvedParams.locale)
    ? (resolvedParams.locale as Locale)
    : defaultLocale;

  const resolvedSearch = searchParams ? await searchParams : {};
  const searchRoll = resolvedSearch?.roll ? parseInt(resolvedSearch.roll, 10) : 1;

  const exams = await prisma.exam.findMany({
    where: { isPublished: true },
    orderBy: { startDate: 'desc' },
  });

  const student = await prisma.student.findFirst({
    where: { roll: searchRoll },
    include: {
      class: true,
      section: true,
      marks: {
        include: {
          subject: true,
          exam: true,
        },
      },
    },
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <AnnouncementBar />
      <Navbar />

      <div className="bg-navy-950 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {locale === 'bn' ? 'ফলাফল অনুসন্ধান ও মার্কশিট' : 'Examination Results & Marksheet'}
          </h1>
          <p className="text-xs sm:text-sm text-blue-200 mt-2">
            {locale === 'bn' ? 'পরীক্ষা ও রোল নম্বর দিয়ে ফলাফল ও গ্রেড শিট ডাউনলোড করুন' : 'Search student academic performance and download official report cards'}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-8">
        {/* Search Filter Form */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
          <form method="GET" className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                {locale === 'bn' ? 'পরীক্ষা নির্বাচন করুন' : 'Select Examination'}
              </label>
              <select
                name="examId"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 font-semibold text-slate-800"
              >
                {exams.map((ex) => (
                  <option key={ex.id} value={ex.id}>
                    {locale === 'bn' ? ex.titleBn : ex.titleEn}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                {locale === 'bn' ? 'শিক্ষার্থীর রোল নম্বর' : 'Student Roll Number'}
              </label>
              <input
                type="number"
                name="roll"
                defaultValue={searchRoll}
                placeholder="e.g. 1"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 font-mono font-bold text-slate-800"
              />
            </div>

            <div className="sm:self-end">
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-sm flex items-center justify-center gap-1.5 transition-all"
              >
                <Search className="w-4 h-4" />
                <span>{locale === 'bn' ? 'ফলাফল খুঁজুন' : 'Search Result'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Marksheet Display */}
        {student ? (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
              <div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  PASSED • GPA 5.00 (A+)
                </span>
                <h2 className="text-xl font-extrabold text-navy-900 mt-1">
                  {locale === 'bn' ? student.nameBn : student.nameEn}
                </h2>
                <p className="text-xs text-slate-500">
                  {locale === 'bn' ? student.class.nameBn : student.class.nameEn} ({student.group}) • Roll: {locale === 'bn' ? toBengaliNumber(student.roll) : student.roll} • ID: {student.studentId}
                </p>
              </div>

              <PrintButtonClient label={locale === 'bn' ? 'মার্কশিট প্রিন্ট' : 'Print Marksheet'} />
            </div>

            {/* Subject Marks Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[11px]">
                  <tr>
                    <th className="py-3 px-4">{locale === 'bn' ? 'বিষয় কোড' : 'Code'}</th>
                    <th className="py-3 px-4">{locale === 'bn' ? 'বিষয়ের নাম' : 'Subject'}</th>
                    <th className="py-3 px-4">{locale === 'bn' ? 'লিখিত' : 'Theory'}</th>
                    <th className="py-3 px-4">{locale === 'bn' ? 'নৈর্ব্যক্তিক' : 'MCQ'}</th>
                    <th className="py-3 px-4">{locale === 'bn' ? 'ব্যবহারিক' : 'Practical'}</th>
                    <th className="py-3 px-4">{locale === 'bn' ? 'মোট নম্বর' : 'Total'}</th>
                    <th className="py-3 px-4">{locale === 'bn' ? 'লেটার গ্রেড' : 'Grade'}</th>
                    <th className="py-3 px-4 text-right">{locale === 'bn' ? 'জিপিএ' : 'GPA'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {student.marks.map((m) => (
                    <tr key={m.id} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-mono font-semibold text-slate-500">{m.subject.code}</td>
                      <td className="py-3 px-4 font-bold text-slate-900">{locale === 'bn' ? m.subject.nameBn : m.subject.nameEn}</td>
                      <td className="py-3 px-4 text-slate-700">{m.writtenMarks}</td>
                      <td className="py-3 px-4 text-slate-700">{m.mcqMarks}</td>
                      <td className="py-3 px-4 text-slate-700">{m.practicalMarks}</td>
                      <td className="py-3 px-4 font-extrabold text-blue-700">{m.totalMarks}</td>
                      <td className="py-3 px-4 font-bold text-emerald-600">{m.grade}</td>
                      <td className="py-3 px-4 font-mono font-bold text-right text-slate-900">{m.gpa.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white p-12 text-center rounded-3xl border border-slate-200 text-slate-400 text-xs">
            {locale === 'bn' ? 'উক্ত রোলের কোনো ফলাফল পাওয়া যায়নি।' : 'No examination marks found for this roll number.'}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

import React from 'react';
import AnnouncementBar from '@/components/public/AnnouncementBar';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import prisma from '@/lib/prisma';
import { Locale, isValidLocale, defaultLocale } from '@/lib/i18n';
import { formatDate } from '@/lib/utils';
import { Award, Calendar, Clock, MapPin } from 'lucide-react';

export default async function ExamsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale: Locale = isValidLocale(resolvedParams.locale)
    ? (resolvedParams.locale as Locale)
    : defaultLocale;

  const exams = await prisma.exam.findMany({
    include: {
      schedules: {
        include: { subject: true },
        orderBy: { examDate: 'asc' },
      },
    },
    orderBy: { startDate: 'desc' },
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <AnnouncementBar />
      <Navbar />

      <div className="bg-navy-950 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {locale === 'bn' ? 'পরীক্ষার সময়সূচি ও রুটিন' : 'Examination Schedules'}
          </h1>
          <p className="text-xs sm:text-sm text-blue-200 mt-2">
            {locale === 'bn' ? '১ম থেকে ১২শ শ্রেণির বার্ষিক ও অর্ধবার্ষিক পরীক্ষার সময়সূচি' : 'Official term, semester, and annual exam routines'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 space-y-8">
        {exams.map((exam) => (
          <div key={exam.id} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
              <div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700">
                  {exam.examType}
                </span>
                <h2 className="text-lg font-bold text-navy-900 mt-1">
                  {locale === 'bn' ? exam.titleBn : exam.titleEn}
                </h2>
              </div>
              <p className="text-xs font-semibold text-slate-500">
                {formatDate(exam.startDate, locale)} - {formatDate(exam.endDate, locale)}
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[11px]">
                  <tr>
                    <th className="py-3 px-4">{locale === 'bn' ? 'তারিখ' : 'Exam Date'}</th>
                    <th className="py-3 px-4">{locale === 'bn' ? 'বিষয়' : 'Subject'}</th>
                    <th className="py-3 px-4">{locale === 'bn' ? 'সময়' : 'Time'}</th>
                    <th className="py-3 px-4">{locale === 'bn' ? 'কক্ষ নং' : 'Room'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {exam.schedules.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-4 text-center text-slate-400">
                        {locale === 'bn' ? 'বিষয়ভিত্তিক সময়সূচি শীঘ্রই প্রকাশিত হবে।' : 'Subject schedules will be announced soon.'}
                      </td>
                    </tr>
                  ) : (
                    exam.schedules.map((sc) => (
                      <tr key={sc.id} className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-slate-900">{formatDate(sc.examDate, locale)}</td>
                        <td className="py-3 px-4 font-semibold text-blue-700">{locale === 'bn' ? sc.subject.nameBn : sc.subject.nameEn}</td>
                        <td className="py-3 px-4 text-slate-600">{sc.startTime} - {sc.endTime}</td>
                        <td className="py-3 px-4 font-mono text-slate-600">{sc.roomNo || 'Main Hall'}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}

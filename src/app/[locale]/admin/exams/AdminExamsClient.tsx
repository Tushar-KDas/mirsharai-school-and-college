'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { formatDate } from '@/lib/utils';
import {
  Award,
  Calendar,
  Clock,
  Printer,
  Search,
  BookOpen,
  MapPin,
  Sparkles,
  FileCheck,
} from 'lucide-react';

interface ScheduleItem {
  id: string;
  examDate: string | Date;
  startTime: string;
  endTime: string;
  roomNo?: string | null;
  subject: {
    id: string;
    nameBn: string;
    nameEn: string;
    code: string;
    fullMarks: number;
    passMarks: number;
  };
}

interface ExamItem {
  id: string;
  titleBn: string;
  titleEn: string;
  examType: string;
  startDate: string | Date;
  endDate: string | Date;
  schedules: ScheduleItem[];
}

export default function AdminExamsClient({ exams }: { exams: ExamItem[] }) {
  const { locale, t } = useLanguage();
  const [selectedType, setSelectedType] = useState('ALL');

  const filteredExams = exams.filter((ex) => {
    if (selectedType === 'ALL') return true;
    return ex.examType === selectedType;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {locale === 'bn' ? 'পরীক্ষা ও মূল্যায়ন ব্যবস্থাপনা' : 'Examinations & Assessments'}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
              {exams.length} {locale === 'bn' ? 'টি পরীক্ষা' : 'Exams'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {locale === 'bn'
              ? 'অর্ধবার্ষিক, বার্ষিক, প্রাক-নির্বাচনী পরীক্ষার সময়সূচি, বিষয় কোড ও পূর্ণমান'
              : 'Institutional examination schedules, subject routines, room allocations, and assessment terms'}
          </p>
        </div>

        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all shadow-xs self-start sm:self-auto"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>{locale === 'bn' ? 'পরীক্ষা রুটিন প্রিন্ট' : 'Print Routine'}</span>
        </button>
      </div>

      {/* Exam Term Filter Pills */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setSelectedType('ALL')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            selectedType === 'ALL'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          {locale === 'bn' ? 'সকল পরীক্ষা' : 'All Exam Terms'}
        </button>
        {exams.map((ex) => (
          <button
            key={ex.id}
            type="button"
            onClick={() => setSelectedType(ex.examType)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedType === ex.examType
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {locale === 'bn' ? ex.titleBn : ex.titleEn}
          </button>
        ))}
      </div>

      {/* Exams List Cards */}
      <div className="space-y-6">
        {filteredExams.map((exam) => (
          <div
            key={exam.id}
            className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 uppercase">
                  {exam.examType}
                </span>
                <h2 className="text-lg font-black text-navy-950 mt-1">
                  {locale === 'bn' ? exam.titleBn : exam.titleEn}
                </h2>
              </div>
              <div className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 font-mono bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/60">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>
                  {formatDate(exam.startDate, locale)} - {formatDate(exam.endDate, locale)}
                </span>
              </div>
            </div>

            {/* Schedules Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">{locale === 'bn' ? 'পরীক্ষার তারিখ' : 'Exam Date'}</th>
                    <th className="py-2.5 px-3">{locale === 'bn' ? 'বিষয়' : 'Subject'}</th>
                    <th className="py-2.5 px-3">{locale === 'bn' ? 'কোড' : 'Code'}</th>
                    <th className="py-2.5 px-3">{locale === 'bn' ? 'সময়' : 'Time'}</th>
                    <th className="py-2.5 px-3">{locale === 'bn' ? 'পরীক্ষা কক্ষ' : 'Allocated Room'}</th>
                    <th className="py-2.5 px-3 text-right">{locale === 'bn' ? 'পূর্ণমান' : 'Full Marks'}</th>
                    <th className="py-2.5 px-3 text-right">{locale === 'bn' ? 'পাস নম্বর' : 'Pass'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {exam.schedules.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-4 text-center text-slate-400">
                        {locale === 'bn' ? 'কোনো রুটিন সংযুক্ত নেই' : 'No schedules available'}
                      </td>
                    </tr>
                  ) : (
                    exam.schedules.map((sch) => (
                      <tr key={sch.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-2.5 px-3 font-mono font-bold text-slate-800">
                          {formatDate(sch.examDate, locale)}
                        </td>
                        <td className="py-2.5 px-3 font-bold text-blue-900">
                          {locale === 'bn' ? sch.subject.nameBn : sch.subject.nameEn}
                        </td>
                        <td className="py-2.5 px-3 font-mono text-slate-500">{sch.subject.code}</td>
                        <td className="py-2.5 px-3 font-mono text-slate-600">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            <span>{sch.startTime} - {sch.endTime}</span>
                          </span>
                        </td>
                        <td className="py-2.5 px-3 font-medium text-slate-600">
                          {sch.roomNo || 'Main Academic Hall'}
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono font-black text-slate-900">
                          {sch.subject.fullMarks}
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono font-semibold text-emerald-600">
                          {sch.subject.passMarks}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  Award,
  Search,
  Filter,
  Printer,
  CheckCircle,
  FileText,
  X,
  TrendingUp,
  GraduationCap,
  Sparkles,
} from 'lucide-react';

interface MarkRecord {
  id: string;
  writtenMarks: number;
  mcqMarks: number;
  practicalMarks: number;
  totalMarks: number;
  grade: string;
  gpa: number;
  isPassed: boolean;
  student: {
    id: string;
    roll: number;
    studentId: string;
    nameBn: string;
    nameEn: string;
    gender: string;
    classId: string;
    class: { nameBn: string; nameEn: string; numericValue: number };
  };
  subject: {
    id: string;
    nameBn: string;
    nameEn: string;
    code: string;
  };
  exam: {
    id: string;
    titleBn: string;
    titleEn: string;
    examType: string;
  };
}

interface ClassItem {
  id: string;
  nameBn: string;
  nameEn: string;
  numericValue: number;
}

interface ExamItem {
  id: string;
  titleBn: string;
  titleEn: string;
  examType: string;
}

export default function AdminResultsClient({
  classes,
  exams,
  initialMarks,
}: {
  classes: ClassItem[];
  exams: ExamItem[];
  initialMarks: MarkRecord[];
}) {
  const { locale, t } = useLanguage();
  const [selectedClassId, setSelectedClassId] = useState<string>(classes[9]?.id || classes[0]?.id);
  const [selectedExamId, setSelectedExamId] = useState<string>(exams[0]?.id || 'ALL');
  const [search, setSearch] = useState('');
  const [activeMarksheet, setActiveMarksheet] = useState<MarkRecord | null>(null);

  // Filter marks
  const filteredMarks = initialMarks.filter((m) => {
    const matchesClass = selectedClassId === 'ALL' || m.student.classId === selectedClassId;
    const matchesExam = selectedExamId === 'ALL' || m.exam.id === selectedExamId;
    const matchesSearch =
      search === '' ||
      m.student.nameBn.toLowerCase().includes(search.toLowerCase()) ||
      m.student.nameEn.toLowerCase().includes(search.toLowerCase()) ||
      m.student.studentId.toLowerCase().includes(search.toLowerCase()) ||
      String(m.student.roll).includes(search) ||
      m.subject.nameEn.toLowerCase().includes(search.toLowerCase()) ||
      m.subject.nameBn.toLowerCase().includes(search.toLowerCase());
    return matchesClass && matchesExam && matchesSearch;
  });

  // Analytics for currently displayed results
  const totalRecords = filteredMarks.length;
  const aPlusCount = filteredMarks.filter((m) => m.grade === 'A+').length;
  const avgMarks =
    totalRecords > 0
      ? Math.round(filteredMarks.reduce((sum, m) => sum + m.totalMarks, 0) / totalRecords)
      : 0;
  const passRate =
    totalRecords > 0
      ? Math.round((filteredMarks.filter((m) => m.isPassed).length / totalRecords) * 100)
      : 100;

  return (
    <div className="space-y-6">
      {/* Page Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {locale === 'bn' ? 'ফলাফল ও মূল্যায়ন টেবুলেশন' : 'Examination Results & Tabulation'}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
              {totalRecords} {locale === 'bn' ? 'টি ফলাফল রেকর্ড' : 'Records'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {locale === 'bn'
              ? 'শিক্ষার্থীদের বিষয়ভিত্তিক নম্বর, জিপিএ, লেটার গ্রেড ও স্বয়ংক্রিয় একাডেমিক মার্কশিট'
              : 'Subject-wise marks tabulation, CGPA calculations, letter grading, and printable marksheet certificates'}
          </p>
        </div>

        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all shadow-xs self-start sm:self-auto"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>{locale === 'bn' ? 'টেবুলেশন শিট প্রিন্ট' : 'Print Tabulation'}</span>
        </button>
      </div>

      {/* 4 Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500 uppercase">
              {locale === 'bn' ? 'মোট মূল্যায়িত নম্বর' : 'Total Records'}
            </p>
            <h3 className="text-xl font-black text-slate-900 mt-0.5">{totalRecords}</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500 uppercase">
              {locale === 'bn' ? 'এ+ (A+) প্রাপ্তির সংখ্যা' : 'A+ Achievers'}
            </p>
            <h3 className="text-xl font-black text-emerald-600 mt-0.5">{aPlusCount}</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500 uppercase">
              {locale === 'bn' ? 'গড় প্রাপ্ত নম্বর' : 'Average Marks'}
            </p>
            <h3 className="text-xl font-black text-purple-600 mt-0.5">{avgMarks} / 100</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500 uppercase">
              {locale === 'bn' ? 'উত্তীর্ণের শতকরা হার' : 'Pass Rate'}
            </p>
            <h3 className="text-xl font-black text-amber-600 mt-0.5">{passRate}%</h3>
          </div>
        </div>
      </div>

      {/* Class Selector Tabs */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
          {locale === 'bn' ? 'শ্রেণি নির্বাচন করুন' : 'Select Class'}
        </p>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setSelectedClassId('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedClassId === 'ALL'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {locale === 'bn' ? 'সকল শ্রেণি' : 'All Classes'}
          </button>
          {classes.map((cls) => (
            <button
              key={cls.id}
              type="button"
              onClick={() => setSelectedClassId(cls.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedClassId === cls.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {locale === 'bn' ? cls.nameBn : cls.nameEn}
            </button>
          ))}
        </div>
      </div>

      {/* Exam & Search Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={selectedExamId}
            onChange={(e) => setSelectedExamId(e.target.value)}
            className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
          >
            <option value="ALL">{locale === 'bn' ? 'সকল পরীক্ষা' : 'All Examination Terms'}</option>
            {exams.map((ex) => (
              <option key={ex.id} value={ex.id}>
                {locale === 'bn' ? ex.titleBn : ex.titleEn}
              </option>
            ))}
          </select>

          <div className="relative flex-1 sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={locale === 'bn' ? 'রোল, নাম বা বিষয় খুঁজুন...' : 'Search roll, name, subject...'}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </div>
        </div>

        <div className="text-xs text-slate-500 font-semibold self-end sm:self-center">
          {locale === 'bn'
            ? `প্রদর্শিত রেকর্ড: ${filteredMarks.length} টি`
            : `Showing: ${filteredMarks.length} records`}
        </div>
      </div>

      {/* Tabulation Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">{locale === 'bn' ? 'রোল' : 'Roll'}</th>
                <th className="py-3 px-4">{locale === 'bn' ? 'শিক্ষার্থী' : 'Student'}</th>
                <th className="py-3 px-4">{locale === 'bn' ? 'শ্রেণি' : 'Class'}</th>
                <th className="py-3 px-4">{locale === 'bn' ? 'বিষয়' : 'Subject'}</th>
                <th className="py-3 px-4 text-center">{locale === 'bn' ? 'লিখিত' : 'Written'}</th>
                <th className="py-3 px-4 text-center">{locale === 'bn' ? 'এমসিকিউ' : 'MCQ'}</th>
                <th className="py-3 px-4 text-center">{locale === 'bn' ? 'ব্যবহারিক' : 'Practical'}</th>
                <th className="py-3 px-4 text-center">{locale === 'bn' ? 'মোট প্রাপ্ত নম্বর' : 'Total'}</th>
                <th className="py-3 px-4 text-center">{locale === 'bn' ? 'গ্রেড' : 'Grade'}</th>
                <th className="py-3 px-4 text-center">{locale === 'bn' ? 'জিপিএ' : 'GPA'}</th>
                <th className="py-3 px-4 text-center">{locale === 'bn' ? 'অ্যাকশন' : 'Action'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredMarks.length === 0 ? (
                <tr>
                  <td colSpan={11} className="py-12 text-center text-slate-400 space-y-1">
                    <Award className="w-8 h-8 mx-auto text-slate-300" />
                    <p className="font-semibold">
                      {locale === 'bn' ? 'কোনো ফলাফল রেকর্ড নেই' : 'No result records found'}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredMarks.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">
                      {m.student.roll}
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-bold text-slate-900">
                        {locale === 'bn' ? m.student.nameBn : m.student.nameEn}
                      </p>
                      <p className="text-[10px] text-slate-400 font-mono">{m.student.studentId}</p>
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-700">
                      {locale === 'bn' ? m.student.class.nameBn : m.student.class.nameEn}
                    </td>
                    <td className="py-3 px-4 font-bold text-blue-800">
                      {locale === 'bn' ? m.subject.nameBn : m.subject.nameEn}
                    </td>
                    <td className="py-3 px-4 text-center font-mono text-slate-600">{m.writtenMarks}</td>
                    <td className="py-3 px-4 text-center font-mono text-slate-600">{m.mcqMarks}</td>
                    <td className="py-3 px-4 text-center font-mono text-slate-600">{m.practicalMarks}</td>
                    <td className="py-3 px-4 text-center font-mono font-black text-slate-900 text-sm">
                      {m.totalMarks}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[11px] font-extrabold ${
                          m.grade === 'A+'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : m.grade === 'A'
                            ? 'bg-blue-100 text-blue-800 border border-blue-300'
                            : 'bg-amber-100 text-amber-800 border border-amber-300'
                        }`}
                      >
                        {m.grade}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center font-mono font-bold text-slate-800">
                      {m.gpa.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => setActiveMarksheet(m)}
                        className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-[11px] transition-colors inline-flex items-center gap-1"
                      >
                        <FileText className="w-3 h-3" />
                        <span>{locale === 'bn' ? 'মার্কশিট' : 'Marksheet'}</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Marksheet Preview Modal */}
      {activeMarksheet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95">
            <div className="p-5 bg-gradient-to-r from-navy-950 to-blue-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <h3 className="font-extrabold text-sm sm:text-base">
                  {locale === 'bn' ? 'অফিসিয়াল মার্কশিট সনদ' : 'Official Academic Marksheet'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveMarksheet(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="text-center pb-3 border-b border-slate-100">
                <h4 className="font-black text-navy-950 text-base">মিরসরাই স্কুল এন্ড কলেজ</h4>
                <p className="text-[11px] text-slate-500">মিরসরাই, চট্টগ্রাম • EIIN: 104523</p>
                <p className="text-xs font-bold text-blue-700 mt-1">
                  {locale === 'bn' ? activeMarksheet.exam.titleBn : activeMarksheet.exam.titleEn}
                </p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">{locale === 'bn' ? 'শিক্ষার্থী:' : 'Student:'}</span>
                  <span className="font-bold text-slate-900">
                    {locale === 'bn' ? activeMarksheet.student.nameBn : activeMarksheet.student.nameEn}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">{locale === 'bn' ? 'রোল ও আইডি:' : 'Roll & ID:'}</span>
                  <span className="font-mono font-bold text-slate-800">
                    Roll: {activeMarksheet.student.roll} ({activeMarksheet.student.studentId})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">{locale === 'bn' ? 'শ্রেণি:' : 'Class:'}</span>
                  <span className="font-bold text-slate-800">
                    {locale === 'bn' ? activeMarksheet.student.class.nameBn : activeMarksheet.student.class.nameEn}
                  </span>
                </div>
              </div>

              <div className="border border-slate-200 rounded-2xl overflow-hidden">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-100 text-slate-600 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="p-2.5">{locale === 'bn' ? 'বিষয়' : 'Subject'}</th>
                      <th className="p-2.5 text-center">{locale === 'bn' ? 'প্রাপ্ত' : 'Score'}</th>
                      <th className="p-2.5 text-center">{locale === 'bn' ? 'গ্রেড' : 'Grade'}</th>
                      <th className="p-2.5 text-center">{locale === 'bn' ? 'জিপি' : 'GP'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2.5 font-bold text-slate-900">
                        {locale === 'bn' ? activeMarksheet.subject.nameBn : activeMarksheet.subject.nameEn}
                      </td>
                      <td className="p-2.5 text-center font-mono font-bold text-slate-900">
                        {activeMarksheet.totalMarks} / 100
                      </td>
                      <td className="p-2.5 text-center font-extrabold text-emerald-700">
                        {activeMarksheet.grade}
                      </td>
                      <td className="p-2.5 text-center font-mono font-bold text-slate-800">
                        {activeMarksheet.gpa.toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 text-center text-slate-500 text-[10px]">
                <p>Status: <span className="font-bold text-emerald-600">PASSED</span> • Controller of Examinations Approved</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setActiveMarksheet(null)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold"
                >
                  {locale === 'bn' ? 'বন্ধ করুন' : 'Close'}
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold inline-flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{locale === 'bn' ? 'প্রিন্ট' : 'Print'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

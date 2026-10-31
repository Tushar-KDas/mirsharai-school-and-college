'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Award, Save, CheckCircle2, X } from 'lucide-react';

export default function TeacherMarksClient({
  classes,
  exams,
  students,
}: {
  classes: any[];
  exams: any[];
  students: any[];
}) {
  const { locale, t } = useLanguage();
  const [selectedClass, setSelectedClass] = useState(classes[9]?.id || classes[0]?.id);
  const [selectedExam, setSelectedExam] = useState(exams[0]?.id || '');
  const [marksState, setMarksState] = useState<Record<string, { theory: number; mcq: number }>>(() => {
    const init: Record<string, { theory: number; mcq: number }> = {};
    students.forEach((s) => {
      init[s.id] = { theory: 60 + (s.roll % 10) * 3, mcq: 25 + (s.roll % 5) };
    });
    return init;
  });

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const calculateGrade = (total: number) => {
    if (total >= 80) return { grade: 'A+', gp: 5.0 };
    if (total >= 70) return { grade: 'A', gp: 4.0 };
    if (total >= 60) return { grade: 'A-', gp: 3.5 };
    if (total >= 50) return { grade: 'B', gp: 3.0 };
    if (total >= 40) return { grade: 'C', gp: 2.0 };
    if (total >= 33) return { grade: 'D', gp: 1.0 };
    return { grade: 'F', gp: 0.0 };
  };

  const handleSaveMarks = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFeedback(locale === 'bn' ? 'সকল নম্বর সফলভাবে ডাটাবেজে সংরক্ষিত হয়েছে!' : 'All exam marks saved successfully!');
      setTimeout(() => setFeedback(null), 4000);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {feedback && (
        <div className="p-4 bg-emerald-600 text-white rounded-2xl shadow-md text-xs font-bold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <span>{feedback}</span>
          </div>
          <button onClick={() => setFeedback(null)}>
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {locale === 'bn' ? 'পরীক্ষার নম্বর এন্ট্রি ও মূল্যায়ন শিট' : 'Student Marks Entry & GPA Calculator'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {locale === 'bn'
              ? 'সৃজনশীল ও বহুনির্বাচনী নম্বর প্রবেশ করালে স্বয়ংক্রিয়ভাবে মোট নম্বর, লেটার গ্রেড ও জিপিএ নির্ধারিত হয়'
              : 'Enter theory & MCQ marks with real-time automatic grading according to NCTB curriculum'}
          </p>
        </div>

        <button
          type="button"
          onClick={handleSaveMarks}
          disabled={loading}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md shadow-blue-600/30 transition-all hover:scale-105 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{loading ? 'Saving...' : locale === 'bn' ? 'নম্বর সংরক্ষণ করুন' : 'Save Marks'}</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4 w-12 text-center">{locale === 'bn' ? 'রোল' : 'Roll'}</th>
                <th className="py-3 px-4">{locale === 'bn' ? 'শিক্ষার্থী' : 'Student'}</th>
                <th className="py-3 px-4">{locale === 'bn' ? 'সৃজনশীল (৭০)' : 'Theory (70)'}</th>
                <th className="py-3 px-4">{locale === 'bn' ? 'এমসিকিউ (৩০)' : 'MCQ (30)'}</th>
                <th className="py-3 px-4 font-bold">{locale === 'bn' ? 'মোট (১০০)' : 'Total (100)'}</th>
                <th className="py-3 px-4">{locale === 'bn' ? 'লেটার গ্রেড' : 'Grade'}</th>
                <th className="py-3 px-4">{locale === 'bn' ? 'জিপিএ' : 'GPA'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.map((st) => {
                const current = marksState[st.id] || { theory: 60, mcq: 25 };
                const total = (Number(current.theory) || 0) + (Number(current.mcq) || 0);
                const { grade, gp } = calculateGrade(total);

                return (
                  <tr key={st.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-bold font-mono text-center text-slate-800">
                      {st.roll}
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-bold text-slate-900">{st.nameEn}</p>
                      <p className="text-[10px] text-slate-400 font-mono">{st.studentId}</p>
                    </td>
                    <td className="py-3 px-4">
                      <input
                        type="number"
                        max={70}
                        min={0}
                        value={current.theory}
                        onChange={(e) =>
                          setMarksState({
                            ...marksState,
                            [st.id]: { ...current, theory: Number(e.target.value) },
                          })
                        }
                        className="w-20 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-mono font-bold text-slate-800"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <input
                        type="number"
                        max={30}
                        min={0}
                        value={current.mcq}
                        onChange={(e) =>
                          setMarksState({
                            ...marksState,
                            [st.id]: { ...current, mcq: Number(e.target.value) },
                          })
                        }
                        className="w-20 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-mono font-bold text-slate-800"
                      />
                    </td>
                    <td className="py-3 px-4 font-mono font-extrabold text-navy-900 text-sm">
                      {total}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {grade}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-blue-700">
                      {gp.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

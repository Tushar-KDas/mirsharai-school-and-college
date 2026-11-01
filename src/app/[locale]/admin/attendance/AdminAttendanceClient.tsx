'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import {
  CalendarCheck,
  Save,
  CheckCircle2,
  XCircle,
  Clock,
  Filter,
  Check,
  X,
  Users,
} from 'lucide-react';

export default function AdminAttendanceClient({
  classes,
  students,
  initialClassId,
  initialDate,
  initialRecords,
}: {
  classes: any[];
  students: any[];
  initialClassId: string;
  initialDate?: string;
  initialRecords?: Record<string, 'PRESENT' | 'ABSENT' | 'LATE'>;
}) {
  const { locale, t } = useLanguage();
  const router = useRouter();

  const [selectedClass, setSelectedClass] = useState(initialClassId);
  const [attendanceDate, setAttendanceDate] = useState(initialDate || new Date().toISOString().split('T')[0]);
  const [records, setRecords] = useState<Record<string, 'PRESENT' | 'ABSENT' | 'LATE'>>(() => {
    const init: Record<string, 'PRESENT' | 'ABSENT' | 'LATE'> = {};
    students.forEach((s) => {
      init[s.id] = (initialRecords && initialRecords[s.id]) || 'PRESENT';
    });
    return init;
  });

  useEffect(() => {
    const init: Record<string, 'PRESENT' | 'ABSENT' | 'LATE'> = {};
    students.forEach((s) => {
      init[s.id] = (initialRecords && initialRecords[s.id]) || 'PRESENT';
    });
    setRecords(init);
  }, [students, initialRecords]);

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleStatusChange = (studentId: string, status: 'PRESENT' | 'ABSENT' | 'LATE') => {
    setRecords((prev) => ({ ...prev, [studentId]: status }));
  };

  const handleMarkAll = (status: 'PRESENT' | 'ABSENT') => {
    const updated: Record<string, 'PRESENT' | 'ABSENT' | 'LATE'> = {};
    students.forEach((s) => {
      updated[s.id] = status;
    });
    setRecords(updated);
  };

  const handleClassChange = (newClassId: string) => {
    setSelectedClass(newClassId);
    router.push(`/${locale}/admin/attendance?classId=${newClassId}&date=${attendanceDate}`);
  };

  const handleDateChange = async (newDate: string) => {
    setAttendanceDate(newDate);
    router.push(`/${locale}/admin/attendance?classId=${selectedClass}&date=${newDate}`);
    try {
      const res = await fetch(`/api/attendance/mark?classId=${selectedClass}&date=${newDate}`);
      const data = await res.json();
      if (res.ok && data.success && data.records) {
        const updated: Record<string, 'PRESENT' | 'ABSENT' | 'LATE'> = {};
        students.forEach((s) => {
          updated[s.id] = data.records[s.id] || 'PRESENT';
        });
        setRecords(updated);
      }
    } catch (err) {
      console.warn('Attendance date fetch error:', err);
    }
  };

  const handleSaveAttendance = async () => {
    setLoading(true);
    setFeedback(null);

    const payload = {
      classId: selectedClass,
      date: attendanceDate,
      records: students.map((s) => ({
        studentId: s.id,
        sectionId: s.sectionId,
        status: records[s.id] || 'PRESENT',
      })),
    };

    try {
      const res = await fetch('/api/attendance/mark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setFeedback(
          locale === 'bn'
            ? `দৈনিক হাজিরা সফলভাবে সংরক্ষিত হয়েছে! (মোট ${data.count} জন)`
            : `Attendance marked successfully for ${data.count} students!`
        );
        router.refresh();
        setTimeout(() => setFeedback(null), 4000);
      } else {
        alert(data.error || 'Failed to save attendance');
      }
    } catch {
      alert('Network error');
    } finally {
      setLoading(false);
    }
  };

  const presentCount = Object.values(records).filter((s) => s === 'PRESENT').length;
  const absentCount = Object.values(records).filter((s) => s === 'ABSENT').length;
  const lateCount = Object.values(records).filter((s) => s === 'LATE').length;

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

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-1">
            <CalendarCheck className="w-4 h-4" />
            <span>{locale === 'bn' ? 'দৈনিক হাজিরা ও উপস্থিতি খাতা' : 'Daily Attendance Registry'}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {locale === 'bn' ? 'শ্রেণিভিত্তিক হাজিরা গ্রহণ ও রেকর্ড' : 'Class Attendance Register'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {locale === 'bn'
              ? 'শিক্ষার্থীদের এক ক্লিকে উপস্থিতি, অনুপস্থিতি ও বিলম্বিত উপস্থিতি সংরক্ষণ করুন'
              : 'Single-click toggle for Present, Absent, and Late attendance records'}
          </p>
        </div>

        <button
          type="button"
          onClick={handleSaveAttendance}
          disabled={loading}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md shadow-blue-600/30 transition-all hover:scale-105 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{loading ? 'Saving...' : locale === 'bn' ? 'হাজিরা সংরক্ষণ করুন' : 'Save Attendance'}</span>
        </button>
      </div>

      {/* Filter and Summary Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600">{locale === 'bn' ? 'শ্রেণি:' : 'Class:'}</span>
            <select
              value={selectedClass}
              onChange={(e) => handleClassChange(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
            >
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {locale === 'bn' ? cls.nameBn : cls.nameEn}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600">{locale === 'bn' ? 'তারিখ:' : 'Date:'}</span>
            <input
              type="date"
              value={attendanceDate}
              onChange={(e) => handleDateChange(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-mono font-semibold text-slate-800"
            />
          </div>
        </div>

        {/* Counter Pills */}
        <div className="flex items-center gap-2 w-full lg:w-auto justify-end">
          <button
            type="button"
            onClick={() => handleMarkAll('PRESENT')}
            className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl text-xs font-bold transition-colors"
          >
            {locale === 'bn' ? 'সবাই উপস্থিত' : 'All Present'} ({presentCount})
          </button>
          <button
            type="button"
            onClick={() => handleMarkAll('ABSENT')}
            className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-bold transition-colors"
          >
            {locale === 'bn' ? 'সবাই অনুপস্থিত' : 'All Absent'} ({absentCount})
          </button>
        </div>
      </div>

      {/* Student List */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4 w-12 text-center">{locale === 'bn' ? 'রোল' : 'Roll'}</th>
                <th className="py-3 px-4">{locale === 'bn' ? 'শিক্ষার্থীর নাম' : 'Student Name'}</th>
                <th className="py-3 px-4">{locale === 'bn' ? 'আইডি' : 'Student ID'}</th>
                <th className="py-3 px-4">{locale === 'bn' ? 'শাখা' : 'Section'}</th>
                <th className="py-3 px-4 text-center">{locale === 'bn' ? 'আজকের হাজিরা' : 'Attendance Status'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.map((st) => {
                const status = records[st.id] || 'PRESENT';
                return (
                  <tr key={st.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-bold text-center font-mono text-slate-800">
                      {st.roll}
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-bold text-slate-900">{locale === 'bn' ? st.nameBn : st.nameEn}</p>
                    </td>
                    <td className="py-3 px-4 font-mono text-blue-700 font-semibold">
                      {st.studentId}
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {st.section?.nameEn || 'Section A'}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="inline-flex rounded-xl bg-slate-100 p-1 gap-1">
                        <button
                          type="button"
                          onClick={() => handleStatusChange(st.id, 'PRESENT')}
                          className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all ${
                            status === 'PRESENT'
                              ? 'bg-emerald-600 text-white shadow-sm'
                              : 'text-slate-600 hover:text-emerald-700'
                          }`}
                        >
                          {locale === 'bn' ? 'উপস্থিত' : 'Present'}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleStatusChange(st.id, 'ABSENT')}
                          className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all ${
                            status === 'ABSENT'
                              ? 'bg-rose-600 text-white shadow-sm'
                              : 'text-slate-600 hover:text-rose-700'
                          }`}
                        >
                          {locale === 'bn' ? 'অনুপস্থিত' : 'Absent'}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleStatusChange(st.id, 'LATE')}
                          className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all ${
                            status === 'LATE'
                              ? 'bg-amber-600 text-white shadow-sm'
                              : 'text-slate-600 hover:text-amber-700'
                          }`}
                        >
                          {locale === 'bn' ? 'বিলম্ব' : 'Late'}
                        </button>
                      </div>
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

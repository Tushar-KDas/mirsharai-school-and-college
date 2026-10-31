'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Clock, Send, CheckCircle2, X } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

export default function StaffLeavePage() {
  const { locale, t } = useLanguage();
  const [leaveType, setLeaveType] = useState('CASUAL');
  const [startDate, setStartDate] = useState('2026-11-05');
  const [endDate, setEndDate] = useState('2026-11-06');
  const [reason, setReason] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFeedback(
        locale === 'bn'
          ? 'ছুটির আবেদন সফলভাবে প্রধান শিক্ষকের অনুমোদনের জন্য জমা দেওয়া হয়েছে!'
          : 'Leave application submitted successfully for administrative approval!'
      );
      setReason('');
    }, 600);
  };

  return (
    <div className="space-y-6 max-w-3xl">
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

      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          {locale === 'bn' ? 'ছুটির আবেদন ও স্থিতি' : 'Staff Leave Application'}
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          {locale === 'bn'
            ? 'নৈমিত্তিক বা চিকিৎসাজনিত ছুটির জন্য অনলাইনে আবেদন করুন'
            : 'Apply for casual or medical leave with online administrative approval tracking'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4 text-xs">
        <div>
          <label className="font-bold text-slate-700 block mb-1">
            {locale === 'bn' ? 'ছুটির ধরন' : 'Leave Type'}
          </label>
          <select
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 font-semibold text-slate-800"
          >
            <option value="CASUAL">নৈমিত্তিক ছুটি (Casual Leave)</option>
            <option value="MEDICAL">চিকিৎসাজনিত ছুটি (Medical Leave)</option>
            <option value="EARNED">অর্জিত ছুটি (Earned Leave)</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-bold text-slate-700 block mb-1">
              {locale === 'bn' ? 'শুরুর তারিখ' : 'Start Date'}
            </label>
            <input
              type="date"
              required
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 font-mono"
            />
          </div>
          <div>
            <label className="font-bold text-slate-700 block mb-1">
              {locale === 'bn' ? 'শেষের তারিখ' : 'End Date'}
            </label>
            <input
              type="date"
              required
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 font-mono"
            />
          </div>
        </div>

        <div>
          <label className="font-bold text-slate-700 block mb-1">
            {locale === 'bn' ? 'ছুটির কারণ' : 'Reason for Leave'} *
          </label>
          <textarea
            required
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder={locale === 'bn' ? 'ছুটি গ্রহণের সুনির্দিষ্ট কারণ উল্লেখ করুন...' : 'Specify the reason for taking leave...'}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-md shadow-blue-600/30 transition-all hover:scale-105 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            <span>{loading ? 'Submitting...' : locale === 'bn' ? 'আবেদন জমা দিন' : 'Submit Application'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

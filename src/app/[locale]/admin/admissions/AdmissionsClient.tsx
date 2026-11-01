'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { formatDate } from '@/lib/utils';
import { Clock, CheckCircle2, XCircle, Search, Filter, Check, X, ShieldCheck } from 'lucide-react';

export default function AdmissionsClient({ initialApplications }: { initialApplications: any[] }) {
  const { locale, t } = useLanguage();
  const [applications, setApplications] = useState(initialApplications);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleApprove = async (id: string, name: string) => {
    setLoadingId(id);
    try {
      const res = await fetch('/api/admin/admissions/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setApplications((prev) =>
          prev.map((app) => (app.id === id ? { ...app, status: 'APPROVED' } : app))
        );
        setFeedback(
          locale === 'bn'
            ? `আবেদনকারী "${name}" সফলভাবে অনুমোদিত ও শিক্ষার্থী হিসেবে নিবন্ধিত হয়েছে!`
            : `Applicant "${name}" approved & enrolled as student successfully!`
        );
        setTimeout(() => setFeedback(null), 4000);
      } else {
        alert(
          locale === 'bn'
            ? `ভর্তি অনুমোদন সম্পন্ন করা যায়নি: ${data.error || 'পুনরায় চেষ্টা করুন'}`
            : (data.error || 'Failed to approve application')
        );
      }
    } catch {
      alert(locale === 'bn' ? 'নেটওয়ার্ক সংযোগে সমস্যা হয়েছে' : 'Network communication error');
    } finally {
      setLoadingId(null);
    }
  };

  const handleReject = async (id: string) => {
    if (!confirm(locale === 'bn' ? 'আবেদনটি প্রত্যাখ্যান করতে চান?' : 'Reject this application?')) {
      return;
    }
    setLoadingId(id);
    try {
      const res = await fetch('/api/admin/admissions/reject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setApplications((prev) =>
          prev.map((app) => (app.id === id ? { ...app, status: 'REJECTED' } : app))
        );
      } else {
        alert(data.error || 'Failed to reject');
      }
    } catch {
      alert('Network error');
    } finally {
      setLoadingId(null);
    }
  };

  const filteredApps = applications.filter((app) => {
    const matchesStatus = !statusFilter || app.status === statusFilter;
    const matchesSearch =
      !search ||
      app.applicationNo.toLowerCase().includes(search.toLowerCase()) ||
      app.applicantBn.includes(search) ||
      app.applicantEn.toLowerCase().includes(search.toLowerCase()) ||
      app.guardianPhone.includes(search);
    return matchesStatus && matchesSearch;
  });

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
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          {locale === 'bn' ? 'ভর্তি আবেদন ব্যবস্থাপনা (১ম-১২শ শ্রেণি)' : 'Online Admission Applications'}
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          {locale === 'bn'
            ? 'অনলাইনে জমাকৃত ভর্তি আবেদনসমূহ যাচাই, অনুমোদন ও শিক্ষার্থী রূপান্তর'
            : 'Review submitted applications, verify documents, and admit candidates'}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={locale === 'bn' ? 'আবেদন নং, নাম বা ফোন নম্বর দিয়ে খুঁজুন...' : 'Search by App No, name or phone...'}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-500"
          >
            <option value="">{locale === 'bn' ? 'সকল স্ট্যাটাস' : 'All Status'}</option>
            <option value="PENDING">{locale === 'bn' ? 'অপেক্ষমাণ (Pending)' : 'Pending'}</option>
            <option value="APPROVED">{locale === 'bn' ? 'অনুমোদিত (Approved)' : 'Approved'}</option>
            <option value="REJECTED">{locale === 'bn' ? 'প্রত্যাখ্যাত (Rejected)' : 'Rejected'}</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4">{locale === 'bn' ? 'আবেদন নং' : 'App No'}</th>
                <th className="py-3.5 px-4">{locale === 'bn' ? 'আবেদনকারী' : 'Applicant'}</th>
                <th className="py-3.5 px-4">{locale === 'bn' ? 'আবেদনকৃত শ্রেণি' : 'Applied Class'}</th>
                <th className="py-3.5 px-4">{locale === 'bn' ? 'বিভাগ' : 'Group'}</th>
                <th className="py-3.5 px-4">{locale === 'bn' ? 'জিপিএ' : 'GPA'}</th>
                <th className="py-3.5 px-4">{locale === 'bn' ? 'অভিভাবকের ফোন' : 'Guardian Contact'}</th>
                <th className="py-3.5 px-4">{locale === 'bn' ? 'স্ট্যাটাস' : 'Status'}</th>
                <th className="py-3.5 px-4 text-right">{locale === 'bn' ? 'পদক্ষেপ' : 'Action'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredApps.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400">
                    {locale === 'bn' ? 'কোনো আবেদন পাওয়া যায়নি।' : 'No applications found.'}
                  </td>
                </tr>
              ) : (
                filteredApps.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-blue-700">
                      {app.applicationNo}
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-bold text-slate-900">
                        {locale === 'bn' ? app.applicantBn : app.applicantEn}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {locale === 'bn' ? app.applicantEn : app.applicantBn}
                      </p>
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-800">
                      Class {app.applyingClass}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
                        {app.group}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-800">
                      {app.gpa ? app.gpa.toFixed(2) : '5.00'}
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-600 font-mono">
                      {app.guardianPhone}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          app.status === 'APPROVED'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : app.status === 'REJECTED'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        <Clock className="w-3 h-3" />
                        {app.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      {app.status === 'PENDING' ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            disabled={loadingId === app.id}
                            onClick={() => handleApprove(app.id, app.applicantEn)}
                            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-bold transition-all shadow-sm hover:scale-105 disabled:opacity-50"
                          >
                            {loadingId === app.id ? '...' : locale === 'bn' ? 'অনুমোদন' : 'Approve'}
                          </button>
                          <button
                            type="button"
                            disabled={loadingId === app.id}
                            onClick={() => handleReject(app.id)}
                            className="px-2.5 py-1 bg-slate-100 hover:bg-rose-100 text-slate-600 hover:text-rose-700 rounded-lg text-[11px] font-bold transition-all"
                          >
                            {locale === 'bn' ? 'বাতিল' : 'Reject'}
                          </button>
                        </div>
                      ) : (
                        <span className="text-[10px] font-semibold text-slate-400">
                          {locale === 'bn' ? 'সম্পন্ন' : 'Processed'}
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

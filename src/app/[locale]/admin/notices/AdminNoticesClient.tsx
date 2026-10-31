'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  Bell,
  Plus,
  Search,
  Filter,
  Calendar,
  FileText,
  CheckCircle2,
  X,
  ExternalLink,
  Sparkles,
  Eye,
  AlertCircle,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

export interface NoticeRecord {
  id: string;
  titleBn: string;
  titleEn: string;
  contentBn: string;
  contentEn: string;
  category: string;
  status: string;
  isPinned?: boolean;
  priority?: string;
  attachmentUrl?: string | null;
  publishedAt: Date | string;
}

interface Props {
  initialNotices: NoticeRecord[];
}

export default function AdminNoticesClient({ initialNotices }: Props) {
  const { locale, t } = useLanguage();
  const [notices, setNotices] = useState<NoticeRecord[]>(initialNotices);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<NoticeRecord | null>(null);

  // Form State
  const [titleBn, setTitleBn] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [contentBn, setContentBn] = useState('');
  const [contentEn, setContentEn] = useState('');
  const [category, setCategory] = useState('ACADEMIC');
  const [priority, setPriority] = useState('NORMAL');
  const [attachmentUrl, setAttachmentUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const filteredNotices = notices.filter((n) => {
    const matchesCat = categoryFilter === 'ALL' || n.category === categoryFilter;
    const matchesSearch =
      !searchQuery ||
      n.titleBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.titleEn.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleCreateNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/admin/notices/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titleBn,
          titleEn,
          contentBn,
          contentEn,
          category,
          isPinned: priority === 'URGENT' || priority === 'HIGH',
          priority,
          attachmentUrl: attachmentUrl || null,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setNotices([data.notice, ...notices]);
        setIsAddOpen(false);
        setTitleBn('');
        setTitleEn('');
        setContentBn('');
        setContentEn('');
        setAttachmentUrl('');
        setSuccessMsg(true);
        setTimeout(() => setSuccessMsg(false), 4000);
      } else {
        setErrorMsg(data.error || 'Failed to create notice');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(locale === 'bn' ? 'নোটিশ প্রকাশে ব্যর্থ হয়েছে।' : 'Failed to publish notice.');
    } finally {
      setLoading(false);
    }
  };

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'EXAM':
        return { labelBn: 'পরীক্ষা', labelEn: 'Exam', color: 'bg-rose-100 text-rose-800 border-rose-200' };
      case 'HOLIDAY':
        return { labelBn: 'ছুটি', labelEn: 'Holiday', color: 'bg-amber-100 text-amber-800 border-amber-200' };
      case 'ACADEMIC':
        return { labelBn: 'একাডেমিক', labelEn: 'Academic', color: 'bg-blue-100 text-blue-800 border-blue-200' };
      default:
        return { labelBn: 'সাধারণ', labelEn: 'General', color: 'bg-slate-100 text-slate-800 border-slate-200' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Bell className="w-3.5 h-3.5" />
            <span>{locale === 'bn' ? 'অফিসিয়াল নোটিশ বোর্ড' : 'Institutional Notice Board'}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-navy-950 tracking-tight">
            {locale === 'bn' ? 'নোটিশ ও বিজ্ঞপ্তি ব্যবস্থাপনা' : 'Notice Board Management'}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {locale === 'bn'
              ? 'শিক্ষার্থী, অভিভাবক ও শিক্ষকদের জন্য প্রাতিষ্ঠানিক নোটিশ প্রকাশ ও পরিচালনা করুন'
              : 'Create, publish, and manage official notices for students, parents, and faculty'}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddOpen(true)}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-2xl text-xs font-bold shadow-md shadow-blue-600/30 transition-all hover:scale-105 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{locale === 'bn' ? 'নতুন নোটিশ প্রকাশ করুন' : 'Publish New Notice'}</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{locale === 'bn' ? 'নতুন নোটিশ সফলভাবে প্রকাশিত হয়েছে!' : 'New notice published successfully!'}</span>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={locale === 'bn' ? 'নোটিশের শিরোনাম দিয়ে খুঁজুন...' : 'Search notices by title...'}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-500"
          >
            <option value="ALL">{locale === 'bn' ? 'সকল নোটিশ' : 'All Categories'}</option>
            <option value="ACADEMIC">{locale === 'bn' ? 'একাডেমিক' : 'Academic'}</option>
            <option value="EXAM">{locale === 'bn' ? 'পরীক্ষা' : 'Examinations'}</option>
            <option value="HOLIDAY">{locale === 'bn' ? 'ছুটি' : 'Holiday'}</option>
            <option value="GENERAL">{locale === 'bn' ? 'সাধারণ' : 'General'}</option>
          </select>
        </div>
      </div>

      {/* Notices Grid / List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredNotices.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-slate-200/80">
            <Bell className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-bold text-slate-500">
              {locale === 'bn' ? 'কোনো নোটিশ পাওয়া যায়নি।' : 'No notices match your criteria.'}
            </p>
          </div>
        ) : (
          filteredNotices.map((nt) => {
            const badge = getCategoryBadge(nt.category);
            return (
              <div
                key={nt.id}
                className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${badge.color}`}>
                      {locale === 'bn' ? badge.labelBn : badge.labelEn}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>{formatDate(new Date(nt.publishedAt), locale)}</span>
                    </span>
                  </div>

                  <h3 className="font-extrabold text-navy-950 text-sm leading-snug">
                    {locale === 'bn' ? nt.titleBn : nt.titleEn}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {locale === 'bn' ? nt.contentBn : nt.contentEn}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setSelectedNotice(nt)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{locale === 'bn' ? 'সম্পূর্ণ নোটিশ' : 'Read Full'}</span>
                  </button>

                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    {nt.status}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal: View Full Notice */}
      {selectedNotice && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase ${getCategoryBadge(selectedNotice.category).color}`}>
                {locale === 'bn' ? getCategoryBadge(selectedNotice.category).labelBn : getCategoryBadge(selectedNotice.category).labelEn}
              </span>
              <button
                type="button"
                onClick={() => setSelectedNotice(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <p className="text-[11px] text-slate-400 font-mono mb-1">
                {formatDate(new Date(selectedNotice.publishedAt), locale)}
              </p>
              <h2 className="text-base sm:text-lg font-extrabold text-navy-950 leading-snug">
                {locale === 'bn' ? selectedNotice.titleBn : selectedNotice.titleEn}
              </h2>
              <div className="mt-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 leading-relaxed whitespace-pre-wrap">
                {locale === 'bn' ? selectedNotice.contentBn : selectedNotice.contentEn}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setSelectedNotice(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs"
              >
                {locale === 'bn' ? 'বন্ধ করুন' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Publish New Notice */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-navy-950 text-base">
                {locale === 'bn' ? 'নতুন প্রাতিষ্ঠানিক নোটিশ প্রকাশ' : 'Publish Institutional Notice'}
              </h3>
              <button
                type="button"
                onClick={() => setIsAddOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleCreateNotice} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {locale === 'bn' ? 'নোটিশের শিরোনাম (বাংলা)' : 'Notice Title (Bangla)'} *
                </label>
                <input
                  type="text"
                  required
                  value={titleBn}
                  onChange={(e) => setTitleBn(e.target.value)}
                  placeholder="যেমন: পবিত্র ঈদে মিলাদুন্নবী উপলক্ষে প্রতিষ্ঠান বন্ধের বিজ্ঞপ্তি"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {locale === 'bn' ? 'নোটিশের শিরোনাম (English)' : 'Notice Title (English)'} *
                </label>
                <input
                  type="text"
                  required
                  value={titleEn}
                  onChange={(e) => setTitleEn(e.target.value)}
                  placeholder="e.g. Official Institutional Holiday Notice"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {locale === 'bn' ? 'ক্যাটাগরি' : 'Category'}
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-semibold"
                  >
                    <option value="ACADEMIC">একাডেমিক (Academic)</option>
                    <option value="EXAM">পরীক্ষা (Exam)</option>
                    <option value="HOLIDAY">ছুটি (Holiday)</option>
                    <option value="GENERAL">সাধারণ (General)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {locale === 'bn' ? 'অগ্রাধিকার' : 'Priority'}
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-semibold"
                  >
                    <option value="NORMAL">সাধারণ (Normal)</option>
                    <option value="HIGH">জরুরি (Important)</option>
                    <option value="URGENT">অতি জরুরি (Urgent)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {locale === 'bn' ? 'নোটিশের পূর্ণাঙ্গ বিবরণ (বাংলা)' : 'Notice Content (Bangla)'} *
                </label>
                <textarea
                  rows={4}
                  required
                  value={contentBn}
                  onChange={(e) => setContentBn(e.target.value)}
                  placeholder="নোটিশের বিস্তারিত বক্তব্য..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3"
                ></textarea>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {locale === 'bn' ? 'নোটিশের পূর্ণাঙ্গ বিবরণ (English)' : 'Notice Content (English)'} *
                </label>
                <textarea
                  rows={3}
                  required
                  value={contentEn}
                  onChange={(e) => setContentEn(e.target.value)}
                  placeholder="Notice detailed description in English..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3"
                ></textarea>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold"
                >
                  {locale === 'bn' ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center gap-2 shadow-md shadow-blue-600/30 disabled:opacity-50"
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span>{loading ? 'Publishing...' : locale === 'bn' ? 'নোটিশ প্রকাশ করুন' : 'Publish Notice'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

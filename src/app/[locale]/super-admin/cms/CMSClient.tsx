'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  FileText,
  Calendar,
  Plus,
  X,
  CheckCircle2,
  Bell,
  MapPin,
  Trash2,
  Eye,
} from 'lucide-react';
import NoticePadModal from '@/components/ui/NoticePadModal';

export default function CMSClient({
  initialNotices,
  initialEvents,
}: {
  initialNotices: any[];
  initialEvents: any[];
}) {
  const { locale, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'notices' | 'events'>('notices');
  const [notices, setNotices] = useState(initialNotices);
  const [events, setEvents] = useState(initialEvents);

  const [isAddNoticeOpen, setIsAddNoticeOpen] = useState(false);
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [previewNotice, setPreviewNotice] = useState<any | null>(null);

  // Form Notice
  const [titleBn, setTitleBn] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [contentBn, setContentBn] = useState('');
  const [contentEn, setContentEn] = useState('');
  const [category, setCategory] = useState('GENERAL');
  const [isPinned, setIsPinned] = useState(false);

  // Form Event
  const [eventTitleBn, setEventTitleBn] = useState('');
  const [eventTitleEn, setEventTitleEn] = useState('');
  const [eventLocationBn, setEventLocationBn] = useState('কলেজ অডিটরিয়াম');
  const [eventLocationEn, setEventLocationEn] = useState('College Auditorium');
  const [eventDate, setEventDate] = useState('2026-11-20');

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleCreateNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
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
          isPinned,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setNotices([data.notice, ...notices]);
        setIsAddNoticeOpen(false);
        setTitleBn('');
        setTitleEn('');
        setContentBn('');
        setContentEn('');
        setSuccessMsg(locale === 'bn' ? 'বিজ্ঞপ্তি সফলভাবে প্রকাশিত হয়েছে!' : 'Notice published successfully!');
        setTimeout(() => setSuccessMsg(''), 4000);
      } else {
        alert(data.error || 'Failed to publish');
      }
    } catch {
      alert('Network error');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/admin/events/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titleBn: eventTitleBn,
          titleEn: eventTitleEn,
          locationBn: eventLocationBn,
          locationEn: eventLocationEn,
          startDate: eventDate,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setEvents([data.event, ...events]);
        setIsAddEventOpen(false);
        setEventTitleBn('');
        setEventTitleEn('');
        setSuccessMsg(locale === 'bn' ? 'ইভেন্ট সফলভাবে তৈরি হয়েছে!' : 'Event created successfully!');
        setTimeout(() => setSuccessMsg(''), 4000);
      } else {
        alert(data.error || 'Failed to create event');
      }
    } catch {
      alert('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {successMsg && (
        <div className="p-4 bg-emerald-600 text-white rounded-2xl shadow-md text-xs font-bold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <span>{successMsg}</span>
          </div>
          <button onClick={() => setSuccessMsg('')}>
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">
            <FileText className="w-4 h-4" />
            <span>{locale === 'bn' ? 'পাবলিক পোর্টাল সিএমএস' : 'Public Portal CMS'}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {locale === 'bn' ? 'ওয়েবসাইট কন্টেন্ট ও নোটিশ নিয়ন্ত্রণ' : 'Website CMS & Announcement Manager'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {locale === 'bn'
              ? 'অফিশিয়াল নোটিশ প্রকাশ, আসন্ন ইভেন্ট ও পাবলিক পোর্টালের বিষয়বস্তু পরিচালনা'
              : 'Publish circulars, schedule academic events, and maintain public web updates'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === 'notices' ? (
            <button
              onClick={() => setIsAddNoticeOpen(true)}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-sm transition-all hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>{locale === 'bn' ? 'নতুন নোটিশ জারি করুন' : 'Publish Notice'}</span>
            </button>
          ) : (
            <button
              onClick={() => setIsAddEventOpen(true)}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-sm transition-all hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>{locale === 'bn' ? 'নতুন ইভেন্ট যোগ করুন' : 'Schedule Event'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('notices')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'notices'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>{locale === 'bn' ? `নোটিশ তালিকা (${notices.length})` : `Notices (${notices.length})`}</span>
        </button>

        <button
          onClick={() => setActiveTab('events')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'events'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>{locale === 'bn' ? `ইভেন্টস (${events.length})` : `Events (${events.length})`}</span>
        </button>
      </div>

      {/* Notices Table */}
      {activeTab === 'notices' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">{locale === 'bn' ? 'তারিখ' : 'Date'}</th>
                  <th className="py-3 px-4">{locale === 'bn' ? 'শিরোনাম (বাংলা / English)' : 'Title (Bn / En)'}</th>
                  <th className="py-3 px-4">{locale === 'bn' ? 'ক্যাটাগরি' : 'Category'}</th>
                  <th className="py-3 px-4">{locale === 'bn' ? 'পিন' : 'Pin'}</th>
                  <th className="py-3 px-4">{locale === 'bn' ? 'স্ট্যাটাস' : 'Status'}</th>
                  <th className="py-3 px-4 text-right">{locale === 'bn' ? 'প্রিভিউ' : 'Preview'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {notices.map((n) => (
                  <tr key={n.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                      {new Date(n.publishedAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 max-w-md">
                      <p className="font-bold text-slate-900 line-clamp-1">{n.titleBn}</p>
                      <p className="text-[11px] text-slate-500 line-clamp-1">{n.titleEn}</p>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                        {n.category}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {n.isPinned ? (
                        <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                          PINNED
                        </span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        {n.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => setPreviewNotice(n)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{locale === 'bn' ? 'দেখুন' : 'View'}</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Events Table */}
      {activeTab === 'events' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">{locale === 'bn' ? 'তারিখ' : 'Date'}</th>
                  <th className="py-3 px-4">{locale === 'bn' ? 'ইভেন্টের নাম' : 'Event Title'}</th>
                  <th className="py-3 px-4">{locale === 'bn' ? 'স্থান' : 'Location'}</th>
                  <th className="py-3 px-4">{locale === 'bn' ? 'পাবলিক' : 'Visibility'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {events.map((e) => (
                  <tr key={e.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                      {new Date(e.startDate).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-bold text-slate-900">{e.titleBn}</p>
                      <p className="text-[11px] text-slate-500">{e.titleEn}</p>
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-700">
                      {e.locationBn} ({e.locationEn})
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        PUBLIC
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Notice Modal */}
      {isAddNoticeOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-base">
                {locale === 'bn' ? 'অফিশিয়াল প্রাতিষ্ঠানিক বিজ্ঞপ্তি প্রকাশ' : 'Publish Institutional Circular'}
              </h3>
              <button
                onClick={() => setIsAddNoticeOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateNotice} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {locale === 'bn' ? 'বিজ্ঞপ্তির শিরোনাম (বাংলা)' : 'Notice Title (Bangla)'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={titleBn}
                    onChange={(e) => setTitleBn(e.target.value)}
                    placeholder="e.g. পবিত্র ঈদুল ফিতর উপলক্ষে বিদ্যালয় ছুটির বিজ্ঞপ্তি"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 font-semibold"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {locale === 'bn' ? 'বিজ্ঞপ্তির শিরোনাম (English)' : 'Notice Title (English)'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={titleEn}
                    onChange={(e) => setTitleEn(e.target.value)}
                    placeholder="e.g. School Holiday Notice on Holy Eid-ul-Fitr"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {locale === 'bn' ? 'ক্যাটাগরি' : 'Category'}
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 font-semibold"
                  >
                    <option value="GENERAL">সাধারণ বিজ্ঞপ্তি (General)</option>
                    <option value="ADMISSION">ভর্তি বিজ্ঞপ্তি (Admission)</option>
                    <option value="EXAM">পরীক্ষা সংক্রান্ত (Examination)</option>
                    <option value="HOLIDAY">ছুটির নোটিশ (Holiday)</option>
                    <option value="ACADEMIC">একাডেমিক (Academic)</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="pinToggle"
                    checked={isPinned}
                    onChange={(e) => setIsPinned(e.target.checked)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="pinToggle" className="font-bold text-slate-700 cursor-pointer">
                    {locale === 'bn' ? 'নোটিশটি পিন করে রাখুন' : 'Pin to Top of Notice Board'}
                  </label>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {locale === 'bn' ? 'বিজ্ঞপ্তির বিস্তারিত বিবরণ (বাংলা)' : 'Notice Content Body (Bangla)'} *
                </label>
                <textarea
                  rows={4}
                  required
                  value={contentBn}
                  onChange={(e) => setContentBn(e.target.value)}
                  placeholder="মিরসরাই স্কুল এন্ড কলেজের সকল শিক্ষার্থী, শিক্ষক ও অভিভাবকদের জানানো যাচ্ছে যে..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {locale === 'bn' ? 'বিজ্ঞপ্তির বিস্তারিত বিবরণ (English)' : 'Notice Content Body (English)'} *
                </label>
                <textarea
                  rows={4}
                  required
                  value={contentEn}
                  onChange={(e) => setContentEn(e.target.value)}
                  placeholder="This is to notify all students, guardians, and faculty of Mirsharai School and College that..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddNoticeOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors"
                >
                  {locale === 'bn' ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-md shadow-blue-600/30 disabled:opacity-50"
                >
                  {loading ? 'Publishing...' : locale === 'bn' ? 'নোটিশ জারি করুন' : 'Publish Circular'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Event Modal */}
      {isAddEventOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-base">
                {locale === 'bn' ? 'নতুন প্রাতিষ্ঠানিক ইভেন্ট যুক্ত করুন' : 'Schedule Campus Event'}
              </h3>
              <button
                onClick={() => setIsAddEventOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateEvent} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {locale === 'bn' ? 'ইভেন্টের নাম (বাংলা)' : 'Event Title (Bangla)'} *
                </label>
                <input
                  type="text"
                  required
                  value={eventTitleBn}
                  onChange={(e) => setEventTitleBn(e.target.value)}
                  placeholder="e.g. বার্ষিক বিজ্ঞান মেলা ও উদ্ভাবনী প্রদর্শনী ২০২৬"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 font-semibold"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {locale === 'bn' ? 'ইভেন্টের নাম (English)' : 'Event Title (English)'} *
                </label>
                <input
                  type="text"
                  required
                  value={eventTitleEn}
                  onChange={(e) => setEventTitleEn(e.target.value)}
                  placeholder="e.g. Science Fair & Innovation Expo 2026"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 font-semibold"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {locale === 'bn' ? 'অনুষ্ঠানের তারিখ' : 'Event Date'} *
                </label>
                <input
                  type="date"
                  required
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {locale === 'bn' ? 'স্থান (বাংলা)' : 'Location (Bn)'}
                  </label>
                  <input
                    type="text"
                    value={eventLocationBn}
                    onChange={(e) => setEventLocationBn(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {locale === 'bn' ? 'স্থান (English)' : 'Location (En)'}
                  </label>
                  <input
                    type="text"
                    value={eventLocationEn}
                    onChange={(e) => setEventLocationEn(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddEventOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors"
                >
                  {locale === 'bn' ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-md shadow-blue-600/30 disabled:opacity-50"
                >
                  {loading ? 'Creating...' : locale === 'bn' ? 'ইভেন্ট সংরক্ষণ করুন' : 'Schedule Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Notice Letterhead Modal Preview */}
      {previewNotice && (
        <NoticePadModal
          notice={previewNotice}
          onClose={() => setPreviewNotice(null)}
        />
      )}
    </div>
  );
}

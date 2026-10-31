'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { formatDate } from '@/lib/utils';
import { Bell, Download, Calendar, Filter, Eye, ArrowRight, Search } from 'lucide-react';
import NoticePadModal from '@/components/ui/NoticePadModal';

interface NoticeItem {
  id: string;
  titleBn: string;
  titleEn: string;
  contentBn: string;
  contentEn: string;
  category: string;
  isPinned: boolean;
  publishedAt: string | Date;
}

interface NoticeBoardClientProps {
  initialNotices: NoticeItem[];
  selectedCategory?: string;
}

export default function NoticeBoardClient({
  initialNotices,
  selectedCategory = '',
}: NoticeBoardClientProps) {
  const { locale, t } = useLanguage();
  const [selectedNotice, setSelectedNotice] = useState<NoticeItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { code: '', labelBn: 'সকল নোটিশ', labelEn: 'All Notices' },
    { code: 'ADMISSION', labelBn: 'ভর্তি বিজ্ঞপ্তি', labelEn: 'Admission' },
    { code: 'EXAM', labelBn: 'পরীক্ষা সংক্রান্ত', labelEn: 'Examinations' },
    { code: 'HOLIDAY', labelBn: 'ছুটির নোটিশ', labelEn: 'Holidays' },
    { code: 'ACADEMIC', labelBn: 'একাডেমিক', labelEn: 'Academic' },
    { code: 'GENERAL', labelBn: 'সাধারণ বিজ্ঞপ্তি', labelEn: 'General' },
  ];

  const filteredNotices = initialNotices.filter((n) => {
    const matchesSearch =
      !searchQuery ||
      n.titleBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.contentBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.contentEn.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Category Pills & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.code;
            return (
              <Link
                key={cat.code}
                href={cat.code ? `/${locale}/notices?category=${cat.code}` : `/${locale}/notices`}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white font-bold shadow-sm'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {locale === 'bn' ? cat.labelBn : cat.labelEn}
              </Link>
            );
          })}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={locale === 'bn' ? 'বিজ্ঞপ্তি খুঁজুন...' : 'Search circulars...'}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3.5 py-1.5 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Notices List */}
      <div className="space-y-4">
        {filteredNotices.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 text-slate-400 text-xs">
            {locale === 'bn' ? 'কোনো নোটিশ পাওয়া যায়নি।' : 'No notices found for this category.'}
          </div>
        ) : (
          filteredNotices.map((n) => (
            <div
              key={n.id}
              className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group cursor-pointer"
              onClick={() => setSelectedNotice(n)}
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-700 border border-blue-100 flex flex-col items-center justify-center flex-shrink-0 text-sm font-extrabold leading-tight group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <span>{new Date(n.publishedAt).getDate()}</span>
                  <span className="text-[10px] font-bold uppercase">
                    {new Date(n.publishedAt).toLocaleString('en', { month: 'short' })}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
                      {n.category}
                    </span>
                    {n.isPinned && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold">
                        PINNED
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-navy-900 group-hover:text-blue-600 transition-colors">
                    {locale === 'bn' ? n.titleBn : n.titleEn}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2 max-w-3xl">
                    {locale === 'bn' ? n.contentBn : n.contentEn}
                  </p>
                </div>
              </div>

              <div className="sm:self-center flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  onClick={() => setSelectedNotice(n)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white rounded-xl text-xs font-bold transition-all whitespace-nowrap shadow-sm"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{locale === 'bn' ? 'বিস্তারিত দেখুন' : 'View Notice'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedNotice(n)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all whitespace-nowrap shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{locale === 'bn' ? 'ডাউনলোড PDF' : 'Download PDF'}</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Official Notice Letterhead Modal */}
      {selectedNotice && (
        <NoticePadModal
          notice={selectedNotice}
          onClose={() => setSelectedNotice(null)}
        />
      )}
    </div>
  );
}

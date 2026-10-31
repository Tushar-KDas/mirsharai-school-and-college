'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Bell, ArrowRight } from 'lucide-react';

export default function AnnouncementBar() {
  const { locale, t } = useLanguage();

  return (
    <div className="bg-gradient-to-r from-navy-900 via-primary-navy to-navy-900 text-white text-xs sm:text-sm py-2 px-4 shadow-sm border-b border-blue-900/40">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="inline-flex items-center gap-1 bg-blue-500/20 text-blue-200 border border-blue-400/30 px-2 py-0.5 rounded-full text-[11px] font-semibold animate-pulse">
            <Bell className="w-3 h-3 text-gold-400 text-amber-400" />
            {locale === 'bn' ? 'জরুরি বিজ্ঞপ্তি' : 'Latest Alert'}
          </span>
          <p className="truncate text-slate-200 font-medium text-xs sm:text-sm">
            {t.hero.announcement}
          </p>
        </div>

        <Link
          href={`/${locale}/admission/apply`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors whitespace-nowrap ml-auto"
        >
          {locale === 'bn' ? 'অনলাইনে আবেদন করুন' : 'Apply Now'}
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}

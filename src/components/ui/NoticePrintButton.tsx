'use client';

import React from 'react';
import { Printer } from 'lucide-react';
import { Locale } from '@/lib/i18n';

export default function NoticePrintButton({ locale }: { locale: Locale }) {
  return (
    <button
      onClick={() => window.print()}
      className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all hover:scale-105"
    >
      <Printer className="w-4 h-4" />
      <span>{locale === 'bn' ? 'প্রিন্ট / PDF সংরক্ষণ করুন' : 'Print / Save as PDF'}</span>
    </button>
  );
}

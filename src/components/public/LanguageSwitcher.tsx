'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { locale, switchLanguage } = useLanguage();

  return (
    <div className={`inline-flex items-center gap-1 bg-white/10 backdrop-blur-sm p-1 rounded-full border border-slate-200/40 text-xs font-medium ${className}`}>
      <Globe className="w-3.5 h-3.5 text-blue-600 ml-1.5" />
      <button
        type="button"
        onClick={() => switchLanguage('bn')}
        className={`px-2.5 py-1 rounded-full transition-all duration-200 ${
          locale === 'bn'
            ? 'bg-blue-600 text-white font-semibold shadow-sm'
            : 'text-slate-700 hover:text-blue-600 hover:bg-slate-100'
        }`}
      >
        বাংলা
      </button>
      <span className="text-slate-400 select-none">|</span>
      <button
        type="button"
        onClick={() => switchLanguage('en')}
        className={`px-2.5 py-1 rounded-full transition-all duration-200 ${
          locale === 'en'
            ? 'bg-blue-600 text-white font-semibold shadow-sm'
            : 'text-slate-700 hover:text-blue-600 hover:bg-slate-100'
        }`}
      >
        English
      </button>
    </div>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { formatDate } from '@/lib/utils';
import { Printer, X, Download, ShieldCheck, FileText, ExternalLink } from 'lucide-react';

interface NoticePadModalProps {
  notice: {
    id: string;
    titleBn: string;
    titleEn: string;
    contentBn: string;
    contentEn: string;
    category: string;
    publishedAt: string | Date;
  };
  onClose: () => void;
}

export default function NoticePadModal({ notice, onClose }: NoticePadModalProps) {
  const { locale, t } = useLanguage();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 my-6">
        {/* Top Control Bar (Hidden when printing) */}
        <div className="print:hidden bg-slate-100 border-b border-slate-200 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
            <FileText className="w-4 h-4 text-blue-600" />
            <span>{locale === 'bn' ? 'অফিশিয়াল বিজ্ঞপ্তি প্রিভিউ' : 'Official Circular Preview'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={`/${locale}/notices/${notice.id}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-semibold transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{locale === 'bn' ? 'আলাদা পেজে দেখুন' : 'Full Page'}</span>
            </Link>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-sm transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{locale === 'bn' ? 'প্রিন্ট / PDF ডাউনলোড' : 'Print / Download PDF'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Official Notice Letterhead / Pad */}
        <div className="p-8 sm:p-12 space-y-6 text-slate-800 bg-white" id="printable-notice">
          {/* Institutional Header */}
          <div className="text-center border-b-2 border-slate-900 pb-5 space-y-1">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-16 h-16 relative flex-shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="School Logo"
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <div className="text-left">
                <h2 className="text-xl sm:text-2xl font-extrabold text-navy-900 tracking-tight leading-tight">
                  {locale === 'bn' ? 'মিরসরাই স্কুল এন্ড কলেজ' : 'Mirsharai School and College'}
                </h2>
                <p className="text-xs text-slate-600 font-semibold">
                  {locale === 'bn' ? 'মিরসরাই, চট্টগ্রাম, বাংলাদেশ' : 'Mirsharai, Chattogram, Bangladesh'}
                </p>
                <p className="text-[11px] text-slate-500 font-mono">
                  {t.institution.eiin} | {t.institution.collegeCode} | {t.institution.estd}
                </p>
              </div>
            </div>

            <div className="inline-block bg-slate-900 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider mt-2">
              {locale === 'bn' ? 'জরুরি প্রাতিষ্ঠানিক বিজ্ঞপ্তি' : 'OFFICIAL CIRCULAR'}
            </div>
          </div>

          {/* Memo & Date Meta */}
          <div className="flex justify-between items-center text-xs font-medium text-slate-600 border-b border-slate-200 pb-3">
            <div>
              <span>{locale === 'bn' ? 'স্মারক নং: ' : 'Memo Ref: '}</span>
              <span className="font-mono font-bold text-slate-900">MSC/NOT/2026/0{notice.id.slice(-3)}</span>
            </div>
            <div>
              <span>{locale === 'bn' ? 'তারিখ: ' : 'Date: '}</span>
              <span className="font-semibold text-slate-900">{formatDate(notice.publishedAt, locale)}</span>
            </div>
          </div>

          {/* Subject */}
          <div className="pt-2">
            <h3 className="text-base sm:text-lg font-bold text-navy-900 leading-snug">
              <span className="text-slate-500 mr-2">{locale === 'bn' ? 'বিষয়:' : 'Subject:'}</span>
              {locale === 'bn' ? notice.titleBn : notice.titleEn}
            </h3>
          </div>

          {/* Body Content */}
          <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-4 pt-2 whitespace-pre-line text-justify">
            <p className="font-medium">
              {locale === 'bn' ? notice.contentBn : notice.contentEn}
            </p>
            {locale === 'bn' && notice.contentEn && (
              <div className="mt-4 pt-4 border-t border-slate-100 text-slate-500 text-xs italic">
                <p className="font-semibold text-slate-600 not-italic mb-1">English Summary:</p>
                <p>{notice.contentEn}</p>
              </div>
            )}
            {locale === 'en' && notice.contentBn && (
              <div className="mt-4 pt-4 border-t border-slate-100 text-slate-500 text-xs">
                <p className="font-semibold text-slate-600 mb-1">বাংলা সারসংক্ষেপ:</p>
                <p>{notice.contentBn}</p>
              </div>
            )}
          </div>

          {/* Signature & Official Seal */}
          <div className="pt-12 flex justify-between items-end text-xs">
            {/* Round Seal Stamp */}
            <div className="w-24 h-24 border-2 border-blue-900/40 rounded-full flex flex-col items-center justify-center p-2 text-center text-[9px] font-bold text-blue-900 rotate-[-8deg]">
              <ShieldCheck className="w-5 h-5 text-blue-800 mb-0.5" />
              <span>OFFICIAL SEAL</span>
              <span className="text-[7px] font-mono">MIRSHARAI COLLEGE</span>
            </div>

            {/* Principal Signature */}
            <div className="text-center space-y-1">
              <div className="w-44 border-b border-slate-400 pb-1">
                <span className="font-serif italic font-bold text-slate-800 text-base">Md. Kamrul Hasan</span>
              </div>
              <p className="text-xs font-bold text-slate-900">
                {locale === 'bn' ? 'প্রফেসর মোঃ কামরুল হাসান' : 'Prof. Md. Kamrul Hasan'}
              </p>
              <p className="text-[11px] font-semibold text-slate-600">
                {locale === 'bn' ? 'অধ্যক্ষ' : 'Principal'}
              </p>
              <p className="text-[10px] text-slate-500">
                {locale === 'bn' ? 'মিরসরাই স্কুল এন্ড কলেজ' : 'Mirsharai School and College'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

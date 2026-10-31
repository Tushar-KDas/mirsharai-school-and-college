import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import AnnouncementBar from '@/components/public/AnnouncementBar';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import prisma from '@/lib/prisma';
import { Locale, isValidLocale, defaultLocale } from '@/lib/i18n';
import { formatDate } from '@/lib/utils';
import { ArrowLeft, Printer, Share2, ShieldCheck } from 'lucide-react';
import NoticePrintButton from '@/components/ui/NoticePrintButton';

export default async function NoticeDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const resolvedParams = await params;
  const locale: Locale = isValidLocale(resolvedParams.locale)
    ? (resolvedParams.locale as Locale)
    : defaultLocale;
  const { id } = resolvedParams;

  const notice = await prisma.notice.findUnique({
    where: { id },
  });

  if (!notice) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <div className="print:hidden">
        <AnnouncementBar />
        <Navbar />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 w-full flex-1">
        {/* Navigation & Action Bar (Hidden in Print) */}
        <div className="print:hidden flex items-center justify-between mb-6 bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
          <Link
            href={`/${locale}/notices`}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{locale === 'bn' ? 'সকল বিজ্ঞপ্তিতে ফিরুন' : 'Back to All Notices'}</span>
          </Link>

          <NoticePrintButton locale={locale} />
        </div>

        {/* Official Institutional Notice Pad */}
        <div className="bg-white rounded-3xl shadow-md border border-slate-200 p-8 sm:p-14 space-y-6 text-slate-800" id="printable-notice-page">
          {/* Official Letterhead Header */}
          <div className="text-center border-b-2 border-slate-900 pb-6 space-y-2">
            <div className="flex items-center justify-center gap-4 mb-2">
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
                <h1 className="text-xl sm:text-2xl font-extrabold text-navy-900 tracking-tight leading-tight">
                  {locale === 'bn' ? 'মিরসরাই স্কুল এন্ড কলেজ' : 'Mirsharai School and College'}
                </h1>
                <p className="text-xs text-slate-600 font-semibold">
                  {locale === 'bn' ? 'মিরসরাই, চট্টগ্রাম, বাংলাদেশ' : 'Mirsharai, Chattogram, Bangladesh'}
                </p>
                <p className="text-[11px] text-slate-500 font-mono">
                  EIIN: 104523 | College Code: 3201 | Estd: 1972
                </p>
              </div>
            </div>

            <div className="inline-block bg-navy-950 text-white px-5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mt-2">
              {locale === 'bn' ? 'জরুরি প্রাতিষ্ঠানিক সার্কুলার / বিজ্ঞপ্তি' : 'OFFICIAL INSTITUTIONAL CIRCULAR'}
            </div>
          </div>

          {/* Memo & Date Meta */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-medium text-slate-600 border-b border-slate-200 pb-3 gap-2">
            <div>
              <span>{locale === 'bn' ? 'স্মারক নং: ' : 'Memo Ref: '}</span>
              <span className="font-mono font-bold text-slate-900">MSC/CIR/2026/{notice.id.slice(-4).toUpperCase()}</span>
            </div>
            <div>
              <span>{locale === 'bn' ? 'প্রকাশের তারিখ: ' : 'Published Date: '}</span>
              <span className="font-semibold text-slate-900">{formatDate(notice.publishedAt, locale)}</span>
            </div>
          </div>

          {/* Category Tag */}
          <div>
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
              {notice.category}
            </span>
          </div>

          {/* Subject Line */}
          <div className="py-2 border-b border-slate-100">
            <h2 className="text-base sm:text-lg font-bold text-navy-900 leading-snug">
              <span className="text-slate-500 mr-2">{locale === 'bn' ? 'বিষয়:' : 'Subject:'}</span>
              {locale === 'bn' ? notice.titleBn : notice.titleEn}
            </h2>
          </div>

          {/* Notice Main Content */}
          <div className="text-sm leading-relaxed text-slate-700 space-y-4 whitespace-pre-line py-2 min-h-[160px]">
            {locale === 'bn' ? notice.contentBn : notice.contentEn}
          </div>

          {/* Signatures & Seal Section */}
          <div className="pt-10 flex items-end justify-between border-t border-slate-200 text-xs">
            {/* Official Seal Stamp */}
            <div className="flex items-center gap-3">
              <div className="w-20 h-20 rounded-full border-2 border-dashed border-blue-600 flex flex-col items-center justify-center text-center p-1 text-blue-700 rotate-[-8deg] opacity-85">
                <span className="text-[9px] font-black uppercase leading-tight">Mirsharai</span>
                <span className="text-[8px] font-bold">School & College</span>
                <ShieldCheck className="w-3.5 h-3.5 my-0.5 text-blue-600" />
                <span className="text-[7px] font-mono">SEAL STAMP</span>
              </div>
            </div>

            {/* Principal Signature */}
            <div className="text-right space-y-1">
              <div className="font-serif italic text-base sm:text-lg text-slate-800 tracking-wide pr-2">
                Prof. Dr. Mohammad Rafiqul Islam
              </div>
              <div className="w-36 h-0.5 bg-slate-400 ml-auto" />
              <p className="font-bold text-slate-900">
                {locale === 'bn' ? 'অধ্যক্ষ' : 'Principal'}
              </p>
              <p className="text-[11px] text-slate-500">
                {locale === 'bn' ? 'মিরসরাই স্কুল এন্ড কলেজ' : 'Mirsharai School and College'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}

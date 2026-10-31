import React from 'react';
import Link from 'next/link';
import AnnouncementBar from '@/components/public/AnnouncementBar';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import { Locale, isValidLocale, defaultLocale } from '@/lib/i18n';
import { ArrowRight, CheckCircle, FileText, Calendar, HelpCircle } from 'lucide-react';

export default async function AdmissionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale: Locale = isValidLocale(resolvedParams.locale)
    ? (resolvedParams.locale as Locale)
    : defaultLocale;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <AnnouncementBar />
      <Navbar />

      <div className="bg-navy-950 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              {locale === 'bn' ? 'ভর্তি তথ্য ও নির্দেশিকা ২০২৬' : 'Admission Guidelines 2026'}
            </h1>
            <p className="text-xs sm:text-sm text-blue-200 mt-2">
              {locale === 'bn' ? '১ম শ্রেণি থেকে দ্বাদশ শ্রেণি (কলেজ) পর্যন্ত ভর্তি কার্যক্রম' : 'Classes 1 to 12 admission criteria, documents, and online submission'}
            </p>
          </div>
          <Link
            href={`/${locale}/admission/apply`}
            className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all self-start sm:self-auto flex items-center gap-2"
          >
            <span>{locale === 'bn' ? 'অনলাইন আবেদন করুন' : 'Apply Online Now'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
            <h3 className="text-base font-bold text-navy-900 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              <span>{locale === 'bn' ? 'যোগ্যতা ও শর্তাবলি' : 'Eligibility Criteria'}</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {locale === 'bn'
                ? '১ম শ্রেণিতে ভর্তির ক্ষেত্রে শিক্ষার্থীর বয়স ন্যূনতম ৬ বছর হতে হবে। একাদশ শ্রেণিতে বিজ্ঞান বিভাগে ন্যূনতম জিপিএ ৪.৫০, ব্যবসায় শিক্ষা ও মানবিকে জিপিএ ৩.০০ প্রযোজ্য।'
                : 'For Class 1 admission, the child must be at least 6 years of age. For Class 11 college admission, minimum SSC GPA 4.50 for Science and GPA 3.00 for Commerce/Humanities is required.'}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
            <h3 className="text-base font-bold text-navy-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <span>{locale === 'bn' ? 'প্রয়োজনীয় কাগজপত্র' : 'Required Documents'}</span>
            </h3>
            <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
              <li>{locale === 'bn' ? 'অনলাইন জন্ম নিবন্ধন সনদের কপি' : 'Digital Birth Certificate copy'}</li>
              <li>{locale === 'bn' ? 'পূর্ববর্তী ক্লাসের ট্রান্সক্রিপ্ট / প্রশংসাপত্র' : 'Previous School Report Card'}</li>
              <li>{locale === 'bn' ? 'পাসপোর্ট সাইজের রঙিন ছবি (২ কপি)' : 'Passport size photographs (2 copies)'}</li>
              <li>{locale === 'bn' ? 'পিতামাতা / অভিভাবকের এনআইডি কপি' : 'Parents / Guardian NID copy'}</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
            <h3 className="text-base font-bold text-navy-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-500" />
              <span>{locale === 'bn' ? 'ভর্তি সময়সূচি' : 'Important Dates'}</span>
            </h3>
            <div className="space-y-2 text-xs text-slate-600">
              <p><span className="font-semibold text-slate-900">{locale === 'bn' ? 'আবেদন শুরু:' : 'Application Opens:'}</span> 15 October 2026</p>
              <p><span className="font-semibold text-slate-900">{locale === 'bn' ? 'আবেদনের শেষ তারিখ:' : 'Deadline:'}</span> 20 November 2026</p>
              <p><span className="font-semibold text-slate-900">{locale === 'bn' ? 'ক্লাস শুরু:' : 'Session Starts:'}</span> 01 January 2027</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

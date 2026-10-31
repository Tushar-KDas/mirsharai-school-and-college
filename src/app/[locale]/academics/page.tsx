import React from 'react';
import Link from 'next/link';
import AnnouncementBar from '@/components/public/AnnouncementBar';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import { Locale, isValidLocale, defaultLocale } from '@/lib/i18n';
import { BookOpen, Layers, CheckCircle2, ArrowRight } from 'lucide-react';

export default async function AcademicsPage({
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
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {locale === 'bn' ? 'একাডেমিক কাঠামো ও পাঠ্যক্রম' : 'Academic Structure & Curriculum'}
          </h1>
          <p className="text-xs sm:text-sm text-blue-200 mt-2">
            {locale === 'bn' ? '১ম শ্রেণি থেকে দ্বাদশ শ্রেণি (কলেজ) পর্যন্ত শিক্ষাক্রম' : 'National curriculum from Primary (Class 1) to Higher Secondary (Class 12)'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Level 1: Primary */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
            <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
              {locale === 'bn' ? 'প্রাথমিক স্তর' : 'Primary Wing'}
            </span>
            <h3 className="text-lg font-bold text-navy-900">
              {locale === 'bn' ? '১ম থেকে ৫ম শ্রেণি' : 'Classes 1 to 5'}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {locale === 'bn'
                ? 'মৌলিক সাক্ষরতা, গণিত, নীতিশিক্ষা ও খেলাধুলার মাধ্যমে আনন্দময় শিক্ষা।'
                : 'Fundamental literacy, numeracy, creative discovery, and early character development.'}
            </p>
          </div>

          {/* Level 2: Junior */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
            <span className="px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold">
              {locale === 'bn' ? 'নিম্ন মাধ্যমিক স্তর' : 'Junior Secondary'}
            </span>
            <h3 className="text-lg font-bold text-navy-900">
              {locale === 'bn' ? '৬ষ্ঠ থেকে ৮ম শ্রেণি' : 'Classes 6 to 8'}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {locale === 'bn'
                ? 'আইসিটি, সাধারণ বিজ্ঞান ও ভাষার গভীর পাঠদানের সমন্বয়।'
                : 'Analytical thinking, language proficiencies, science foundations, and digital literacy.'}
            </p>
          </div>

          {/* Level 3: Secondary */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
            <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
              {locale === 'bn' ? 'মাধ্যমিক স্তর' : 'Secondary Wing'}
            </span>
            <h3 className="text-lg font-bold text-navy-900">
              {locale === 'bn' ? '৯ম ও ১০ম শ্রেণি' : 'Classes 9 & 10'}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {locale === 'bn'
                ? 'বিজ্ঞান, ব্যবসায় শিক্ষা ও মানবিক বিভাগে সুবিন্যস্ত প্রস্তুতি ও ব্যবহারিক ল্যাব।'
                : 'Specialized streams: Science, Business Studies, and Humanities with laboratory work.'}
            </p>
          </div>

          {/* Level 4: College */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
            <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold">
              {locale === 'bn' ? 'উচ্চ মাধ্যমিক (কলেজ)' : 'Higher Secondary College'}
            </span>
            <h3 className="text-lg font-bold text-navy-900">
              {locale === 'bn' ? 'একাদশ ও দ্বাদশ শ্রেণি' : 'Classes 11 & 12'}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {locale === 'bn'
                ? 'চট্টগ্রাম শিক্ষাবোর্ডের অধীনে আধুনিক বিজ্ঞান গবেষণাগার ও বিশ্ববিদ্যালয় প্রস্তুতি।'
                : 'Pre-university excellence, college seminars, practical projects, and career counseling.'}
            </p>
          </div>
        </div>

        <div className="p-6 bg-blue-50 border border-blue-200 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-navy-900 text-sm sm:text-base">
              {locale === 'bn' ? '২০২৬ শিক্ষাবর্ষে ভর্তি হতে চান?' : 'Interested in joining for session 2026?'}
            </h4>
            <p className="text-xs text-slate-600 mt-0.5">
              {locale === 'bn' ? 'অনলাইন ভর্তি আবেদনের মাধ্যমে সহজ ও দ্রুত ভর্তি সম্পন্ন করুন।' : 'Submit your online admission application in just a few minutes.'}
            </p>
          </div>
          <Link
            href={`/${locale}/admission/apply`}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow transition-all whitespace-nowrap"
          >
            {locale === 'bn' ? 'অনলাইন ভর্তি আবেদন' : 'Apply Online Now'}
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}

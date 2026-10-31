import React from 'react';
import AnnouncementBar from '@/components/public/AnnouncementBar';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import { Locale, isValidLocale, defaultLocale } from '@/lib/i18n';

export default async function TermsPage({
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
            {locale === 'bn' ? 'ব্যবহারের শর্তাবলি' : 'Terms of Use'}
          </h1>
          <p className="text-xs sm:text-sm text-blue-200 mt-2">
            {locale === 'bn' ? 'মিরসরাই স্কুল এন্ড কলেজের ওয়েবসাইট ও অনলাইন পোর্টাল ব্যবহারের নিয়মাবলি' : 'Rules and guidelines governing use of institution portals and digital services'}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-navy-900">
            {locale === 'bn' ? '১. অ্যাকাউন্টের দায়িত্ব' : '1. User Account Responsibility'}
          </h2>
          <p>
            {locale === 'bn'
              ? 'শিক্ষার্থী, শিক্ষক ও অভিভাবকগণ তাদের লগইন তথ্য ও পাসওয়ার্ডের গোপনীয়তা রক্ষার জন্য এককভাবে দায়ী থাকবেন।'
              : 'Students, faculty, and guardians are strictly accountable for maintaining the security of their login credentials.'}
          </p>

          <h2 className="text-lg font-bold text-navy-900 pt-4">
            {locale === 'bn' ? '২. ফি পরিশোধ ও রসিদ' : '2. Fee Settlement & Receipts'}
          </h2>
          <p>
            {locale === 'bn'
              ? 'অনলাইনে ফি পরিশোধের পর প্রস্তুতকৃত ডিজিটাল মানি রিসিট বৈধ প্রাতিষ্ঠানিক প্রমাণক হিসেবে বিবেচিত হবে।'
              : 'Official e-money receipts generated upon successful online payments serve as verified institutional proof of payment.'}
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

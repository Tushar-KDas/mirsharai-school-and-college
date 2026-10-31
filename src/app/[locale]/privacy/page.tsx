import React from 'react';
import AnnouncementBar from '@/components/public/AnnouncementBar';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import { Locale, isValidLocale, defaultLocale } from '@/lib/i18n';
import { Shield } from 'lucide-react';

export default async function PrivacyPage({
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
            {locale === 'bn' ? 'গোপনীয়তা ও নিরাপত্তা নীতি' : 'Privacy & Data Protection Policy'}
          </h1>
          <p className="text-xs sm:text-sm text-blue-200 mt-2">
            {locale === 'bn' ? 'শিক্ষার্থী ও অভিভাবকদের তথ্যের সুরক্ষা এবং নিরাপত্তা নীতিমালা' : 'Institutional policy on personal student data privacy and protection'}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-navy-900">
            {locale === 'bn' ? '১. ব্যক্তিগত তথ্যের সুরক্ষা' : '1. Protection of Student Personal Data'}
          </h2>
          <p>
            {locale === 'bn'
              ? 'মিরসরাই স্কুল এন্ড কলেজ শিক্ষার্থীদের জন্ম সনদ, ফোন নম্বর, ফলাফল ও আর্থিক তথ্য সুরক্ষিত রাখতে বদ্ধপরিকর। শিক্ষার্থীদের কোনো ব্যক্তিগত তথ্য তৃতীয় পক্ষের সাথে বিনিময় করা হয় না।'
              : 'Mirsharai School and College is dedicated to safeguarding student academic records, identification numbers, and financial transactions. Personal information is strictly protected.'}
          </p>

          <h2 className="text-lg font-bold text-navy-900 pt-4">
            {locale === 'bn' ? '২. অনলাইন পেমেন্ট নিরাপত্তা' : '2. Online Payment Security'}
          </h2>
          <p>
            {locale === 'bn'
              ? 'বিকাশ, নগদ, রকেট ও কার্ডের মাধ্যমে ফি পরিশোধের ক্ষেত্রে ব্যাংক ও পেমেন্ট গেটওয়ের এনক্রিপ্ট প্রোটোকল অনুসরণ করা হয়। কোনো ব্যাংক কার্ড বা গোপন পিন নম্বর আমাদের সিস্টেমে সংরক্ষিত হয় না।'
              : 'All digital fee collections via mobile banking and cards strictly utilize encrypted financial APIs. No sensitive card PINs or passwords are stored in our databases.'}
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

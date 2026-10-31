import React from 'react';
import Image from 'next/image';
import AnnouncementBar from '@/components/public/AnnouncementBar';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import { Locale, isValidLocale, defaultLocale } from '@/lib/i18n';
import { Award, BookOpen, Users, Building, ShieldCheck, MapPin } from 'lucide-react';

export default async function AboutPage({
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

      {/* Header Banner */}
      <div className="bg-navy-950 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-200 border border-blue-400/30 px-3 py-1 rounded-full text-xs font-semibold mb-3">
            <Building className="w-3.5 h-3.5 text-amber-400" />
            <span>{locale === 'bn' ? 'আমাদের পরিচিতি' : 'Institutional Overview'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {locale === 'bn' ? 'মিরসরাই স্কুল এন্ড কলেজ সম্পর্কে' : 'About Mirsharai School and College'}
          </h1>
          <p className="text-xs sm:text-sm text-blue-200 mt-2 max-w-2xl">
            {locale === 'bn'
              ? 'বৃহত্তর চট্টগ্রামের অন্যতম ঐতিহ্যবাহী বিদ্যাপীঠ, যা ১৯৭২ সাল থেকে জ্ঞান ও নৈতিকতার আলো ছড়িয়ে আসছে।'
              : 'A renowned seat of learning in Chattogram, nurturing intellectual excellence and moral values since 1972.'}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4 text-slate-700 text-xs sm:text-sm leading-relaxed">
            <h2 className="text-xl sm:text-2xl font-bold text-navy-900">
              {locale === 'bn' ? 'ঐতিহ্য, গৌরব ও সাফল্যের পথচলা' : 'Heritage of Excellence in Education'}
            </h2>
            <p>
              {locale === 'bn'
                ? 'মিরসরাই স্কুল এন্ড কলেজ ১৯৭২ সালে প্রতিষ্ঠিত হয়ে বৃহত্তর মিরসরাই তথা চট্টগ্রামের শিক্ষা বিস্তারে এক অনন্য ভূমিকা পালন করে আসছে। প্রতিষ্ঠানটি প্রাথমিক স্তর (১ম শ্রেণি) থেকে শুরু করে উচ্চ মাধ্যমিক স্তর (দ্বাদশ শ্রেণি) পর্যন্ত বিস্তৃত।'
                : 'Established in 1972, Mirsharai School and College has been a beacon of academic enlightenment in Mirsharai, Chattogram. The institution comprehensively covers Class 1 to 12 across Primary, Secondary, and Higher Secondary College curricula.'}
            </p>
            <p>
              {locale === 'bn'
                ? 'আমাদের বিজ্ঞান, ব্যবসায় শিক্ষা ও মানবিক বিভাগে রয়েছে অভিজ্ঞ ও প্রশিক্ষিত শিক্ষকমণ্ডলী, অত্যাধুনিক বিজ্ঞান গবেষণাগার, সমৃদ্ধ লাইব্রেরি ও কম্পিউটার ল্যাব।'
                : 'With dedicated faculties across Science, Business Studies, and Humanities, the institution provides state-of-the-art physics, chemistry, biology and ICT laboratories alongside an expansive central library.'}
            </p>
            <div className="pt-2 grid grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
                <p className="text-xs text-slate-500">{locale === 'bn' ? 'প্রতিষ্ঠাকাল' : 'Established'}</p>
                <p className="text-xl font-bold text-navy-900 mt-0.5">1972</p>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
                <p className="text-xs text-slate-500">{locale === 'bn' ? 'শিক্ষা স্তর' : 'Coverage'}</p>
                <p className="text-xl font-bold text-blue-600 mt-0.5">Class 1–12</p>
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3] bg-slate-900">
            <Image
              src="/images/school-campus.jpg"
              alt="School Campus"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

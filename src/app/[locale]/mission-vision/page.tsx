import React from 'react';
import AnnouncementBar from '@/components/public/AnnouncementBar';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import { Locale, isValidLocale, defaultLocale } from '@/lib/i18n';
import { Target, Eye, Compass, CheckCircle } from 'lucide-react';

export default async function MissionVisionPage({
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
            {locale === 'bn' ? 'আমাদের লক্ষ্য ও উদ্দেশ্য' : 'Our Mission & Vision'}
          </h1>
          <p className="text-xs sm:text-sm text-blue-200 mt-2">
            {locale === 'bn' ? 'নৈতিক, মানবিক ও আধুনিক শিক্ষায় আলোকিত ভবিষ্যৎ বিনির্মাণ' : 'Guiding principles toward educational excellence and enlightened leadership'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Mission */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-navy-900">
            {locale === 'bn' ? 'আমাদের লক্ষ্য (Mission)' : 'Our Mission'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {locale === 'bn'
              ? '১ম থেকে ১২শ শ্রেণি পর্যন্ত শিক্ষার্থীদের মানসম্মত, যুগোপযোগী এবং মানবিক শিক্ষায় শিক্ষিত করা, যাতে তারা আধুনিক বিশ্বের সাথে তাল মিলিয়ে দক্ষ, আত্মবিশ্বাসী এবং দেশপ্রেমিক সুনাগরিক হিসেবে আত্মপ্রকাশ করতে পারে।'
              : 'To provide quality, contemporary, and value-based education from Class 1 to 12, equipping learners with academic rigor, ethical courage, and modern technical acumen to thrive in a globalized society.'}
          </p>
        </div>

        {/* Vision */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Eye className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-navy-900">
            {locale === 'bn' ? 'আমাদের দৃষ্টিভঙ্গি (Vision)' : 'Our Vision'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {locale === 'bn'
              ? 'বৃহত্তর চট্টগ্রামের শীর্ষস্থানীয় শিক্ষাপ্রতিষ্ঠান হিসেবে প্রতিষ্ঠিত হয়ে শিক্ষার্থীদের সৃজনশীল মেধার উন্মেষ ঘটানো এবং জ্ঞানভিত্তিক ডিজিটাল বাংলাদেশ বিনির্মাণে অগ্রণী ভূমিকা রাখা।'
              : 'To be recognized as a premier educational institution in Chattogram, championing creative inquiry, digital innovation, and transformative leadership for nation building.'}
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

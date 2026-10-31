import React from 'react';
import Image from 'next/image';
import AnnouncementBar from '@/components/public/AnnouncementBar';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import { Locale, isValidLocale, defaultLocale } from '@/lib/i18n';
import { Quote } from 'lucide-react';

export default async function PrincipalMessagePage({
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
            {locale === 'bn' ? 'অধ্যক্ষের বাণী' : "Principal's Message"}
          </h1>
          <p className="text-xs sm:text-sm text-blue-200 mt-2">
            {locale === 'bn' ? 'মিরসরাই স্কুল এন্ড কলেজের সুযোগ্য অধ্যক্ষ মহোদয়ের বার্তা' : 'Words of wisdom from the college principal'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4 text-center">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto rounded-3xl overflow-hidden shadow-lg border-4 border-slate-100 bg-slate-200">
              <Image
                src="/images/school-assembly.jpg"
                alt="Principal"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="font-extrabold text-navy-900 text-base mt-4">
              {locale === 'bn' ? 'প্রফেসর মোঃ কামরুল হাসান' : 'Prof. Md. Kamrul Hasan'}
            </h3>
            <p className="text-xs text-blue-600 font-semibold mt-0.5">
              {locale === 'bn' ? 'অধ্যক্ষ' : 'Principal'}
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              {locale === 'bn' ? 'মিরসরাই স্কুল এন্ড কলেজ' : 'Mirsharai School and College'}
            </p>
          </div>

          <div className="md:col-span-8 space-y-4 text-slate-700 text-xs sm:text-sm leading-relaxed">
            <div className="p-3 bg-blue-50 text-blue-700 rounded-2xl inline-block mb-1">
              <Quote className="w-6 h-6" />
            </div>
            <p className="font-medium text-slate-900 italic text-sm sm:text-base">
              {locale === 'bn'
                ? '“জ্ঞানই শক্তি, চরিত্রই ভূষণ। শিক্ষার্থীদের একবিংশ শতাব্দীর চ্যালেঞ্জ মোকাবেলায় সক্ষম করে তোলাই আমাদের মূল ব্রত।”'
                : '"Knowledge is power, integrity is crown. Empowering our youth for the future with wisdom and values is our sacred trust."'}
            </p>
            <p>
              {locale === 'bn'
                ? 'প্রিয় অভিভাবক ও শিক্ষার্থীবৃন্দ, মিরসরাই স্কুল এন্ড কলেজ কেবল একটি শিক্ষাপ্রতিষ্ঠান নয়, এটি শিক্ষার্থীদের মেধা, সততা ও মানবিক মূল্যবোধের পূর্ণাঙ্গ বিকাশকেন্দ্র। আমাদের লক্ষ্য প্রতিটি শিক্ষার্থীকে আদর্শ সুনাগরিক হিসেবে গড়ে তোলা।'
                : 'Dear guardians and students, Mirsharai School and College is not merely an academic campus; it is a crucible of moral character, intellect, and creativity. Our mission is to inspire every young mind to realize their fullest potential.'}
            </p>
            <p>
              {locale === 'bn'
                ? 'আমরা আধুনিক প্রযুক্তিনির্ভর পাঠদান, স্মার্ট ক্লাসরুম এবং সহশিক্ষা কার্যক্রমের মাধ্যমে শিক্ষার্থীদের বৈশ্বিক প্রতিযোগিতার উপযোগী করে গড়ে তুলছি। আপনাদের সার্বিক সহযোগিতা আমাদের অগ্রযাত্রার পাথেয়।'
                : 'Through modern digital infrastructure, dedicated teachers, and holistic development programs, we prepare students for competitive academic challenges. We deeply appreciate your partnership in this transformative journey.'}
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

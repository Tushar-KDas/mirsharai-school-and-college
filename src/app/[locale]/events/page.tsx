import React from 'react';
import AnnouncementBar from '@/components/public/AnnouncementBar';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import prisma from '@/lib/prisma';
import { Locale, isValidLocale, defaultLocale } from '@/lib/i18n';
import { formatDate } from '@/lib/utils';
import { Calendar, MapPin, Clock } from 'lucide-react';

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale: Locale = isValidLocale(resolvedParams.locale)
    ? (resolvedParams.locale as Locale)
    : defaultLocale;

  const events = await prisma.academicEvent.findMany({
    orderBy: { startDate: 'asc' },
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <AnnouncementBar />
      <Navbar />

      <div className="bg-navy-950 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {locale === 'bn' ? 'ইভেন্টস ও সহশিক্ষা কর্মসূচি' : 'Campus Events & Activities'}
          </h1>
          <p className="text-xs sm:text-sm text-blue-200 mt-2">
            {locale === 'bn' ? 'বার্ষিক ক্রীড়া, বিজ্ঞান মেলা, সাংস্কৃতিক ও অভিভাবক সমাবেশ' : 'Annual athletic meets, science expos, debate competitions, and assemblies'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((evt) => (
            <div
              key={evt.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                    {evt.type}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {formatDate(evt.startDate, locale)}
                  </span>
                </div>

                <h3 className="font-bold text-navy-900 text-base leading-snug">
                  {locale === 'bn' ? evt.titleBn : evt.titleEn}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {locale === 'bn' ? evt.descriptionBn : evt.descriptionEn}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                <span className="truncate">{locale === 'bn' ? evt.locationBn : evt.locationEn}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

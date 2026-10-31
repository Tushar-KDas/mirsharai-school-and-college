import React from 'react';
import Link from 'next/link';
import AnnouncementBar from '@/components/public/AnnouncementBar';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import prisma from '@/lib/prisma';
import { Locale, isValidLocale, defaultLocale } from '@/lib/i18n';
import { Layers, ArrowRight } from 'lucide-react';

export default async function ClassesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale: Locale = isValidLocale(resolvedParams.locale)
    ? (resolvedParams.locale as Locale)
    : defaultLocale;

  const classes = await prisma.class.findMany({
    orderBy: { numericValue: 'asc' },
    include: {
      sections: true,
      subjects: true,
    },
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <AnnouncementBar />
      <Navbar />

      <div className="bg-navy-950 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {locale === 'bn' ? 'শ্রেণি কার্যক্রম (১ম-১২শ শ্রেণি)' : 'Class Offerings (Class 1 to 12)'}
          </h1>
          <p className="text-xs sm:text-sm text-blue-200 mt-2">
            {locale === 'bn' ? 'প্রাথমিক, মাধ্যমিক ও কলেজ শাখার শ্রেণিভিত্তিক কাঠামো' : 'Comprehensive list of classes, sections, and subject programs'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((c) => (
            <div
              key={c.id}
              className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                    {c.level}
                  </span>
                  <span className="font-mono text-xs font-bold text-slate-400">
                    Numeric: {c.numericValue}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-navy-900">
                  {locale === 'bn' ? c.nameBn : c.nameEn}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {locale === 'bn' ? 'শাখা ও সেকশন:' : 'Sections:'} {c.sections.length > 0 ? c.sections.map(s => locale === 'bn' ? s.nameBn : s.nameEn).join(', ') : 'A, B'}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={`/${locale}/admission/apply`}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <span>{locale === 'bn' ? 'ভর্তির জন্য আবেদন' : 'Apply for this class'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

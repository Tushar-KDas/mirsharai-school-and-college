'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { MapPin, BookOpen, Users, ShieldCheck, Award, ArrowRight } from 'lucide-react';

export default function HeroBanner() {
  const { locale, t } = useLanguage();

  return (
    <div className="relative">
      {/* Hero Background with High Quality Campus Image */}
      <div className="relative bg-navy-950 text-white min-h-[500px] lg:min-h-[560px] flex items-center overflow-hidden">
        {/* Background photo */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 transform scale-105 transition-transform duration-1000"
          style={{ backgroundImage: `url('/images/school-campus.jpg')` }}
        />
        {/* Multi-gradient overlay for contrast & readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-900/90 to-blue-950/70" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
          <div className="max-w-3xl">
            {/* Location pill */}
            <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-200 border border-blue-400/30 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6 backdrop-blur-sm">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.institution.location}</span>
            </div>

            {/* Main Hero Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              {t.hero.welcome}
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-blue-100/90 font-medium leading-relaxed mb-8 max-w-2xl">
              {t.institution.tagline} — {t.hero.motto}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={`/${locale}/admission/apply`}
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-lg shadow-amber-500/25 transition-all hover:scale-[1.02]"
              >
                <span>{t.common.applyNow}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href={`/${locale}/about`}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base backdrop-blur-sm transition-all"
              >
                <span>{t.common.exploreCampus}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Feature Cards Floating Grid */}
      <div className="relative -mt-10 sm:-mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div className="bg-white p-5 rounded-2xl shadow-md border border-slate-100 flex items-start gap-4 hover:shadow-lg transition-all hover:-translate-y-0.5">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1">
                {t.hero.card1Title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {t.hero.card1Desc}
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-5 rounded-2xl shadow-md border border-slate-100 flex items-start gap-4 hover:shadow-lg transition-all hover:-translate-y-0.5">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1">
                {t.hero.card2Title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {t.hero.card2Desc}
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-5 rounded-2xl shadow-md border border-slate-100 flex items-start gap-4 hover:shadow-lg transition-all hover:-translate-y-0.5">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1">
                {t.hero.card3Title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {t.hero.card3Desc}
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-5 rounded-2xl shadow-md border border-slate-100 flex items-start gap-4 hover:shadow-lg transition-all hover:-translate-y-0.5">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1">
                {t.hero.card4Title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {t.hero.card4Desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

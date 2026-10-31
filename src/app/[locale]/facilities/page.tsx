import React from 'react';
import Link from 'next/link';
import AnnouncementBar from '@/components/public/AnnouncementBar';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import { Locale, isValidLocale, defaultLocale } from '@/lib/i18n';
import { campusFacilities, FacilityItem } from '@/data/facilitiesData';
import {
  Monitor,
  BookOpen,
  FlaskConical,
  Laptop,
  Trophy,
  Bus,
  CheckCircle2,
  Clock,
  User,
  Phone,
  Mail,
  ShieldCheck,
  Cpu,
  Sparkles,
  ArrowRight,
  GraduationCap,
} from 'lucide-react';

export default async function FacilitiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale: Locale = isValidLocale(resolvedParams.locale)
    ? (resolvedParams.locale as Locale)
    : defaultLocale;

  const getIcon = (iconName: FacilityItem['iconName'], className: string) => {
    switch (iconName) {
      case 'Monitor':
        return <Monitor className={className} />;
      case 'BookOpen':
        return <BookOpen className={className} />;
      case 'FlaskConical':
        return <FlaskConical className={className} />;
      case 'Laptop':
        return <Laptop className={className} />;
      case 'Trophy':
        return <Trophy className={className} />;
      case 'Bus':
        return <Bus className={className} />;
      default:
        return <Monitor className={className} />;
    }
  };

  const getFacilityStyles = (slug: string) => {
    switch (slug) {
      case 'smart-class':
        return {
          gradientClass: 'from-blue-700 via-blue-600 to-indigo-800 bg-blue-700',
          inlineBg: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #3730a3 100%)',
        };
      case 'library':
        return {
          gradientClass: 'from-emerald-700 via-emerald-600 to-teal-800 bg-emerald-700',
          inlineBg: 'linear-gradient(135deg, #047857 0%, #059669 50%, #115e59 100%)',
        };
      case 'science-lab':
        return {
          gradientClass: 'from-purple-700 via-purple-600 to-pink-800 bg-purple-700',
          inlineBg: 'linear-gradient(135deg, #7e22ce 0%, #9333ea 50%, #9d174d 100%)',
        };
      case 'computer-lab':
        return {
          gradientClass: 'from-indigo-700 via-indigo-600 to-blue-900 bg-indigo-700',
          inlineBg: 'linear-gradient(135deg, #4338ca 0%, #4f46e5 50%, #1e3a8a 100%)',
        };
      case 'sports-field':
        return {
          gradientClass: 'from-amber-600 via-amber-500 to-orange-700 bg-amber-600',
          inlineBg: 'linear-gradient(135deg, #d97706 0%, #f59e0b 50%, #c2410c 100%)',
        };
      case 'transport':
        return {
          gradientClass: 'from-rose-700 via-rose-600 to-red-800 bg-rose-700',
          inlineBg: 'linear-gradient(135deg, #be123c 0%, #e11d48 50%, #991b1b 100%)',
        };
      default:
        return {
          gradientClass: 'from-slate-900 via-navy-900 to-blue-950 bg-slate-900',
          inlineBg: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #1e3a8a 100%)',
        };
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <AnnouncementBar />
      <Navbar />

      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-navy-950 via-slate-900 to-blue-950 text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-blue-900/40 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-3 border border-blue-400/20">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>{locale === 'bn' ? 'বিশ্বমানের অবকাঠামো ও সুযোগ-সুবিধা' : 'World-Class Campus Infrastructure'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            {locale === 'bn' ? 'আমাদের ক্যাম্পাস সুযোগ-সুবিধাসমূহ' : 'Our Campus Facilities & Labs'}
          </h1>
          <p className="text-xs sm:text-sm text-blue-200/90 mt-2.5 max-w-3xl leading-relaxed">
            {locale === 'bn'
              ? 'মিরসরাই স্কুল এন্ড কলেজে শিক্ষার্থীদের যুগোপযোগী ডিজিটাল শিক্ষা, বিজ্ঞান গবেষণা, শারীরিক সুস্থতা এবং নিরাপদ যাতায়াতের জন্য গড়ে তোলা হয়েছে সমৃদ্ধ আধুনিক অবকাঠামো।'
              : 'Mirsharai School and College is equipped with cutting-edge academic infrastructure, interactive multimedia classrooms, scientific research laboratories, athletic facilities, and an institutional transport fleet.'}
          </p>

          {/* Quick Anchor Bar */}
          <div className="mt-8 flex flex-wrap gap-2">
            {campusFacilities.map((fac) => (
              <a
                key={fac.id}
                href={`#${fac.slug}`}
                className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-semibold backdrop-blur-sm transition-all hover:scale-105 flex items-center gap-1.5"
              >
                {getIcon(fac.iconName, 'w-3.5 h-3.5 text-blue-300')}
                <span>{locale === 'bn' ? fac.nameBn : fac.nameEn}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Facilities List Deep Dive */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 space-y-12">
        {campusFacilities.map((facility, index) => (
          <section
            key={facility.id}
            id={facility.slug}
            className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden scroll-mt-24 transition-all hover:shadow-md"
          >
            {/* Facility Header Strip */}
            {(() => {
              const styles = getFacilityStyles(facility.slug);
              return (
                <div
                  style={{ background: styles.inlineBg }}
                  className={`p-6 sm:p-8 bg-gradient-to-r ${styles.gradientClass} text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white flex-shrink-0 shadow-inner">
                      {getIcon(facility.iconName, 'w-8 h-8')}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-[10px] font-bold uppercase tracking-wider">
                          {locale === 'bn' ? `সুবিধা #${index + 1}` : `Facility #${index + 1}`}
                        </span>
                        <span className="text-white/80 text-xs font-mono">
                          {locale === 'bn' ? facility.quickStats[0].valueBn : facility.quickStats[0].valueEn}
                        </span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black mt-1">
                        {locale === 'bn' ? facility.nameBn : facility.nameEn}
                      </h2>
                      <p className="text-xs sm:text-sm text-white/90 font-medium mt-0.5">
                        {locale === 'bn' ? facility.taglineBn : facility.taglineEn}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 sm:p-6 bg-slate-50 border-b border-slate-200/80">
              {facility.quickStats.map((stat, sIdx) => (
                <div key={sIdx} className="bg-white p-3 rounded-2xl border border-slate-200/70 text-center shadow-xs">
                  <p className="text-[11px] font-semibold text-slate-500 uppercase">
                    {locale === 'bn' ? stat.labelBn : stat.labelEn}
                  </p>
                  <p className="text-sm sm:text-base font-extrabold text-navy-950 mt-1">
                    {locale === 'bn' ? stat.valueBn : stat.valueEn}
                  </p>
                </div>
              ))}
            </div>

            {/* Main Content Body */}
            <div className="p-6 sm:p-8 space-y-8">
              {/* Detailed Narrative */}
              <div>
                <h3 className="text-base font-bold text-navy-950 mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span>{locale === 'bn' ? 'সুবিধার বিস্তারিত বিবরণ ও উদ্দেশ্য' : 'Comprehensive Overview & Academic Purpose'}</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
                  {locale === 'bn' ? facility.detailedOverviewBn : facility.detailedOverviewEn}
                </p>
              </div>

              {/* Grid: Key Features (Left) & Specifications/Apparatus (Right) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Key Features */}
                <div className="bg-slate-50 p-5 sm:p-6 rounded-2xl border border-slate-200/80">
                  <h4 className="text-sm font-bold text-navy-900 mb-3.5 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{locale === 'bn' ? 'প্রধান বৈশিষ্ট্য ও কার্যকারিতা' : 'Key Highlights & Modern Capabilities'}</span>
                  </h4>
                  <ul className="space-y-2.5 text-xs text-slate-700">
                    {(locale === 'bn' ? facility.keyFeaturesBn : facility.keyFeaturesEn).map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 bg-white p-2.5 rounded-xl border border-slate-200/60 shadow-xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="font-medium leading-relaxed">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Equipment & Technology Specs */}
                <div className="bg-slate-50 p-5 sm:p-6 rounded-2xl border border-slate-200/80 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-navy-900 mb-3.5 flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-indigo-600" />
                      <span>{locale === 'bn' ? 'আধুনিক যন্ত্রপাতি ও প্রযুক্তি স্পেসিফিকেশন' : 'Hardware, Equipment & Infrastructure'}</span>
                    </h4>
                    <div className="space-y-2">
                      {(locale === 'bn' ? facility.equipmentListBn : facility.equipmentListEn).map((eq, eIdx) => (
                        <div
                          key={eIdx}
                          className="bg-white p-2.5 rounded-xl border border-slate-200/60 text-xs font-mono text-slate-800 font-medium flex items-center gap-2 shadow-xs"
                        >
                          <span className="w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0"></span>
                          <span>{eq}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Operational Hours */}
                  <div className="mt-5 p-3.5 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs">
                    <p className="font-bold flex items-center gap-1.5 mb-1 text-amber-950">
                      <Clock className="w-3.5 h-3.5 text-amber-700" />
                      <span>{locale === 'bn' ? 'কার্যকর সময়সূচি:' : 'Operational Timings:'}</span>
                    </p>
                    <p className="font-medium">{locale === 'bn' ? facility.timingsBn : facility.timingsEn}</p>
                  </div>
                </div>
              </div>

              {/* Guidelines & Officer In-Charge */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 border-t border-slate-100">
                {/* Guidelines (7 cols) */}
                <div className="lg:col-span-7 space-y-2">
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-2 uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    <span>{locale === 'bn' ? 'শিক্ষার্থী আচরণবিধি ও ব্যবহারের নিয়ম' : 'Usage Guidelines & Code of Conduct'}</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-600 list-disc list-inside">
                    {(locale === 'bn' ? facility.rulesBn : facility.rulesEn).map((rule, rIdx) => (
                      <li key={rIdx} className="leading-relaxed">{rule}</li>
                    ))}
                  </ul>
                </div>

                {/* In Charge Contact (5 cols) */}
                <div className="lg:col-span-5 bg-blue-50/70 p-4 rounded-2xl border border-blue-200/80 text-xs">
                  <p className="font-bold text-blue-950 uppercase tracking-wider text-[10px] mb-2 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-blue-600" />
                    <span>{locale === 'bn' ? 'দায়িত্বপ্রাপ্ত কর্মকর্তা / সমন্বয়ক' : 'Officer In-Charge'}</span>
                  </p>
                  <p className="text-sm font-bold text-navy-950">
                    {locale === 'bn' ? facility.inCharge.nameBn : facility.inCharge.nameEn}
                  </p>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    {locale === 'bn' ? facility.inCharge.titleBn : facility.inCharge.titleEn}
                  </p>
                  <div className="mt-3 pt-2.5 border-t border-blue-200/60 flex flex-wrap gap-3 font-semibold text-blue-700 text-[11px]">
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-blue-600" />
                      <span>{facility.inCharge.phone}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3 text-blue-600" />
                      <span>{facility.inCharge.email}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <Footer />
    </div>
  );
}

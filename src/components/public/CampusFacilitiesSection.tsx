'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Monitor,
  BookOpen,
  FlaskConical,
  Laptop,
  Trophy,
  Bus,
  X,
  CheckCircle2,
  Clock,
  User,
  Phone,
  Mail,
  ShieldCheck,
  Cpu,
  ArrowRight,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { campusFacilities, FacilityItem } from '@/data/facilitiesData';

interface Props {
  locale: string;
}

export default function CampusFacilitiesSection({ locale }: Props) {
  const [selectedFacility, setSelectedFacility] = useState<FacilityItem | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'equipment' | 'contact'>('overview');

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedFacility) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedFacility]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedFacility(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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

  return (
    <div className="lg:col-span-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 flex flex-col justify-between">
      <div>
        <div className="pb-4 border-b border-slate-100 mb-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-slate-900 text-base">
                {locale === 'bn' ? 'আমাদের ক্যাম্পাস সুবিধা' : 'Our Campus Facilities'}
              </h2>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {locale === 'bn' ? 'যেকোনো সুবিধায় ক্লিক করে বিস্তারিত তথ্য দেখুন' : 'Click on any facility to view detailed info'}
            </p>
          </div>
          <Link
            href={`/${locale}/facilities`}
            className="text-[11px] font-bold text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-0.5"
          >
            <span>{locale === 'bn' ? 'সব দেখুন' : 'View All'}</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* 6 Clickable Facility Cards */}
        <div className="grid grid-cols-2 gap-3">
          {campusFacilities.map((facility) => (
            <button
              key={facility.id}
              type="button"
              onClick={() => {
                setSelectedFacility(facility);
                setActiveTab('overview');
              }}
              className="group p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-center flex flex-col items-center justify-center hover:bg-blue-50/70 hover:border-blue-300 hover:shadow-md active:scale-95 transition-all duration-200 cursor-pointer relative"
            >
              <div
                className={`w-11 h-11 rounded-full ${facility.colorTheme.iconBg} ${facility.colorTheme.iconColor} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-200 shadow-sm`}
              >
                {getIcon(facility.iconName, 'w-5 h-5')}
              </div>
              <h3 className="text-xs font-bold text-slate-800 group-hover:text-blue-700 transition-colors">
                {locale === 'bn' ? facility.nameBn : facility.nameEn}
              </h3>
              <span className="mt-1 text-[10px] text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity font-medium flex items-center gap-0.5">
                <span>{locale === 'bn' ? 'বিস্তারিত' : 'Details'}</span>
                <Sparkles className="w-2.5 h-2.5" />
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 text-center">
        <Link
          href={`/${locale}/facilities`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors"
        >
          <span>{locale === 'bn' ? 'ক্যাম্পাসের পূর্ণাঙ্গ সুযোগ-সুবিধা পেইজ' : 'Comprehensive Campus Facilities Guide'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Interactive Detail Modal Dialog */}
      {selectedFacility && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            {(() => {
              const styles = getFacilityStyles(selectedFacility.slug);
              return (
                <div
                  style={{ background: styles.inlineBg }}
                  className={`p-5 sm:p-6 bg-gradient-to-r ${styles.gradientClass} text-white flex items-start justify-between relative`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white flex-shrink-0 shadow-inner">
                      {getIcon(selectedFacility.iconName, 'w-7 h-7')}
                    </div>
                    <div>
                      <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/20 text-[10px] font-bold uppercase tracking-wider mb-1">
                        <Sparkles className="w-3 h-3" />
                        <span>{locale === 'bn' ? 'ক্যাম্পাস সুবিধা' : 'Campus Facility'}</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-extrabold leading-tight">
                        {locale === 'bn' ? selectedFacility.nameBn : selectedFacility.nameEn}
                      </h3>
                      <p className="text-xs text-white/90 mt-0.5 font-medium">
                        {locale === 'bn' ? selectedFacility.taglineBn : selectedFacility.taglineEn}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedFacility(null)}
                    className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors focus:outline-none"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              );
            })()}

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-4 bg-slate-50 border-b border-slate-200/80">
              {selectedFacility.quickStats.map((stat, idx) => (
                <div key={idx} className="bg-white p-2.5 rounded-xl border border-slate-200/60 text-center shadow-xs">
                  <p className="text-[10px] font-semibold text-slate-500 uppercase">
                    {locale === 'bn' ? stat.labelBn : stat.labelEn}
                  </p>
                  <p className="text-xs sm:text-sm font-extrabold text-navy-950 mt-0.5">
                    {locale === 'bn' ? stat.valueBn : stat.valueEn}
                  </p>
                </div>
              ))}
            </div>

            {/* Modal Tabs */}
            <div className="flex border-b border-slate-200 px-6 bg-white">
              <button
                type="button"
                onClick={() => setActiveTab('overview')}
                className={`py-3 px-3 text-xs font-bold border-b-2 transition-all ${
                  activeTab === 'overview'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                {locale === 'bn' ? 'ওভারভিউ ও বিবরণ' : 'Overview & Details'}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('equipment')}
                className={`py-3 px-3 text-xs font-bold border-b-2 transition-all ${
                  activeTab === 'equipment'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                {locale === 'bn' ? 'সুবিধাসমূহ ও যন্ত্রপাতি' : 'Features & Equipment'}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('contact')}
                className={`py-3 px-3 text-xs font-bold border-b-2 transition-all ${
                  activeTab === 'contact'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                {locale === 'bn' ? 'সময়সূচি ও দায়িত্বপ্রাপ্ত' : 'Hours & In-Charge'}
              </button>
            </div>

            {/* Modal Body Scrollable */}
            <div className="p-6 overflow-y-auto max-h-[50vh] space-y-5 text-xs text-slate-700 leading-relaxed">
              {activeTab === 'overview' && (
                <div className="space-y-4">
                  <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-100 text-blue-900 font-medium">
                    {locale === 'bn' ? selectedFacility.summaryBn : selectedFacility.summaryEn}
                  </div>
                  <div>
                    <h4 className="font-bold text-navy-950 text-sm mb-1.5 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-blue-600" />
                      <span>{locale === 'bn' ? 'বিস্তারিত পরিচিতি' : 'Comprehensive Overview'}</span>
                    </h4>
                    <p className="text-slate-600 leading-relaxed">
                      {locale === 'bn' ? selectedFacility.detailedOverviewBn : selectedFacility.detailedOverviewEn}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'equipment' && (
                <div className="space-y-5">
                  <div>
                    <h4 className="font-bold text-navy-950 text-sm mb-2.5 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>{locale === 'bn' ? 'প্রধান বৈশিষ্ট্য ও সুবিধাসমূহ' : 'Key Highlights & Advantages'}</span>
                    </h4>
                    <ul className="space-y-2">
                      {(locale === 'bn' ? selectedFacility.keyFeaturesBn : selectedFacility.keyFeaturesEn).map((feat, i) => (
                        <li key={i} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700 font-medium">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-navy-950 text-sm mb-2.5 flex items-center gap-1.5">
                      <Cpu className="w-4 h-4 text-indigo-600" />
                      <span>{locale === 'bn' ? 'যন্ত্রপাতি ও টেকনোলজি স্পেসিফিকেশন' : 'Apparatus & Hardware Specifications'}</span>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {(locale === 'bn' ? selectedFacility.equipmentListBn : selectedFacility.equipmentListEn).map((eq, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 text-[11px] font-mono font-medium"
                        >
                          {eq}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'contact' && (
                <div className="space-y-4">
                  {/* Timing */}
                  <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4">
                    <h4 className="font-bold text-amber-900 flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-amber-600" />
                      <span>{locale === 'bn' ? 'ব্যবহারের সময়সূচি' : 'Operational Timings'}</span>
                    </h4>
                    <p className="text-amber-800 font-medium">
                      {locale === 'bn' ? selectedFacility.timingsBn : selectedFacility.timingsEn}
                    </p>
                  </div>

                  {/* Rules */}
                  <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
                    <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-2">
                      <ShieldCheck className="w-4 h-4 text-blue-600" />
                      <span>{locale === 'bn' ? 'সাধারণ নীতিমালা ও আচরণবিধি' : 'General Guidelines & Rules'}</span>
                    </h4>
                    <ul className="space-y-1.5 list-disc list-inside text-slate-600">
                      {(locale === 'bn' ? selectedFacility.rulesBn : selectedFacility.rulesEn).map((rule, idx) => (
                        <li key={idx}>{rule}</li>
                      ))}
                    </ul>
                  </div>

                  {/* In Charge */}
                  <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-4">
                    <h4 className="font-bold text-blue-900 flex items-center gap-2 mb-3">
                      <User className="w-4 h-4 text-blue-600" />
                      <span>{locale === 'bn' ? 'দায়িত্বপ্রাপ্ত কর্মকর্তা / সমন্বয়ক' : 'Officer In-Charge / Coordinator'}</span>
                    </h4>
                    <div className="space-y-1 text-slate-700">
                      <p className="text-sm font-bold text-navy-900">
                        {locale === 'bn' ? selectedFacility.inCharge.nameBn : selectedFacility.inCharge.nameEn}
                      </p>
                      <p className="text-[11px] text-slate-600">
                        {locale === 'bn' ? selectedFacility.inCharge.titleBn : selectedFacility.inCharge.titleEn}
                      </p>
                      <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-blue-700">
                        <span className="flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-blue-600" />
                          <span>{selectedFacility.inCharge.phone}</span>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-blue-600" />
                          <span>{selectedFacility.inCharge.email}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <Link
                href={`/${locale}/facilities#${selectedFacility.slug}`}
                onClick={() => setSelectedFacility(null)}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
              >
                <span>{locale === 'bn' ? 'সম্পূর্ণ ক্যাম্পাস সুবিধা পেইজ' : 'View Dedicated Facilities Page'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <button
                type="button"
                onClick={() => setSelectedFacility(null)}
                className="px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold transition-all"
              >
                {locale === 'bn' ? 'বন্ধ করুন' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

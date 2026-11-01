'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import {
  GraduationCap,
  Award,
  Mail,
  Phone,
  Quote,
  ArrowRight,
  ShieldCheck,
  Building2,
  Sparkles,
} from 'lucide-react';

export default function InstitutionalLeadershipSection() {
  const { locale } = useLanguage();

  const leaders = [
    {
      id: 'principal',
      nameBn: 'প্রফেসর মোঃ কামরুল হাসান',
      nameEn: 'Prof. Md. Kamrul Hasan',
      roleBn: 'অধ্যক্ষ',
      roleEn: 'Principal',
      badgeBn: 'প্রাতিষ্ঠানিক প্রধান',
      badgeEn: 'Head of Institution',
      qualificationBn: 'এম.এ, বি.এড (১ম শ্রেণি), চট্টগ্রাম বিশ্ববিদ্যালয়',
      qualificationEn: 'M.A, B.Ed (1st Class), University of Chittagong',
      departmentBn: 'প্রশাসন ও বাংলা অনুষদ',
      departmentEn: 'Faculty of Arts & Admin',
      phone: '+880 1812-345678',
      email: 'principal@mirsharaicollege.edu.bd',
      image: '/images/teachers/msc-tea-001.jpg',
      quoteBn:
        'সুশিক্ষা ও উন্নত নৈতিক মূল্যবোধের সমন্বয়ে আগামীর স্মার্ট বাংলাদেশ গঠনে শিক্ষার্থীদের যোগ্য ও আদর্শ নাগরিক হিসেবে গড়ে তোলাই আমাদের সর্বোচ্চ অঙ্গীকার।',
      quoteEn:
        'Our utmost commitment is to nurture students into enlightened, disciplined, and visionary citizens equipped for future challenges.',
      link: `/${locale}/principal-message`,
      linkTextBn: 'অধ্যক্ষের বাণী ও বার্তা',
      linkTextEn: "Principal's Full Message",
      primaryColor: 'border-blue-600 text-blue-700 bg-blue-50',
    },
    {
      id: 'vice-principal',
      nameBn: 'সুরাইয়া ইয়াসমিন',
      nameEn: 'Suraiya Yasmin',
      roleBn: 'উপাধ্যক্ষ',
      roleEn: 'Vice Principal',
      badgeBn: 'একাডেমিক সমন্বয়কারী',
      badgeEn: 'Academic Coordinator',
      qualificationBn: 'এম.এসসি (পদার্থবিজ্ঞান), বুয়েট | বি.এড',
      qualificationEn: 'M.Sc (Physics), BUET | B.Ed',
      departmentBn: 'পদার্থবিজ্ঞান ও বিজ্ঞান অনুষদ',
      departmentEn: 'Faculty of Science & Academic Cell',
      phone: '+880 1812-345679',
      email: 'viceprincipal@mirsharaicollege.edu.bd',
      image: '/images/teachers/msc-tea-002.jpg',
      quoteBn:
        'শৃঙ্খলা, মেধার বিকাশ ও আধুনিক ডিজিটাল বিজ্ঞানাগারভিত্তিক বাস্তবমুখী শিক্ষার মাধ্যমে আমরা প্রতিটি শিক্ষার্থীকে বিশ্বমানের করে তুলি।',
      quoteEn:
        'We foster creativity, scientific curiosity, and moral integrity through rigorous academic pedagogy and hands-on digital laboratories.',
      link: `/${locale}/teachers`,
      linkTextBn: 'শিক্ষকমণ্ডলীর তালিকা',
      linkTextEn: 'Faculty Directory',
      primaryColor: 'border-purple-600 text-purple-700 bg-purple-50',
    },
    {
      id: 'treasurer',
      nameBn: 'মোঃ শাহাদাত হোসেন',
      nameEn: 'Md. Shahadat Hossain',
      roleBn: 'কোষাধ্যক্ষ ও অর্থ প্রধান',
      roleEn: 'Treasurer & CFO',
      badgeBn: 'অর্থ ও হিসাব বিভাগ',
      badgeEn: 'Finance & Accounts',
      qualificationBn: 'এম.কম (হিসাববিজ্ঞান), এফসিএ (কোর্স সম্পন্ন)',
      qualificationEn: 'M.Com (Accounting), FCA (Course Complete), CU',
      departmentBn: 'অর্থ, হিসাবরক্ষণ ও পরিকল্পনা সেল',
      departmentEn: 'Finance, Budgeting & Accounts Cell',
      phone: '+880 1812-345680',
      email: 'accountant@mirsharaicollege.edu.bd',
      image: '/images/teachers/msc-tea-003.jpg',
      quoteBn:
        'সম্পূর্ণ স্বচ্ছতা, জবাবদিহিতা ও আধুনিক ডিজিটাল পেমেন্ট গেটওয়ের মাধ্যমে প্রাতিষ্ঠানিক তহবিল ও শিক্ষার্থীদের ফি ব্যবস্থাপনা নিশ্চিত করা হয়।',
      quoteEn:
        'Ensuring absolute financial transparency, automated digital fee collections, and sustainable institutional endowment.',
      link: `/${locale}/parent/fees`,
      linkTextBn: 'অনলাইন ফি ও অর্থ বিবরণী',
      linkTextEn: 'Online Fee & Accounts',
      primaryColor: 'border-emerald-600 text-emerald-700 bg-emerald-50',
    },
  ];

  return (
    <section className="bg-gradient-to-b from-white to-slate-50 py-16 sm:py-20 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold mb-3 shadow-sm">
            <Building2 className="w-4 h-4 text-blue-600" />
            <span>
              {locale === 'bn' ? 'প্রতিষ্ঠান পরিচালনা ও নেতৃত্ব' : 'Institutional Leadership & Administration'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            {locale === 'bn'
              ? 'শ্রদ্ধেয় অধ্যক্ষ, উপাধ্যক্ষ ও কোষাধ্যক্ষের পরিচিতি'
              : 'Meet the Executive Leadership of Mirsharai'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            {locale === 'bn'
              ? 'মিরসরাই স্কুল এন্ড কলেজের সুযোগ্য অধ্যক্ষ, উপাধ্যক্ষ এবং কোষাধ্যক্ষ মহোদয়ের দিকনির্দেশনায় প্রতিষ্ঠানটি একাডেমিক উৎকর্ষ ও চারিত্রিক দৃঢ়তার সাথে এগিয়ে চলেছে।'
              : 'Under the visionary leadership of our Principal, Vice Principal, and Treasurer, Mirsharai School and College continues its proud journey toward educational excellence.'}
          </p>
        </div>

        {/* 3 Executive Leaders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {leaders.map((leader) => (
            <div
              key={leader.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden group"
            >
              {/* Card Header & Photo */}
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <span
                    className={`text-[11px] font-bold px-3 py-1 rounded-full border ${leader.primaryColor}`}
                  >
                    {locale === 'bn' ? leader.badgeBn : leader.badgeEn}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                  </div>
                </div>

                {/* Photo & Identity */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-blue-100 shadow-md flex-shrink-0 group-hover:border-blue-400 transition-colors">
                    <Image
                      src={leader.image}
                      alt={leader.nameEn}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-extrabold text-slate-900 text-base sm:text-lg leading-tight group-hover:text-blue-700 transition-colors">
                      {locale === 'bn' ? leader.nameBn : leader.nameEn}
                    </h3>
                    <p className="text-xs sm:text-sm font-bold text-blue-600 mt-1">
                      {locale === 'bn' ? leader.roleBn : leader.roleEn}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5 font-medium truncate">
                      {locale === 'bn' ? leader.departmentBn : leader.departmentEn}
                    </p>
                  </div>
                </div>

                {/* Qualification */}
                <div className="bg-slate-50/90 p-3 rounded-xl border border-slate-100 mb-4 flex items-start gap-2">
                  <GraduationCap className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-[11px] text-slate-700 font-semibold leading-relaxed">
                    {locale === 'bn' ? leader.qualificationBn : leader.qualificationEn}
                  </p>
                </div>

                {/* Inspiring Quote / Message */}
                <div className="relative bg-blue-50/40 p-3.5 rounded-xl border border-blue-100/60 mb-4">
                  <Quote className="w-4 h-4 text-blue-400 mb-1" />
                  <p className="text-xs text-slate-700 italic leading-relaxed">
                    "{locale === 'bn' ? leader.quoteBn : leader.quoteEn}"
                  </p>
                </div>

                {/* Contact Information */}
                <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-mono text-[11px]">{leader.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-[11px] truncate">{leader.email}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 mt-2">
                <Link
                  href={leader.link}
                  className="w-full py-2.5 px-4 bg-white hover:bg-blue-600 text-slate-800 hover:text-white rounded-xl text-xs font-bold border border-slate-200/90 hover:border-blue-600 flex items-center justify-center gap-2 shadow-sm transition-all duration-200"
                >
                  <span>{locale === 'bn' ? leader.linkTextBn : leader.linkTextEn}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const { locale, t } = useLanguage();

  return (
    <footer className="bg-navy-950 text-slate-300 pt-16 pb-8 border-t border-blue-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand & About */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-blue-500/40 bg-white p-0.5 flex-shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="Mirsharai School and College Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-bold text-white text-base leading-snug">
                  {locale === 'bn' ? 'মিরসরাই স্কুল এন্ড কলেজ' : 'Mirsharai School and College'}
                </h3>
                <p className="text-xs text-blue-400 font-medium">
                  {locale === 'bn' ? 'মিরসরাই, চট্টগ্রাম' : 'Mirsharai, Chattogram'}
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {locale === 'bn'
                ? 'আমরা শিক্ষার্থীদের যুগোপযোগী ও মানবিক শিক্ষায় শিক্ষিত করে একবিংশ শতাব্দীর যোগ্য নাগরিক হিসেবে গড়ে তুলতে অঙ্গীকারবদ্ধ।'
                : 'We are committed to providing quality education, high moral discipline, and building an enlightened future for our students.'}
            </p>
            <div className="pt-2 text-xs text-slate-400">
              <span className="font-semibold text-slate-300">{t.institution.eiin}</span> | <span>{t.institution.estd}</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-blue-500 pl-2">
              {locale === 'bn' ? 'গুরুত্বপূর্ণ লিংক' : 'Quick Links'}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href={`/${locale}`} className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-blue-500"></span>
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/about`} className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-blue-500"></span>
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/academics`} className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-blue-500"></span>
                  {t.nav.academics}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/admission`} className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-blue-500"></span>
                  {t.nav.admission}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/notices`} className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-blue-500"></span>
                  {t.nav.notices}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Academic Portals & Downloads */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-amber-500 pl-2">
              {locale === 'bn' ? 'একাডেমিক সেবা' : 'Academic Links'}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href={`/${locale}/facilities`} className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-amber-500"></span>
                  {locale === 'bn' ? 'ক্যাম্পাস সুবিধাসমূহ' : 'Campus Facilities'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/results`} className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-amber-500"></span>
                  {locale === 'bn' ? 'ফলাফল অনুসন্ধান' : 'Results Access'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/downloads`} className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-amber-500"></span>
                  {t.nav.downloads}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/gallery`} className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-amber-500"></span>
                  {t.nav.gallery}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/events`} className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-amber-500"></span>
                  {t.nav.events}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/login`} className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-amber-500"></span>
                  {locale === 'bn' ? 'অনলাইন ফি পেমেন্ট' : 'Online Fee Payment'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Us */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-2">
              {t.nav.contact}
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300">{t.institution.location}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="text-slate-300">{t.institution.phone}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="text-slate-300">{t.institution.email}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 {locale === 'bn' ? 'মিরসরাই স্কুল এন্ড কলেজ' : 'Mirsharai School and College'}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href={`/${locale}/privacy`} className="hover:text-slate-400 transition-colors">
              {locale === 'bn' ? 'গোপনীয়তা নীতি' : 'Privacy Policy'}
            </Link>
            <span>•</span>
            <Link href={`/${locale}/terms`} className="hover:text-slate-400 transition-colors">
              {locale === 'bn' ? 'ব্যবহারের শর্তাবলি' : 'Terms of Use'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

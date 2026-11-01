'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import {
  MapPin,
  Phone,
  Mail,
  Github,
  Linkedin,
  Facebook,
  Instagram,
  Globe,
  ExternalLink,
} from 'lucide-react';

function XTwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function Footer() {
  const { locale, t } = useLanguage();

  const socialLinks = [
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/Shri.Tushar.K.Das/',
      icon: Facebook,
      ariaLabel: 'Facebook Profile',
      hoverClass: 'hover:text-white hover:bg-[#1877F2] hover:border-[#1877F2]',
      iconClass: 'w-4 h-4 text-slate-300',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/_tushar_kumar_das_/',
      icon: Instagram,
      ariaLabel: 'Instagram Profile',
      hoverClass:
        'hover:text-white hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] hover:border-transparent',
      iconClass: 'w-4 h-4 text-slate-300',
    },
    {
      name: 'X (Twitter)',
      url: 'https://x.com/_tushar_das_',
      customIcon: XTwitterIcon,
      ariaLabel: 'X (Twitter) Profile',
      hoverClass: 'hover:text-white hover:bg-black hover:border-black',
      iconClass: 'w-3.5 h-3.5 fill-current text-slate-300',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/tusharkumardas',
      icon: Linkedin,
      ariaLabel: 'LinkedIn Profile',
      hoverClass: 'hover:text-white hover:bg-[#0A66C2] hover:border-[#0A66C2]',
      iconClass: 'w-4 h-4 text-slate-300',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/Tushar-KDas',
      icon: Github,
      ariaLabel: 'GitHub Profile',
      hoverClass: 'hover:text-white hover:bg-slate-800 hover:border-slate-700',
      iconClass: 'w-4 h-4 text-slate-300',
    },
    {
      name: 'Portfolio',
      url: 'https://tushar-kumar-das.vercel.app',
      icon: Globe,
      ariaLabel: 'Personal Portfolio Website',
      hoverClass: 'hover:text-white hover:bg-emerald-600 hover:border-emerald-600',
      iconClass: 'w-4 h-4 text-slate-300',
    },
  ];

  return (
    <footer className="bg-navy-950 text-slate-300 pt-16 pb-8 border-t border-blue-900/40 relative overflow-hidden">
      {/* Background glow decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-blue-500/5 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12">
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

        {/* Developer Attribution & Social Links Section (Matching https://tushar-kumar-das.vercel.app) */}
        <div className="py-8 border-t border-slate-800/80 flex flex-col items-center justify-center gap-4 text-center">
          <div className="text-sm font-medium text-slate-300 flex items-center justify-center flex-wrap gap-1.5">
            <span>{locale === 'bn' ? 'Developed by' : 'Developed by'}</span>
            <a
              href="https://tushar-kumar-das.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-cyan-400 hover:text-cyan-300 underline underline-offset-4 transition-colors inline-flex items-center gap-1"
            >
              <span>Tushar Kumar Das</span>
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400/80" />
            </a>
          </div>

          {/* Social media circle buttons with exact interactive hover styling */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {socialLinks.map((item) => {
              const IconComponent = item.icon;
              const CustomComponent = item.customIcon;
              return (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.ariaLabel}
                  title={item.name}
                  className={`w-10 h-10 rounded-full bg-navy-900 border border-slate-800 flex items-center justify-center text-slate-300 transition-all duration-200 shadow-sm hover:scale-110 ${item.hoverClass}`}
                >
                  {CustomComponent ? (
                    <CustomComponent className={item.iconClass} />
                  ) : IconComponent ? (
                    <IconComponent className={item.iconClass} />
                  ) : null}
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom row copyright */}
        <div className="pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
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

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import { Menu, X, LogIn, GraduationCap, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const { locale, t } = useLanguage();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: `/${locale}`, label: t.nav.home },
    { href: `/${locale}/about`, label: t.nav.about },
    { href: `/${locale}/academics`, label: t.nav.academics },
    { href: `/${locale}/classes`, label: t.nav.classes },
    { href: `/${locale}/facilities`, label: locale === 'bn' ? 'ক্যাম্পাস সুবিধা' : 'Facilities' },
    { href: `/${locale}/teachers`, label: t.nav.teachers },
    { href: `/${locale}/admission`, label: t.nav.admission },
    { href: `/${locale}/notices`, label: t.nav.notices },
    { href: `/${locale}/events`, label: t.nav.events },
    { href: `/${locale}/gallery`, label: t.nav.gallery },
    { href: `/${locale}/downloads`, label: t.nav.downloads },
    { href: `/${locale}/contact`, label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & School Title */}
          <Link href={`/${locale}`} className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-blue-600/40 p-0.5 bg-white shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform">
              <Image
                src="/images/logo.png"
                alt="Mirsharai School and College Logo"
                width={48}
                height={48}
                className="object-contain"
                priority
              />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-navy-900 group-hover:text-blue-600 transition-colors tracking-tight leading-snug">
                {locale === 'bn' ? 'মিরসরাই স্কুল এন্ড কলেজ' : 'Mirsharai School and College'}
              </h1>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium flex items-center gap-1.5">
                <span>{locale === 'bn' ? 'মিরসরাই, চট্টগ্রাম' : 'Mirsharai, Chattogram'}</span>
                <span className="inline-block w-1 h-1 rounded-full bg-slate-300"></span>
                <span className="text-blue-700 font-semibold">{locale === 'bn' ? 'ইআইআইএন: ১০৪৫২৩' : 'EIIN: 104523'}</span>
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1 lg:space-x-1.5">
            {navLinks.slice(0, 7).map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-bold'
                      : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* More dropdown for extra links */}
            <div className="relative group">
              <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-50">
                <span>{locale === 'bn' ? 'আরও' : 'More'}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <div className="absolute right-0 top-full hidden group-hover:block w-44 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in-50">
                {navLinks.slice(7).map((subItem) => (
                  <Link
                    key={subItem.href}
                    href={subItem.href}
                    className="block px-4 py-2 text-xs font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    {subItem.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* Right Action: Language Switcher & Login CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <LanguageSwitcher />

            <Link
              href={`/${locale}/login`}
              className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-sm hover:shadow transition-all"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{t.nav.login}</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-6 space-y-1 shadow-lg animate-in slide-in-from-top-2">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-slate-800 hover:bg-blue-50 hover:text-blue-600"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            <Link
              href={`/${locale}/login`}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-lg text-sm font-semibold shadow"
            >
              <LogIn className="w-4 h-4" />
              {t.nav.login}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

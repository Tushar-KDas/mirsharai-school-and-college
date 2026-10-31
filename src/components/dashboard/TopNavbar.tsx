'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from '../public/LanguageSwitcher';
import { formatDate } from '@/lib/utils';
import {
  Menu,
  Search,
  Bell,
  User as UserIcon,
  CheckCircle2,
  Clock,
  UserPlus,
  CreditCard,
  Award,
  ChevronRight,
  X,
  Sparkles,
} from 'lucide-react';

interface TopNavbarProps {
  onMenuClick: () => void;
  user: {
    displayName: string;
    role: string;
    username: string;
  };
}

export default function TopNavbar({ onMenuClick, user }: TopNavbarProps) {
  const { locale, t } = useLanguage();
  const currentDate = new Date();

  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(4);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const notifications = [
    {
      id: 1,
      titleBn: 'নতুন অনলাইন ভর্তি আবেদন',
      titleEn: 'New Admission Application',
      descBn: 'আব্দুল্লাহ আল নোমান (একাদশ শ্রেণি - বিজ্ঞান)',
      descEn: 'Abdullah Al Noman applied for Class 11 (Science)',
      timeBn: '১০ মিনিট আগে',
      timeEn: '10m ago',
      icon: UserPlus,
      color: 'bg-blue-100 text-blue-600',
      href: `/${locale}/admin/admissions`,
    },
    {
      id: 2,
      titleBn: 'অনলাইন ফি পেমেন্ট সম্পন্ন',
      titleEn: 'Online Fee Payment Verified',
      descBn: 'তানভীর আহমেদ (রোল: ১০০১) বিকাশ পেমেন্ট ৳ ১,৫০০',
      descEn: 'Tanvir Ahmed (Roll: 1001) paid BDT 1,500 via bKash',
      timeBn: '৪৫ মিনিট আগে',
      timeEn: '45m ago',
      icon: CreditCard,
      color: 'bg-emerald-100 text-emerald-600',
      href: `/${locale}/admin/fees`,
    },
    {
      id: 3,
      titleBn: 'বার্ষিক পরীক্ষার সময়সূচি প্রস্তুত',
      titleEn: 'Annual Exam Schedule Ready',
      descBn: '৯ম-১২শ শ্রেণির বার্ষিক পরীক্ষা ২০২৬ এর রুটিন খসড়া',
      descEn: 'Class 9-12 Annual Examination 2026 Schedule',
      timeBn: '২ ঘণ্টা আগে',
      timeEn: '2h ago',
      icon: Award,
      color: 'bg-amber-100 text-amber-600',
      href: `/${locale}/admin/exams`,
    },
    {
      id: 4,
      titleBn: 'দৈনিক শিক্ষার্থী হাজিরা সম্পন্ন',
      titleEn: 'Daily Attendance Registered',
      descBn: 'দশম শ্রেণি বিজ্ঞান শাখা (পদ্মা) - ৯৫% উপস্থিত',
      descEn: 'Class 10 Science (Padma) - 95% attendance marked',
      timeBn: '৩ ঘণ্টা আগে',
      timeEn: '3h ago',
      icon: CheckCircle2,
      color: 'bg-purple-100 text-purple-600',
      href: `/${locale}/admin/attendance`,
    },
  ];

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMarkAllRead = () => {
    setUnreadCount(0);
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
      {/* Left: Mobile hamburger & Search */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative w-full hidden sm:block">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={t.common.search}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      {/* Right: Date, Language Switcher, Notifications & User Info */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Localized Date */}
        <div className="hidden md:block text-xs font-medium text-slate-500">
          {formatDate(currentDate, locale)}
        </div>

        {/* Language Switcher */}
        <LanguageSwitcher />

        {/* Notification Bell Dropdown Container */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors focus:outline-none"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 min-w-[16px] h-4 bg-rose-600 text-white rounded-full text-[9px] font-bold flex items-center justify-center px-0.5 shadow-sm ring-2 ring-white">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Interactive Notifications Popover */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-200/90 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-navy-950 text-xs">
                    {locale === 'bn' ? 'নোটিফিকেশন ও অ্যালার্ট' : 'Notifications & Alerts'}
                  </h3>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[10px] font-bold">
                      {unreadCount} {locale === 'bn' ? 'নতুন' : 'new'}
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={handleMarkAllRead}
                    className="text-[10px] font-bold text-blue-600 hover:text-blue-800"
                  >
                    {locale === 'bn' ? 'সব পঠিত করুন' : 'Mark all read'}
                  </button>
                )}
              </div>

              <div className="divide-y divide-slate-100 max-h-[360px] overflow-y-auto">
                {notifications.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => setShowNotifications(false)}
                      className="p-3.5 hover:bg-slate-50 transition-colors flex items-start gap-3 group block"
                    >
                      <div className={`w-8 h-8 rounded-xl ${item.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <p className="text-xs font-bold text-navy-900 group-hover:text-blue-600 transition-colors truncate">
                            {locale === 'bn' ? item.titleBn : item.titleEn}
                          </p>
                          <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">
                            {locale === 'bn' ? item.timeBn : item.timeEn}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-0.5 line-clamp-2 leading-relaxed">
                          {locale === 'bn' ? item.descBn : item.descEn}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>

              <div className="p-2 border-t border-slate-100 text-center bg-slate-50/50 rounded-b-3xl">
                <Link
                  href={`/${locale}/admin/notices`}
                  onClick={() => setShowNotifications(false)}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-800"
                >
                  <span>{locale === 'bn' ? 'সকল প্রাতিষ্ঠানিক নোটিশ দেখুন' : 'View All Notices'}</span>
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Pill */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
            {user.displayName ? user.displayName.charAt(0) : 'U'}
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-slate-800 leading-tight">
              {user.displayName || user.username}
            </p>
            <p className="text-[10px] text-blue-600 font-semibold uppercase tracking-wider">
              {t.roles[user.role as keyof typeof t.roles] || user.role}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

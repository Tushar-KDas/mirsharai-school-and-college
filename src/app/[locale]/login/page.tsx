'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from '@/components/public/LanguageSwitcher';
import {
  User,
  Lock,
  LogIn,
  GraduationCap,
  Users,
  Briefcase,
  ShieldCheck,
  Calculator,
  ArrowLeft,
  AlertCircle,
} from 'lucide-react';

export default function LoginPage() {
  const { locale, t } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectParam = searchParams.get('redirect');

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e?: React.FormEvent, customUser?: string, customPass?: string) => {
    if (e) e.preventDefault();
    const idToUse = customUser || identifier;
    const passToUse = customPass || password;

    if (!idToUse || !passToUse) {
      setErrorMsg(locale === 'bn' ? 'ব্যবহারকারী আইডি ও পাসওয়ার্ড লিখুন।' : 'Please enter ID and password.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: idToUse,
          password: passToUse,
          locale,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        if (redirectParam && redirectParam.startsWith('/')) {
          // Prevent redirect loops if role does not match destination
          if (redirectParam.includes('/super-admin') && data.user?.role !== 'SUPER_ADMIN') {
            router.push(data.dashboardUrl);
          } else if (redirectParam.includes('/admin') && data.user?.role !== 'ADMIN' && data.user?.role !== 'SUPER_ADMIN') {
            router.push(data.dashboardUrl);
          } else {
            router.push(redirectParam);
          }
        } else {
          router.push(data.dashboardUrl);
        }
        router.refresh();
      } else {
        setErrorMsg(
          data.error === 'INVALID_CREDENTIALS'
            ? t.auth.invalidCredentials
            : data.error || 'Login failed'
        );
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(locale === 'bn' ? 'নেটওয়ার্ক সংযোগে সমস্যা হয়েছে।' : 'Network connection error.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoLogin = (username: string) => {
    setIdentifier(username);
    setPassword('msc123456');
    handleLogin(undefined, username, 'msc123456');
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 bg-slate-900">
      {/* Background Campus Photo with Tint */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 scale-105"
        style={{ backgroundImage: `url('/images/school-campus.jpg')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-900/90 to-blue-950/70 backdrop-blur-[2px]" />

      {/* Top Bar with Home Link & Language Switcher */}
      <div className="absolute top-4 inset-x-4 max-w-5xl mx-auto flex items-center justify-between z-20">
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/90 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{locale === 'bn' ? 'ওয়েবসাইটে ফিরে যান' : 'Back to Website'}</span>
        </Link>
        <LanguageSwitcher className="bg-white/20 text-white" />
      </div>

      {/* Centered Login Card */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-slate-100 my-12">
        {/* School Crest & Heading */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-600/40 p-1 bg-white shadow-sm mx-auto">
            <Image
              src="/images/logo.png"
              alt="Mirsharai School Logo"
              width={64}
              height={64}
              className="object-contain"
              priority
            />
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold text-navy-900 tracking-tight">
            {locale === 'bn' ? 'মিরসরাই স্কুল এন্ড কলেজ' : 'Mirsharai School and College'}
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            {t.auth.loginSubtitle}
          </p>
        </div>

        {/* Error Notification */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-500" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              {t.auth.identifierLabel}
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder={t.auth.identifierPlaceholder}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              {t.auth.passwordLabel}
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t.auth.passwordPlaceholder}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-1.5 text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span>{t.auth.rememberMe}</span>
            </label>
            <button
              type="button"
              onClick={() => alert(locale === 'bn' ? 'পাসওয়ার্ড রিসেট করতে অ্যাডমিনের সাথে যোগাযোগ করুন (admin@mirsharaicollege.edu.bd)' : 'Please contact the administrator to reset your password.')}
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              {t.auth.forgotPassword}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md shadow-blue-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] disabled:opacity-50"
          >
            {loading ? (
              <span>{t.common.loading}</span>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>{t.auth.loginButton}</span>
              </>
            )}
          </button>
        </form>

        {/* Quick Demo Login Buttons as per Mockup */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <p className="text-[11px] font-bold text-slate-500 text-center uppercase tracking-wider mb-3">
            {t.auth.loginAs}
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('student')}
              className="p-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-[11px] font-bold flex flex-col items-center justify-center gap-1 transition-colors"
            >
              <GraduationCap className="w-4 h-4" />
              <span>{locale === 'bn' ? 'শিক্ষার্থী' : 'Student'}</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemoLogin('parent')}
              className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[11px] font-bold flex flex-col items-center justify-center gap-1 transition-colors"
            >
              <Users className="w-4 h-4" />
              <span>{locale === 'bn' ? 'অভিভাবক' : 'Parent'}</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemoLogin('teacher')}
              className="p-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[11px] font-bold flex flex-col items-center justify-center gap-1 transition-colors"
            >
              <Briefcase className="w-4 h-4" />
              <span>{locale === 'bn' ? 'শিক্ষক' : 'Teacher'}</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemoLogin('accountant')}
              className="p-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-[11px] font-bold flex flex-col items-center justify-center gap-1 transition-colors"
            >
              <Calculator className="w-4 h-4" />
              <span>{locale === 'bn' ? 'হিসাবরক্ষক' : 'Accountant'}</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemoLogin('admin')}
              className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 text-[11px] font-bold flex flex-col items-center justify-center gap-1 transition-colors"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{locale === 'bn' ? 'এডমিন' : 'Admin'}</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemoLogin('superadmin')}
              className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-[11px] font-bold flex flex-col items-center justify-center gap-1 transition-colors"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{locale === 'bn' ? 'সুপার এডমিন' : 'Super Admin'}</span>
            </button>
          </div>
        </div>

        {/* Footer info */}
        <p className="text-[10px] text-slate-400 text-center mt-5">
          © 2026 {locale === 'bn' ? 'মিরসরাই স্কুল এন্ড কলেজ' : 'Mirsharai School and College'}
        </p>
      </div>
    </div>
  );
}

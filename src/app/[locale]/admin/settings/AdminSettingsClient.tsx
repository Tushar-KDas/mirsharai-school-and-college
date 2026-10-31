'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  Settings,
  Building2,
  Phone,
  Mail,
  MapPin,
  Save,
  CheckCircle2,
  Calendar,
  Sparkles,
} from 'lucide-react';

interface SettingData {
  id?: string;
  nameBn?: string;
  nameEn?: string;
  eiin?: string;
  collegeCode?: string;
  establishedYear?: number;
  principalNameBn?: string;
  principalNameEn?: string;
  principalMessageBn?: string;
  principalMessageEn?: string;
  phone?: string;
  email?: string;
  addressBn?: string;
  addressEn?: string;
  admissionsOpen?: boolean;
  academicYear?: number;
}

export default function AdminSettingsClient({
  initialSetting,
}: {
  initialSetting: any;
}) {
  const { locale, t } = useLanguage();

  const [form, setForm] = useState<SettingData>({
    nameBn: initialSetting?.nameBn || 'মিরসরাই স্কুল এন্ড কলেজ',
    nameEn: initialSetting?.nameEn || 'Mirsharai School and College',
    eiin: initialSetting?.eiin || '104523',
    collegeCode: initialSetting?.collegeCode || '3201',
    establishedYear: initialSetting?.establishedYear || 1972,
    principalNameBn: initialSetting?.principalNameBn || 'প্রফেসর মো. কামরুল হাসান',
    principalNameEn: initialSetting?.principalNameEn || 'Prof. Md. Kamrul Hasan',
    principalMessageBn: initialSetting?.principalMessageBn || 'মিরসরাই স্কুল এন্ড কলেজ একটি ঐতিহ্যবাহী শিক্ষাপ্রতিষ্ঠান।',
    principalMessageEn: initialSetting?.principalMessageEn || 'Welcome to Mirsharai School and College, committed to excellence.',
    phone: initialSetting?.phone || '+880 1812-345678',
    email: initialSetting?.email || 'info@mirsharaicollege.edu.bd',
    addressBn: initialSetting?.addressBn || 'মিরসরাই, চট্টগ্রাম, বাংলাদেশ',
    addressEn: initialSetting?.addressEn || 'Mirsharai, Chattogram, Bangladesh',
    admissionsOpen: initialSetting?.admissionsOpen !== false,
    academicYear: initialSetting?.academicYear || 2026,
  });

  const [loading, setLoading] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSavedSuccess(false);

    try {
      const res = await fetch('/api/super-admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 4000);
      } else {
        setErrorMsg(data.error || 'Failed to update settings');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(locale === 'bn' ? 'সংরক্ষণ ব্যর্থ হয়েছে।' : 'Failed to save settings.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Settings className="w-3.5 h-3.5" />
            <span>{locale === 'bn' ? 'সিস্টেম কনফিগারেশন' : 'System Configuration'}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-navy-950 tracking-tight">
            {locale === 'bn' ? 'প্রতিষ্ঠান ও একাডেমিক সেটিংস' : 'Institutional Settings'}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {locale === 'bn'
              ? 'স্কুল ও কলেজের নাম, কোড, যোগাযোগের তথ্য এবং ভর্তি সেটিংস পরিচালনা করুন'
              : 'Manage institution profile, official identification, contact details, and admissions'}
          </p>
        </div>

        {savedSuccess && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{locale === 'bn' ? 'সেটিংস সফলভাবে সংরক্ষিত হয়েছে!' : 'Settings successfully saved!'}</span>
          </div>
        )}
      </div>

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Official Identity */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-navy-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-blue-600" />
            <span>{locale === 'bn' ? 'প্রাতিষ্ঠানিক পরিচিতি ও কোড' : 'Institutional Identity & Codes'}</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {locale === 'bn' ? 'প্রতিষ্ঠানের নাম (বাংলা)' : 'Institution Name (Bangla)'} *
              </label>
              <input
                type="text"
                name="nameBn"
                value={form.nameBn || ''}
                onChange={handleChange}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {locale === 'bn' ? 'প্রতিষ্ঠানের নাম (English)' : 'Institution Name (English)'} *
              </label>
              <input
                type="text"
                name="nameEn"
                value={form.nameEn || ''}
                onChange={handleChange}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {locale === 'bn' ? 'ইআইআইএন (EIIN)' : 'EIIN Number'} *
              </label>
              <input
                type="text"
                name="eiin"
                value={form.eiin || ''}
                onChange={handleChange}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-mono font-bold text-blue-700"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {locale === 'bn' ? 'কলেজ কোড' : 'College Code'} *
              </label>
              <input
                type="text"
                name="collegeCode"
                value={form.collegeCode || ''}
                onChange={handleChange}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {locale === 'bn' ? 'প্রতিষ্ঠার সন' : 'Established Year'}
              </label>
              <input
                type="number"
                name="establishedYear"
                value={form.establishedYear || 1972}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {locale === 'bn' ? 'বর্তমান শিক্ষাবর্ষ' : 'Current Academic Year'}
              </label>
              <input
                type="number"
                name="academicYear"
                value={form.academicYear || 2026}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-mono font-bold text-emerald-700"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Contact Information */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-navy-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Phone className="w-4 h-4 text-emerald-600" />
            <span>{locale === 'bn' ? 'যোগাযোগ ও অবস্থান' : 'Contact Information & Helpline'}</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {locale === 'bn' ? 'হেল্পলাইন / ফোন নম্বর' : 'Official Telephone / Phone'}
              </label>
              <input
                type="text"
                name="phone"
                value={form.phone || ''}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {locale === 'bn' ? 'অফিসিয়াল ইমেইল' : 'Official Email Address'}
              </label>
              <input
                type="email"
                name="email"
                value={form.email || ''}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">
                {locale === 'bn' ? 'ক্যাম্পাস ঠিকানা' : 'Campus Physical Address'}
              </label>
              <input
                type="text"
                name="addressBn"
                value={form.addressBn || ''}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Admissions Toggle */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-navy-950">
              {locale === 'bn' ? 'অনলাইন ভর্তি আবেদন সক্রিয় রাখুন' : 'Online Admissions Status'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {locale === 'bn'
                ? 'সক্রিয় রাখলে পাবলিক ওয়েবসাইটে নতুন শিক্ষার্থীরা অনলাইনে আবেদন করতে পারবে'
                : 'When enabled, prospective students can apply online through the public website'}
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="admissionsOpen"
              checked={form.admissionsOpen}
              onChange={handleChange}
              className="sr-only peer"
            />
            <div className="w-12 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
          </label>
        </div>

        {/* Action Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-xs flex items-center gap-2 shadow-md shadow-blue-600/30 transition-all hover:scale-105 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? (locale === 'bn' ? 'সংরক্ষণ হচ্ছে...' : 'Saving...') : (locale === 'bn' ? 'সেটিংস সংরক্ষণ করুন' : 'Save Changes')}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

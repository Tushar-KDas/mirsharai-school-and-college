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
  X,
  CreditCard,
  GraduationCap,
  Sparkles,
} from 'lucide-react';

interface SettingData {
  id?: string;
  nameBn?: string;
  nameEn?: string;
  eiin?: string;
  collegeCode?: string;
  establishedYear?: number;
  estdYear?: number;
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

export default function SuperAdminSettingsClient({
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
    establishedYear: initialSetting?.establishedYear || initialSetting?.estdYear || 1972,
    principalNameBn: initialSetting?.principalNameBn || 'প্রফেসর ড. মোহাম্মদ রফিকুল ইসলাম',
    principalNameEn: initialSetting?.principalNameEn || 'Prof. Dr. Mohammad Rafiqul Islam',
    principalMessageBn: initialSetting?.principalMessageBn || 'মিরসরাই স্কুল এন্ড কলেজ একটি ঐতিহ্যবাহী শিক্ষাপ্রতিষ্ঠান।',
    principalMessageEn: initialSetting?.principalMessageEn || 'Welcome to Mirsharai School and College, dedicated to academic excellence.',
    phone: initialSetting?.phone || '+8801800-000000',
    email: initialSetting?.email || 'info@mirsharaicollege.edu.bd',
    addressBn: initialSetting?.addressBn || 'মিরসরাই, চট্টগ্রাম, বাংলাদেশ',
    addressEn: initialSetting?.addressEn || 'Mirsharai, Chattogram, Bangladesh',
    admissionsOpen: initialSetting?.admissionsOpen !== false,
    academicYear: initialSetting?.academicYear || 2026,
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
    setSuccessMsg(false);
    setErrorMsg('');

    try {
      const res = await fetch('/api/super-admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMsg(true);
        setTimeout(() => setSuccessMsg(false), 5000);
      } else {
        setErrorMsg(data.error || 'Failed to save settings');
      }
    } catch {
      setErrorMsg('Network error while saving settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Toast Feedback */}
      {successMsg && (
        <div className="p-4 bg-emerald-600 text-white rounded-2xl shadow-md text-xs font-bold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <span>
              {locale === 'bn'
                ? 'প্রতিষ্ঠান সেটিংস সফলভাবে সংরক্ষিত ও আপডেট হয়েছে!'
                : 'Institution settings saved and published successfully!'}
            </span>
          </div>
          <button onClick={() => setSuccessMsg(false)}>
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 bg-rose-600 text-white rounded-2xl shadow-md text-xs font-bold flex items-center justify-between">
          <span>{errorMsg}</span>
          <button onClick={() => setErrorMsg('')}>
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">
            <Settings className="w-4 h-4" />
            <span>{locale === 'bn' ? 'সিস্টেম ও প্রতিষ্ঠান কনফিগারেশন' : 'System Configuration'}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {locale === 'bn' ? 'প্রতিষ্ঠান সেটিংস ও ওয়েবসাইট নিয়ন্ত্রণ' : 'School Profile & Website Settings'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {locale === 'bn'
              ? 'স্কুলের নাম, ইআইআইএন, অধ্যক্ষের বাণী, যোগাযোগের তথ্য ও অনলাইন ভর্তি নিয়ন্ত্রণ'
              : 'Full configuration of institution identity, admissions, contact, and leadership'}
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={loading}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md shadow-blue-600/30 transition-all self-start sm:self-auto hover:scale-105 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{loading ? 'Saving...' : locale === 'bn' ? 'পরিবর্তন সংরক্ষণ করুন' : 'Save Settings'}</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Institutional Identity */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Building2 className="w-5 h-5 text-blue-600" />
            <h2 className="text-sm font-bold text-slate-900">
              {locale === 'bn' ? 'প্রাতিষ্ঠানিক পরিচিতি ও পরিচিতি কোড' : 'Institution Identity & Regulatory Codes'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                {locale === 'bn' ? 'প্রতিষ্ঠানের নাম (বাংলা)' : 'School Name (Bangla)'}
              </label>
              <input
                type="text"
                name="nameBn"
                value={form.nameBn || ''}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-semibold"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                {locale === 'bn' ? 'প্রতিষ্ঠানের নাম (English)' : 'School Name (English)'}
              </label>
              <input
                type="text"
                name="nameEn"
                value={form.nameEn || ''}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-semibold"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                EIIN Number
              </label>
              <input
                type="text"
                name="eiin"
                value={form.eiin || ''}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 font-mono font-bold focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                College / Institute Code
              </label>
              <input
                type="text"
                name="collegeCode"
                value={form.collegeCode || ''}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 font-mono font-bold focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                {locale === 'bn' ? 'প্রতিষ্ঠা সাল' : 'Established Year'}
              </label>
              <input
                type="number"
                name="estdYear"
                value={form.estdYear || 1972}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 font-mono font-bold focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                {locale === 'bn' ? 'বর্তমান শিক্ষাবর্ষ' : 'Current Academic Session'}
              </label>
              <input
                type="number"
                name="academicYear"
                value={form.academicYear || 2026}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 font-mono font-bold focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Admissions & Status Toggle */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <GraduationCap className="w-5 h-5 text-indigo-600" />
            <h2 className="text-sm font-bold text-slate-900">
              {locale === 'bn' ? 'অনলাইন ভর্তি ও আবেদন স্ট্যাটাস' : 'Online Admission Control'}
            </h2>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div>
              <p className="text-xs font-bold text-slate-900">
                {locale === 'bn' ? 'অনলাইন ভর্তি কার্যক্রম চালু রাখুন' : 'Open Online Admission Application'}
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {locale === 'bn'
                  ? 'চালু থাকলে ওয়েবসাইটে আবেদন লিংক এবং ভর্তি ফর্ম কার্যকর থাকবে'
                  : 'Allows public visitors to submit admission applications for Classes 1 to 12'}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="admissionsOpen"
                checked={form.admissionsOpen === true}
                onChange={(e) => setForm((p) => ({ ...p, admissionsOpen: e.target.checked }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>
        </div>

        {/* Section 3: Leadership & Principal Info */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <h2 className="text-sm font-bold text-slate-900">
              {locale === 'bn' ? 'অধ্যক্ষের পরিচিতি ও প্রাতিষ্ঠানিক বার্তা' : 'Principal Information & Official Message'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                {locale === 'bn' ? 'অধ্যক্ষের নাম (বাংলা)' : "Principal's Name (Bangla)"}
              </label>
              <input
                type="text"
                name="principalNameBn"
                value={form.principalNameBn || ''}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 font-semibold"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                {locale === 'bn' ? 'অধ্যক্ষের নাম (English)' : "Principal's Name (English)"}
              </label>
              <input
                type="text"
                name="principalNameEn"
                value={form.principalNameEn || ''}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 font-semibold"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="font-bold text-slate-700 block mb-1">
                {locale === 'bn' ? 'অধ্যক্ষের বার্তা (বাংলা)' : "Principal's Message (Bangla)"}
              </label>
              <textarea
                rows={3}
                name="principalMessageBn"
                value={form.principalMessageBn || ''}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="font-bold text-slate-700 block mb-1">
                {locale === 'bn' ? 'অধ্যক্ষের বার্তা (English)' : "Principal's Message (English)"}
              </label>
              <textarea
                rows={3}
                name="principalMessageEn"
                value={form.principalMessageEn || ''}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Contact & Location */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Phone className="w-5 h-5 text-emerald-600" />
            <h2 className="text-sm font-bold text-slate-900">
              {locale === 'bn' ? 'যোগাযোগ ও অবস্থান' : 'Official Contact & Campus Location'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                {locale === 'bn' ? 'ফোন নম্বর' : 'Helpline / Phone'}
              </label>
              <input
                type="text"
                name="phone"
                value={form.phone || ''}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 font-mono font-semibold"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                {locale === 'bn' ? 'দাপ্তরিক ইমেইল' : 'Official Email'}
              </label>
              <input
                type="email"
                name="email"
                value={form.email || ''}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 font-mono font-semibold"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                {locale === 'bn' ? 'ঠিকানা (বাংলা)' : 'Address (Bangla)'}
              </label>
              <input
                type="text"
                name="addressBn"
                value={form.addressBn || ''}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                {locale === 'bn' ? 'ঠিকানা (English)' : 'Address (English)'}
              </label>
              <input
                type="text"
                name="addressEn"
                value={form.addressEn || ''}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2"
              />
            </div>
          </div>
        </div>

        {/* Bottom Save Bar */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-xs font-bold shadow-md shadow-blue-600/30 transition-all hover:scale-105 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? 'Saving...' : locale === 'bn' ? 'সকল পরিবর্তন সংরক্ষণ করুন' : 'Save All Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

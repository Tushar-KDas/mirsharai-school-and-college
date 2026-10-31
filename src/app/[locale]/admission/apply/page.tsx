'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AnnouncementBar from '@/components/public/AnnouncementBar';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import { useLanguage } from '@/context/LanguageContext';
import {
  UserCheck,
  Send,
  CheckCircle2,
  Printer,
  ArrowLeft,
  FileCheck,
} from 'lucide-react';

export default function ApplyAdmissionPage() {
  const { locale, t } = useLanguage();

  const [formData, setFormData] = useState({
    applicantBn: '',
    applicantEn: '',
    applyingClass: '6',
    group: 'GENERAL',
    gender: 'MALE',
    dob: '2012-05-10',
    bloodGroup: 'B+',
    guardianNameBn: '',
    guardianNameEn: '',
    guardianPhone: '',
    guardianEmail: '',
    address: 'মিরসরাই, চট্টগ্রাম',
    previousSchool: 'Mirsharai Primary School',
    gpa: '5.00',
  });

  const [loading, setLoading] = useState(false);
  const [submittedApp, setSubmittedApp] = useState<any | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/admission/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmittedApp({
          ...formData,
          applicationNo: data.applicationNo,
        });
      } else {
        alert(data.error || 'Submission failed');
      }
    } catch (err) {
      console.error(err);
      alert('Network error while submitting application');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <AnnouncementBar />
      <Navbar />

      <div className="bg-navy-950 text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-blue-900/40">
        <div className="max-w-4xl mx-auto">
          <Link
            href={`/${locale}/admission`}
            className="inline-flex items-center gap-1.5 text-xs text-blue-300 hover:text-white mb-3"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{locale === 'bn' ? 'ভর্তি নির্দেশিকায় ফিরুন' : 'Back to Admission Guidelines'}</span>
          </Link>
          <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight">
            {locale === 'bn' ? 'অনলাইন ভর্তি আবেদন ফরম (২০২৬ শিক্ষাবর্ষ)' : 'Online Admission Application (Session 2026)'}
          </h1>
          <p className="text-xs text-blue-200 mt-1">
            {locale === 'bn'
              ? '১ম শ্রেণি থেকে ১২শ শ্রেণি পর্যন্ত অনলাইনে সহজে আবেদন করুন'
              : 'Apply online for Classes 1 to 12. Accurate information is required.'}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        {!submittedApp ? (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-6"
          >
            {/* Candidate Info Section */}
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-navy-900 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                <span>{locale === 'bn' ? 'শিক্ষার্থীর সাধারণ তথ্য' : 'Student Information'}</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {locale === 'bn' ? 'শিক্ষার্থীর পূর্ণ নাম (বাংলায়)' : "Candidate's Full Name (in Bangla)"} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.applicantBn}
                    onChange={(e) => setFormData({ ...formData, applicantBn: e.target.value })}
                    placeholder="যেমন: তানভীর আহমেদ"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {locale === 'bn' ? 'শিক্ষার্থীর পূর্ণ নাম (ইংরেজিতে)' : "Candidate's Full Name (in English)"} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.applicantEn}
                    onChange={(e) => setFormData({ ...formData, applicantEn: e.target.value })}
                    placeholder="e.g. Tanvir Ahmed"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {locale === 'bn' ? 'আবেদনকৃত শ্রেণি' : 'Applying Class'} *
                  </label>
                  <select
                    value={formData.applyingClass}
                    onChange={(e) => setFormData({ ...formData, applyingClass: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                      <option key={num} value={num}>
                        {locale === 'bn' ? `${num}ম শ্রেণি` : `Class ${num}`}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {locale === 'bn' ? 'বিভাগ (৯ম-১২শ শ্রেণির জন্য)' : 'Group (Class 9-12)'}
                  </label>
                  <select
                    value={formData.group}
                    onChange={(e) => setFormData({ ...formData, group: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  >
                    <option value="GENERAL">{locale === 'bn' ? 'সাধারণ (১ম-৮ম শ্রেণি)' : 'General (Class 1-8)'}</option>
                    <option value="SCIENCE">{locale === 'bn' ? 'বিজ্ঞান বিভাগ' : 'Science'}</option>
                    <option value="HUMANITIES">{locale === 'bn' ? 'মানবিক বিভাগ' : 'Humanities'}</option>
                    <option value="BUSINESS_STUDIES">{locale === 'bn' ? 'ব্যবসায় শিক্ষা বিভাগ' : 'Business Studies'}</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {locale === 'bn' ? 'লিঙ্গ' : 'Gender'} *
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-800"
                  >
                    <option value="MALE">{locale === 'bn' ? 'ছাত্র (পুরুষ)' : 'Male'}</option>
                    <option value="FEMALE">{locale === 'bn' ? 'ছাত্রী (মহিলা)' : 'Female'}</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {locale === 'bn' ? 'জন্ম তারিখ' : 'Date of Birth'} *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Guardian Information */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h2 className="text-sm font-bold text-navy-900 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                <span>{locale === 'bn' ? 'অভিভাবকের তথ্য ও যোগাযোগ' : 'Guardian Details & Contact'}</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {locale === 'bn' ? 'অভিভাবকের নাম (বাংলায়)' : "Guardian's Name (Bangla)"}
                  </label>
                  <input
                    type="text"
                    value={formData.guardianNameBn}
                    onChange={(e) => setFormData({ ...formData, guardianNameBn: e.target.value })}
                    placeholder="যেমন: মোঃ নুরুল ইসলাম"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {locale === 'bn' ? 'অভিভাবকের নাম (ইংরেজিতে)' : "Guardian's Name (English)"}
                  </label>
                  <input
                    type="text"
                    value={formData.guardianNameEn}
                    onChange={(e) => setFormData({ ...formData, guardianNameEn: e.target.value })}
                    placeholder="e.g. Md. Nurul Islam"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {locale === 'bn' ? 'অভিভাবকের মোবাইল নম্বর' : 'Guardian Mobile Phone'} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.guardianPhone}
                    onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                    placeholder="018XXXXXXXX"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-mono font-medium"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {locale === 'bn' ? 'বর্তমান ঠিকানা' : 'Present Address'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="যেমন: মিরসরাই, চট্টগ্রাম"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-md shadow-blue-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {loading ? (
                <span>{t.common.loading}</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>{locale === 'bn' ? 'ভর্তি আবেদন জমা দিন' : 'Submit Admission Application'}</span>
                </>
              )}
            </button>
          </form>
        ) : (
          /* Submission Slip */
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-md text-center space-y-6 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <h2 className="text-xl font-bold text-slate-900">
                {locale === 'bn' ? 'ভর্তি আবেদন সফলভাবে সম্পন্ন হয়েছে!' : 'Application Submitted Successfully!'}
              </h2>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                {locale === 'bn'
                  ? 'আপনার আবেদন নম্বরটি সংরক্ষণ করুন। ফলাফল ও যাচাইয়ের অগ্রগতি নোটিশ বোর্ডের মাধ্যমে জানানো হবে।'
                  : 'Please save your reference number for verification and admission processing.'}
              </p>
            </div>

            {/* Slip Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 max-w-md mx-auto text-left text-xs space-y-2.5">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="text-slate-500 font-semibold">{locale === 'bn' ? 'আবেদন ট্র্যাকিং নং' : 'Application No'}:</span>
                <span className="font-mono font-extrabold text-blue-700 text-sm">{submittedApp.applicationNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{locale === 'bn' ? 'আবেদনকারী' : 'Applicant'}:</span>
                <span className="font-bold text-slate-900">{submittedApp.applicantBn} ({submittedApp.applicantEn})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{locale === 'bn' ? 'শ্রেণি ও বিভাগ' : 'Class & Group'}:</span>
                <span className="font-semibold text-slate-800">Class {submittedApp.applyingClass} ({submittedApp.group})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{locale === 'bn' ? 'যোগাযোগের নম্বর' : 'Phone'}:</span>
                <span className="font-mono text-slate-800">{submittedApp.guardianPhone}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                onClick={() => window.print()}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow flex items-center justify-center gap-1.5 transition-all"
              >
                <Printer className="w-4 h-4" />
                <span>{locale === 'bn' ? 'আবেদন স্লিপ প্রিন্ট করুন' : 'Print Application Slip'}</span>
              </button>
              <Link
                href={`/${locale}`}
                className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-all text-center"
              >
                {locale === 'bn' ? 'হোমে ফিরে যান' : 'Return Home'}
              </Link>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

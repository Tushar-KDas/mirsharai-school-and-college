import React from 'react';
import AnnouncementBar from '@/components/public/AnnouncementBar';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import ContactFormClient from '@/components/public/ContactFormClient';
import { Locale, isValidLocale, defaultLocale } from '@/lib/i18n';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale: Locale = isValidLocale(resolvedParams.locale)
    ? (resolvedParams.locale as Locale)
    : defaultLocale;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <AnnouncementBar />
      <Navbar />

      <div className="bg-navy-950 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {locale === 'bn' ? 'যোগাযোগ ও অবস্থান' : 'Contact & Location'}
          </h1>
          <p className="text-xs sm:text-sm text-blue-200 mt-2">
            {locale === 'bn' ? 'আমাদের সাথে সরাসরি যোগাযোগ করুন বা তথ্য অনুসন্ধান পাঠান' : 'Reach out to our administrative helpline and campus office'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Info (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-navy-900">
            {locale === 'bn' ? 'প্রাতিষ্ঠানিক যোগাযোগ তথ্য' : 'Campus Office Address'}
          </h2>

          <div className="space-y-4 text-xs">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-slate-900">{locale === 'bn' ? 'ঠিকানা' : 'Address'}</p>
                <p className="text-slate-600 mt-0.5">
                  {locale === 'bn' ? 'মিরসরাই, চট্টগ্রাম, বাংলাদেশ' : 'Mirsharai, Chattogram, Bangladesh'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-slate-900">{locale === 'bn' ? 'টেলিফোন / হেল্পলাইন' : 'Telephone / Hotline'}</p>
                <p className="text-slate-600 mt-0.5">+880 1812-345678</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-slate-900">{locale === 'bn' ? 'ইমেইল' : 'Official Email'}</p>
                <p className="text-slate-600 mt-0.5">info@mirsharaicollege.edu.bd</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-slate-900">{locale === 'bn' ? 'দাপ্তরিক কর্মঘণ্টা' : 'Office Hours'}</p>
                <p className="text-slate-600 mt-0.5">
                  {locale === 'bn' ? 'রবিবার - বৃহস্পতিবার: সকাল ৯:০০ - বিকাল ৪:০০' : 'Sunday - Thursday: 9:00 AM - 4:00 PM'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Message Send Form (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-navy-900">
            {locale === 'bn' ? 'বার্তা পাঠান' : 'Send an Inquiry'}
          </h2>

          <ContactFormClient locale={locale} />
        </div>
      </div>

      <Footer />
    </div>
  );
}

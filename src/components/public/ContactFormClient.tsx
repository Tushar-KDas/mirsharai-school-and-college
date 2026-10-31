'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export default function ContactFormClient({ locale }: { locale: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  if (submitted) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-3">
        <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
        <h3 className="text-base font-bold text-emerald-900">
          {locale === 'bn' ? 'বার্তা সফলভাবে পাঠানো হয়েছে!' : 'Message Sent Successfully!'}
        </h3>
        <p className="text-xs text-emerald-700">
          {locale === 'bn'
            ? 'আপনার অনুসন্ধান আমাদের অফিস গ্রহণ করেছে। অতিশীঘ্রই যোগাযোগ করা হবে।'
            : 'Our administration office has received your inquiry. We will contact you shortly.'}
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setFormData({ name: '', phone: '', subject: '', message: '' });
          }}
          className="mt-2 text-xs font-semibold text-emerald-800 underline hover:text-emerald-950"
        >
          {locale === 'bn' ? 'নতুন বার্তা পাঠান' : 'Send another message'}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            {locale === 'bn' ? 'আপনার নাম' : 'Your Name'} *
          </label>
          <input
            type="text"
            required
            placeholder={locale === 'bn' ? 'নাম লিখুন' : 'Full Name'}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            {locale === 'bn' ? 'ফোন নম্বর' : 'Phone Number'} *
          </label>
          <input
            type="tel"
            required
            placeholder="018XXXXXXXX"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block font-semibold text-slate-700 mb-1">
          {locale === 'bn' ? 'বিষয়ের শিরোনাম' : 'Subject'} *
        </label>
        <input
          type="text"
          required
          placeholder={locale === 'bn' ? 'অনুসন্ধানের বিষয়' : 'Inquiry subject'}
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block font-semibold text-slate-700 mb-1">
          {locale === 'bn' ? 'আপনার বার্তা' : 'Message'} *
        </label>
        <textarea
          rows={4}
          required
          placeholder={locale === 'bn' ? 'এখানে আপনার বার্তা লিখুন...' : 'Write your message here...'}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow flex items-center gap-2 transition-all disabled:opacity-50"
      >
        <Send className="w-3.5 h-3.5" />
        <span>{loading ? (locale === 'bn' ? 'পাঠানো হচ্ছে...' : 'Sending...') : (locale === 'bn' ? 'বার্তা পাঠান' : 'Send Message')}</span>
      </button>
    </form>
  );
}

import React from 'react';
import AnnouncementBar from '@/components/public/AnnouncementBar';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import prisma from '@/lib/prisma';
import { Locale, isValidLocale, defaultLocale } from '@/lib/i18n';
import { Download, FileText, CheckCircle } from 'lucide-react';

import DownloadButtonClient from '@/components/public/DownloadButtonClient';

export default async function DownloadsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale: Locale = isValidLocale(resolvedParams.locale)
    ? (resolvedParams.locale as Locale)
    : defaultLocale;

  const downloads = await prisma.downloadItem.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <AnnouncementBar />
      <Navbar />

      <div className="bg-navy-950 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {locale === 'bn' ? 'ডাউনলোড কর্নার' : 'Downloads Corner'}
          </h1>
          <p className="text-xs sm:text-sm text-blue-200 mt-2">
            {locale === 'bn' ? 'সিলেবাস, একাডেমিক ক্যালেন্ডার, ভর্তি ফরম ও নির্দেশিকা' : 'Download academic syllabus, holiday lists, prospectuses, and application forms'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 space-y-4">
        {downloads.map((d) => (
          <div
            key={d.id}
            className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between gap-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {d.category}
                </span>
                <h3 className="font-bold text-navy-900 text-sm mt-1">
                  {locale === 'bn' ? d.titleBn : d.titleEn}
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5 font-mono">
                  File Size: {d.fileSize}
                </p>
              </div>
            </div>

            <DownloadButtonClient
              title={locale === 'bn' ? d.titleBn : d.titleEn}
              category={d.category}
              locale={locale}
            />
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}

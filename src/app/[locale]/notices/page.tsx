import React from 'react';
import AnnouncementBar from '@/components/public/AnnouncementBar';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import prisma from '@/lib/prisma';
import { Locale, isValidLocale, defaultLocale } from '@/lib/i18n';
import NoticeBoardClient from '@/components/public/NoticeBoardClient';
import { fallbackNotices } from '@/data/fallbackData';
import { getNoticesCloud } from '@/lib/cloudStore';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function NoticesPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ category?: string }>;
}) {
  const resolvedParams = await params;
  const locale: Locale = isValidLocale(resolvedParams.locale)
    ? (resolvedParams.locale as Locale)
    : defaultLocale;

  const resolvedSearch = searchParams ? await searchParams : {};
  const selectedCat = resolvedSearch?.category;

  let notices: any[] = [];
  try {
    const [dbNotices, cloudNotices] = await Promise.all([
      prisma.notice.findMany({
        where: {
          status: 'PUBLISHED',
          ...(selectedCat ? { category: selectedCat } : {}),
        },
        orderBy: { publishedAt: 'desc' },
      }),
      getNoticesCloud(50),
    ]);

    const noticeMap = new Map();
    (cloudNotices || []).forEach((n) => {
      if (!selectedCat || n.category === selectedCat) {
        noticeMap.set(n.id, n);
      }
    });
    (dbNotices || []).forEach((n) => {
      if (!noticeMap.has(n.id)) noticeMap.set(n.id, n);
    });
    notices = Array.from(noticeMap.values());
    notices.sort((a, b) => {
      const tA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const tB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      return (isNaN(tB) ? 0 : tB) - (isNaN(tA) ? 0 : tA);
    });
  } catch (error) {
    console.warn('Notices query fallback activated:', error);
  }

  if (!notices || notices.length === 0) {
    notices = selectedCat ? fallbackNotices.filter(n => n.category === selectedCat) : fallbackNotices;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <AnnouncementBar />
      <Navbar />

      <div className="bg-navy-950 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {locale === 'bn' ? 'অফিশিয়াল নোটিশ বোর্ড' : 'Official Notice Board'}
          </h1>
          <p className="text-xs sm:text-sm text-blue-200 mt-2">
            {locale === 'bn' ? 'বিদ্যালয় ও কলেজের সকল গুরুত্বপূর্ণ নোটিশ, সার্কুলার ও সময়সূচি' : 'Institutional notices, circulars, exam schedules, and holiday announcements'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1">
        <NoticeBoardClient
          initialNotices={notices}
          selectedCategory={selectedCat || ''}
        />
      </div>

      <Footer />
    </div>
  );
}

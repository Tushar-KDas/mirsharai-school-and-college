import React from 'react';
import Link from 'next/link';
import AnnouncementBar from '@/components/public/AnnouncementBar';
import Navbar from '@/components/public/Navbar';
import HeroBanner from '@/components/public/HeroBanner';
import Footer from '@/components/public/Footer';
import CampusFacilitiesSection from '@/components/public/CampusFacilitiesSection';
import HomeGallerySection from '@/components/public/HomeGallerySection';
import InstitutionalLeadershipSection from '@/components/public/InstitutionalLeadershipSection';
import prisma from '@/lib/prisma';
import { Locale, isValidLocale, defaultLocale } from '@/lib/i18n';
import { formatDate } from '@/lib/utils';
import { fallbackNotices, fallbackEvents, fallbackGalleryItems } from '@/data/fallbackData';
import { getNoticesCloud } from '@/lib/cloudStore';
import {
  Bell,
  Calendar,
  ArrowRight,
  ChevronRight,
  MapPin,
} from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale: Locale = isValidLocale(resolvedParams.locale)
    ? (resolvedParams.locale as Locale)
    : defaultLocale;

  // Query dynamic data from database with robust fallback protection
  let notices: any[] = [];
  let events: any[] = [];
  let galleryItems: any[] = [];

  try {
    const [dbNotices, dbEvents, dbGalleryItems, cloudNotices] = await Promise.all([
      prisma.notice.findMany({
        where: { status: 'PUBLISHED' },
        orderBy: { publishedAt: 'desc' },
        take: 6,
      }).catch(() => []),
      prisma.academicEvent.findMany({
        where: { isPublic: true },
        orderBy: { startDate: 'asc' },
        take: 3,
      }).catch(() => []),
      prisma.galleryItem.findMany({
        orderBy: { order: 'asc' },
        take: 24,
      }).catch(() => []),
      getNoticesCloud(30).catch(() => []),
    ]);

    const noticeMap = new Map();
    (cloudNotices || []).forEach((n) => {
      if (n && n.id) noticeMap.set(n.id, n);
    });
    (dbNotices || []).forEach((n) => {
      if (n && n.id && !noticeMap.has(n.id)) noticeMap.set(n.id, n);
    });
    notices = Array.from(noticeMap.values());
    notices.sort((a, b) => {
      const tA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const tB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      return (isNaN(tB) ? 0 : tB) - (isNaN(tA) ? 0 : tA);
    });
    notices = notices.slice(0, 5);
    events = dbEvents || [];
    galleryItems = dbGalleryItems || [];
  } catch (error) {
    console.warn('Prisma query warning on HomePage, fallback activated:', error);
  }

  if (!notices || notices.length === 0) notices = fallbackNotices;
  if (!events || events.length === 0) events = fallbackEvents;
  if (!galleryItems || galleryItems.length === 0) galleryItems = fallbackGalleryItems;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <AnnouncementBar />
      <Navbar />
      <HeroBanner />

      {/* Institutional Leadership & Administration (Principal, Vice Principal, Treasurer) */}
      <InstitutionalLeadershipSection />

      {/* Main Grid: Latest Notices | Our Facilities | Upcoming Events */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Col 1: Latest Notices (5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <Bell className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-bold text-slate-900 text-base">
                      {locale === 'bn' ? 'সর্বশেষ নোটিশ' : 'Latest Notices'}
                    </h2>
                    <p className="text-[11px] text-slate-400">
                      {locale === 'bn' ? 'জরুরি প্রাতিষ্ঠানিক বিজ্ঞপ্তি' : 'Official institutional announcements'}
                    </p>
                  </div>
                </div>
                <Link
                  href={`/${locale}/notices`}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <span>{locale === 'bn' ? 'সকল নোটিশ' : 'View All'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-3.5">
                {notices.map((notice) => {
                  const pDate = notice.publishedAt ? new Date(notice.publishedAt) : new Date();
                  const safeDate = isNaN(pDate.getTime()) ? new Date() : pDate;
                  const day = safeDate.getDate();
                  const month = safeDate.toLocaleString('en', { month: 'short' });

                  return (
                    <Link
                      key={notice.id}
                      href={`/${locale}/notices/${notice.id}`}
                      className="group block p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-100/60 text-blue-700 flex flex-col items-center justify-center flex-shrink-0 text-[10px] font-bold leading-tight">
                          <span>{day}</span>
                          <span className="text-[9px] font-semibold uppercase">{month}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xs font-semibold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {locale === 'bn' ? (notice.titleBn || notice.titleEn) : (notice.titleEn || notice.titleBn)}
                          </h3>
                          <p className="text-[10px] text-slate-400 mt-1">
                            {formatDate(notice.publishedAt, locale)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 mt-2 border-t border-slate-100">
              <Link
                href={`/${locale}/notices`}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>{locale === 'bn' ? 'সব নোটিশ ও সার্কুলার দেখুন' : 'Explore All Notices'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Col 2: Our Facilities (4 cols) - Interactive & Clickable with Rich Details */}
          <CampusFacilitiesSection locale={locale} />

          {/* Col 3: Upcoming Events (3 cols) */}
          <div className="lg:col-span-3 bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 flex flex-col justify-between">
            <div>
              <div className="pb-4 border-b border-slate-100 mb-4">
                <h2 className="font-bold text-slate-900 text-base">
                  {locale === 'bn' ? 'আসন্ন ইভেন্টস' : 'Upcoming Events'}
                </h2>
                <p className="text-[11px] text-slate-400">
                  {locale === 'bn' ? 'একাডেমিক ও সহশিক্ষা কার্যক্রম' : 'Campus activities & meets'}
                </p>
              </div>

              <div className="space-y-4">
                {events.map((evt) => {
                  const eDate = evt.startDate ? new Date(evt.startDate) : new Date();
                  const safeEvtDate = isNaN(eDate.getTime()) ? new Date() : eDate;
                  const eDay = safeEvtDate.getDate();
                  const eMonth = safeEvtDate.toLocaleString('en', { month: 'short' });

                  return (
                    <div key={evt.id} className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 border border-amber-500/20 flex flex-col items-center justify-center flex-shrink-0 text-xs font-bold">
                        <span>{eDay}</span>
                        <span className="text-[9px] uppercase">{eMonth}</span>
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-slate-900 leading-snug">
                          {locale === 'bn' ? evt.titleBn : evt.titleEn}
                        </h3>
                        <p className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span>{locale === 'bn' ? evt.locationBn : evt.locationEn}</span>
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 mt-2 border-t border-slate-100">
              <Link
                href={`/${locale}/events`}
                className="w-full py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>{locale === 'bn' ? 'সকল ইভেন্টস দেখুন' : 'View All Events'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery Section - Rich Interactive Showcase with Tags & Lightbox */}
      <HomeGallerySection items={galleryItems} locale={locale} />

      <Footer />
    </div>
  );
}

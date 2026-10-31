import React from 'react';
import AnnouncementBar from '@/components/public/AnnouncementBar';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import GalleryClient from '@/components/public/GalleryClient';
import prisma from '@/lib/prisma';
import { Locale, isValidLocale, defaultLocale } from '@/lib/i18n';
import { fallbackGalleryItems } from '@/data/fallbackData';

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale: Locale = isValidLocale(resolvedParams.locale)
    ? (resolvedParams.locale as Locale)
    : defaultLocale;

  let galleryItems: any[] = [];
  try {
    galleryItems = await prisma.galleryItem.findMany({
      orderBy: { order: 'asc' },
    });
  } catch (error) {
    console.warn('Gallery query fallback activated:', error);
  }

  if (!galleryItems || galleryItems.length === 0) {
    galleryItems = fallbackGalleryItems;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <AnnouncementBar />
      <Navbar />

      <div className="bg-navy-950 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {locale === 'bn' ? 'ফটোগ্যালারি' : 'Official Photo Gallery'}
          </h1>
          <p className="text-xs sm:text-sm text-blue-200 mt-2">
            {locale === 'bn' ? 'ক্যাম্পাস, ক্লাসরুম, ল্যাবরেটরি ও সাংস্কৃতিক আয়োজনের আলোকচিত্র' : 'Visual glimpses of school life, laboratory practicals, and athletics'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
        <GalleryClient initialItems={galleryItems} locale={locale} />
      </div>

      <Footer />
    </div>
  );
}

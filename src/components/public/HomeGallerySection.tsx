'use client';

import React, { useState } from 'react';
import Link from 'next/image';
import NextLink from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Layers,
  Monitor,
  FlaskConical,
  Trophy,
  Music,
} from 'lucide-react';
import { GalleryItemData } from './GalleryClient';

interface Props {
  items: GalleryItemData[];
  locale: string;
}

export default function HomeGallerySection({ items, locale }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filterTabs = [
    { key: 'ALL', labelBn: 'সব ছবি', labelEn: 'All Photos', icon: Layers },
    { key: 'CLASSROOM', labelBn: 'ক্লাসরুম', labelEn: 'Classrooms', icon: Monitor },
    { key: 'LAB', labelBn: 'বিজ্ঞান ও আইটি ল্যাব', labelEn: 'Labs', icon: FlaskConical },
    { key: 'SPORTS', labelBn: 'ক্রীড়া ও মাঠ', labelEn: 'Sports', icon: Trophy },
    { key: 'CULTURAL', labelBn: 'সাংস্কৃতিক', labelEn: 'Cultural', icon: Music },
  ];

  const displayedItems = React.useMemo(() => {
    if (selectedCategory === 'ALL') {
      return items.slice(0, 8); // Top 8 featured
    }
    return items.filter((i) => i.category === selectedCategory).slice(0, 8);
  }, [items, selectedCategory]);

  const getCategoryBadge = (catKey: string) => {
    switch (catKey) {
      case 'CAMPUS':
        return { labelBn: 'ক্যাম্পাস', labelEn: 'Campus', color: 'bg-emerald-500/90 text-white' };
      case 'CLASSROOM':
        return { labelBn: 'ক্লাসরুম', labelEn: 'Classroom', color: 'bg-blue-500/90 text-white' };
      case 'LAB':
        return { labelBn: 'ল্যাবরেটরি', labelEn: 'Lab', color: 'bg-purple-500/90 text-white' };
      case 'SPORTS':
        return { labelBn: 'ক্রীড়া', labelEn: 'Sports', color: 'bg-amber-500/90 text-white' };
      case 'CULTURAL':
        return { labelBn: 'সাংস্কৃতিক', labelEn: 'Cultural', color: 'bg-rose-500/90 text-white' };
      case 'AWARDS':
        return { labelBn: 'পুরস্কার', labelEn: 'Awards', color: 'bg-yellow-500/90 text-navy-950 font-bold' };
      default:
        return { labelBn: 'ইভেন্ট', labelEn: 'Event', color: 'bg-blue-600/90 text-white' };
    }
  };

  const currentItem = lightboxIndex !== null ? displayedItems[lightboxIndex] : null;

  return (
    <section className="bg-slate-100/80 py-16 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{locale === 'bn' ? 'ক্যাম্পাস ঝলক ও ফটোগ্যালারি' : 'Campus Glimpse & Gallery'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950">
              {locale === 'bn' ? 'আমাদের ক্যাম্পাস ও শিক্ষা কার্যক্রম' : 'Our Campus & Activities'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {locale === 'bn'
                ? 'ডিজিটাল ক্লাসরুম, বিজ্ঞান ল্যাব, খেলার মাঠ ও উৎসবের খণ্ডচিত্র'
                : 'Interactive learning, practical experiments, sports championships, and cultural life'}
            </p>
          </div>

          <NextLink
            href={`/${locale}/gallery`}
            className="inline-flex items-center gap-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-xl shadow-sm transition-all hover:shadow-md self-start md:self-auto"
          >
            <span>{locale === 'bn' ? 'গ্যালারির সব ২৪+ ছবি দেখুন' : 'View Full Gallery (24+ Photos)'}</span>
            <ArrowRight className="w-4 h-4" />
          </NextLink>
        </div>

        {/* Category Pills on Homepage */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {filterTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = selectedCategory === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setSelectedCategory(tab.key)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-navy-900 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200/80'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{locale === 'bn' ? tab.labelBn : tab.labelEn}</span>
              </button>
            );
          })}
        </div>

        {/* 8-Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {displayedItems.map((item, idx) => {
            const badge = getCategoryBadge(item.category);
            return (
              <div
                key={item.id}
                onClick={() => setLightboxIndex(idx)}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-900 shadow-sm border border-slate-200/70 cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <Image
                  src={item.imageUrl}
                  alt={item.titleEn}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-108 transition-transform duration-500 opacity-95 group-hover:opacity-100"
                />

                {/* Tag Badge */}
                <div className="absolute top-2.5 left-2.5 z-10">
                  <span className={`px-2 py-0.5 rounded-lg text-[9px] font-bold uppercase tracking-wider backdrop-blur-md shadow-xs ${badge.color}`}>
                    {locale === 'bn' ? badge.labelBn : badge.labelEn}
                  </span>
                </div>

                {/* Zoom Icon Button */}
                <div className="absolute top-2.5 right-2.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="w-7 h-7 rounded-full bg-slate-950/60 backdrop-blur-md text-white flex items-center justify-center">
                    <Maximize2 className="w-3 h-3" />
                  </div>
                </div>

                {/* Title Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent flex flex-col justify-end p-3.5">
                  <p className="text-xs font-bold text-white line-clamp-2 drop-shadow group-hover:text-blue-200 transition-colors leading-snug">
                    {locale === 'bn' ? item.titleBn : item.titleEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Call to Action */}
        <div className="mt-8 text-center">
          <NextLink
            href={`/${locale}/gallery`}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-blue-600 bg-white hover:bg-blue-50 px-6 py-3 rounded-2xl shadow-xs border border-slate-200 transition-all"
          >
            <span>{locale === 'bn' ? 'সকল ক্যাটাগরির ছবি দেখতে ফটোগ্যালারিতে প্রবেশ করুন' : 'Explore All Categories & Albums in Photo Gallery'}</span>
            <ArrowRight className="w-4 h-4 text-blue-600" />
          </NextLink>
        </div>
      </div>

      {/* Lightbox Dialog Modal */}
      {lightboxIndex !== null && currentItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 animate-in fade-in duration-200"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="relative max-w-4xl w-full flex flex-col items-center justify-center animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Toolbar */}
            <div className="w-full flex items-center justify-between text-white pb-3 px-1">
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getCategoryBadge(currentItem.category).color}`}>
                {locale === 'bn'
                  ? getCategoryBadge(currentItem.category).labelBn
                  : getCategoryBadge(currentItem.category).labelEn}
              </span>

              <div className="flex items-center gap-2">
                <NextLink
                  href={`/${locale}/gallery`}
                  className="px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold"
                >
                  {locale === 'bn' ? 'সম্পূর্ণ গ্যালারি' : 'Full Gallery'}
                </NextLink>
                <button
                  type="button"
                  onClick={() => setLightboxIndex(null)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center focus:outline-none"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Lightbox Image */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[70vh] rounded-3xl overflow-hidden bg-black border border-white/10 shadow-2xl">
              <Image
                src={currentItem.imageUrl}
                alt={currentItem.titleEn}
                fill
                priority
                className="object-contain"
              />

              {/* Prev */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(
                    (lightboxIndex - 1 + displayedItems.length) % displayedItems.length
                  );
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-950/60 hover:bg-slate-950/80 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all hover:scale-105 focus:outline-none"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Next */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((lightboxIndex + 1) % displayedItems.length);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-950/60 hover:bg-slate-950/80 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all hover:scale-105 focus:outline-none"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Title */}
            <div className="w-full text-center mt-3 px-4">
              <h3 className="text-base font-bold text-white leading-snug">
                {locale === 'bn' ? currentItem.titleBn : currentItem.titleEn}
              </h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

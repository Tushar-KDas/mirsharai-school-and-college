'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import {
  Sparkles,
  Layers,
  Building,
  Monitor,
  FlaskConical,
  Trophy,
  Music,
  Award,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ExternalLink,
} from 'lucide-react';

export interface GalleryItemData {
  id: string;
  titleBn: string;
  titleEn: string;
  category: string;
  imageUrl: string;
  order: number;
}

interface Props {
  initialItems: GalleryItemData[];
  locale: string;
}

export default function GalleryClient({ initialItems, locale }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    { key: 'ALL', labelBn: 'সব ছবি', labelEn: 'All Photos', icon: Layers },
    { key: 'CAMPUS', labelBn: 'ক্যাম্পাস ও প্রাঙ্গণ', labelEn: 'Campus & Grounds', icon: Building },
    { key: 'CLASSROOM', labelBn: 'ডিজিটাল ক্লাসরুম', labelEn: 'Smart Classrooms', icon: Monitor },
    { key: 'LAB', labelBn: 'বিজ্ঞান ও আইটি ল্যাব', labelEn: 'Science & IT Labs', icon: FlaskConical },
    { key: 'SPORTS', labelBn: 'ক্রীড়া ও অ্যাথলেটিক্স', labelEn: 'Sports & Field', icon: Trophy },
    { key: 'CULTURAL', labelBn: 'সাংস্কৃতিক ও বিতর্ক', labelEn: 'Cultural & Debates', icon: Music },
    { key: 'AWARDS', labelBn: 'পুরস্কার ও সমাবর্তন', labelEn: 'Awards & Ceremony', icon: Award },
  ];

  const filteredItems = useMemo(() => {
    if (activeCategory === 'ALL') return initialItems;
    return initialItems.filter((item) => item.category === activeCategory);
  }, [initialItems, activeCategory]);

  const getCategoryBadge = (categoryKey: string) => {
    switch (categoryKey) {
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

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev !== null ? (prev + 1) % filteredItems.length : null
        );
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [lightboxIndex]);

  const currentLightboxItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <div className="space-y-8">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 pb-2">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.key;
          const count =
            cat.key === 'ALL'
              ? initialItems.length
              : initialItems.filter((i) => i.category === cat.key).length;

          return (
            <button
              key={cat.key}
              type="button"
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-xs ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md scale-105'
                  : 'bg-white text-slate-700 hover:bg-slate-100 hover:text-blue-600 border border-slate-200/80'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{locale === 'bn' ? cat.labelBn : cat.labelEn}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Photo Counter & Filter Status */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1 border-b border-slate-200/60 pb-3">
        <p className="font-medium">
          {locale === 'bn'
            ? `প্রদর্শিত ছবি: ${filteredItems.length} টি (মোট ${initialItems.length} টির মধ্যে)`
            : `Showing: ${filteredItems.length} photos (of ${initialItems.length} total)`}
        </p>
        <span className="text-[11px] text-blue-600 font-semibold flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          <span>{locale === 'bn' ? 'ছবিতে ক্লিক করে ফুলস্ক্রিনে দেখুন' : 'Click to preview in Fullscreen'}</span>
        </span>
      </div>

      {/* Grid of Gallery Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item, index) => {
          const badge = getCategoryBadge(item.category);
          return (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(index)}
              className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-slate-900 shadow-sm border border-slate-200/60 cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <Image
                src={item.imageUrl}
                alt={item.titleEn}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-108 transition-transform duration-700 opacity-95 group-hover:opacity-100"
              />

              {/* Tag Badge Top Left */}
              <div className="absolute top-3 left-3 z-10">
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-xs ${badge.color}`}>
                  {locale === 'bn' ? badge.labelBn : badge.labelEn}
                </span>
              </div>

              {/* View Overlay Button Top Right */}
              <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="w-8 h-8 rounded-full bg-slate-950/60 backdrop-blur-md text-white flex items-center justify-center shadow-md">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Gradient Bottom Title Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/30 to-transparent flex flex-col justify-end p-4 transition-opacity">
                <p className="text-xs sm:text-sm font-bold text-white line-clamp-2 drop-shadow-md leading-snug group-hover:text-blue-200 transition-colors">
                  {locale === 'bn' ? item.titleBn : item.titleEn}
                </p>
                <p className="text-[10px] text-slate-300 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 font-medium">
                  {locale === 'bn' ? 'পূর্ণাঙ্গ ভিউ দেখতে ক্লিক করুন' : 'Click to expand view'}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State Fallback (if any) */}
      {filteredItems.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
          <p className="text-sm font-bold text-slate-600">
            {locale === 'bn' ? 'এই ক্যাটাগরিতে কোনো ছবি পাওয়া যায়নি' : 'No photos found in this category'}
          </p>
          <button
            type="button"
            onClick={() => setActiveCategory('ALL')}
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold"
          >
            {locale === 'bn' ? 'সব ছবি দেখুন' : 'Show All Photos'}
          </button>
        </div>
      )}

      {/* Full-Screen Lightbox Modal Dialog */}
      {lightboxIndex !== null && currentLightboxItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 animate-in fade-in duration-200"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="relative max-w-5xl w-full flex flex-col items-center justify-center animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Toolbar */}
            <div className="w-full flex items-center justify-between text-white pb-3 px-1">
              <div className="flex items-center gap-3">
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getCategoryBadge(currentLightboxItem.category).color}`}>
                  {locale === 'bn'
                    ? getCategoryBadge(currentLightboxItem.category).labelBn
                    : getCategoryBadge(currentLightboxItem.category).labelEn}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {lightboxIndex + 1} / {filteredItems.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={currentLightboxItem.imageUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <span>{locale === 'bn' ? 'আসল ছবি' : 'Original'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={() => setLightboxIndex(null)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:outline-none"
                  aria-label="Close lightbox"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Lightbox Image */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[75vh] rounded-3xl overflow-hidden bg-black border border-white/10 shadow-2xl">
              <Image
                src={currentLightboxItem.imageUrl}
                alt={currentLightboxItem.titleEn}
                fill
                priority
                className="object-contain"
              />

              {/* Prev Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(
                    (lightboxIndex - 1 + filteredItems.length) % filteredItems.length
                  );
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-slate-950/60 hover:bg-slate-950/80 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all hover:scale-110 focus:outline-none"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-slate-950/60 hover:bg-slate-950/80 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all hover:scale-110 focus:outline-none"
                aria-label="Next photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Caption & Navigation Hint */}
            <div className="w-full text-center mt-4 px-4">
              <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                {locale === 'bn' ? currentLightboxItem.titleBn : currentLightboxItem.titleEn}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {locale === 'bn'
                  ? 'মিরসরাই স্কুল এন্ড কলেজ • চট্টগ্রাম, বাংলাদেশ'
                  : 'Mirsharai School and College • Chattogram, Bangladesh'}
                {' '}(কী-বোর্ডের Arrow Key দিয়ে আগের ও পরের ছবি দেখুন)
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

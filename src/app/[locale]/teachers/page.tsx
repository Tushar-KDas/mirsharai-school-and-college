import React from 'react';
import AnnouncementBar from '@/components/public/AnnouncementBar';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import prisma from '@/lib/prisma';
import { Locale, isValidLocale, defaultLocale } from '@/lib/i18n';
import FacultyDirectoryClient from '@/components/public/FacultyDirectoryClient';
import { fallbackTeachers } from '@/data/fallbackData';

export default async function TeachersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale: Locale = isValidLocale(resolvedParams.locale)
    ? (resolvedParams.locale as Locale)
    : defaultLocale;

  let teachers: any[] = [];
  try {
    teachers = await prisma.staff.findMany({
      where: { isTeacher: true },
      orderBy: { order: 'asc' },
    });
  } catch (error) {
    console.warn('Teachers query fallback activated:', error);
  }

  if (!teachers || teachers.length === 0) {
    teachers = fallbackTeachers;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <AnnouncementBar />
      <Navbar />

      <div className="bg-navy-950 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {locale === 'bn' ? `সম্মানিত শিক্ষকমণ্ডলী (${teachers.length} জন)` : `Faculty & Teaching Staff (${teachers.length} Members)`}
          </h1>
          <p className="text-xs sm:text-sm text-blue-200 mt-2">
            {locale === 'bn' ? 'অভিজ্ঞ, দক্ষ ও নিবেদিতপ্রাণ শিক্ষকবৃন্দ • বিভাগভিত্তিক অনুষদ তালিকা' : 'Passionate educators guiding the future leaders of tomorrow'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
        <FacultyDirectoryClient teachers={teachers} />
      </div>

      <Footer />
    </div>
  );
}

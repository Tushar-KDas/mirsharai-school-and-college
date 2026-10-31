import React from 'react';
import { Locale, isValidLocale, defaultLocale } from '@/lib/i18n';
import { LanguageProvider } from '@/context/LanguageContext';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const currentLocale: Locale = isValidLocale(resolvedParams.locale)
    ? (resolvedParams.locale as Locale)
    : defaultLocale;

  return (
    <LanguageProvider initialLocale={currentLocale}>
      <div className="min-h-screen flex flex-col">{children}</div>
    </LanguageProvider>
  );
}

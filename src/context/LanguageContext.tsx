'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Locale, switchLocalePath } from '@/lib/i18n';
import bnDict from '@/messages/bn.json';
import enDict from '@/messages/en.json';

interface LanguageContextType {
  locale: Locale;
  t: typeof bnDict;
  switchLanguage: (newLocale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: 'bn',
  t: bnDict,
  switchLanguage: () => {},
});

export function LanguageProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale: Locale;
}) {
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setLocale(initialLocale);
  }, [initialLocale]);

  const switchLanguage = (newLocale: Locale) => {
    if (newLocale === locale) return;
    setLocale(newLocale);
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    if (pathname) {
      const newPath = switchLocalePath(pathname, newLocale);
      router.push(newPath);
    }
  };

  const currentDict = locale === 'bn' ? bnDict : enDict;

  return (
    <LanguageContext.Provider value={{ locale, t: currentDict, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

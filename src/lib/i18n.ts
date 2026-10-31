import bnMessages from '../messages/bn.json';
import enMessages from '../messages/en.json';

export type Locale = 'bn' | 'en';
export const defaultLocale: Locale = 'bn';
export const locales: Locale[] = ['bn', 'en'];

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export function getDictionary(locale: Locale) {
  return locale === 'bn' ? bnMessages : enMessages;
}

export function switchLocalePath(currentPath: string, targetLocale: Locale): string {
  // If path starts with /bn or /en, replace prefix
  const segments = currentPath.split('/').filter(Boolean);
  if (segments.length > 0 && (segments[0] === 'bn' || segments[0] === 'en')) {
    segments[0] = targetLocale;
    return '/' + segments.join('/');
  }
  return `/${targetLocale}${currentPath.startsWith('/') ? currentPath : '/' + currentPath}`;
}

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Convert English digits to Bengali numerals
export function toBengaliNumber(num: number | string | null | undefined): string {
  if (num === null || num === undefined) return '';
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num
    .toString()
    .replace(/[0-9]/g, (digit) => bengaliDigits[parseInt(digit, 10)]);
}

// Format Currency for Bangladesh (BDT / ৳)
export function formatCurrency(
  amount: number | null | undefined,
  locale: 'bn' | 'en' = 'bn'
): string {
  if (amount === null || amount === undefined || isNaN(amount)) return locale === 'bn' ? '৳ ০.০০' : 'BDT 0.00';
  
  const formatted = new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  if (locale === 'bn') {
    return `৳ ${toBengaliNumber(formatted)}`;
  }
  return `BDT ${formatted}`;
}

// Format Date for Bangladesh
export function formatDate(
  date: Date | string | null | undefined,
  locale: 'bn' | 'en' = 'bn'
): string {
  if (!date) return '';
  const d = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(d.getTime())) return '';

  const day = d.getDate();
  const year = d.getFullYear();

  const englishMonths = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const bengaliMonths = [
    'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
    'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
  ];

  if (locale === 'bn') {
    return `${toBengaliNumber(day)} ${bengaliMonths[d.getMonth()]} ${toBengaliNumber(year)}`;
  }
  return `${day} ${englishMonths[d.getMonth()]} ${year}`;
}

// Bangladesh Secondary & Higher Secondary Board Standard Grading Scale
export function calculateGrade(marks: number): { grade: string; gpa: number } {
  if (marks >= 80) return { grade: 'A+', gpa: 5.0 };
  if (marks >= 70) return { grade: 'A', gpa: 4.0 };
  if (marks >= 60) return { grade: 'A-', gpa: 3.5 };
  if (marks >= 50) return { grade: 'B', gpa: 3.0 };
  if (marks >= 40) return { grade: 'C', gpa: 2.0 };
  if (marks >= 33) return { grade: 'D', gpa: 1.0 };
  return { grade: 'F', gpa: 0.0 };
}

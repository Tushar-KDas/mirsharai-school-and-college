import { describe, it, expect } from 'vitest';
import {
  calculateGrade,
  formatCurrency,
  toBengaliNumber,
  formatDate,
} from '../src/lib/utils';
import { switchLocalePath, getDictionary } from '../src/lib/i18n';

describe('1. Bangladesh Standard Grading & GPA Calculations', () => {
  it('correctly awards A+ (5.00) for marks >= 80', () => {
    expect(calculateGrade(95)).toEqual({ grade: 'A+', gpa: 5.0 });
    expect(calculateGrade(80)).toEqual({ grade: 'A+', gpa: 5.0 });
  });

  it('correctly awards A (4.00) for marks between 70 and 79', () => {
    expect(calculateGrade(75)).toEqual({ grade: 'A', gpa: 4.0 });
    expect(calculateGrade(70)).toEqual({ grade: 'A', gpa: 4.0 });
  });

  it('correctly awards A- (3.50) for marks between 60 and 69', () => {
    expect(calculateGrade(65)).toEqual({ grade: 'A-', gpa: 3.5 });
  });

  it('correctly awards B (3.00) for marks between 50 and 59', () => {
    expect(calculateGrade(52)).toEqual({ grade: 'B', gpa: 3.0 });
  });

  it('correctly awards C (2.00) for marks between 40 and 49', () => {
    expect(calculateGrade(45)).toEqual({ grade: 'C', gpa: 2.0 });
  });

  it('correctly awards D (1.00) for marks between 33 and 39', () => {
    expect(calculateGrade(35)).toEqual({ grade: 'D', gpa: 1.0 });
  });

  it('correctly awards F (0.00) for marks < 33', () => {
    expect(calculateGrade(28)).toEqual({ grade: 'F', gpa: 0.0 });
    expect(calculateGrade(0)).toEqual({ grade: 'F', gpa: 0.0 });
  });
});

describe('2. Localization, Currency & Numeral Localization', () => {
  it('converts English digits to Bengali numerals correctly', () => {
    expect(toBengaliNumber(12345)).toBe('১২৩৪৫');
    expect(toBengaliNumber('2026')).toBe('২০২৬');
    expect(toBengaliNumber(0)).toBe('০');
  });

  it('formats BDT currency accurately in English and Bangla', () => {
    const enFormatted = formatCurrency(1500, 'en');
    expect(enFormatted).toContain('BDT');
    expect(enFormatted).toContain('1,500.00');

    const bnFormatted = formatCurrency(1500, 'bn');
    expect(bnFormatted).toContain('৳');
    expect(bnFormatted).toContain('১,৫০০.০০');
  });

  it('switches locale URL paths preserving route structure', () => {
    expect(switchLocalePath('/bn/admin/dashboard', 'en')).toBe('/en/admin/dashboard');
    expect(switchLocalePath('/en/student/dashboard', 'bn')).toBe('/bn/student/dashboard');
    expect(switchLocalePath('/bn/about', 'en')).toBe('/en/about');
  });

  it('provides complete translation dictionaries for bn and en', () => {
    const bn = getDictionary('bn');
    const en = getDictionary('en');

    expect(bn.institution.name).toBe('মিরসরাই স্কুল এন্ড কলেজ');
    expect(en.institution.name).toBe('Mirsharai School and College');

    expect(bn.fees.payNow).toBeDefined();
    expect(en.fees.payNow).toBeDefined();
  });
});

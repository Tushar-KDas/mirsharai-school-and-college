'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { X, Printer, QrCode, ShieldCheck, Download, Award, User } from 'lucide-react';
import { toBengaliNumber } from '@/lib/utils';

export interface StudentIdCardData {
  id: string;
  studentId: string;
  admissionNo: string;
  roll: number;
  nameBn: string;
  nameEn: string;
  group: string;
  gender: string;
  phone?: string | null;
  address?: string | null;
  class?: { nameBn: string; nameEn: string; numericValue?: number };
  section?: { nameBn: string; nameEn: string };
  bloodGroup?: string;
}

interface Props {
  student: StudentIdCardData | null;
  locale: string;
  onClose: () => void;
}

export default function StudentIdCardModal({ student, locale, onClose }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  if (!student) return null;

  const handlePrint = () => {
    window.print();
  };

  const bloodGroups = ['A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-'];
  const bloodGroup = student.bloodGroup || bloodGroups[student.roll % bloodGroups.length];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      {/* Print CSS isolation */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          #student-id-card-print-area,
          #student-id-card-print-area * {
            visibility: visible !important;
          }
          #student-id-card-print-area {
            position: fixed !important;
            left: 50% !important;
            top: 50% !important;
            transform: translate(-50%, -50%) !important;
            box-shadow: none !important;
            margin: 0 !important;
            background: white !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>

      <div
        className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar (Hidden in Print) */}
        <div className="p-4 sm:p-5 bg-navy-950 text-white flex items-center justify-between border-b border-blue-900/50 print:hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-blue-400">
              <Printer className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base leading-tight">
                {locale === 'bn' ? 'শিক্ষার্থী পরিচয়পত্র (ID Card)' : 'Student Identity Card'}
              </h3>
              <p className="text-[11px] text-blue-200">
                {locale === 'bn' ? 'অফিসিয়াল প্রিন্ট ও লেমিনেশন ফরম্যাট' : 'Official Print & Lamination Layout'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:outline-none"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Printable Card Area */}
        <div className="p-4 sm:p-6 bg-slate-100/60 flex flex-col items-center justify-center">
          <div
            id="student-id-card-print-area"
            ref={cardRef}
            className="w-[320px] sm:w-[340px] bg-white rounded-2xl shadow-xl border-2 border-navy-900 overflow-hidden relative flex flex-col"
            style={{ minHeight: '490px' }}
          >
            {/* Top Color Accent */}
            <div className="h-2 bg-gradient-to-r from-blue-700 via-indigo-600 to-amber-500"></div>

            {/* Header: School Logo & Title */}
            <div className="bg-navy-950 text-white p-3 text-center flex flex-col items-center justify-center border-b-2 border-amber-500 relative">
              <div className="flex items-center gap-2 justify-center">
                <div className="w-10 h-10 rounded-full bg-white p-0.5 border border-amber-400 flex-shrink-0 relative overflow-hidden shadow-sm">
                  <Image
                    src="/images/logo.png"
                    alt="School Logo"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <div className="text-left">
                  <h4 className="font-black text-xs sm:text-[13px] tracking-tight leading-tight text-white uppercase">
                    মিরসরাই স্কুল এন্ড কলেজ
                  </h4>
                  <p className="text-[10px] text-amber-300 font-bold tracking-wider leading-none mt-0.5">
                    MIRSHARAI SCHOOL & COLLEGE
                  </p>
                  <p className="text-[8px] text-slate-300 leading-none mt-1">
                    মিরসরাই, চট্টগ্রাম • EIIN: 104523 • Estd: 1972
                  </p>
                </div>
              </div>

              {/* Badge Ribbon */}
              <div className="mt-2 py-0.5 px-3 bg-amber-500 text-navy-950 font-black text-[9px] uppercase tracking-widest rounded-full shadow-xs">
                STUDENT IDENTITY CARD • ২০২৬
              </div>
            </div>

            {/* Photo & Roll Header */}
            <div className="p-4 flex flex-col items-center justify-center bg-gradient-to-b from-blue-50/50 to-white text-center">
              <div className="relative">
                <div className="w-24 h-24 rounded-2xl bg-slate-200 border-2 border-blue-700 overflow-hidden shadow-md flex items-center justify-center text-slate-400 relative">
                  <div className="w-full h-full bg-gradient-to-br from-blue-100 to-slate-200 flex flex-col items-center justify-center">
                    <User className="w-12 h-12 text-blue-600/70" />
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-blue-700 text-white font-mono font-black text-xs px-2 py-0.5 rounded-lg border border-white shadow">
                  ROLL: {student.roll}
                </div>
              </div>

              <h5 className="font-extrabold text-navy-950 text-sm sm:text-base mt-3 leading-tight">
                {student.nameBn}
              </h5>
              <p className="text-xs font-bold text-slate-700 uppercase tracking-tight">
                {student.nameEn}
              </p>
              <div className="mt-1 inline-flex items-center gap-1 font-mono text-[11px] font-black text-blue-800 bg-blue-100/80 px-2.5 py-0.5 rounded-full border border-blue-200">
                <span>ID: {student.studentId}</span>
              </div>
            </div>

            {/* Academic Information Grid */}
            <div className="px-4 pb-2 text-[11px] text-slate-800 space-y-1 divide-y divide-slate-100">
              <div className="flex justify-between py-1 font-medium">
                <span className="text-slate-500">শ্রেণি (Class):</span>
                <span className="font-bold text-navy-900">
                  {student.class?.nameBn || student.class?.nameEn || 'Class 10'}
                </span>
              </div>
              <div className="flex justify-between py-1 font-medium">
                <span className="text-slate-500">শাখা ও গ্রুপ:</span>
                <span className="font-bold text-navy-900">
                  {student.section?.nameBn || student.section?.nameEn || 'Section A'} • {student.group}
                </span>
              </div>
              <div className="flex justify-between py-1 font-medium">
                <span className="text-slate-500">রক্তের গ্রুপ (Blood):</span>
                <span className="font-black text-rose-600 bg-rose-50 px-1.5 py-0.2 rounded border border-rose-200 text-[10px]">
                  {bloodGroup}
                </span>
              </div>
              <div className="flex justify-between py-1 font-medium">
                <span className="text-slate-500">জরুরি যোগাযোগ:</span>
                <span className="font-mono font-bold text-slate-900">
                  {student.phone || '01800-000000'}
                </span>
              </div>
            </div>

            {/* Card Footer: Barcode & Principal Sign */}
            <div className="mt-auto p-3 bg-slate-50 border-t border-slate-200 flex items-end justify-between">
              <div className="flex flex-col items-start">
                {/* Barcode Mock */}
                <div className="flex items-center gap-0.5 h-6">
                  {[4, 2, 5, 2, 6, 3, 2, 5, 3, 2, 4, 2, 5, 2, 6, 2, 4, 3, 5, 2].map((w, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-900 h-full"
                      style={{ width: `${w}px` }}
                    ></div>
                  ))}
                </div>
                <span className="text-[8px] font-mono text-slate-500 tracking-widest mt-0.5">
                  {student.studentId}
                </span>
              </div>

              <div className="text-center flex flex-col items-center">
                <div className="font-serif italic text-[11px] text-blue-900 font-bold border-b border-slate-400 px-2 pb-0.5">
                  Kamrul Hasan
                </div>
                <span className="text-[8px] font-bold text-slate-600 uppercase tracking-tighter mt-0.5">
                  অধ্যক্ষ / Principal
                </span>
              </div>
            </div>

            {/* Bottom Color Accent */}
            <div className="h-1 bg-navy-950"></div>
          </div>
        </div>

        {/* Modal Actions (Hidden in Print) */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between print:hidden">
          <p className="text-[11px] text-slate-500">
            {locale === 'bn' ? 'স্ট্যান্ডার্ড আইডি কার্ড সাইজে প্রিন্ট হবে' : 'Fits standard CR80 / PVC badge print'}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
            >
              {locale === 'bn' ? 'বন্ধ করুন' : 'Close'}
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md shadow-blue-600/30 transition-all hover:scale-105"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{locale === 'bn' ? 'আইডি কার্ড প্রিন্ট করুন' : 'Print ID Card'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

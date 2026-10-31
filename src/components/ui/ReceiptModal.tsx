'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { formatCurrency, formatDate, toBengaliNumber } from '@/lib/utils';
import { Printer, X, CheckCircle, ShieldCheck } from 'lucide-react';

interface ReceiptModalProps {
  payment: {
    receiptNo: string;
    transactionId: string;
    amount: number;
    paymentMethod: string;
    paidAt: string;
    invoiceTitle: string;
    studentName: string;
    studentCode: string;
    className: string;
    roll: number;
  };
  onClose: () => void;
}

export default function ReceiptModal({ payment, onClose }: ReceiptModalProps) {
  const { locale, t } = useLanguage();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 my-8">
        {/* Modal Top Actions (hidden during print) */}
        <div className="print:hidden bg-slate-100 border-b border-slate-200 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{locale === 'bn' ? 'অফিশিয়াল মানি রিসিট প্রিভিউ' : 'Official Money Receipt Preview'}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-sm transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{t.common.print} / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Receipt Area */}
        <div className="p-8 sm:p-10 space-y-6 text-slate-800 bg-white" id="printable-receipt">
          {/* Institution Header */}
          <div className="text-center border-b-2 border-slate-900 pb-5 space-y-1">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-14 h-14 relative">
                <Image
                  src="/images/logo.png"
                  alt="School Logo"
                  width={56}
                  height={56}
                  className="object-contain"
                />
              </div>
              <div className="text-left">
                <h2 className="text-xl sm:text-2xl font-extrabold text-navy-900 tracking-tight leading-tight">
                  {locale === 'bn' ? 'মিরসরাই স্কুল এন্ড কলেজ' : 'Mirsharai School and College'}
                </h2>
                <p className="text-xs text-slate-600 font-semibold">
                  {locale === 'bn' ? 'মিরসরাই, চট্টগ্রাম, বাংলাদেশ' : 'Mirsharai, Chattogram, Bangladesh'}
                </p>
                <p className="text-[11px] text-slate-500 font-mono">
                  {t.institution.eiin} | {t.institution.collegeCode} | {t.institution.estd}
                </p>
              </div>
            </div>

            <div className="inline-block bg-slate-900 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider mt-2">
              {locale === 'bn' ? 'মানি রিসিট (শিক্ষার্থী অনুলিপি)' : 'STUDENT MONEY RECEIPT'}
            </div>
          </div>

          {/* Receipt Meta & Student Details */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <p><span className="text-slate-500 font-medium">{locale === 'bn' ? 'রসিদ নং' : 'Receipt No'}:</span> <span className="font-bold text-slate-900">{payment.receiptNo}</span></p>
              <p><span className="text-slate-500 font-medium">{locale === 'bn' ? 'লেনদেন আইডি' : 'Trx ID'}:</span> <span className="font-mono font-bold text-slate-900">{payment.transactionId}</span></p>
              <p><span className="text-slate-500 font-medium">{locale === 'bn' ? 'পেমেন্ট মাধ্যম' : 'Method'}:</span> <span className="font-bold text-blue-700">{payment.paymentMethod}</span></p>
            </div>
            <div className="space-y-1.5 text-right">
              <p><span className="text-slate-500 font-medium">{locale === 'bn' ? 'পরিশোধের তারিখ' : 'Payment Date'}:</span> <span className="font-semibold text-slate-900">{formatDate(payment.paidAt, locale)}</span></p>
              <p><span className="text-slate-500 font-medium">{locale === 'bn' ? 'স্ট্যাটাস' : 'Status'}:</span> <span className="inline-flex items-center gap-1 font-bold text-emerald-600"><CheckCircle className="w-3.5 h-3.5" /> VERIFIED</span></p>
            </div>
          </div>

          {/* Student Profile Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <p className="text-slate-500 text-[11px]">{locale === 'bn' ? 'শিক্ষার্থীর নাম' : 'Student Name'}</p>
              <p className="font-bold text-slate-900 truncate">{payment.studentName}</p>
            </div>
            <div>
              <p className="text-slate-500 text-[11px]">{locale === 'bn' ? 'শিক্ষার্থী আইডি' : 'Student ID'}</p>
              <p className="font-mono font-bold text-slate-900">{payment.studentCode}</p>
            </div>
            <div>
              <p className="text-slate-500 text-[11px]">{locale === 'bn' ? 'শ্রেণি ও বিভাগ' : 'Class & Group'}</p>
              <p className="font-semibold text-slate-900">{payment.className}</p>
            </div>
            <div>
              <p className="text-slate-500 text-[11px]">{locale === 'bn' ? 'রোল নং' : 'Roll No'}</p>
              <p className="font-bold text-slate-900">{locale === 'bn' ? toBengaliNumber(payment.roll) : payment.roll}</p>
            </div>
          </div>

          {/* Fee Itemization Table */}
          <table className="w-full text-xs border border-slate-200 rounded-lg overflow-hidden">
            <thead className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold">
              <tr>
                <th className="py-2.5 px-4 text-left">#</th>
                <th className="py-2.5 px-4 text-left">{locale === 'bn' ? 'ফির বিবরণ' : 'Description'}</th>
                <th className="py-2.5 px-4 text-right">{locale === 'bn' ? 'টাকার পরিমাণ' : 'Amount'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-3 px-4 font-mono">01</td>
                <td className="py-3 px-4 font-semibold text-slate-900">{payment.invoiceTitle}</td>
                <td className="py-3 px-4 text-right font-bold text-slate-900">{formatCurrency(payment.amount, locale)}</td>
              </tr>
            </tbody>
            <tfoot className="bg-slate-50 border-t-2 border-slate-300 font-bold text-slate-900">
              <tr>
                <td colSpan={2} className="py-3 px-4 text-right text-xs uppercase">
                  {locale === 'bn' ? 'মোট পরিশোধিত টাকা' : 'Total Amount Paid'}:
                </td>
                <td className="py-3 px-4 text-right font-extrabold text-sm text-emerald-700">
                  {formatCurrency(payment.amount, locale)}
                </td>
              </tr>
            </tfoot>
          </table>

          {/* Bottom Stamp & Authorization Area */}
          <div className="pt-8 flex justify-between items-end text-xs">
            <div className="space-y-1">
              <div className="w-24 h-24 border-2 border-emerald-600/40 rounded-full flex flex-col items-center justify-center p-2 text-center text-[10px] font-bold text-emerald-700 rotate-[-10deg]">
                <ShieldCheck className="w-5 h-5 text-emerald-600 mb-0.5" />
                <span>PAID ONLINE</span>
                <span className="text-[8px] font-normal font-mono">{payment.paymentMethod}</span>
              </div>
              <p className="text-[10px] text-slate-400">System Generated e-Receipt</p>
            </div>

            <div className="text-center space-y-1">
              <div className="w-40 border-b border-slate-400 pb-1">
                <span className="font-serif italic font-semibold text-slate-700 text-sm">Md. Kamrul Hasan</span>
              </div>
              <p className="text-[11px] font-bold text-slate-800">
                {locale === 'bn' ? 'অধ্যক্ষ ও প্রধান হিসাবরক্ষণ কর্মকর্তা' : 'Principal & Chief Financial Officer'}
              </p>
              <p className="text-[10px] text-slate-500">
                {locale === 'bn' ? 'মিরসরাই স্কুল এন্ড কলেজ' : 'Mirsharai School and College'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

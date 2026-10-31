'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { formatCurrency, toBengaliNumber, formatDate } from '@/lib/utils';
import PaymentModal from '@/components/ui/PaymentModal';
import {
  GraduationCap,
  CalendarCheck,
  Award,
  CreditCard,
  Clock,
  Bell,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

interface StudentDashboardClientProps {
  student: any;
  routines: any[];
  invoices: any[];
  marks: any[];
  notices: any[];
}

export default function StudentDashboardClient({
  student,
  routines,
  invoices,
  marks,
  notices,
}: StudentDashboardClientProps) {
  const { locale, t } = useLanguage();
  const [selectedInvoice, setSelectedInvoice] = useState<any | null>(null);

  // Total Due calculation
  const totalDue = invoices.reduce((sum, inv) => {
    return sum + (inv.status !== 'PAID' ? inv.totalPayable - inv.paidAmount : 0);
  }, 0);

  return (
    <div className="space-y-6">
      {/* Student Profile Header Card */}
      <div className="bg-gradient-to-r from-navy-950 via-primary-navy to-blue-900 text-white p-6 rounded-3xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/10 border-2 border-white/20 flex items-center justify-center text-2xl font-extrabold text-blue-200 shadow-inner">
            {student.nameEn.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                {locale === 'bn' ? student.nameBn : student.nameEn}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/30 text-blue-200 text-[10px] font-bold border border-blue-400/30">
                {student.group}
              </span>
            </div>
            <p className="text-xs text-blue-200 mt-1 flex flex-wrap items-center gap-2">
              <span>{locale === 'bn' ? student.class.nameBn : student.class.nameEn}</span>
              <span>•</span>
              <span>{locale === 'bn' ? student.section.nameBn : student.section.nameEn}</span>
              <span>•</span>
              <span className="font-mono font-bold">{locale === 'bn' ? 'রোল:' : 'Roll:'} {locale === 'bn' ? toBengaliNumber(student.roll) : student.roll}</span>
              <span>•</span>
              <span className="font-mono">{student.studentId}</span>
            </p>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards Matching Reference Mockup */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Attendance */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500">
              {locale === 'bn' ? 'উপস্থিতির হার' : 'Attendance Rate'}
            </p>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-1">
              {locale === 'bn' ? '৯৬%' : '96%'}
            </h3>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1">
              {locale === 'bn' ? 'নিয়মিত উপস্থিত' : 'Excellent regularity'}
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <CalendarCheck className="w-6 h-6" />
          </div>
        </div>

        {/* GPA */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500">
              {locale === 'bn' ? 'সর্বমোট জিপিএ' : 'Overall GPA'}
            </p>
            <h3 className="text-2xl font-extrabold text-blue-600 mt-1">
              5.00
            </h3>
            <p className="text-[11px] text-slate-400 mt-1">
              {locale === 'bn' ? 'গোল্ডেন এ+' : 'Golden A+ Grade'}
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
        </div>

        {/* Due Fees */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500">
              {locale === 'bn' ? 'বকেয়া ফি' : 'Due Fees'}
            </p>
            <h3 className="text-2xl font-extrabold text-rose-600 mt-1">
              {formatCurrency(totalDue, locale)}
            </h3>
            <p className="text-[11px] text-slate-400 mt-1">
              {locale === 'bn' ? 'অনলাইনে পরিশোধযোগ্য' : 'Payable online'}
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <CreditCard className="w-6 h-6" />
          </div>
        </div>

        {/* Last Exam Result */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500">
              {locale === 'bn' ? 'সর্বশেষ ফলাফল' : 'Last Exam Result'}
            </p>
            <h3 className="text-2xl font-extrabold text-emerald-600 mt-1">
              A+ (Passed)
            </h3>
            <p className="text-[11px] text-slate-400 mt-1">
              {locale === 'bn' ? 'মেধা স্থান: ১ম' : 'Merit Position: 1st'}
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <GraduationCap className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Routine & Notices Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Today's Routine (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                {locale === 'bn' ? 'আজকের পাঠপরিকল্পনা ও রুটিন' : "Today's Routine"}
              </h2>
              <p className="text-[11px] text-slate-400">
                {locale === 'bn' ? 'শ্রেণিকক্ষ ও নির্ধারিত বিষয়সূচি' : 'Period-by-period class schedule'}
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700">
              {locale === 'bn' ? 'আজকের কার্যদিবস' : 'Active Day'}
            </span>
          </div>

          <div className="space-y-3">
            {routines.map((r, i) => (
              <div
                key={r.id || i}
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100/60 text-blue-700 font-bold text-xs flex items-center justify-center flex-shrink-0">
                    P-{r.period}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">
                      {locale === 'bn' ? r.subject.nameBn : r.subject.nameEn}
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      {locale === 'bn' ? r.teacher.nameBn : r.teacher.nameEn} • {r.roomNo}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-semibold text-slate-700">
                    {r.startTime} - {r.endTime}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Notices (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="pb-3 border-b border-slate-100 mb-3">
              <h2 className="text-sm font-bold text-slate-900">
                {locale === 'bn' ? 'জরুরি নোটিশ' : 'Recent Notices'}
              </h2>
              <p className="text-[11px] text-slate-400">
                {locale === 'bn' ? 'শিক্ষার্থীদের জন্য নির্দেশনা' : 'Academic alerts for students'}
              </p>
            </div>

            <div className="space-y-3">
              {notices.map((n) => (
                <div key={n.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <h3 className="text-xs font-bold text-slate-800 line-clamp-1">
                    {locale === 'bn' ? n.titleBn : n.titleEn}
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-1">
                    {formatDate(n.publishedAt, locale)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Online Fee Invoices & Payment Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              {t.fees.title}
            </h2>
            <p className="text-[11px] text-slate-400">
              {t.fees.subtitle}
            </p>
          </div>
          <span className="text-xs font-bold text-slate-700">
            {locale === 'bn' ? 'মোট বকেয়া:' : 'Total Due:'} <span className="text-rose-600">{formatCurrency(totalDue, locale)}</span>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">{t.fees.invoiceNo}</th>
                <th className="py-3 px-4">{t.fees.feeType}</th>
                <th className="py-3 px-4">{locale === 'bn' ? 'শেষ তারিখ' : 'Due Date'}</th>
                <th className="py-3 px-4">{t.fees.amount}</th>
                <th className="py-3 px-4">{t.fees.dueAmount}</th>
                <th className="py-3 px-4">{t.common.status}</th>
                <th className="py-3 px-4 text-right">{t.common.action}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {invoices.map((inv) => {
                const due = inv.totalPayable - inv.paidAmount;
                const isPaid = inv.status === 'PAID';
                return (
                  <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-blue-700">{inv.invoiceNo}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">{inv.title}</td>
                    <td className="py-3.5 px-4 text-slate-500">{formatDate(inv.dueDate, locale)}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">{formatCurrency(inv.totalPayable, locale)}</td>
                    <td className="py-3.5 px-4 font-bold text-rose-600">{formatCurrency(due, locale)}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          isPaid
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {inv.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {!isPaid ? (
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedInvoice({
                              id: inv.id,
                              invoiceNo: inv.invoiceNo,
                              title: inv.title,
                              totalPayable: inv.totalPayable,
                              paidAmount: inv.paidAmount,
                              studentId: student.id,
                              studentName: student.nameEn,
                              studentCode: student.studentId,
                              className: student.class.nameEn,
                              roll: student.roll,
                            })
                          }
                          className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
                        >
                          {t.fees.payNow}
                        </button>
                      ) : (
                        <span className="text-[11px] font-semibold text-emerald-600 flex items-center justify-end gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {locale === 'bn' ? 'পরিশোধিত' : 'Paid'}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Checkout Modal */}
      {selectedInvoice && (
        <PaymentModal
          invoice={selectedInvoice}
          isOpen={true}
          onClose={() => setSelectedInvoice(null)}
          onPaymentSuccess={() => {
            window.location.reload();
          }}
        />
      )}
    </div>
  );
}

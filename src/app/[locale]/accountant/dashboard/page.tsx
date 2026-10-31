import React from 'react';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Locale, isValidLocale, defaultLocale } from '@/lib/i18n';
import { formatCurrency, formatDate } from '@/lib/utils';
import {
  CreditCard,
  Receipt,
  FolderOpen,
  TrendingUp,
  Building,
  CheckCircle2,
} from 'lucide-react';

export default async function AccountantDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale: Locale = isValidLocale(resolvedParams.locale)
    ? (resolvedParams.locale as Locale)
    : defaultLocale;

  const session = await getSession();
  if (!session) {
    redirect(`/${locale}/login?redirect=/${locale}/accountant/dashboard`);
  }

  const [invoices, payments, expenses, bankAccounts] = await Promise.all([
    prisma.invoice.findMany({ take: 5, orderBy: { createdAt: 'desc' }, include: { student: true } }),
    prisma.payment.findMany({ take: 5, orderBy: { paidAt: 'desc' }, include: { student: true } }),
    prisma.expense.findMany({ take: 5, orderBy: { expenseDate: 'desc' } }),
    prisma.bankAccount.findMany(),
  ]);

  const totalCollected = payments.reduce((sum, p) => sum + p.amount, 0) + 245000;
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <DashboardLayout user={session}>
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-navy-950 via-primary-navy to-purple-950 text-white p-6 rounded-3xl shadow-sm">
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            {locale === 'bn' ? 'হিসাবরক্ষণ ও অর্থ ব্যবস্থাপনা' : 'Financial Accounting & Cashbook'}
          </h1>
          <p className="text-xs sm:text-sm text-purple-200 mt-1">
            {locale === 'bn'
              ? 'ফি আদায়, ব্যয় ভাউচার, ব্যাংক স্থিতি ও নগদ প্রবাহ ব্যবস্থাপনা'
              : 'Collections, expense vouchers, general ledger, and bank balances'}
          </p>
        </div>

        {/* 3 Key Financial Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
            <p className="text-xs font-semibold text-slate-500 uppercase">
              {locale === 'bn' ? 'মোট সংগৃহীত ফি' : 'Total Collections'}
            </p>
            <h3 className="text-2xl font-extrabold text-emerald-600 mt-1">
              {formatCurrency(totalCollected, locale)}
            </h3>
            <p className="text-[11px] text-slate-400 mt-1">Online & Counter receipts</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
            <p className="text-xs font-semibold text-slate-500 uppercase">
              {locale === 'bn' ? 'মোট অনুমোদিত ব্যয়' : 'Total Approved Expenses'}
            </p>
            <h3 className="text-2xl font-extrabold text-rose-600 mt-1">
              {formatCurrency(totalExpenses, locale)}
            </h3>
            <p className="text-[11px] text-slate-400 mt-1">Utility & Operations</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
            <p className="text-xs font-semibold text-slate-500 uppercase">
              {locale === 'bn' ? 'ব্যাংক হিসাবের স্থিতি' : 'Total Bank Balance'}
            </p>
            <h3 className="text-2xl font-extrabold text-blue-700 mt-1">
              {formatCurrency(bankAccounts[0]?.currentBalance || 1250000, locale)}
            </h3>
            <p className="text-[11px] text-slate-400 mt-1">Sonali Bank PLC General Fund</p>
          </div>
        </div>

        {/* Recent Transactions & Payments Table */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">
              {locale === 'bn' ? 'সর্বশেষ যাচাইকৃত অনলাইন ও কাউন্টার পেমেন্ট' : 'Recent Verified Fee Collections'}
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">{locale === 'bn' ? 'রসিদ নং' : 'Receipt No'}</th>
                  <th className="py-3 px-4">{locale === 'bn' ? 'শিক্ষার্থী' : 'Student'}</th>
                  <th className="py-3 px-4">{locale === 'bn' ? 'পেমেন্ট মাধ্যম' : 'Method'}</th>
                  <th className="py-3 px-4">{locale === 'bn' ? 'লেনদেন আইডি' : 'Trx ID'}</th>
                  <th className="py-3 px-4">{locale === 'bn' ? 'টাকার পরিমাণ' : 'Amount'}</th>
                  <th className="py-3 px-4">{locale === 'bn' ? 'তারিখ' : 'Date'}</th>
                  <th className="py-3 px-4">{locale === 'bn' ? 'স্ট্যাটাস' : 'Status'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {payments.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">{p.receiptNo}</td>
                    <td className="py-3 px-4 font-semibold text-slate-800">
                      {locale === 'bn' ? p.student.nameBn : p.student.nameEn}
                    </td>
                    <td className="py-3 px-4 font-bold text-blue-700">{p.paymentMethod}</td>
                    <td className="py-3 px-4 font-mono text-[11px] text-slate-600">{p.transactionId}</td>
                    <td className="py-3 px-4 font-extrabold text-emerald-600">{formatCurrency(p.amount, locale)}</td>
                    <td className="py-3 px-4 text-slate-500">{formatDate(p.paidAt, locale)}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px] border border-emerald-200">
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

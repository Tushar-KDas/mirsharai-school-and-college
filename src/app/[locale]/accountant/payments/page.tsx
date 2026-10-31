import React from 'react';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Locale, isValidLocale, defaultLocale } from '@/lib/i18n';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Receipt, CheckCircle, Printer } from 'lucide-react';

export default async function AccountantPaymentsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale: Locale = isValidLocale(resolvedParams.locale)
    ? (resolvedParams.locale as Locale)
    : defaultLocale;

  const session = await getSession();
  if (!session || (session.role !== 'ACCOUNTANT' && session.role !== 'ADMIN' && session.role !== 'SUPER_ADMIN')) {
    redirect(`/${locale}/login?redirect=/${locale}/accountant/payments`);
  }

  const payments = await prisma.payment.findMany({
    orderBy: { paidAt: 'desc' },
    include: { student: true, invoice: true },
    take: 50,
  });

  return (
    <DashboardLayout user={session}>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {locale === 'bn' ? 'আদায়কৃত পেমেন্ট ও নগদ খতিয়ান' : 'Fee Collections & Payment Ledger'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {locale === 'bn'
              ? 'বিকাশ, নগদ, রকেট ও ব্যাংক কাউন্টারে জমাকৃত সকল পরিশোধিত রসিদের বিস্তারিত হিসাব'
              : 'Verified digital and counter transactions, transaction IDs, and receipts'}
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">{locale === 'bn' ? 'রসিদ নং' : 'Receipt No'}</th>
                  <th className="py-3 px-4">{locale === 'bn' ? 'শিক্ষার্থী' : 'Student'}</th>
                  <th className="py-3 px-4">{locale === 'bn' ? 'পেমেন্ট মাধ্যম' : 'Method'}</th>
                  <th className="py-3 px-4">{locale === 'bn' ? 'ট্রানজেকশন আইডি' : 'Trx ID'}</th>
                  <th className="py-3 px-4">{locale === 'bn' ? 'তারিখ' : 'Date'}</th>
                  <th className="py-3 px-4 text-right">{locale === 'bn' ? 'জমা' : 'Amount'}</th>
                  <th className="py-3 px-4 text-center">{locale === 'bn' ? 'স্ট্যাটাস' : 'Status'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {payments.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-blue-700">
                      {p.receiptNo}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-900">
                      {p.student ? (locale === 'bn' ? p.student.nameBn : p.student.nameEn) : 'Student'}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-700">
                      {p.paymentMethod}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-500 text-[11px]">
                      {p.transactionId || 'CASH-COUNTER'}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-600">
                      {formatDate(p.paidAt, locale)}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-emerald-600">
                      {formatCurrency(p.amount, locale)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
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

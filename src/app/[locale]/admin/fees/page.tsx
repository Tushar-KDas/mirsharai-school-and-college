import React from 'react';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Locale, isValidLocale, defaultLocale } from '@/lib/i18n';
import { formatCurrency, formatDate } from '@/lib/utils';
import { CreditCard, CheckCircle2, AlertCircle, Clock, Search, Receipt } from 'lucide-react';

export default async function AdminFeesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale: Locale = isValidLocale(resolvedParams.locale)
    ? (resolvedParams.locale as Locale)
    : defaultLocale;

  const session = await getSession();
  if (!session || (session.role !== 'ADMIN' && session.role !== 'SUPER_ADMIN' && session.role !== 'ACCOUNTANT')) {
    redirect(`/${locale}/login?redirect=/${locale}/admin/fees`);
  }

  const invoices = await prisma.invoice.findMany({
    include: {
      student: {
        include: {
          class: true,
          section: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  const totalInvoiced = invoices.reduce((sum, inv) => sum + inv.totalPayable, 0);
  const totalPaid = invoices.reduce((sum, inv) => sum + inv.paidAmount, 0);
  const totalDue = totalInvoiced - totalPaid;

  return (
    <DashboardLayout user={session}>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {locale === 'bn' ? 'ফি ও ইনভয়েস ব্যবস্থাপনা' : 'Fee Management & Invoices'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {locale === 'bn'
              ? 'শিক্ষার্থীদের টিউশন ফি, পরীক্ষা ফি, চালান ও অনলাইন পেমেন্ট ট্র্যাকিং'
              : 'Track student fee invoices, collect dues, and generate receipts'}
          </p>
        </div>

        {/* 3 Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
            <p className="text-xs font-semibold text-slate-500 uppercase">
              {locale === 'bn' ? 'মোট চালানের পরিমাণ' : 'Total Invoiced'}
            </p>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-1">
              {formatCurrency(totalInvoiced, locale)}
            </h3>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
            <p className="text-xs font-semibold text-slate-500 uppercase">
              {locale === 'bn' ? 'মোট আদায়কৃত ফি' : 'Total Collected'}
            </p>
            <h3 className="text-2xl font-extrabold text-emerald-600 mt-1">
              {formatCurrency(totalPaid, locale)}
            </h3>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
            <p className="text-xs font-semibold text-slate-500 uppercase">
              {locale === 'bn' ? 'মোট বকেয়া ফি' : 'Total Outstanding Dues'}
            </p>
            <h3 className="text-2xl font-extrabold text-rose-600 mt-1">
              {formatCurrency(totalDue, locale)}
            </h3>
          </div>
        </div>

        {/* Invoices List */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-4">{locale === 'bn' ? 'চালান নং' : 'Invoice No'}</th>
                  <th className="py-3.5 px-4">{locale === 'bn' ? 'শিক্ষার্থী' : 'Student'}</th>
                  <th className="py-3.5 px-4">{locale === 'bn' ? 'শ্রেণি ও রোল' : 'Class & Roll'}</th>
                  <th className="py-3.5 px-4">{locale === 'bn' ? 'ফির শিরোনাম' : 'Fee Title'}</th>
                  <th className="py-3.5 px-4">{locale === 'bn' ? 'মোট টাকা' : 'Payable'}</th>
                  <th className="py-3.5 px-4">{locale === 'bn' ? 'পরিশোধিত' : 'Paid'}</th>
                  <th className="py-3.5 px-4">{locale === 'bn' ? 'বকেয়া' : 'Due'}</th>
                  <th className="py-3.5 px-4">{locale === 'bn' ? 'স্ট্যাটাস' : 'Status'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {invoices.map((inv) => {
                  const due = inv.totalPayable - inv.paidAmount;
                  return (
                    <tr key={inv.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-blue-700">
                        {inv.invoiceNo}
                      </td>
                      <td className="py-3 px-4">
                        <p className="font-bold text-slate-900">
                          {locale === 'bn' ? inv.student.nameBn : inv.student.nameEn}
                        </p>
                        <p className="text-[10px] text-slate-400 font-mono">
                          {inv.student.studentId}
                        </p>
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-700">
                        {locale === 'bn' ? inv.student.class.nameBn : inv.student.class.nameEn} (Roll {inv.student.roll})
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-800">
                        {inv.title}
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-900">
                        {formatCurrency(inv.totalPayable, locale)}
                      </td>
                      <td className="py-3 px-4 font-bold text-emerald-600">
                        {formatCurrency(inv.paidAmount, locale)}
                      </td>
                      <td className="py-3 px-4 font-bold text-rose-600">
                        {formatCurrency(due, locale)}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            inv.status === 'PAID'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : inv.status === 'PARTIAL'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}
                        >
                          {inv.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

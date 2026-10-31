'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { formatCurrency, formatDate } from '@/lib/utils';
import {
  Receipt,
  Plus,
  Search,
  Filter,
  DollarSign,
  TrendingDown,
  Wrench,
  Zap,
  Bus,
  CheckCircle2,
  X,
  FileText,
  Printer,
} from 'lucide-react';

interface ExpenseRecord {
  id: string;
  voucherNo: string;
  category: string;
  amount: number;
  description: string;
  expenseDate: string | Date;
  approvedBy?: string | null;
}

export default function AdminExpensesClient({
  initialExpenses,
}: {
  initialExpenses: ExpenseRecord[];
}) {
  const { locale, t } = useLanguage();
  const [expenses, setExpenses] = useState<ExpenseRecord[]>(initialExpenses);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Form State
  const [formVoucherNo, setFormVoucherNo] = useState(`VCH-2026-${String(expenses.length + 1).padStart(3, '0')}`);
  const [formCategory, setFormCategory] = useState('UTILITY');
  const [formAmount, setFormAmount] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formExpenseDate, setFormExpenseDate] = useState(new Date().toISOString().split('T')[0]);
  const [formApprovedBy, setFormApprovedBy] = useState('Admin Approved');

  // Metrics
  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);
  const utilityTotal = expenses
    .filter((e) => e.category === 'UTILITY')
    .reduce((sum, e) => sum + e.amount, 0);
  const maintenanceTotal = expenses
    .filter((e) => e.category === 'MAINTENANCE')
    .reduce((sum, e) => sum + e.amount, 0);
  const transportTotal = expenses
    .filter((e) => e.category === 'TRANSPORT')
    .reduce((sum, e) => sum + e.amount, 0);

  // Filtered List
  const filteredExpenses = expenses.filter((e) => {
    const matchesCat = selectedCategory === 'ALL' || e.category === selectedCategory;
    const matchesSearch =
      search === '' ||
      e.voucherNo.toLowerCase().includes(search.toLowerCase()) ||
      e.description.toLowerCase().includes(search.toLowerCase()) ||
      (e.approvedBy && e.approvedBy.toLowerCase().includes(search.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const categories = [
    { id: 'ALL', labelBn: 'সকল খাত', labelEn: 'All Categories' },
    { id: 'UTILITY', labelBn: 'বিদ্যুৎ ও ইন্টারনেট', labelEn: 'Utilities & Net' },
    { id: 'MAINTENANCE', labelBn: 'মেরামত ও সার্ভিসিং', labelEn: 'Maintenance' },
    { id: 'LAB_EQUIPMENT', labelBn: 'ল্যাব ও বিজ্ঞানাগার', labelEn: 'Lab Equipment' },
    { id: 'TRANSPORT', labelBn: 'বাস বহর ও জ্বালানি', labelEn: 'Transport & Fuel' },
    { id: 'STATIONERY', labelBn: 'মুদ্রণ ও খাতা পত্র', labelEn: 'Stationery & Printing' },
    { id: 'ACADEMIC', labelBn: 'একাডেমিক ও প্রশিক্ষণ', labelEn: 'Academic & Training' },
    { id: 'SPORTS', labelBn: 'ক্রীড়া ও খেলাধুলা', labelEn: 'Sports & Games' },
    { id: 'EVENT', labelBn: 'অনুষ্ঠান ও স্কাউট', labelEn: 'Events & Scout' },
  ];

  const handleCreateExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formAmount || !formDescription) {
      alert(locale === 'bn' ? 'অনুগ্রহ করে সকল প্রয়োজনীয় তথ্য পূরণ করুন' : 'Please fill all required fields');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/admin/expenses/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          voucherNo: formVoucherNo,
          category: formCategory,
          amount: parseFloat(formAmount),
          description: formDescription,
          expenseDate: formExpenseDate,
          approvedBy: formApprovedBy,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setExpenses([data.expense, ...expenses]);
        setIsModalOpen(false);
        setFormAmount('');
        setFormDescription('');
        setFormVoucherNo(`VCH-2026-${String(expenses.length + 2).padStart(3, '0')}`);
        setFeedback(
          locale === 'bn'
            ? `ব্যয়ের ভাউচার "${data.expense.voucherNo}" সফলভাবে লিপিবদ্ধ হয়েছে!`
            : `Expense voucher "${data.expense.voucherNo}" recorded successfully!`
        );
        setTimeout(() => setFeedback(null), 4000);
      } else {
        alert(data.error || 'Failed to record expense');
      }
    } catch {
      alert('Network error. Failed to save.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {locale === 'bn' ? 'প্রতিষ্ঠান পরিচালনা ও প্রশাসনিক ব্যয়' : 'Operating Expenses & Vouchers'}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
              {expenses.length} {locale === 'bn' ? 'ভাউচার' : 'Vouchers'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {locale === 'bn'
              ? 'স্কুল ও কলেজ ক্যাম্পাসের রুটিন পরিচালনা, মেরামত, ল্যাব সামগ্রী ও পরিবহন ভাউচার'
              : 'Institutional operational vouchers, maintenance, laboratory acquisitions, and transit fuel'}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{locale === 'bn' ? 'রিপোর্ট প্রিন্ট' : 'Print Statement'}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{locale === 'bn' ? '+ নতুন ভাউচার যোগ' : '+ Add Voucher'}</span>
          </button>
        </div>
      </div>

      {feedback && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* 4 Analytics KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500 uppercase">
              {locale === 'bn' ? 'মোট অনুমোদিত ব্যয়' : 'Total Approved Expenses'}
            </p>
            <h3 className="text-xl font-black text-rose-600 mt-0.5">
              {formatCurrency(totalExpense, locale)}
            </h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500 uppercase">
              {locale === 'bn' ? 'বিদ্যুৎ ও ইন্টারনেট' : 'Utilities & Internet'}
            </p>
            <h3 className="text-xl font-black text-amber-600 mt-0.5">
              {formatCurrency(utilityTotal, locale)}
            </h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
            <Wrench className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500 uppercase">
              {locale === 'bn' ? 'ক্যাম্পাস মেরামত' : 'Repairs & Maintenance'}
            </p>
            <h3 className="text-xl font-black text-indigo-600 mt-0.5">
              {formatCurrency(maintenanceTotal, locale)}
            </h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
            <Bus className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500 uppercase">
              {locale === 'bn' ? 'পরিবহন ও জ্বালানি' : 'Fleet Fuel & Transit'}
            </p>
            <h3 className="text-xl font-black text-emerald-600 mt-0.5">
              {formatCurrency(transportTotal, locale)}
            </h3>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search Controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={
                locale === 'bn' ? 'ভাউচার নং, বিবরণ বা অনুমোদক খুঁজুন...' : 'Search voucher, description, payee...'
              }
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </div>

          <div className="text-xs text-slate-500 font-semibold self-end sm:self-center">
            {locale === 'bn'
              ? `প্রদর্শিত: ${filteredExpenses.length} টি ভাউচার`
              : `Showing: ${filteredExpenses.length} vouchers`}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {locale === 'bn' ? cat.labelBn : cat.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Vouchers Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">{locale === 'bn' ? 'ভাউচার নং' : 'Voucher No'}</th>
                <th className="py-3 px-4">{locale === 'bn' ? 'তারিখ' : 'Date'}</th>
                <th className="py-3 px-4">{locale === 'bn' ? 'খাত / ক্যাটাগরি' : 'Category'}</th>
                <th className="py-3 px-4">{locale === 'bn' ? 'ব্যয়ের বিবরণ' : 'Description'}</th>
                <th className="py-3 px-4">{locale === 'bn' ? 'অনুমোদনকারী' : 'Approved By'}</th>
                <th className="py-3 px-4 text-right">{locale === 'bn' ? 'টাকার পরিমাণ' : 'Amount'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredExpenses.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 space-y-1">
                    <Receipt className="w-8 h-8 mx-auto text-slate-300" />
                    <p className="font-semibold">
                      {locale === 'bn' ? 'কোনো ব্যয়ের ভাউচার পাওয়া যায়নি' : 'No expense vouchers found'}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredExpenses.map((exp) => (
                  <tr key={exp.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-blue-700">
                      {exp.voucherNo}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-600">
                      {formatDate(exp.expenseDate, locale)}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                        {exp.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-800 max-w-md">
                      {exp.description}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>{exp.approvedBy || 'Admin Approved'}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-black text-slate-900 text-sm">
                      {formatCurrency(exp.amount, locale)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Voucher Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95">
            <div className="p-5 bg-gradient-to-r from-navy-950 to-blue-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Receipt className="w-5 h-5 text-blue-300" />
                <h3 className="font-extrabold text-sm sm:text-base">
                  {locale === 'bn' ? 'নতুন ব্যয়ের ভাউচার এন্ট্রি' : 'Record New Expense Voucher'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateExpense} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {locale === 'bn' ? 'ভাউচার নম্বর' : 'Voucher No'}
                  </label>
                  <input
                    type="text"
                    value={formVoucherNo}
                    onChange={(e) => setFormVoucherNo(e.target.value)}
                    required
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {locale === 'bn' ? 'তারিখ' : 'Expense Date'}
                  </label>
                  <input
                    type="date"
                    value={formExpenseDate}
                    onChange={(e) => setFormExpenseDate(e.target.value)}
                    required
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {locale === 'bn' ? 'ব্যয়ের খাত' : 'Category'}
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold"
                  >
                    <option value="UTILITY">UTILITY (বিদ্যুৎ/ইন্টারনেট)</option>
                    <option value="MAINTENANCE">MAINTENANCE (মেরামত)</option>
                    <option value="LAB_EQUIPMENT">LAB_EQUIPMENT (ল্যাব সামগ্রী)</option>
                    <option value="TRANSPORT">TRANSPORT (পরিবহন ও জ্বালানি)</option>
                    <option value="STATIONERY">STATIONERY (স্টেশনারি ও মুদ্রণ)</option>
                    <option value="ACADEMIC">ACADEMIC (একাডেমিক কর্মশালা)</option>
                    <option value="SPORTS">SPORTS (ক্রীড়া ও খেলাধুলা)</option>
                    <option value="EVENT">EVENT (বার্ষিক অনুষ্ঠান)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {locale === 'bn' ? 'টাকার পরিমাণ (BDT)' : 'Amount (BDT)'}
                  </label>
                  <input
                    type="number"
                    value={formAmount}
                    onChange={(e) => setFormAmount(e.target.value)}
                    placeholder="e.g. 15000"
                    required
                    min="1"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-800 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {locale === 'bn' ? 'অনুমোদনকারী কর্মকর্তা' : 'Approver / Authorized By'}
                </label>
                <input
                  type="text"
                  value={formApprovedBy}
                  onChange={(e) => setFormApprovedBy(e.target.value)}
                  required
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {locale === 'bn' ? 'ব্যয়ের পূর্ণ বিবরণ' : 'Description'}
                </label>
                <textarea
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  rows={3}
                  required
                  placeholder={locale === 'bn' ? 'ব্যয়ের উদ্দেশ্য ও বিশদ বিবরণ লিখুন...' : 'Enter details of the expenditure...'}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                ></textarea>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold"
                >
                  {locale === 'bn' ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold disabled:opacity-50"
                >
                  {loading
                    ? locale === 'bn'
                      ? 'সংরক্ষণ হচ্ছে...'
                      : 'Saving...'
                    : locale === 'bn'
                    ? 'ভাউচার সংরক্ষণ করুন'
                    : 'Save Voucher'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

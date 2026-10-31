'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { formatDate } from '@/lib/utils';
import {
  BookMarked,
  BookOpen,
  Search,
  Plus,
  Filter,
  CheckCircle2,
  Clock,
  Layers,
  X,
  UserCheck,
  Bookmark,
  Printer,
} from 'lucide-react';

interface BookItem {
  id: string;
  isbn?: string | null;
  title: string;
  author: string;
  category: string;
  copiesTotal: number;
  copiesAvailable: number;
  rackLocation?: string | null;
  _count?: { loans: number };
}

interface LoanItem {
  id: string;
  bookId: string;
  studentId: string;
  borrowDate: string | Date;
  dueDate: string | Date;
  status: string;
  book: { title: string; author: string };
  student: { nameBn: string; nameEn: string; roll: number; studentId: string };
}

export default function AdminLibraryClient({
  initialBooks,
  recentLoans,
}: {
  initialBooks: BookItem[];
  recentLoans: LoanItem[];
}) {
  const { locale, t } = useLanguage();
  const [books, setBooks] = useState<BookItem[]>(initialBooks);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Form State
  const [formTitle, setFormTitle] = useState('');
  const [formAuthor, setFormAuthor] = useState('');
  const [formIsbn, setFormIsbn] = useState('');
  const [formCategory, setFormCategory] = useState('LITERATURE');
  const [formCopies, setFormCopies] = useState('10');
  const [formRack, setFormRack] = useState('Rack A-1');

  // Stats
  const totalTitles = books.length;
  const totalCopies = books.reduce((sum, b) => sum + b.copiesTotal, 0);
  const totalAvailable = books.reduce((sum, b) => sum + b.copiesAvailable, 0);
  const totalBorrowed = totalCopies - totalAvailable;

  const filteredBooks = books.filter((b) => {
    const matchesCat = selectedCategory === 'ALL' || b.category === selectedCategory;
    const matchesSearch =
      search === '' ||
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase()) ||
      (b.isbn && b.isbn.toLowerCase().includes(search.toLowerCase())) ||
      (b.rackLocation && b.rackLocation.toLowerCase().includes(search.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const categories = [
    { id: 'ALL', labelBn: 'সকল পুস্তক', labelEn: 'All Books' },
    { id: 'LITERATURE', labelBn: 'বাংলা সাহিত্য', labelEn: 'Bengali Literature' },
    { id: 'SCIENCE', labelBn: 'বিজ্ঞান ও মহাকাশ', labelEn: 'Science & Physics' },
    { id: 'TEXTBOOK', labelBn: 'পাঠ্যপুস্তক ও আইসিটি', labelEn: 'Textbooks & ICT' },
    { id: 'HISTORY', labelBn: 'ইতিহাস ও মুক্তিযুদ্ধ', labelEn: 'History & Liberation' },
    { id: 'REFERENCE', labelBn: 'অভিধান ও রেফারেন্স', labelEn: 'Reference & Grammar' },
  ];

  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle || !formAuthor) {
      alert(locale === 'bn' ? 'বইয়ের নাম ও লেখক বাধ্যতামূলক' : 'Title and Author are required');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/admin/library/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formTitle,
          author: formAuthor,
          isbn: formIsbn,
          category: formCategory,
          copiesTotal: parseInt(formCopies) || 1,
          rackLocation: formRack,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setBooks([data.book, ...books]);
        setIsModalOpen(false);
        setFormTitle('');
        setFormAuthor('');
        setFormIsbn('');
        setFeedback(
          locale === 'bn'
            ? `পুস্তক "${data.book.title}" সফলভাবে ক্যাটালগে যুক্ত হয়েছে!`
            : `Book "${data.book.title}" added to catalog successfully!`
        );
        setTimeout(() => setFeedback(null), 4000);
      } else {
        alert(data.error || 'Failed to add book');
      }
    } catch {
      alert('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {locale === 'bn' ? 'কেন্দ্রীয় লাইব্রেরি ও পুস্তক সংগ্রহশালা' : 'Central Library & Book Catalog'}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              {totalTitles} {locale === 'bn' ? 'শিরোনাম' : 'Titles'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {locale === 'bn'
              ? 'পাঠ্যপুস্তক, রেফারেন্স বই, সাহিত্য, বিজ্ঞান গবেষণাপত্র ও শিক্ষার্থীদের পুস্তক আবর্তন বিবরণী'
              : 'Institutional book collection, ISBN records, shelf locations, and circulation checkout log'}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{locale === 'bn' ? 'তালিকা প্রিন্ট' : 'Print Catalog'}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{locale === 'bn' ? '+ নতুন বই যোগ' : '+ Add Book'}</span>
          </button>
        </div>
      </div>

      {feedback && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
            <BookMarked className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500 uppercase">
              {locale === 'bn' ? 'মোট বইয়ের টাইটেল' : 'Total Book Titles'}
            </p>
            <h3 className="text-xl font-black text-slate-900 mt-0.5">
              {totalTitles}
            </h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500 uppercase">
              {locale === 'bn' ? 'মোট সংরক্ষিত কপি' : 'Total Volume Copies'}
            </p>
            <h3 className="text-xl font-black text-emerald-600 mt-0.5">
              {totalCopies}
            </h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500 uppercase">
              {locale === 'bn' ? 'ইস্যুকৃত কপি' : 'Currently Borrowed'}
            </p>
            <h3 className="text-xl font-black text-amber-600 mt-0.5">
              {totalBorrowed}
            </h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500 uppercase">
              {locale === 'bn' ? 'শেলফে উপলব্ধ' : 'Available on Shelf'}
            </p>
            <h3 className="text-xl font-black text-purple-600 mt-0.5">
              {totalAvailable}
            </h3>
          </div>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={locale === 'bn' ? 'বইয়ের নাম, লেখক, আইএসবিএন খুঁজুন...' : 'Search title, author, ISBN...'}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </div>

          <div className="text-xs text-slate-500 font-semibold self-end sm:self-center">
            {locale === 'bn'
              ? `প্রদর্শিত: ${filteredBooks.length} টি বই`
              : `Showing: ${filteredBooks.length} titles`}
          </div>
        </div>

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

      {/* Books Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">{locale === 'bn' ? 'বইয়ের নাম' : 'Book Title'}</th>
                <th className="py-3 px-4">{locale === 'bn' ? 'লেখক / সংকলক' : 'Author'}</th>
                <th className="py-3 px-4">{locale === 'bn' ? 'আইএসবিএন' : 'ISBN'}</th>
                <th className="py-3 px-4">{locale === 'bn' ? 'ক্যাটাগরি' : 'Category'}</th>
                <th className="py-3 px-4">{locale === 'bn' ? 'শেলফ অবস্থান' : 'Shelf Location'}</th>
                <th className="py-3 px-4 text-center">{locale === 'bn' ? 'মোট কপি' : 'Total'}</th>
                <th className="py-3 px-4 text-center">{locale === 'bn' ? 'উপলব্ধ কপি' : 'Available'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBooks.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400 space-y-1">
                    <BookOpen className="w-8 h-8 mx-auto text-slate-300" />
                    <p className="font-semibold">
                      {locale === 'bn' ? 'কোনো বই পাওয়া যায়নি' : 'No books found'}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredBooks.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900 max-w-xs">
                      {b.title}
                    </td>
                    <td className="py-3 px-4 text-slate-600 font-medium">
                      {b.author}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-500">
                      {b.isbn || '—'}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                        {b.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-600">
                      {b.rackLocation || 'General Stacks'}
                    </td>
                    <td className="py-3 px-4 text-center font-mono font-bold text-slate-700">
                      {b.copiesTotal}
                    </td>
                    <td className="py-3 px-4 text-center font-mono font-extrabold text-emerald-600">
                      {b.copiesAvailable}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Book Circulation Loans */}
      {recentLoans.length > 0 && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-blue-600" />
              <span>{locale === 'bn' ? 'সাম্প্রতিক শিক্ষার্থী বই ইস্যু ও আবর্তন বিবরণী' : 'Current Student Circulation & Checkout Log'}</span>
            </h2>
            <span className="text-xs text-slate-500 font-semibold">
              {recentLoans.length} {locale === 'bn' ? 'টি সক্রিয় ইস্যু' : 'Active issues'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {recentLoans.map((loan) => (
              <div
                key={loan.id}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="font-bold text-slate-900 line-clamp-1">{loan.book.title}</p>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex-shrink-0 ${
                      loan.status === 'BORROWED'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {loan.status}
                  </span>
                </div>
                <div className="text-[11px] text-slate-600 space-y-0.5 font-medium">
                  <p>
                    <span className="text-slate-400">Student:</span>{' '}
                    <span className="font-bold text-slate-800">
                      {locale === 'bn' ? loan.student.nameBn : loan.student.nameEn}
                    </span>{' '}
                    (Roll: {loan.student.roll})
                  </p>
                  <p className="font-mono text-slate-500">
                    Due: {formatDate(loan.dueDate, locale)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Book Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95">
            <div className="p-5 bg-gradient-to-r from-navy-950 to-blue-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-300" />
                <h3 className="font-extrabold text-sm sm:text-base">
                  {locale === 'bn' ? 'নতুন পুস্তক ক্যাটালগ এন্ট্রি' : 'Add New Library Book to Catalog'}
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

            <form onSubmit={handleAddBook} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {locale === 'bn' ? 'বইয়ের নাম' : 'Book Title'}
                </label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. সঞ্চয়িতা বা পদার্থবিজ্ঞান"
                  required
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {locale === 'bn' ? 'লেখক / সংকলক' : 'Author'}
                  </label>
                  <input
                    type="text"
                    value={formAuthor}
                    onChange={(e) => setFormAuthor(e.target.value)}
                    required
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {locale === 'bn' ? 'আইএসবিএন (ISBN)' : 'ISBN'}
                  </label>
                  <input
                    type="text"
                    value={formIsbn}
                    onChange={(e) => setFormIsbn(e.target.value)}
                    placeholder="978-984-..."
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {locale === 'bn' ? 'ক্যাটাগরি' : 'Category'}
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold"
                  >
                    <option value="LITERATURE">LITERATURE (সাহিত্য)</option>
                    <option value="SCIENCE">SCIENCE (বিজ্ঞান ও গণিত)</option>
                    <option value="TEXTBOOK">TEXTBOOK (পাঠ্যপুস্তক ও আইসিটি)</option>
                    <option value="HISTORY">HISTORY (ইতিহাস ও মুক্তিযুদ্ধ)</option>
                    <option value="REFERENCE">REFERENCE (রেফারেন্স ও অভিধান)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {locale === 'bn' ? 'মোট কপির সংখ্যা' : 'Total Copies'}
                  </label>
                  <input
                    type="number"
                    value={formCopies}
                    onChange={(e) => setFormCopies(e.target.value)}
                    required
                    min="1"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-800 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {locale === 'bn' ? 'শেলফ ও র্যাকের অবস্থান' : 'Shelf / Rack Location'}
                </label>
                <input
                  type="text"
                  value={formRack}
                  onChange={(e) => setFormRack(e.target.value)}
                  placeholder="e.g. Rack S-2 (Chemistry)"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                />
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
                      ? 'যুক্ত হচ্ছে...'
                      : 'Adding...'
                    : locale === 'bn'
                    ? 'ক্যাটালগে যুক্ত করুন'
                    : 'Add to Catalog'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  Box,
  Layers,
  Search,
  Plus,
  Filter,
  CheckCircle2,
  Cpu,
  FlaskConical,
  Armchair,
  Trophy,
  ShieldAlert,
  Printer,
  X,
  MapPin,
} from 'lucide-react';

interface AssetRecord {
  id: string;
  itemNameBn: string;
  itemNameEn: string;
  category: string;
  quantity: number;
  unit: string;
  location?: string | null;
}

export default function AdminInventoryClient({
  initialItems,
}: {
  initialItems: AssetRecord[];
}) {
  const { locale, t } = useLanguage();
  const [items, setItems] = useState<AssetRecord[]>(initialItems);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Form State
  const [formNameBn, setFormNameBn] = useState('');
  const [formNameEn, setFormNameEn] = useState('');
  const [formCategory, setFormCategory] = useState('ELECTRONICS');
  const [formQuantity, setFormQuantity] = useState('1');
  const [formUnit, setFormUnit] = useState('PCS');
  const [formLocation, setFormLocation] = useState('Central ICT Lab');

  // Stats
  const totalAssets = items.length;
  const totalQuantity = items.reduce((sum, it) => sum + it.quantity, 0);
  const itCount = items
    .filter((it) => it.category === 'ELECTRONICS')
    .reduce((sum, it) => sum + it.quantity, 0);
  const labCount = items
    .filter((it) => it.category === 'LAB_EQUIPMENT')
    .reduce((sum, it) => sum + it.quantity, 0);

  const filteredItems = items.filter((it) => {
    const matchesCat = selectedCategory === 'ALL' || it.category === selectedCategory;
    const matchesSearch =
      search === '' ||
      it.itemNameBn.toLowerCase().includes(search.toLowerCase()) ||
      it.itemNameEn.toLowerCase().includes(search.toLowerCase()) ||
      (it.location && it.location.toLowerCase().includes(search.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const categories = [
    { id: 'ALL', labelBn: 'সকল সম্পদ', labelEn: 'All Assets' },
    { id: 'ELECTRONICS', labelBn: 'কম্পিউটার ও আইটি', labelEn: 'IT & Electronics' },
    { id: 'LAB_EQUIPMENT', labelBn: 'বিজ্ঞানাগার যন্ত্রপাতি', labelEn: 'Lab Equipment' },
    { id: 'FURNITURE', labelBn: 'আসবাবপত্র ও ডেস্ক', labelEn: 'Furniture' },
    { id: 'SPORTS', labelBn: 'ক্রীড়া সামগ্রী', labelEn: 'Sports Gear' },
    { id: 'OTHER', labelBn: 'নিরাপত্তা ও অন্যান্য', labelEn: 'Safety & Utilities' },
  ];

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formNameBn || !formNameEn) {
      alert(locale === 'bn' ? 'বাংলা ও ইংরেজি উভয় নাম লিখুন' : 'Both Bangla and English names are required');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/admin/inventory/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itemNameBn: formNameBn,
          itemNameEn: formNameEn,
          category: formCategory,
          quantity: parseInt(formQuantity) || 1,
          unit: formUnit,
          location: formLocation,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setItems([data.item, ...items]);
        setIsModalOpen(false);
        setFormNameBn('');
        setFormNameEn('');
        setFeedback(
          locale === 'bn'
            ? `ইনভেন্টরি সম্পদ "${data.item.itemNameBn}" সফলভাবে তালিকাভুক্ত হয়েছে!`
            : `Asset "${data.item.itemNameEn}" added to inventory successfully!`
        );
        setTimeout(() => setFeedback(null), 4000);
      } else {
        alert(data.error || 'Failed to add asset');
      }
    } catch {
      alert('Network error');
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
              {locale === 'bn' ? 'প্রাতিষ্ঠানিক ইনভেন্টরি ও সম্পদ ভাণ্ডার' : 'Institutional Assets & Inventory'}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800">
              {totalAssets} {locale === 'bn' ? 'টি আইটেম' : 'Items'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {locale === 'bn'
              ? 'বিজ্ঞানাগার যন্ত্রপাতি, কম্পিউটার ল্যাব, স্মার্ট ক্লাসরুম প্রজেক্টর, আসবাবপত্র ও প্রাতিষ্ঠানিক সম্পদ'
              : 'Laboratory apparatus, multimedia workstations, audiovisual gear, classroom furniture, and hardware'}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{locale === 'bn' ? 'অডিট প্রিন্ট' : 'Print Audit'}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{locale === 'bn' ? '+ নতুন সম্পদ যোগ' : '+ Add Asset'}</span>
          </button>
        </div>
      </div>

      {feedback && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* 4 KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
            <Box className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500 uppercase">
              {locale === 'bn' ? 'মোট সম্পদ শ্রেণী' : 'Asset Categories'}
            </p>
            <h3 className="text-xl font-black text-slate-900 mt-0.5">
              {totalAssets}
            </h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500 uppercase">
              {locale === 'bn' ? 'আইটি ও কম্পিউটার ইউনিট' : 'IT Workstations & Units'}
            </p>
            <h3 className="text-xl font-black text-blue-700 mt-0.5">
              {itCount} Units
            </h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
            <FlaskConical className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500 uppercase">
              {locale === 'bn' ? 'বিজ্ঞানাগার যন্ত্রপাতি' : 'Science Lab Apparatus'}
            </p>
            <h3 className="text-xl font-black text-purple-600 mt-0.5">
              {labCount} Units
            </h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500 uppercase">
              {locale === 'bn' ? 'মোট ইউনিট সংখ্যা' : 'Total Asset Pieces'}
            </p>
            <h3 className="text-xl font-black text-emerald-600 mt-0.5">
              {totalQuantity}+
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
              placeholder={locale === 'bn' ? 'সম্পদের নাম বা অবস্থান খুঁজুন...' : 'Search asset name, location...'}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </div>

          <div className="text-xs text-slate-500 font-semibold self-end sm:self-center">
            {locale === 'bn'
              ? `প্রদর্শিত: ${filteredItems.length} টি সম্পদ`
              : `Showing: ${filteredItems.length} assets`}
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

      {/* Inventory Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">{locale === 'bn' ? 'সম্পদের নাম' : 'Asset Item Name'}</th>
                <th className="py-3 px-4">{locale === 'bn' ? 'ক্যাটাগরি' : 'Category'}</th>
                <th className="py-3 px-4 text-center">{locale === 'bn' ? 'পরিমাণ' : 'Quantity'}</th>
                <th className="py-3 px-4">{locale === 'bn' ? 'ক্যাম্পাসে অবস্থান' : 'Campus Location'}</th>
                <th className="py-3 px-4">{locale === 'bn' ? 'কার্যক্ষমতা' : 'Operational Status'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400 space-y-1">
                    <Box className="w-8 h-8 mx-auto text-slate-300" />
                    <p className="font-semibold">
                      {locale === 'bn' ? 'কোনো ইনভেন্টরি সম্পদ পাওয়া যায়নি' : 'No inventory assets found'}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredItems.map((it) => (
                  <tr key={it.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900 max-w-sm">
                      <p>{locale === 'bn' ? it.itemNameBn : it.itemNameEn}</p>
                      <p className="text-[11px] text-slate-400 font-normal">
                        {locale === 'bn' ? it.itemNameEn : it.itemNameBn}
                      </p>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                        {it.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono font-black text-slate-900 text-sm">
                      {it.quantity} <span className="text-xs font-normal text-slate-500">{it.unit}</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-medium">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                        <span>{it.location || 'Central Facility'}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>VERIFIED & OPERATIONAL</span>
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Asset Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95">
            <div className="p-5 bg-gradient-to-r from-navy-950 to-blue-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Box className="w-5 h-5 text-blue-300" />
                <h3 className="font-extrabold text-sm sm:text-base">
                  {locale === 'bn' ? 'নতুন প্রাতিষ্ঠানিক সম্পদ এন্ট্রি' : 'Add New Campus Inventory Asset'}
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

            <form onSubmit={handleAddItem} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {locale === 'bn' ? 'সম্পদের নাম (বাংলা)' : 'Asset Name (Bangla)'}
                </label>
                <input
                  type="text"
                  value={formNameBn}
                  onChange={(e) => setFormNameBn(e.target.value)}
                  placeholder="e.g. ডেল ব্র্যান্ড কম্পিউটার বা অপটিক্যাল মাইক্রোস্কোপ"
                  required
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {locale === 'bn' ? 'সম্পদের নাম (ইংরেজি)' : 'Asset Name (English)'}
                </label>
                <input
                  type="text"
                  value={formNameEn}
                  onChange={(e) => setFormNameEn(e.target.value)}
                  placeholder="e.g. Dell Workstation Core i5"
                  required
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {locale === 'bn' ? 'ক্যাটাগরি' : 'Category'}
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold"
                  >
                    <option value="ELECTRONICS">ELECTRONICS (আইটি)</option>
                    <option value="LAB_EQUIPMENT">LAB_EQUIPMENT (ল্যাব)</option>
                    <option value="FURNITURE">FURNITURE (আসবাবপত্র)</option>
                    <option value="SPORTS">SPORTS (ক্রীড়া)</option>
                    <option value="OTHER">OTHER (অন্যান্য)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {locale === 'bn' ? 'পরিমাণ' : 'Quantity'}
                  </label>
                  <input
                    type="number"
                    value={formQuantity}
                    onChange={(e) => setFormQuantity(e.target.value)}
                    required
                    min="1"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-800 font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {locale === 'bn' ? 'একক' : 'Unit'}
                  </label>
                  <input
                    type="text"
                    value={formUnit}
                    onChange={(e) => setFormUnit(e.target.value)}
                    placeholder="e.g. Set, Pcs"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {locale === 'bn' ? 'ক্যাম্পাসে অবস্থান' : 'Campus Location'}
                </label>
                <input
                  type="text"
                  value={formLocation}
                  onChange={(e) => setFormLocation(e.target.value)}
                  placeholder="e.g. ICT Lab Room 201"
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
                      ? 'সংরক্ষণ হচ্ছে...'
                      : 'Saving...'
                    : locale === 'bn'
                    ? 'সম্পদ সংরক্ষণ করুন'
                    : 'Save Asset'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

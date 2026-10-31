'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { Search, Filter, GraduationCap, Phone, Mail } from 'lucide-react';

interface TeacherItem {
  id: string;
  nameBn: string;
  nameEn: string;
  designationBn: string;
  designationEn: string;
  department: string;
  qualification: string | null;
  phone: string;
  email: string | null;
  photoUrl: string | null;
}

export default function FacultyDirectoryClient({
  teachers,
}: {
  teachers: TeacherItem[];
}) {
  const { locale, t } = useLanguage();
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('');

  const departments = Array.from(new Set(teachers.map((t) => t.department))).filter(Boolean);

  const filtered = teachers.filter((t) => {
    const matchesDept = !selectedDept || t.department === selectedDept;
    const matchesSearch =
      !search ||
      t.nameBn.includes(search) ||
      t.nameEn.toLowerCase().includes(search.toLowerCase()) ||
      t.department.toLowerCase().includes(search.toLowerCase()) ||
      (t.qualification && t.qualification.toLowerCase().includes(search.toLowerCase()));
    return matchesDept && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Search & Department Filter */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={locale === 'bn' ? 'শিক্ষকের নাম বা বিষয় দিয়ে খুঁজুন...' : 'Search by teacher name or subject...'}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          <button
            type="button"
            onClick={() => setSelectedDept('')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              !selectedDept ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
            }`}
          >
            {locale === 'bn' ? 'সকল বিভাগ' : 'All Departments'}
          </button>
          {departments.map((dept) => (
            <button
              key={dept}
              type="button"
              onClick={() => setSelectedDept(dept)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedDept === dept ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Teachers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length === 0 ? (
          <div className="col-span-full py-12 text-center text-slate-400 text-xs">
            {locale === 'bn' ? 'কোনো শিক্ষক পাওয়া যায়নি।' : 'No faculty members found.'}
          </div>
        ) : (
          filtered.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col items-center text-center space-y-3 hover:shadow-lg transition-all hover:-translate-y-0.5"
            >
              <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-blue-600/30 bg-slate-100 relative shadow-sm">
                <Image
                  src={teacher.photoUrl || '/images/school-assembly.jpg'}
                  alt={teacher.nameEn}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <h3 className="font-extrabold text-navy-900 text-base leading-snug">
                  {locale === 'bn' ? teacher.nameBn : teacher.nameEn}
                </h3>
                <p className="text-xs font-semibold text-blue-600 mt-0.5">
                  {locale === 'bn' ? teacher.designationBn : teacher.designationEn}
                </p>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 mt-1">
                  {teacher.department}
                </span>
              </div>

              {teacher.qualification && (
                <div className="w-full pt-3 border-t border-slate-100 text-xs text-slate-600 flex items-center justify-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span className="truncate">{teacher.qualification}</span>
                </div>
              )}

              <div className="pt-1 flex items-center gap-3 text-xs text-slate-500 font-mono">
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-slate-400" />
                  <span>{teacher.phone}</span>
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import TeacherIdCardModal from '@/components/dashboard/TeacherIdCardModal';
import {
  Users,
  UserPlus,
  Search,
  Filter,
  GraduationCap,
  Phone,
  Mail,
  X,
  CheckCircle2,
  Printer,
} from 'lucide-react';

interface TeacherRecord {
  id: string;
  employeeId: string;
  nameBn: string;
  nameEn: string;
  designationBn: string;
  designationEn: string;
  department: string;
  phone: string;
  email: string | null;
  qualification: string | null;
  photoUrl: string | null;
  order: number;
}

export default function TeachersClient({
  initialTeachers,
}: {
  initialTeachers: TeacherRecord[];
}) {
  const { locale, t } = useLanguage();
  const [teachers, setTeachers] = useState<TeacherRecord[]>(initialTeachers);
  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [printingTeacher, setPrintingTeacher] = useState<TeacherRecord | null>(null);

  // Form state
  const [nameBn, setNameBn] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [designationBn, setDesignationBn] = useState('সহকারী শিক্ষক');
  const [designationEn, setDesignationEn] = useState('Assistant Teacher');
  const [department, setDepartment] = useState('Science');
  const [phone, setPhone] = useState('01800-111222');
  const [email, setEmail] = useState('');
  const [qualification, setQualification] = useState('B.Sc (Hons), M.Sc');

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const departments = Array.from(new Set(initialTeachers.map((t) => t.department))).filter(Boolean);

  const filteredTeachers = teachers.filter((t) => {
    const matchesDept = !deptFilter || t.department === deptFilter;
    const matchesSearch =
      !searchQuery ||
      t.nameBn.includes(searchQuery) ||
      t.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.phone.includes(searchQuery);
    return matchesDept && matchesSearch;
  });

  const handleAddTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/admin/teachers/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nameBn,
          nameEn,
          designationBn,
          designationEn,
          department,
          phone,
          email,
          qualification,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setTeachers([...teachers, data.teacher]);
        setIsAddOpen(false);
        setNameBn('');
        setNameEn('');
        setFeedback(
          locale === 'bn'
            ? `শিক্ষক "${data.teacher.nameBn}" সফলভাবে অন্তর্ভুক্ত হয়েছেন!`
            : `Teacher "${data.teacher.nameEn}" successfully added!`
        );
        setTimeout(() => setFeedback(null), 4000);
      } else {
        alert(data.error || 'Failed to add teacher');
      }
    } catch {
      alert('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {feedback && (
        <div className="p-4 bg-emerald-600 text-white rounded-2xl shadow-md text-xs font-bold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <span>{feedback}</span>
          </div>
          <button onClick={() => setFeedback(null)}>
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {locale === 'bn' ? `শিক্ষকমণ্ডলী তালিকা (${teachers.length} জন)` : `Faculty & Teaching Staff (${teachers.length} Members)`}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {locale === 'bn'
              ? 'বিদ্যালয় ও কলেজের অনুষদ সদস্য, পদবি, বিভাগ ও প্রাতিষ্ঠানিক তথ্যাদি'
              : 'Institutional faculty profiles, qualifications, departments, and contacts'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-xs font-bold transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>{locale === 'bn' ? 'প্রিন্ট' : 'Print'}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsAddOpen(true)}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-sm transition-all hover:scale-105"
          >
            <UserPlus className="w-4 h-4" />
            <span>{locale === 'bn' ? 'নতুন শিক্ষক যোগ করুন' : 'Add New Teacher'}</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={locale === 'bn' ? 'নাম, আইডি বা ফোন দিয়ে খুঁজুন...' : 'Search by name, ID or phone...'}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-500"
          >
            <option value="">{locale === 'bn' ? 'সকল বিভাগ' : 'All Departments'}</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid of Teachers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTeachers.map((tc) => (
          <div
            key={tc.id}
            className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4"
          >
            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0 relative">
              <Image
                src={tc.photoUrl || '/images/school-assembly.jpg'}
                alt={tc.nameEn}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                  {tc.employeeId}
                </span>
                <span className="text-[10px] font-semibold text-slate-500">
                  {tc.department}
                </span>
              </div>

              <h3 className="font-bold text-slate-900 text-sm mt-1 leading-snug truncate">
                {locale === 'bn' ? tc.nameBn : tc.nameEn}
              </h3>
              <p className="text-xs font-semibold text-blue-700">
                {locale === 'bn' ? tc.designationBn : tc.designationEn}
              </p>

              {tc.qualification && (
                <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1 truncate">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span className="truncate">{tc.qualification}</span>
                </p>
              )}

              <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1 font-mono">
                <Phone className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <span>{tc.phone}</span>
              </p>

              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setPrintingTeacher(tc)}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-all border border-emerald-200/60 shadow-xs hover:scale-102"
                >
                  <Printer className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{locale === 'bn' ? 'আইডি কার্ড প্রিন্ট' : 'Print ID Card'}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Add Teacher */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-base">
                {locale === 'bn' ? 'নতুন শিক্ষক প্রোফাইল যুক্ত করুন' : 'Add New Teacher Profile'}
              </h3>
              <button
                onClick={() => setIsAddOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddTeacher} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {locale === 'bn' ? 'শিক্ষকের নাম (বাংলা)' : 'Teacher Name (Bangla)'} *
                </label>
                <input
                  type="text"
                  required
                  value={nameBn}
                  onChange={(e) => setNameBn(e.target.value)}
                  placeholder="e.g. মোঃ হারুনুর রশিদ"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 font-semibold"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {locale === 'bn' ? 'শিক্ষকের নাম (English)' : 'Teacher Name (English)'} *
                </label>
                <input
                  type="text"
                  required
                  value={nameEn}
                  onChange={(e) => setNameEn(e.target.value)}
                  placeholder="e.g. Md. Harunur Rashid"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {locale === 'bn' ? 'পদবি (বাংলা)' : 'Designation (Bn)'}
                  </label>
                  <input
                    type="text"
                    value={designationBn}
                    onChange={(e) => setDesignationBn(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {locale === 'bn' ? 'পদবি (English)' : 'Designation (En)'}
                  </label>
                  <input
                    type="text"
                    value={designationEn}
                    onChange={(e) => setDesignationEn(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {locale === 'bn' ? 'বিভাগ' : 'Department'}
                  </label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {locale === 'bn' ? 'ফোন নম্বর' : 'Phone'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {locale === 'bn' ? 'শিক্ষাগত যোগ্যতা' : 'Qualifications'}
                </label>
                <input
                  type="text"
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                  placeholder="e.g. B.A (Hons), M.A in English"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors"
                >
                  {locale === 'bn' ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-md shadow-blue-600/30 disabled:opacity-50"
                >
                  {loading ? 'Adding...' : locale === 'bn' ? 'শিক্ষক যোগ করুন' : 'Confirm Teacher'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Teacher ID Card Modal */}
      {printingTeacher && (
        <TeacherIdCardModal
          teacher={printingTeacher}
          locale={locale}
          onClose={() => setPrintingTeacher(null)}
        />
      )}
    </div>
  );
}

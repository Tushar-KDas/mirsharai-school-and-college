'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import StudentIdCardModal from '@/components/dashboard/StudentIdCardModal';
import {
  GraduationCap,
  Plus,
  Search,
  Filter,
  Download,
  Printer,
  X,
  CheckCircle2,
  Phone,
  Eye,
  User,
} from 'lucide-react';

interface StudentRecord {
  id: string;
  studentId: string;
  admissionNo: string;
  roll: number;
  nameBn: string;
  nameEn: string;
  classId: string;
  sectionId: string;
  group: string;
  gender: string;
  phone: string | null;
  address: string | null;
  enrollStatus: string;
  class?: { id: string; nameBn: string; nameEn: string; numericValue: number };
  section?: { id: string; nameBn: string; nameEn: string };
}

interface ClassRecord {
  id: string;
  nameBn: string;
  nameEn: string;
  numericValue: number;
  sections?: { id: string; nameBn: string; nameEn: string }[];
}

export default function StudentsClient({
  initialStudents,
  classes,
}: {
  initialStudents: StudentRecord[];
  classes: ClassRecord[];
}) {
  const { locale, t } = useLanguage();
  const [students, setStudents] = useState<StudentRecord[]>(initialStudents);
  const [selectedClassId, setSelectedClassId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord | null>(null);
  const [printingStudent, setPrintingStudent] = useState<StudentRecord | null>(null);

  // Form state
  const [formNameBn, setFormNameBn] = useState('');
  const [formNameEn, setFormNameEn] = useState('');
  const [formClassId, setFormClassId] = useState(classes[0]?.id || '');
  const [formRoll, setFormRoll] = useState('21');
  const [formGroup, setFormGroup] = useState('GENERAL');
  const [formGender, setFormGender] = useState('MALE');
  const [formPhone, setFormPhone] = useState('01800-000000');
  const [formAddress, setFormAddress] = useState('মিরসরাই, চট্টগ্রাম');

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const filteredStudents = students.filter((s) => {
    const matchesClass = !selectedClassId || s.classId === selectedClassId;
    const matchesSearch =
      !searchQuery ||
      s.nameBn.includes(searchQuery) ||
      s.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.roll.toString() === searchQuery;
    return matchesClass && matchesSearch;
  });

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/admin/students/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nameBn: formNameBn,
          nameEn: formNameEn,
          classId: formClassId,
          roll: formRoll,
          group: formGroup,
          gender: formGender,
          phone: formPhone,
          address: formAddress,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStudents([data.student, ...students]);
        setIsAddOpen(false);
        setFormNameBn('');
        setFormNameEn('');
        setFeedback(
          locale === 'bn'
            ? `শিক্ষার্থী "${data.student.nameBn}" সফলভাবে অন্তর্ভুক্ত হয়েছে!`
            : `Student "${data.student.nameEn}" successfully enrolled!`
        );
        setTimeout(() => setFeedback(null), 4000);
      } else {
        alert(data.error || 'Failed to add student');
      }
    } catch {
      alert('Network error');
    } finally {
      setLoading(false);
    }
  };

  const handleExportPrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Toast Feedback */}
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
            {locale === 'bn' ? 'শিক্ষার্থী ব্যবস্থাপনা (১ম-১২শ শ্রেণি)' : 'Student Management (Class 1–12)'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {locale === 'bn'
              ? `মোট ${students.length} জন শিক্ষার্থী নিবন্ধিত • শ্রেণিভিত্তিক সার্চ ও ব্যবস্থাপনা`
              : `Total ${students.length} students enrolled • Search, filter, and manage student profiles`}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExportPrint}
            className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-xs font-bold transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>{locale === 'bn' ? 'প্রিন্ট / এক্সপোর্ট' : 'Print / Export'}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsAddOpen(true)}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-sm transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>{locale === 'bn' ? 'নতুন শিক্ষার্থী ভর্তি' : 'Add New Student'}</span>
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
            placeholder={locale === 'bn' ? 'নাম, রোল বা আইডি দিয়ে খুঁজুন...' : 'Search by name, roll or ID...'}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-500"
          >
            <option value="">{locale === 'bn' ? 'সকল শ্রেণি (১ম-১২শ)' : 'All Classes (1-12)'}</option>
            {classes.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {locale === 'bn' ? cls.nameBn : cls.nameEn}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">{locale === 'bn' ? 'রোল' : 'Roll'}</th>
                <th className="py-3 px-4">{locale === 'bn' ? 'শিক্ষার্থীর নাম' : 'Student Name'}</th>
                <th className="py-3 px-4">{locale === 'bn' ? 'শিক্ষার্থী আইডি' : 'Student ID'}</th>
                <th className="py-3 px-4">{locale === 'bn' ? 'শ্রেণি ও শাখা' : 'Class & Section'}</th>
                <th className="py-3 px-4">{locale === 'bn' ? 'বিভাগ' : 'Group'}</th>
                <th className="py-3 px-4">{locale === 'bn' ? 'যোগাযোগ' : 'Contact'}</th>
                <th className="py-3 px-4">{locale === 'bn' ? 'স্ট্যাটাস' : 'Status'}</th>
                <th className="py-3 px-4 text-right">{locale === 'bn' ? 'বিস্তারিত' : 'View'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    {locale === 'bn' ? 'কোনো শিক্ষার্থী পাওয়া যায়নি।' : 'No student records found.'}
                  </td>
                </tr>
              ) : (
                filteredStudents.map((st) => (
                  <tr key={st.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900 font-mono text-center w-12">
                      {st.roll}
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-bold text-slate-900">{locale === 'bn' ? st.nameBn : st.nameEn}</p>
                      <p className="text-[10px] text-slate-400">{locale === 'bn' ? st.nameEn : st.nameBn}</p>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-blue-700">
                      {st.studentId}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-800">
                      {st.class ? (locale === 'bn' ? st.class.nameBn : st.class.nameEn) : 'Class'}
                      {st.section && (
                        <span className="text-slate-400 font-normal ml-1">
                          ({locale === 'bn' ? st.section.nameBn : st.section.nameEn})
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
                        {st.group}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-600 text-[11px]">
                      {st.phone || '01800-000000'}
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        {st.enrollStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => setPrintingStudent(st)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold transition-colors"
                          title={locale === 'bn' ? 'আইডি কার্ড প্রিন্ট করুন' : 'Print Student ID Card'}
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>{locale === 'bn' ? 'আইডি কার্ড' : 'ID Card'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedStudent(st)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>{locale === 'bn' ? 'প্রোফাইল' : 'Profile'}</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Add New Student */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-base">
                {locale === 'bn' ? 'নতুন শিক্ষার্থী ভর্তি ও অন্তর্ভুক্তি' : 'Enroll New Student'}
              </h3>
              <button
                onClick={() => setIsAddOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddStudent} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {locale === 'bn' ? 'শিক্ষার্থীর নাম (বাংলা)' : 'Student Name (Bangla)'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formNameBn}
                    onChange={(e) => setFormNameBn(e.target.value)}
                    placeholder="e.g. তানভীর আহমেদ"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 font-semibold"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {locale === 'bn' ? 'শিক্ষার্থীর নাম (English)' : 'Student Name (English)'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formNameEn}
                    onChange={(e) => setFormNameEn(e.target.value)}
                    placeholder="e.g. Tanvir Ahmed"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {locale === 'bn' ? 'শ্রেণি নির্বাচন' : 'Select Class'} *
                  </label>
                  <select
                    value={formClassId}
                    onChange={(e) => setFormClassId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 font-semibold"
                  >
                    {classes.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {locale === 'bn' ? cls.nameBn : cls.nameEn}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {locale === 'bn' ? 'ক্লাস রোল' : 'Roll Number'} *
                  </label>
                  <input
                    type="number"
                    required
                    value={formRoll}
                    onChange={(e) => setFormRoll(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 font-mono font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {locale === 'bn' ? 'বিভাগ / গ্রুপ' : 'Group'}
                  </label>
                  <select
                    value={formGroup}
                    onChange={(e) => setFormGroup(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 font-semibold"
                  >
                    <option value="GENERAL">General</option>
                    <option value="SCIENCE">Science</option>
                    <option value="HUMANITIES">Humanities</option>
                    <option value="BUSINESS_STUDIES">Business Studies</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {locale === 'bn' ? 'লিঙ্গ' : 'Gender'}
                  </label>
                  <select
                    value={formGender}
                    onChange={(e) => setFormGender(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 font-semibold"
                  >
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {locale === 'bn' ? 'অভিভাবকের ফোন' : 'Guardian Phone'}
                </label>
                <input
                  type="text"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 font-mono"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {locale === 'bn' ? 'ঠিকানা' : 'Address'}
                </label>
                <input
                  type="text"
                  value={formAddress}
                  onChange={(e) => setFormAddress(e.target.value)}
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
                  {loading ? 'Enrolling...' : locale === 'bn' ? 'ভর্তি সম্পন্ন করুন' : 'Confirm Enrollment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: View Student Profile */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-base">
                {locale === 'bn' ? 'শিক্ষার্থীর পূর্ণাঙ্গ প্রোফাইল' : 'Student Academic Profile'}
              </h3>
              <button
                onClick={() => setSelectedStudent(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-4 p-4 bg-blue-50/60 rounded-2xl border border-blue-100">
              <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white font-extrabold text-xl flex items-center justify-center">
                {selectedStudent.roll}
              </div>
              <div>
                <h4 className="font-extrabold text-navy-900 text-base leading-tight">
                  {locale === 'bn' ? selectedStudent.nameBn : selectedStudent.nameEn}
                </h4>
                <p className="text-xs text-slate-500">{locale === 'bn' ? selectedStudent.nameEn : selectedStudent.nameBn}</p>
                <p className="text-[11px] font-mono font-bold text-blue-700 mt-0.5">{selectedStudent.studentId}</p>
              </div>
            </div>

            <div className="space-y-2 text-xs divide-y divide-slate-100">
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">{locale === 'bn' ? 'শ্রেণি:' : 'Class:'}</span>
                <span className="font-bold text-slate-800">{selectedStudent.class?.nameEn}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">{locale === 'bn' ? 'শাখা:' : 'Section:'}</span>
                <span className="font-bold text-slate-800">{selectedStudent.section?.nameEn || 'Section A'}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">{locale === 'bn' ? 'গ্রুপ:' : 'Group:'}</span>
                <span className="font-bold text-slate-800">{selectedStudent.group}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">{locale === 'bn' ? 'অভিভাবকের ফোন:' : 'Guardian Phone:'}</span>
                <span className="font-mono font-bold text-slate-800">{selectedStudent.phone || '01800-000000'}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">{locale === 'bn' ? 'ঠিকানা:' : 'Address:'}</span>
                <span className="font-medium text-slate-800">{selectedStudent.address || 'মিরসরাই, চট্টগ্রাম'}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">{locale === 'bn' ? 'ভর্তি নম্বর:' : 'Admission No:'}</span>
                <span className="font-mono font-bold text-blue-600">{selectedStudent.admissionNo}</span>
              </div>
            </div>

            <div className="pt-3 flex items-center justify-between border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  setPrintingStudent(selectedStudent);
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all hover:scale-105"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{locale === 'bn' ? 'আইডি কার্ড প্রিন্ট' : 'Print ID Card'}</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedStudent(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs"
              >
                {locale === 'bn' ? 'বন্ধ করুন' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Student ID Card Print Modal */}
      {printingStudent && (
        <StudentIdCardModal
          student={printingStudent}
          locale={locale}
          onClose={() => setPrintingStudent(null)}
        />
      )}
    </div>
  );
}

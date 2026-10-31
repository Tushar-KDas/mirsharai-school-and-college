import React from 'react';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Locale, isValidLocale, defaultLocale } from '@/lib/i18n';
import { Briefcase, Phone, Mail, UserCheck, ShieldCheck } from 'lucide-react';

export default async function AdminStaffPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale: Locale = isValidLocale(resolvedParams.locale)
    ? (resolvedParams.locale as Locale)
    : defaultLocale;

  const session = await getSession();
  if (!session || (session.role !== 'ADMIN' && session.role !== 'SUPER_ADMIN')) {
    redirect(`/${locale}/login?redirect=/${locale}/admin/staff`);
  }

  const staffMembers = await prisma.staff.findMany({
    where: { isTeacher: false },
    orderBy: { order: 'asc' },
  });

  return (
    <DashboardLayout user={session}>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {locale === 'bn' ? 'কর্মকর্তা ও কর্মচারী ব্যবস্থাপনা' : 'Non-Teaching Staff & Operations'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {locale === 'bn'
              ? 'অফিস সহকারী, হিসাবরক্ষণ কর্মকর্তা ও ল্যাব তত্ত্বাবধায়কদের তালিকা'
              : 'Administrative officers, accountants, IT coordinators, and support staff'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {staffMembers.map((staff) => (
            <div
              key={staff.id}
              className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200 text-slate-700 font-bold text-lg flex items-center justify-center flex-shrink-0">
                  {staff.nameEn.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-mono text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                    {staff.employeeId}
                  </span>
                  <h3 className="font-bold text-navy-900 text-sm mt-1 truncate">
                    {locale === 'bn' ? staff.nameBn : staff.nameEn}
                  </h3>
                  <p className="text-xs font-semibold text-blue-700">
                    {locale === 'bn' ? staff.designationBn : staff.designationEn}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {staff.department}
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3 space-y-1.5 text-xs">
                <p className="flex items-center gap-2 text-slate-600 font-mono">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{staff.phone}</span>
                </p>
                {staff.email && (
                  <p className="flex items-center gap-2 text-slate-600 font-mono truncate">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>{staff.email}</span>
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

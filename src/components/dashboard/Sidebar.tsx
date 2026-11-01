'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  UserCheck,
  Briefcase,
  Layers,
  BookOpen,
  CalendarCheck,
  Clock,
  Award,
  CreditCard,
  Receipt,
  BookMarked,
  Bus,
  Box,
  Bell,
  Calendar,
  BarChart3,
  Settings,
  Shield,
  FileText,
  LogOut,
  FolderOpen,
} from 'lucide-react';

interface SidebarProps {
  role: string;
  userName?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ role, isOpen, onClose }: SidebarProps) {
  const { locale, t } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push(`/${locale}/login`);
      router.refresh();
    } catch (err) {
      console.error('Logout error', err);
    }
  };

  // Define navigation items based on role
  const getNavItems = () => {
    switch (role) {
      case 'SUPER_ADMIN':
        return [
          { href: `/${locale}/super-admin/dashboard`, label: locale === 'bn' ? 'ড্যাশবোর্ড' : 'Dashboard', icon: LayoutDashboard },
          { href: `/${locale}/super-admin/users`, label: locale === 'bn' ? 'ইউজার ও রোলস' : 'Users & Roles', icon: Users },
          { href: `/${locale}/super-admin/settings`, label: locale === 'bn' ? 'প্রতিষ্ঠান সেটিংস' : 'School Settings', icon: Settings },
          { href: `/${locale}/super-admin/audit-logs`, label: locale === 'bn' ? 'অডিট লগ' : 'Audit Logs', icon: Shield },
          { href: `/${locale}/super-admin/cms`, label: locale === 'bn' ? 'ওয়েবসাইট সিএমএস' : 'Website CMS', icon: FileText },
          { href: `/${locale}/admin/students`, label: locale === 'bn' ? 'শিক্ষার্থী ব্যবস্থাপনা' : 'Students', icon: GraduationCap },
          { href: `/${locale}/admin/teachers`, label: locale === 'bn' ? 'শিক্ষকমণ্ডলী (৩০ জন)' : 'Teachers (30)', icon: Users },
          { href: `/${locale}/admin/admissions`, label: locale === 'bn' ? 'ভর্তি আবেদন' : 'Admissions', icon: UserCheck },
          { href: `/${locale}/admin/fees`, label: locale === 'bn' ? 'ফি ও পেমেন্ট' : 'Fees & Payments', icon: CreditCard },
          { href: `/${locale}/admin/attendance`, label: locale === 'bn' ? 'উপস্থিতি ও হাজিরা' : 'Attendance', icon: CalendarCheck },
          { href: `/${locale}/admin/classes`, label: locale === 'bn' ? 'শ্রেণি ১-১২' : 'Classes 1–12', icon: Layers },
          { href: `/${locale}/admin/reports`, label: locale === 'bn' ? 'রিপোর্ট ও পরিসংখ্যান' : 'Reports', icon: BarChart3 },
        ];
      case 'ADMIN':
        return [
          { href: `/${locale}/admin/dashboard`, label: locale === 'bn' ? 'ড্যাশবোর্ড' : 'Dashboard', icon: LayoutDashboard },
          { href: `/${locale}/admin/students`, label: locale === 'bn' ? 'শিক্ষার্থী ব্যবস্থাপনা' : 'Students', icon: GraduationCap },
          { href: `/${locale}/admin/admissions`, label: locale === 'bn' ? 'ভর্তি আবেদন' : 'Admissions', icon: UserCheck },
          { href: `/${locale}/admin/teachers`, label: locale === 'bn' ? 'শিক্ষকমণ্ডলী' : 'Teachers', icon: Users },
          { href: `/${locale}/admin/staff`, label: locale === 'bn' ? 'কর্মকর্তা-কর্মচারী' : 'Staff', icon: Briefcase },
          { href: `/${locale}/admin/classes`, label: locale === 'bn' ? 'শ্রেণি ও শাখা (১-১২)' : 'Classes & Sections', icon: Layers },
          { href: `/${locale}/admin/attendance`, label: locale === 'bn' ? 'উপস্থিতি ও হাজিরা' : 'Attendance', icon: CalendarCheck },
          { href: `/${locale}/admin/exams`, label: locale === 'bn' ? 'পরীক্ষা ও মূল্যায়ন' : 'Examinations', icon: Award },
          { href: `/${locale}/admin/results`, label: locale === 'bn' ? 'ফলাফল ও মার্কশিট' : 'Results', icon: FileText },
          { href: `/${locale}/admin/fees`, label: locale === 'bn' ? 'ফি ও পেমেন্ট' : 'Fees & Payments', icon: CreditCard },
          { href: `/${locale}/admin/expenses`, label: locale === 'bn' ? 'ব্যয় ভাউচার' : 'Expenses', icon: Receipt },
          { href: `/${locale}/admin/library`, label: locale === 'bn' ? 'লাইব্রেরি' : 'Library', icon: BookMarked },
          { href: `/${locale}/admin/transport`, label: locale === 'bn' ? 'পরিবহন' : 'Transport', icon: Bus },
          { href: `/${locale}/admin/inventory`, label: locale === 'bn' ? 'ইনভেন্টরি' : 'Inventory', icon: Box },
          { href: `/${locale}/admin/notices`, label: locale === 'bn' ? 'নোটিশ বোর্ড' : 'Notices', icon: Bell },
          { href: `/${locale}/admin/reports`, label: locale === 'bn' ? 'রিপোর্ট ও পরিসংখ্যান' : 'Reports', icon: BarChart3 },
          { href: `/${locale}/admin/settings`, label: locale === 'bn' ? 'সেটিংস' : 'Settings', icon: Settings },
        ];
      case 'TEACHER':
        return [
          { href: `/${locale}/teacher/dashboard`, label: locale === 'bn' ? 'ড্যাশবোর্ড' : 'Dashboard', icon: LayoutDashboard },
          { href: `/${locale}/teacher/classes`, label: locale === 'bn' ? 'আমার ক্লাসসমূহ' : 'My Classes', icon: BookOpen },
          { href: `/${locale}/teacher/routine`, label: locale === 'bn' ? 'দৈনিক রুটিন' : 'Daily Routine', icon: Clock },
          { href: `/${locale}/teacher/attendance`, label: locale === 'bn' ? 'হাজিরা গ্রহণ' : 'Take Attendance', icon: CalendarCheck },
          { href: `/${locale}/teacher/marks`, label: locale === 'bn' ? 'নম্বর এন্ট্রি' : 'Marks Entry', icon: Award },
        ];
      case 'STUDENT':
        return [
          { href: `/${locale}/student/dashboard`, label: locale === 'bn' ? 'ড্যাশবোর্ড' : 'Dashboard', icon: LayoutDashboard },
          { href: `/${locale}/student/profile`, label: locale === 'bn' ? 'আমার প্রোফাইল' : 'Profile', icon: GraduationCap },
          { href: `/${locale}/student/routine`, label: locale === 'bn' ? 'ক্লাস রুটিন' : 'Routine', icon: Clock },
          { href: `/${locale}/student/attendance`, label: locale === 'bn' ? 'আমার উপস্থিতি' : 'Attendance', icon: CalendarCheck },
          { href: `/${locale}/student/results`, label: locale === 'bn' ? 'পরীক্ষার ফলাফল' : 'Results', icon: Award },
          { href: `/${locale}/student/fees`, label: locale === 'bn' ? 'ফি ও অনলাইন পেমেন্ট' : 'Fees & Payment', icon: CreditCard },
        ];
      case 'PARENT':
        return [
          { href: `/${locale}/parent/dashboard`, label: locale === 'bn' ? 'ড্যাশবোর্ড' : 'Dashboard', icon: LayoutDashboard },
          { href: `/${locale}/parent/children`, label: locale === 'bn' ? 'সন্তানের অগ্রগতি' : 'My Children', icon: Users },
          { href: `/${locale}/parent/fees`, label: locale === 'bn' ? 'বকেয়া ফি ও পেমেন্ট' : 'Fees & Pay', icon: CreditCard },
        ];
      case 'ACCOUNTANT':
        return [
          { href: `/${locale}/accountant/dashboard`, label: locale === 'bn' ? 'ড্যাশবোর্ড' : 'Dashboard', icon: LayoutDashboard },
          { href: `/${locale}/admin/fees`, label: locale === 'bn' ? 'চালান ও রসিদ' : 'Invoices & Receipts', icon: CreditCard },
          { href: `/${locale}/accountant/payments`, label: locale === 'bn' ? 'আদায়কৃত পেমেন্ট' : 'Collections', icon: Receipt },
          { href: `/${locale}/admin/expenses`, label: locale === 'bn' ? 'প্রতিষ্ঠান ব্যয়' : 'Expenses', icon: FolderOpen },
          { href: `/${locale}/admin/reports`, label: locale === 'bn' ? 'আর্থিক বিবরণী' : 'Financial Reports', icon: BarChart3 },
        ];
      case 'STAFF':
      default:
        return [
          { href: `/${locale}/staff/dashboard`, label: locale === 'bn' ? 'ড্যাশবোর্ড' : 'Dashboard', icon: LayoutDashboard },
          { href: `/${locale}/staff/attendance`, label: locale === 'bn' ? 'হাজিরা' : 'Attendance', icon: CalendarCheck },
          { href: `/${locale}/staff/leave`, label: locale === 'bn' ? 'ছুটির আবেদন' : 'Leave Request', icon: Clock },
        ];
    }
  };

  const navItems = getNavItems();

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-64 bg-navy-950 text-slate-300 flex flex-col border-r border-navy-900 shadow-xl transition-transform duration-300 lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Sidebar Header with School Logo & Branding */}
      <div className="p-4 border-b border-navy-900 flex items-center justify-between">
        <Link href={`/${locale}`} className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-white p-0.5 border border-blue-400 overflow-hidden flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={36}
              height={36}
              className="object-contain"
            />
          </div>
          <div>
            <h2 className="text-xs font-bold text-white tracking-tight leading-tight">
              {locale === 'bn' ? 'মিরসরাই স্কুল এন্ড কলেজ' : 'Mirsharai School & College'}
            </h2>
            <p className="text-[10px] text-blue-400 uppercase font-semibold tracking-wider">
              {t.roles[role as keyof typeof t.roles] || role}
            </p>
          </div>
        </Link>
      </div>

      {/* Nav Menu */}
      <div className="flex-1 overflow-y-auto py-3 px-3 space-y-1 custom-scrollbar">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30'
                  : 'text-slate-300 hover:bg-navy-900 hover:text-white'
              }`}
            >
              <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Sidebar Footer with Logout Action & Developer Credit */}
      <div className="p-3 border-t border-navy-900 bg-navy-950/80 space-y-2">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-300 hover:bg-rose-500/10 hover:text-rose-200 transition-colors"
        >
          <LogOut className="w-4 h-4 text-rose-400" />
          <span>{t.nav.logout}</span>
        </button>
        <div className="text-center text-[11px] text-slate-500 pt-1 border-t border-navy-900/60">
          <span>Developed by </span>
          <a
            href="https://tushar-kumar-das.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 font-semibold hover:underline"
          >
            Tushar Kumar Das
          </a>
        </div>
      </div>
    </aside>
  );
}

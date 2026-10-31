'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  Users,
  UserPlus,
  Search,
  Filter,
  Shield,
  KeyRound,
  Trash2,
  CheckCircle,
  XCircle,
  X,
  Lock,
  Mail,
  UserCheck,
} from 'lucide-react';

interface UserRecord {
  id: string;
  username: string;
  email: string | null;
  role: string;
  isActive: boolean;
  createdAt: string | Date;
  teacherProfile?: { nameBn: string; nameEn: string; designationBn: string } | null;
  studentProfile?: { nameBn: string; nameEn: string; studentId: string; roll: number } | null;
  guardianProfile?: { nameBn: string; nameEn: string; phone: string } | null;
}

export default function SuperAdminUsersClient({
  initialUsers,
  currentUserId,
}: {
  initialUsers: UserRecord[];
  currentUserId: string;
}) {
  const { locale, t } = useLanguage();
  const [users, setUsers] = useState<UserRecord[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserRecord | null>(null);

  // Form states
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState('TEACHER');
  const [resetPassVal, setResetPassVal] = useState('');
  const [loading, setLoading] = useState(false);
  const [actionMsg, setActionMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const showMsg = (text: string, type: 'success' | 'error') => {
    setActionMsg({ text, type });
    setTimeout(() => setActionMsg(null), 4000);
  };

  const filteredUsers = users.filter((u) => {
    const matchesRole = !roleFilter || u.role === roleFilter;
    const matchesSearch =
      !searchQuery ||
      u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.email && u.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (u.teacherProfile && (u.teacherProfile.nameBn.includes(searchQuery) || u.teacherProfile.nameEn.toLowerCase().includes(searchQuery.toLowerCase()))) ||
      (u.studentProfile && (u.studentProfile.nameBn.includes(searchQuery) || u.studentProfile.nameEn.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesRole && matchesSearch;
  });

  const handleToggleActive = async (user: UserRecord) => {
    try {
      const res = await fetch('/api/super-admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: user.id, isActive: !user.isActive }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setUsers(users.map((u) => (u.id === user.id ? { ...u, isActive: !u.isActive } : u)));
        showMsg(
          locale === 'bn'
            ? `ব্যবহারকারী ${user.username} এর স্ট্যাটাস পরিবর্তিত হয়েছে`
            : `User ${user.username} status toggled successfully`,
          'success'
        );
      } else {
        showMsg(data.error || 'Failed to update', 'error');
      }
    } catch {
      showMsg('Network error', 'error');
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/super-admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: newUsername,
          email: newEmail,
          password: newPassword,
          role: newRole,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setUsers([data.user, ...users]);
        setIsAddModalOpen(false);
        setNewUsername('');
        setNewEmail('');
        setNewPassword('');
        showMsg(
          locale === 'bn' ? 'নতুন ব্যবহারকারী সফলভাবে তৈরি হয়েছে!' : 'User created successfully!',
          'success'
        );
      } else {
        showMsg(data.error || 'Failed to create', 'error');
      }
    } catch {
      showMsg('Network error', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser || !resetPassVal) return;
    setLoading(true);
    try {
      const res = await fetch('/api/super-admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: selectedUser.id, newPassword: resetPassVal }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsResetModalOpen(false);
        setResetPassVal('');
        showMsg(
          locale === 'bn'
            ? `${selectedUser.username} এর পাসওয়ার্ড রিসেট সম্পন্ন হয়েছে!`
            : `Password reset successfully for ${selectedUser.username}!`,
          'success'
        );
      } else {
        showMsg(data.error || 'Failed to reset', 'error');
      }
    } catch {
      showMsg('Network error', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (user: UserRecord) => {
    if (!confirm(locale === 'bn' ? `আপনি কি সত্যিই ${user.username} একাউন্ট ডিলিট করতে চান?` : `Are you sure you want to delete user ${user.username}?`)) {
      return;
    }
    try {
      const res = await fetch(`/api/super-admin/users?id=${user.id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setUsers(users.filter((u) => u.id !== user.id));
        showMsg(
          locale === 'bn' ? 'ব্যবহারকারী ডিলিট করা হয়েছে।' : 'User deleted successfully.',
          'success'
        );
      } else {
        showMsg(data.error || 'Failed to delete', 'error');
      }
    } catch {
      showMsg('Network error', 'error');
    }
  };

  const rolesList = ['SUPER_ADMIN', 'ADMIN', 'TEACHER', 'STUDENT', 'PARENT', 'ACCOUNTANT', 'STAFF'];

  return (
    <div className="space-y-6">
      {/* Action Toast Feedback */}
      {actionMsg && (
        <div
          className={`p-4 rounded-2xl text-xs font-bold shadow-md flex items-center justify-between transition-all ${
            actionMsg.type === 'success'
              ? 'bg-emerald-600 text-white shadow-emerald-600/20'
              : 'bg-rose-600 text-white shadow-rose-600/20'
          }`}
        >
          <span>{actionMsg.text}</span>
          <button onClick={() => setActionMsg(null)}>
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-rose-600 text-xs font-bold uppercase tracking-wider mb-1">
            <Shield className="w-4 h-4" />
            <span>{locale === 'bn' ? 'সিস্টেম নিরাপত্তা ও একাউন্ট নিয়ন্ত্রণ' : 'Security & Access Control'}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {locale === 'bn' ? 'সকল ব্যবহারকারী ও রোল ব্যবস্থাপনা' : 'System Users & Role Management'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {locale === 'bn'
              ? 'সুপার এডমিন, এডমিন, শিক্ষক, শিক্ষার্থী, অভিভাবক ও স্টাফ একাউন্টের সম্পূর্ণ নিয়ন্ত্রণ'
              : 'Total master control of accounts across all roles, credentials, and access statuses'}
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-sm transition-all self-start sm:self-auto hover:scale-105"
        >
          <UserPlus className="w-4 h-4" />
          <span>{locale === 'bn' ? 'নতুন ইউজার যোগ করুন' : 'Create New Account'}</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={locale === 'bn' ? 'ইউজারনেম, ইমেইল বা নাম দিয়ে খুঁজুন...' : 'Search by username, email, name...'}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-500"
          >
            <option value="">{locale === 'bn' ? 'সকল রোল (All Roles)' : 'All Roles'}</option>
            {rolesList.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">{locale === 'bn' ? 'ইউজারনেম / পরিচয়' : 'Username / Identity'}</th>
                <th className="py-3 px-4">{locale === 'bn' ? 'সংযুক্ত প্রোফাইল' : 'Linked Profile'}</th>
                <th className="py-3 px-4">{locale === 'bn' ? 'রোল' : 'Role'}</th>
                <th className="py-3 px-4">{locale === 'bn' ? 'ইমেইল' : 'Email'}</th>
                <th className="py-3 px-4">{locale === 'bn' ? 'স্ট্যাটাস' : 'Status'}</th>
                <th className="py-3 px-4 text-right">{locale === 'bn' ? 'অ্যাকশন' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-slate-400">
                    {locale === 'bn' ? 'কোনো ব্যবহারকারী পাওয়া যায়নি।' : 'No users match criteria.'}
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  const profileName =
                    user.teacherProfile?.nameBn ||
                    user.studentProfile?.nameBn ||
                    user.guardianProfile?.nameBn ||
                    user.username;

                  return (
                    <tr key={user.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center uppercase">
                            {user.username.slice(0, 2)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">{user.username}</p>
                            <p className="text-[10px] text-slate-400 font-mono">ID: {user.id.slice(-6)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-700">
                        {profileName}
                        {user.studentProfile && (
                          <span className="block text-[10px] text-slate-400">
                            Roll: {user.studentProfile.roll} • {user.studentProfile.studentId}
                          </span>
                        )}
                        {user.teacherProfile && (
                          <span className="block text-[10px] text-slate-400">
                            {user.teacherProfile.designationBn}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            user.role === 'SUPER_ADMIN'
                              ? 'bg-rose-100 text-rose-800 border border-rose-200'
                              : user.role === 'ADMIN'
                              ? 'bg-amber-100 text-amber-800 border border-amber-200'
                              : user.role === 'TEACHER'
                              ? 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                              : user.role === 'STUDENT'
                              ? 'bg-blue-100 text-blue-800 border border-blue-200'
                              : user.role === 'PARENT'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                              : user.role === 'ACCOUNTANT'
                              ? 'bg-purple-100 text-purple-800 border border-purple-200'
                              : 'bg-slate-100 text-slate-800 border border-slate-200'
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-600 font-mono text-[11px]">
                        {user.email || '—'}
                      </td>
                      <td className="py-3 px-4">
                        <button
                          type="button"
                          onClick={() => handleToggleActive(user)}
                          disabled={user.id === currentUserId}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
                            user.isActive
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                              : 'bg-slate-100 text-slate-500 border border-slate-300 hover:bg-slate-200'
                          }`}
                        >
                          {user.isActive ? (
                            <>
                              <CheckCircle className="w-3 h-3 text-emerald-600" />
                              <span>{locale === 'bn' ? 'সক্রিয়' : 'Active'}</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3 h-3 text-slate-400" />
                              <span>{locale === 'bn' ? 'নিষ্ক্রিয়' : 'Inactive'}</span>
                            </>
                          )}
                        </button>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedUser(user);
                              setIsResetModalOpen(true);
                            }}
                            className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                            title={locale === 'bn' ? 'পাসওয়ার্ড পরিবর্তন' : 'Reset Password'}
                          >
                            <KeyRound className="w-3.5 h-3.5" />
                          </button>
                          {user.id !== currentUserId && (
                            <button
                              type="button"
                              onClick={() => handleDeleteUser(user)}
                              className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
                              title={locale === 'bn' ? 'মুছে ফেলুন' : 'Delete User'}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Create User */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-base">
                {locale === 'bn' ? 'নতুন ইউজার একাউন্ট তৈরি' : 'Create New User Account'}
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {locale === 'bn' ? 'ইউজারনেম' : 'Username'} *
                </label>
                <input
                  type="text"
                  required
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  placeholder="e.g. teacher_science or rafiqul"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {locale === 'bn' ? 'ইমেইল (ঐচ্ছিক)' : 'Email (Optional)'}
                </label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="e.g. user@mirsharaicollege.edu.bd"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {locale === 'bn' ? 'রোল নির্বাচন করুন' : 'Select Role'} *
                </label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 font-semibold text-slate-800 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                >
                  {rolesList.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {locale === 'bn' ? 'পাসওয়ার্ড' : 'Initial Password'} *
                </label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="e.g. msc123456"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors"
                >
                  {locale === 'bn' ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-md shadow-blue-600/30 disabled:opacity-50"
                >
                  {loading ? 'Creating...' : locale === 'bn' ? 'তৈরি সম্পন্ন করুন' : 'Create Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Reset Password */}
      {isResetModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-base">
                {locale === 'bn' ? 'পাসওয়ার্ড পরিবর্তন' : 'Reset User Password'}
              </h3>
              <button
                onClick={() => setIsResetModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              {locale === 'bn'
                ? `ব্যবহারকারী "${selectedUser.username}" এর নতুন পাসওয়ার্ড লিখুন:`
                : `Set a new password for account "${selectedUser.username}":`}
            </p>

            <form onSubmit={handleResetPassword} className="space-y-3 text-xs">
              <div>
                <input
                  type="password"
                  required
                  value={resetPassVal}
                  onChange={(e) => setResetPassVal(e.target.value)}
                  placeholder="New password (min 6 characters)"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-mono"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsResetModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors"
                >
                  {locale === 'bn' ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-md shadow-blue-600/30 disabled:opacity-50"
                >
                  {loading ? 'Saving...' : locale === 'bn' ? 'পাসওয়ার্ড সেভ করুন' : 'Update Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

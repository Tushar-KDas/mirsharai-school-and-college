'use client';

import React from 'react';
import { Printer } from 'lucide-react';

export default function PrintButtonClient({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto transition-colors"
    >
      <Printer className="w-3.5 h-3.5" />
      <span>{label}</span>
    </button>
  );
}

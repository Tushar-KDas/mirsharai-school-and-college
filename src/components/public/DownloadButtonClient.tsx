'use client';

import React from 'react';
import { Download } from 'lucide-react';
import { Locale } from '@/lib/i18n';

export default function DownloadButtonClient({
  title,
  category,
  locale,
}: {
  title: string;
  category: string;
  locale: Locale;
}) {
  const handleDownload = () => {
    // Generate a printable official document window or text download
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title} - Mirsharai School and College</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; color: #1e293b; }
            .header { text-align: center; border-bottom: 2px solid #0f172a; padding-bottom: 20px; margin-bottom: 30px; }
            .logo-title { font-size: 24px; font-weight: 800; color: #12315a; margin: 0; }
            .meta { font-size: 13px; color: #64748b; margin-top: 5px; }
            .badge { display: inline-block; padding: 4px 12px; background: #2563eb; color: white; border-radius: 9999px; font-size: 12px; font-weight: bold; margin-top: 10px; }
            .content { line-height: 1.8; font-size: 15px; background: #f8fafc; padding: 30px; border-radius: 12px; border: 1px solid #e2e8f0; }
            .seal { margin-top: 60px; display: flex; justify-content: space-between; align-items: flex-end; }
            .stamp { width: 90px; height: 90px; border: 2px dashed #2563eb; border-radius: 50%; display: flex; align-items: center; justify-content: center; text-align: center; font-size: 10px; font-weight: bold; color: #2563eb; transform: rotate(-10deg); }
            .sig { text-align: right; }
            .sig-line { width: 160px; height: 1px; background: #94a3b8; margin-bottom: 6px; }
            @media print { .no-print { display: none; } }
          </style>
        </head>
        <body>
          <div class="no-print" style="margin-bottom: 20px; text-align: right;">
            <button onclick="window.print()" style="background: #2563eb; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-weight: bold; cursor: pointer;">
              ${locale === 'bn' ? 'প্রিন্ট / PDF সংরক্ষণ' : 'Print / Save as PDF'}
            </button>
          </div>
          <div class="header">
            <h1 class="logo-title">${locale === 'bn' ? 'মিরসরাই স্কুল এন্ড কলেজ' : 'Mirsharai School and College'}</h1>
            <p class="meta">Mirsharai, Chattogram, Bangladesh | EIIN: 104523 | Estd: 1972</p>
            <div class="badge">${category}</div>
          </div>
          <div class="content">
            <h2 style="margin-top: 0; color: #0f172a;">${title}</h2>
            <p>Official Institutional Publication & Academic Directive for Academic Session 2026.</p>
            <p>This verified document is issued by the Academic Council and Governing Body of Mirsharai School and College. For curriculum inquiries, examination rules, and admission guidelines, students and guardians are advised to retain this copy for academic records.</p>
          </div>
          <div class="seal">
            <div class="stamp">OFFICIAL<br>REGISTRAR<br>SEAL</div>
            <div class="sig">
              <div class="sig-line"></div>
              <strong>Prof. Md. Kamrul Hasan</strong><br>
              <span style="font-size: 12px; color: #64748b;">Principal, Mirsharai School and College</span>
            </div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm flex items-center gap-1.5 transition-all whitespace-nowrap hover:scale-105"
    >
      <Download className="w-3.5 h-3.5" />
      <span>{locale === 'bn' ? 'ডাউনলোড' : 'Download'}</span>
    </button>
  );
}

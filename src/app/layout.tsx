import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mirsharai School and College | মিরসরাই স্কুল এন্ড কলেজ',
  description: 'Complete School & College Management System (Class 1-12) - Mirsharai, Chattogram, Bangladesh',
  icons: {
    icon: '/images/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn">
      <body>{children}</body>
    </html>
  );
}

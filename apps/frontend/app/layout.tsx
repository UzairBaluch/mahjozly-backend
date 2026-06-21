import type { Metadata } from 'next';
import { Inter, Geist_Mono } from 'next/font/google';
import './globals.css';

// Body + display — one family for everything (Cal.com / Linear / Vercel pattern).
// Full weight range so headings can push to 700/800 with tight tracking.
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

// Utility/data — monospaced for timestamps, IDs, counters. The "ledger" feel.
const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Mahjozly — Scheduling that remembers',
  description:
    "Calendly remembers your time slots. Mahjozly remembers your clients. Booking + video + AI session memory for coaches, consultants, and tutors.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}

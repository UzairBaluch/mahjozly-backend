import type { Metadata } from 'next';
import { Inter, Source_Serif_4, Geist_Mono } from 'next/font/google';
import './globals.css';

// Body — modern, neutral, what most premium SaaS uses (Linear, Vercel, Cal.com style).
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

// Display — characterful serif for the "thread of memory" feel; used with restraint.
const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

// Utility/data — modern monospace for timestamps, IDs, counters. The "ledger" feel.
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
    <html lang="en" className={`${inter.variable} ${sourceSerif.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}

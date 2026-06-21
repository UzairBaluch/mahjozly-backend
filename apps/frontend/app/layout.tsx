import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mahjozly — Scheduling that remembers',
  description:
    "Calendly remembers your time slots. Mahjozly remembers your clients. Booking + video + AI session memory for coaches, consultants, and tutors.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Display + body + mono — IBM Plex (Sans & Mono) and Source Serif 4 served from Google Fonts. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

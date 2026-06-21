'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bell, Copy, ExternalLink, Menu, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ORG_PROFILE } from '@/lib/dashboard-data';

export function DashboardTopbar() {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    await navigator.clipboard.writeText(`https://${ORG_PROFILE.bookingUrl}`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-[color:var(--color-mist)] bg-[color:var(--color-paper)]/90 px-6 py-3 backdrop-blur md:px-8">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <button
          type="button"
          className="rounded-md p-2 text-[color:var(--color-ink-soft)] hover:bg-[color:var(--color-paper-warm)] md:hidden"
          aria-label="Open menu"
        >
          <Menu size={18} />
        </button>
        <div className="relative hidden max-w-md flex-1 sm:block">
          <Search
            size={14}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--color-ink-soft)]"
          />
          <input
            type="search"
            placeholder="Search clients, bookings…"
            className="w-full rounded-lg border border-[color:var(--color-mist)] bg-[color:var(--color-paper-warm)] py-2 pl-9 pr-3 text-sm outline-none placeholder:text-[color:var(--color-ink-soft)]/60 focus:border-[color:var(--color-thread)]"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button type="button" variant="outline" size="sm" onClick={copyLink} className="hidden sm:inline-flex">
          <Copy size={14} />
          {copied ? 'Copied!' : 'Copy booking link'}
        </Button>
        <Button asChild variant="outline" size="sm" className="hidden md:inline-flex">
          <Link href={`/${ORG_PROFILE.slug}/coaching`} target="_blank">
            <ExternalLink size={14} />
            Preview page
          </Link>
        </Button>
        <button
          type="button"
          className="relative rounded-lg border border-[color:var(--color-mist)] p-2 text-[color:var(--color-ink-soft)] hover:bg-[color:var(--color-paper-warm)]"
          aria-label="Notifications"
        >
          <Bell size={16} />
          <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-[color:var(--color-thread)]" />
        </button>
        <Button asChild variant="accent" size="sm">
          <Link href="/dashboard/bookings">+ New booking</Link>
        </Button>
      </div>
    </header>
  );
}

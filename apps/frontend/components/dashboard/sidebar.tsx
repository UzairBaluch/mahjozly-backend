'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  CalendarDays,
  Clock,
  Layers,
  LayoutDashboard,
  LogOut,
  Plug,
  Settings,
  Users,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ORG_PROFILE } from '@/lib/dashboard-data';

const NAV = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard, exact: true },
  { href: '/dashboard/event-types', label: 'Event types', icon: Layers },
  { href: '/dashboard/availability', label: 'Availability', icon: Clock },
  { href: '/dashboard/bookings', label: 'Bookings', icon: CalendarDays },
  { href: '/dashboard/clients', label: 'Clients', icon: Users },
  { href: '/dashboard/integrations', label: 'Integrations', icon: Plug },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-60 shrink-0 flex-col border-r border-[color:var(--color-mist)] bg-[color:var(--color-paper-warm)]">
      <div className="border-b border-[color:var(--color-mist)] px-5 py-5">
        <Link href="/dashboard" className="display block text-xl font-semibold">
          Mahjozly
        </Link>
        <p className="mono mt-1 truncate text-[0.6rem] uppercase tracking-wider text-[color:var(--color-ink-soft)]">
          {ORG_PROFILE.name}
        </p>
      </div>

      <nav className="flex-1 space-y-0.5 px-3 py-4">
        {NAV.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                active
                  ? 'bg-[color:var(--color-paper)] font-medium text-[color:var(--color-ink)] shadow-xs ring-1 ring-[color:var(--color-mist)]'
                  : 'text-[color:var(--color-ink-soft)] hover:bg-[color:var(--color-paper)]/80 hover:text-[color:var(--color-ink)]',
              )}
              aria-current={active ? 'page' : undefined}
            >
              <Icon size={16} className={active ? 'text-[color:var(--color-thread)]' : undefined} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-[color:var(--color-mist)] p-4">
        <div className="flex items-center gap-3 rounded-lg px-2 py-2">
          <span className="display flex size-8 items-center justify-center rounded-full bg-[color:var(--color-thread-soft)] text-xs font-semibold text-[color:var(--color-thread)]">
            LP
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">Lena Park</p>
            <p className="truncate text-xs text-[color:var(--color-ink-soft)]">{ORG_PROFILE.email}</p>
          </div>
        </div>
        <Link
          href="/login"
          className="mt-2 flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-[color:var(--color-ink-soft)] hover:bg-[color:var(--color-paper)] hover:text-[color:var(--color-ink)]"
        >
          <LogOut size={14} />
          Sign out
        </Link>
      </div>
    </aside>
  );
}

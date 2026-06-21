import Link from 'next/link';
import { CalendarDays, Clock, LayoutDashboard, Settings, Users, Plug, Layers } from 'lucide-react';

const NAV = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/event-types', label: 'Event types', icon: Layers },
  { href: '/dashboard/availability', label: 'Availability', icon: Clock },
  { href: '/dashboard/bookings', label: 'Bookings', icon: CalendarDays },
  { href: '/dashboard/clients', label: 'Clients', icon: Users },
  { href: '/dashboard/integrations', label: 'Integrations', icon: Plug },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-60 shrink-0 border-r border-[color:var(--color-mist)] bg-[color:var(--color-mist)]/30">
        <div className="px-6 py-6">
          <Link href="/dashboard" className="display text-xl font-semibold">
            Mahjozly
          </Link>
        </div>
        <nav className="px-3 pb-6">
          {NAV.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-[color:var(--color-ink)]/80 hover:bg-[color:var(--color-paper)]"
            >
              <Icon size={16} />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 px-8 py-8">{children}</main>
    </div>
  );
}

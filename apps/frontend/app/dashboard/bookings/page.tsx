'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { BookingFilterTabs, useBookingFilter } from '@/components/dashboard/booking-filters';
import { ClientAvatar } from '@/components/dashboard/client-avatar';
import { PageHeader } from '@/components/dashboard/page-header';
import { StatusBadge } from '@/components/dashboard/status-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BOOKINGS } from '@/lib/dashboard-data';

export default function BookingsPage() {
  const { filter, setFilter, filtered } = useBookingFilter(BOOKINGS);

  const counts = {
    ALL: BOOKINGS.length,
    CONFIRMED: BOOKINGS.filter((b) => b.status === 'CONFIRMED').length,
    PENDING: BOOKINGS.filter((b) => b.status === 'PENDING').length,
    COMPLETED: BOOKINGS.filter((b) => b.status === 'COMPLETED').length,
    CANCELLED: BOOKINGS.filter((b) => b.status === 'CANCELLED').length,
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Bookings"
        description="Everything on your calendar. Filter by status or open a row for session notes and video."
        actions={<Button variant="accent">+ New booking</Button>}
      />

      <BookingFilterTabs value={filter} onChange={setFilter} counts={counts} />

      <Card>
        <CardHeader>
          <CardTitle>All bookings</CardTitle>
          <CardDescription>
            Showing {filtered.length} of {BOOKINGS.length}
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto p-0">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="border-b border-[color:var(--color-mist)] text-left text-xs uppercase tracking-wide text-[color:var(--color-ink-soft)]">
              <tr>
                <th className="px-6 py-3 font-medium">When</th>
                <th className="px-6 py-3 font-medium">Client</th>
                <th className="px-6 py-3 font-medium">Service</th>
                <th className="px-6 py-3 font-medium">Location</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Price</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[color:var(--color-mist)]">
              {filtered.map((b, i) => (
                <tr key={b.id} className="transition-colors hover:bg-[color:var(--color-paper-warm)]">
                  <td className="mono px-6 py-4 text-[color:var(--color-ink-soft)]">{b.whenLabel}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <ClientAvatar name={b.client} size="sm" index={i} />
                      <div>
                        <p className="font-medium">{b.client}</p>
                        {b.hasThread ? (
                          <p className="text-xs text-[color:var(--color-thread)]">Has thread</p>
                        ) : (
                          <p className="text-xs text-[color:var(--color-ink-soft)]">New client</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[color:var(--color-ink-soft)]">{b.service}</td>
                  <td className="mono px-6 py-4 text-xs uppercase text-[color:var(--color-ink-soft)]">
                    {locationLabel(b.location)}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={b.status} />
                  </td>
                  <td className="mono px-6 py-4">{b.price === 0 ? 'Free' : `$${b.price}`}</td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/dashboard/bookings/${b.id}`}
                      className="inline-flex items-center gap-1 text-sm text-[color:var(--color-thread)] hover:underline"
                    >
                      Open
                      <ArrowRight size={14} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}

function locationLabel(loc: string) {
  switch (loc) {
    case 'DAILY_VIDEO':
      return 'Daily video';
    case 'GOOGLE_MEET':
      return 'Google Meet';
    case 'IN_PERSON':
      return 'In person';
    case 'PHONE':
      return 'Phone';
    default:
      return loc;
  }
}

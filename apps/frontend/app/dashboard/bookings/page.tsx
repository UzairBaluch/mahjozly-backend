import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const BOOKINGS = [
  { id: 'b1', when: 'Today · 09:00', client: 'Aisha Khan', service: 'Coaching · 60m', status: 'CONFIRMED' },
  { id: 'b2', when: 'Today · 10:30', client: 'Marcus Lin', service: 'Discovery · 30m', status: 'CONFIRMED' },
  { id: 'b3', when: 'Tomorrow · 11:00', client: 'Priya Sharma', service: 'Coaching · 60m', status: 'PENDING' },
];

export default function BookingsPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="display text-3xl">Bookings</h1>
        <p className="text-sm text-[color:var(--color-ink)]/70">
          Everything on your calendar. Filter by status, time range, or client.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming</CardTitle>
          <CardDescription>Showing 3 of 14 this week</CardDescription>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wide text-[color:var(--color-ink)]/50">
              <tr>
                <th className="pb-2">When</th>
                <th className="pb-2">Client</th>
                <th className="pb-2">Service</th>
                <th className="pb-2">Status</th>
                <th className="pb-2"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[color:var(--color-mist)]">
              {BOOKINGS.map((b) => (
                <tr key={b.id}>
                  <td className="py-3 mono">{b.when}</td>
                  <td className="py-3 font-medium">{b.client}</td>
                  <td className="py-3 text-[color:var(--color-ink)]/70">{b.service}</td>
                  <td className="py-3">
                    <span
                      className={
                        'mono text-xs uppercase ' +
                        (b.status === 'CONFIRMED'
                          ? 'text-[color:var(--color-thread)]'
                          : 'text-[color:var(--color-clay)]')
                      }
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <Link
                      href={`/dashboard/bookings/${b.id}`}
                      className="text-sm text-[color:var(--color-thread)] hover:underline"
                    >
                      Open →
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

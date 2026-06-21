import Link from 'next/link';
import { Thread } from '@/components/thread';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Placeholder data — replace with real `apiFetch` calls once dashboard endpoints land.
const TODAY = [
  { id: 'b1', time: '09:00', client: 'Aisha Khan', service: 'Coaching · 60m' },
  { id: 'b2', time: '10:30', client: 'Marcus Lin', service: 'Discovery · 30m' },
  { id: 'b3', time: '14:00', client: 'Priya Sharma', service: 'Coaching · 60m' },
];

const TIMELINE_DEMO = [
  { label: '1st', note: undefined },
  { label: '2nd', note: 'Discussed pacing' },
  { label: '3rd', note: undefined },
  { label: '4th', note: 'Wants practice problems' },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="display text-3xl">Today</h1>
          <p className="mono text-xs uppercase tracking-wide text-[color:var(--color-ink)]/60">
            21 June 2026 · 3 sessions
          </p>
        </div>
        <Button asChild variant="accent">
          <Link href="/dashboard/bookings">+ New booking</Link>
        </Button>
      </header>

      <section className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming today</CardTitle>
            <CardDescription>Tap a row to open the booking + session notes.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="divide-y divide-[color:var(--color-mist)]">
              {TODAY.map((row) => (
                <li key={row.id} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-4">
                    <span className="mono text-sm text-[color:var(--color-ink)]/70">{row.time}</span>
                    <span className="font-medium">{row.client}</span>
                    <span className="text-sm text-[color:var(--color-ink)]/60">{row.service}</span>
                  </div>
                  <Link
                    href={`/dashboard/bookings/${row.id}`}
                    className="text-sm text-[color:var(--color-thread)] hover:underline"
                  >
                    Open →
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>This week</CardTitle>
            <CardDescription>At a glance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Stat label="Sessions booked" value="14" />
            <Stat label="Confirmed" value="12" />
            <Stat label="Pending" value="2" />
            <Stat label="Cancelled" value="0" />
          </CardContent>
        </Card>
      </section>

      <section>
        <Card>
          <CardHeader>
            <CardTitle>Recent client thread</CardTitle>
            <CardDescription>
              Aisha Khan · 4 sessions ·{' '}
              <Link href="/dashboard/clients/aisha" className="underline">
                open timeline
              </Link>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Thread nodes={TIMELINE_DEMO} compact />
            <p className="ai mt-6 italic">
              Latest brief: &ldquo;Discussed pacing in last session. Wants more practice problems before the next exam.
              Suggest opening with a 5-minute warm-up review.&rdquo;
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between">
      <span className="text-sm text-[color:var(--color-ink)]/70">{label}</span>
      <span className="mono text-lg font-semibold">{value}</span>
    </div>
  );
}

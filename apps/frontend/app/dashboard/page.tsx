import Link from 'next/link';
import { ArrowRight, Sparkles, Video } from 'lucide-react';
import { ClientAvatar } from '@/components/dashboard/client-avatar';
import { PageHeader } from '@/components/dashboard/page-header';
import { StatCard } from '@/components/dashboard/stat-card';
import { StatusBadge } from '@/components/dashboard/status-badge';
import { Thread } from '@/components/thread';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BOOKINGS, CLIENTS, getTodayBookings, WEEK_STATS } from '@/lib/dashboard-data';

const FEATURED_CLIENT = CLIENTS[0]!;
const TODAY = getTodayBookings();

export default function DashboardOverview() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Today"
        description="Your schedule, client context, and AI briefs — in one place."
        meta="Sunday, 21 June 2026 · 3 sessions"
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Sessions this week" value={String(WEEK_STATS.sessionsBooked)} trend="+3 vs last week" />
        <StatCard label="Revenue" value={`$${WEEK_STATS.revenue.toLocaleString()}`} hint="Confirmed bookings" />
        <StatCard label="AI summaries" value={String(WEEK_STATS.aiSummaries)} hint="This week" />
        <StatCard label="Utilization" value={`${WEEK_STATS.utilization}%`} hint="Booked vs available hours" />
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming today</CardTitle>
            <CardDescription>Open a session for video link, notes, and client thread.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ul className="divide-y divide-[color:var(--color-mist)]">
              {TODAY.map((row, i) => (
                <li key={row.id}>
                  <Link
                    href={`/dashboard/bookings/${row.id}`}
                    className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-[color:var(--color-paper-warm)]"
                  >
                    <span className="mono w-14 shrink-0 text-sm text-[color:var(--color-ink-soft)]">
                      {row.time}
                    </span>
                    <ClientAvatar name={row.client} size="sm" index={i} />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-medium">{row.client}</span>
                        {row.hasThread ? (
                          <span className="mono inline-flex items-center gap-1 rounded-full bg-[color:var(--color-thread-soft)] px-2 py-0.5 text-[0.55rem] uppercase tracking-wider text-[color:var(--color-thread)]">
                            <Sparkles size={10} />
                            Thread
                          </span>
                        ) : null}
                      </div>
                      <p className="text-sm text-[color:var(--color-ink-soft)]">{row.service}</p>
                    </div>
                    <StatusBadge status={row.status} />
                    <ArrowRight size={16} className="shrink-0 text-[color:var(--color-ink-soft)]" />
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>This week</CardTitle>
            <CardDescription>Booking pipeline</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <WeekStat label="Confirmed" value={WEEK_STATS.confirmed} />
            <WeekStat label="Pending" value={WEEK_STATS.pending} />
            <WeekStat label="Cancelled" value={WEEK_STATS.cancelled} />
            <div className="border-t border-[color:var(--color-mist)] pt-3">
              <Button asChild variant="outline" className="w-full">
                <Link href="/dashboard/bookings">View all bookings</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div>
                <CardTitle>Next up · {FEATURED_CLIENT.name}</CardTitle>
                <CardDescription>
                  Session at 09:00 ·{' '}
                  <Link href={`/dashboard/clients/${FEATURED_CLIENT.id}`} className="underline">
                    open full thread
                  </Link>
                </CardDescription>
              </div>
              <Button asChild variant="accent" size="sm">
                <Link href={BOOKINGS[0]!.videoUrl ?? '#'}>
                  <Video size={14} />
                  Join room
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Thread nodes={FEATURED_CLIENT.thread} compact />
            <div className="mt-6 rounded-lg border border-[color:var(--color-dusk)]/20 bg-[color:var(--color-dusk-soft)]/40 p-4">
              <p className="mono text-[0.65rem] uppercase tracking-wider text-[color:var(--color-dusk)]">
                Next-session AI brief
              </p>
              <p className="ai mt-2 text-sm italic leading-relaxed">&ldquo;{FEATURED_CLIENT.brief}&rdquo;</p>
              <ul className="ai mt-3 space-y-1 text-xs">
                {FEATURED_CLIENT.actionItems.map((item) => (
                  <li key={item}>· {item}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Needs attention</CardTitle>
            <CardDescription>Quick actions before your next calls</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <AttentionRow
              title="Marcus Lin · first session"
              hint="No thread yet — intake brief will generate after call"
              href={`/dashboard/bookings/b2`}
            />
            <AttentionRow
              title="Priya Sharma · pending confirmation"
              hint="Deposit not collected · reminder sent"
              href={`/dashboard/bookings/b3`}
            />
            <AttentionRow
              title="Omar Reyes · notes processing"
              hint="AI summary queued from last strategy call"
              href={`/dashboard/clients/omar`}
            />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function WeekStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-baseline justify-between">
      <span className="text-sm text-[color:var(--color-ink-soft)]">{label}</span>
      <span className="mono text-lg font-semibold">{value}</span>
    </div>
  );
}

function AttentionRow({ title, hint, href }: { title: string; hint: string; href: string }) {
  return (
    <Link
      href={href}
      className="block rounded-lg border border-[color:var(--color-mist)] px-4 py-3 transition-colors hover:border-[color:var(--color-thread)]/30 hover:bg-[color:var(--color-paper-warm)]"
    >
      <p className="text-sm font-medium">{title}</p>
      <p className="mt-0.5 text-xs text-[color:var(--color-ink-soft)]">{hint}</p>
    </Link>
  );
}

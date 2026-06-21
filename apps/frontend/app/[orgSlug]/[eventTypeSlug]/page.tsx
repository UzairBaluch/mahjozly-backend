import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Public booking surface. Phase H.2 in the checklist replaces this placeholder with:
//   1. GET /api/v1/event-types/:slug → header
//   2. GET /api/v1/event-types/:slug/availability?from=&to=&tz= → time slots
//   3. POST /api/v1/bookings → confirm

const SLOTS_DEMO = ['09:00', '09:30', '10:00', '10:30', '11:00', '13:30', '14:00', '14:30'];

export default async function PublicBookingPage({
  params,
}: {
  params: Promise<{ orgSlug: string; eventTypeSlug: string }>;
}) {
  const { orgSlug, eventTypeSlug } = await params;
  const orgName = decodeURIComponent(orgSlug).replace(/-/g, ' ');
  const eventName = decodeURIComponent(eventTypeSlug).replace(/-/g, ' ');

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <div className="mb-8 text-center">
        <p className="mono text-xs uppercase tracking-wide text-[color:var(--color-ink)]/50">
          mahjozly.com/{orgSlug}/{eventTypeSlug}
        </p>
        <h1 className="display mt-3 text-3xl capitalize">{orgName}</h1>
        <p className="mt-1 text-sm capitalize text-[color:var(--color-ink)]/70">{eventName}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Pick a date</CardTitle>
            <CardDescription>Times are shown in your timezone.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                <div key={i} className="mono text-[color:var(--color-ink)]/50">
                  {d}
                </div>
              ))}
              {Array.from({ length: 30 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={
                    'mono aspect-square rounded-md border border-transparent text-sm hover:border-[color:var(--color-thread)] ' +
                    (i === 4 ? 'bg-[color:var(--color-thread)]/15 border-[color:var(--color-thread)]' : '')
                  }
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pick a time</CardTitle>
            <CardDescription className="mono">Thu, 5 June</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-2">
            {SLOTS_DEMO.map((slot) => (
              <Button key={slot} variant="outline" className="mono">
                {slot}
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>

      <p className="mono mt-8 text-center text-xs uppercase tracking-wide text-[color:var(--color-ink)]/50">
        Powered by Mahjozly · Your session memory lives here
      </p>
    </main>
  );
}

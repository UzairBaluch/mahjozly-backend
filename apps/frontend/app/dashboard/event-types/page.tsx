import Link from 'next/link';
import { Copy, ExternalLink, Video } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { EVENT_TYPES, ORG_PROFILE } from '@/lib/dashboard-data';

export default function EventTypesPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Event types"
        description="What people can book. Each has duration, price, location, recording rules, and reminders."
        actions={<Button variant="accent">+ New event type</Button>}
      />

      <div className="grid gap-4">
        {EVENT_TYPES.map((et) => (
          <Card key={et.id} className="overflow-hidden p-0">
            <div className="grid gap-0 lg:grid-cols-[1fr_auto]">
              <div className="p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <CardTitle>{et.name}</CardTitle>
                    <CardDescription className="mt-1">
                      <span className="mono">/{ORG_PROFILE.slug}/{et.slug}</span>
                    </CardDescription>
                  </div>
                  <span
                    className={
                      'mono rounded-full px-2 py-0.5 text-[0.6rem] uppercase tracking-wider ' +
                      (et.active
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-[color:var(--color-mist-soft)] text-[color:var(--color-ink-soft)]')
                    }
                  >
                    {et.active ? 'Active' : 'Hidden'}
                  </span>
                </div>
                <p className="mt-3 text-sm text-[color:var(--color-ink-soft)]">{et.description}</p>

                <div className="mt-4 flex flex-wrap gap-4 text-sm">
                  <Meta label="Duration" value={`${et.duration} min`} />
                  <Meta label="Price" value={et.price === 0 ? 'Free' : `$${et.price}`} />
                  <Meta label="Location" value={et.location} />
                  <Meta label="Recording" value={et.recording ? 'On' : 'Off'} />
                  <Meta label="This month" value={`${et.bookingsThisMonth} bookings`} />
                </div>

                <div className="mt-4">
                  <p className="mono text-[0.6rem] uppercase tracking-wider text-[color:var(--color-ink-soft)]">
                    Reminders
                  </p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {et.reminders.map((r) => (
                      <span
                        key={r}
                        className="rounded-md border border-[color:var(--color-mist)] px-2 py-0.5 text-xs text-[color:var(--color-ink-soft)]"
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center gap-2 border-t border-[color:var(--color-mist)] bg-[color:var(--color-paper-warm)]/50 p-4 lg:border-t-0 lg:border-l">
                <Button asChild variant="outline" size="sm">
                  <Link href={`/${ORG_PROFILE.slug}/${et.slug}`} target="_blank">
                    <ExternalLink size={14} />
                    Preview
                  </Link>
                </Button>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
                <Button variant="ghost" size="sm" className="text-[color:var(--color-ink-soft)]">
                  Duplicate
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Booking page defaults</CardTitle>
          <CardDescription>Applied to all event types unless overridden</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-[color:var(--color-mist)] p-4">
            <div className="flex items-center gap-2">
              <Video size={16} className="text-[color:var(--color-thread)]" />
              <p className="font-medium">Default video</p>
            </div>
            <p className="mt-1 text-sm text-[color:var(--color-ink-soft)]">
              Daily.co room auto-created on confirm. Recording feeds AI pipeline.
            </p>
          </div>
          <div className="rounded-lg border border-[color:var(--color-mist)] p-4">
            <div className="flex items-center gap-2">
              <Copy size={16} className="text-[color:var(--color-thread)]" />
              <p className="font-medium">Public link</p>
            </div>
            <p className="mono mt-1 text-sm text-[color:var(--color-ink-soft)]">
              https://{ORG_PROFILE.bookingUrl}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="mono text-[0.55rem] uppercase tracking-wider text-[color:var(--color-ink-soft)]">
        {label}
      </p>
      <p className="font-medium">{value}</p>
    </div>
  );
}

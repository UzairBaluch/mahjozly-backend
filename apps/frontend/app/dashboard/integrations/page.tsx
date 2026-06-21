import { Check, CreditCard, Plug, Video, Webhook } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const INTEGRATIONS = [
  {
    id: 'google',
    name: 'Google Calendar',
    description: 'Two-way sync. Required for conflict detection and writing confirmed bookings back.',
    status: 'connected' as const,
    detail: 'lena@example.com · last sync 2m ago',
    action: 'Manage',
    icon: Plug,
    required: true,
  },
  {
    id: 'daily',
    name: 'Daily.co',
    description: 'Auto-create video rooms. Recordings feed transcription → AI session memory.',
    status: 'connected' as const,
    detail: 'Recording + consent screen enabled',
    action: 'Configure',
    icon: Video,
  },
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Collect deposits at booking time. Reduces no-shows on paid sessions.',
    status: 'pending' as const,
    detail: 'Connect to require deposits on Coaching + Strategy',
    action: 'Connect Stripe',
    icon: CreditCard,
  },
  {
    id: 'zapier',
    name: 'Webhooks & Zapier',
    description: 'Push booking.created, session.summary_ready events to your stack.',
    status: 'available' as const,
    detail: '2 webhook endpoints configured',
    action: 'View webhooks',
    icon: Webhook,
  },
];

export default function IntegrationsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Integrations"
        description="Calendar, video, payments, and automation. Google Calendar is required for production scheduling."
      />

      <div className="grid gap-4">
        {INTEGRATIONS.map((item) => (
          <Card key={item.id}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[color:var(--color-paper-warm)] text-[color:var(--color-thread)]">
                  <item.icon size={18} />
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <CardTitle className="text-base">{item.name}</CardTitle>
                    {item.required ? (
                      <span className="mono rounded-full bg-[color:var(--color-thread-soft)] px-2 py-0.5 text-[0.55rem] uppercase tracking-wider text-[color:var(--color-thread)]">
                        Required
                      </span>
                    ) : null}
                    <StatusPill status={item.status} />
                  </div>
                  <CardDescription className="mt-1">{item.description}</CardDescription>
                  <p className="mt-2 text-sm text-[color:var(--color-ink-soft)]">{item.detail}</p>
                </div>
              </div>
              <Button
                variant={item.status === 'connected' ? 'outline' : 'accent'}
                size="sm"
                className="shrink-0"
                disabled={item.id === 'daily' && false}
              >
                {item.action}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Automation events</CardTitle>
          <CardDescription>Available webhook payloads once connected</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-2 sm:grid-cols-2">
            {[
              'booking.created',
              'booking.cancelled',
              'session.recording_ready',
              'session.summary_ready',
              'client.timeline_updated',
            ].map((event) => (
              <li
                key={event}
                className="mono flex items-center gap-2 rounded-md border border-[color:var(--color-mist)] px-3 py-2 text-xs"
              >
                <Check size={12} className="text-[color:var(--color-thread)]" />
                {event}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

function StatusPill({ status }: { status: 'connected' | 'pending' | 'available' }) {
  const styles = {
    connected: 'bg-emerald-50 text-emerald-700',
    pending: 'bg-amber-50 text-amber-700',
    available: 'bg-[color:var(--color-mist-soft)] text-[color:var(--color-ink-soft)]',
  };
  const labels = {
    connected: 'Connected',
    pending: 'Not connected',
    available: 'Configured',
  };

  return (
    <span
      className={`mono rounded-full px-2 py-0.5 text-[0.55rem] uppercase tracking-wider ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}

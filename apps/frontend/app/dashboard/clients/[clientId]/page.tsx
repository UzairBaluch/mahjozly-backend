import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Mail, Plus, Sparkles } from 'lucide-react';
import { ClientAvatar } from '@/components/dashboard/client-avatar';
import { PageHeader } from '@/components/dashboard/page-header';
import { StatusBadge } from '@/components/dashboard/status-badge';
import { Thread } from '@/components/thread';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BOOKINGS, CLIENTS, getClient, SESSION_HISTORY } from '@/lib/dashboard-data';

export default async function ClientTimelinePage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = await params;
  const client = getClient(clientId);
  if (!client) notFound();

  const clientIndex = CLIENTS.findIndex((c) => c.id === clientId);
  const history = SESSION_HISTORY[clientId] ?? [];
  const upcoming = BOOKINGS.filter((b) => b.clientId === clientId && b.status !== 'COMPLETED');

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/dashboard/clients"
          className="mb-4 inline-flex items-center gap-1 text-sm text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-ink)]"
        >
          <ArrowLeft size={14} />
          All clients
        </Link>
        <PageHeader
          title={client.name}
          description={client.email}
          meta={`${client.sessions} sessions · last seen ${client.lastSeen}`}
          actions={
            <>
              <Button variant="outline" size="sm">
                <Mail size={14} />
                Email client
              </Button>
              <Button variant="accent" size="sm">
                <Plus size={14} />
                Book again
              </Button>
            </>
          }
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>The thread</CardTitle>
              <CardDescription>Every session connected — your signature continuity view</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <ClientAvatar name={client.name} size="md" index={clientIndex} />
                <div className="flex flex-wrap gap-2">
                  {client.tags.map((tag) => (
                    <span
                      key={tag}
                      className="mono rounded-full bg-[color:var(--color-paper-warm)] px-2 py-0.5 text-[0.6rem] uppercase tracking-wider text-[color:var(--color-ink-soft)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-6">
                <Thread nodes={client.thread} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Session history</CardTitle>
              <CardDescription>AI summaries and notes from past bookings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {history.length === 0 ? (
                <p className="text-sm text-[color:var(--color-ink-soft)]">
                  No completed sessions yet. The thread starts after the first call.
                </p>
              ) : (
                history.map((session) => (
                  <div
                    key={session.id}
                    className="rounded-lg border border-[color:var(--color-mist)] p-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="font-medium">{session.service}</p>
                        <p className="mono text-xs text-[color:var(--color-ink-soft)]">{session.date}</p>
                      </div>
                      <SessionStatus status={session.status} />
                    </div>
                    {session.summary ? (
                      <p className="ai mt-3 text-sm italic leading-relaxed">{session.summary}</p>
                    ) : (
                      <p className="mt-3 text-sm text-[color:var(--color-dusk)]">
                        <span className="anim-pulse-soft">●</span> AI summary processing…
                      </p>
                    )}
                    {session.actionItems?.length ? (
                      <ul className="ai mt-2 space-y-1 text-xs">
                        {session.actionItems.map((item) => (
                          <li key={item}>· {item}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-[color:var(--color-dusk)]/20 bg-[color:var(--color-dusk-soft)]/30">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-[color:var(--color-dusk)]" />
                <CardTitle className="text-base">Next-session AI brief</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="ai text-sm italic leading-relaxed">&ldquo;{client.brief}&rdquo;</p>
              <ul className="ai mt-4 space-y-1 text-xs">
                {client.actionItems.map((item) => (
                  <li key={item}>· {item}</li>
                ))}
              </ul>
              <Button className="mt-4 w-full" variant="outline" size="sm">
                Add notes for last session
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Upcoming</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcoming.length === 0 ? (
                <p className="text-sm text-[color:var(--color-ink-soft)]">No upcoming bookings.</p>
              ) : (
                upcoming.map((b) => (
                  <Link
                    key={b.id}
                    href={`/dashboard/bookings/${b.id}`}
                    className="block rounded-lg border border-[color:var(--color-mist)] px-3 py-2 transition-colors hover:border-[color:var(--color-thread)]/30"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium">{b.whenLabel}</p>
                      <StatusBadge status={b.status} />
                    </div>
                    <p className="text-xs text-[color:var(--color-ink-soft)]">{b.service}</p>
                  </Link>
                ))
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">CRM notes</CardTitle>
              <CardDescription>Owner-written context (not AI)</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-[color:var(--color-ink-soft)]">
                Prefers morning slots. Exam in August. Parent CC&apos;d on confirmations.
              </p>
              <Button className="mt-3" variant="outline" size="sm">
                Edit notes
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function SessionStatus({ status }: { status: string }) {
  const label =
    status === 'COMPLETE'
      ? 'Complete'
      : status === 'PROCESSING'
        ? 'Processing'
        : status === 'PENDING'
          ? 'Pending'
          : 'Failed';

  return (
    <span
      className={
        'mono rounded-full px-2 py-0.5 text-[0.55rem] uppercase tracking-wider ' +
        (status === 'COMPLETE'
          ? 'bg-emerald-50 text-emerald-700'
          : status === 'PROCESSING'
            ? 'bg-[color:var(--color-dusk-soft)] text-[color:var(--color-dusk)]'
            : 'bg-[color:var(--color-mist-soft)] text-[color:var(--color-ink-soft)]')
      }
    >
      {label}
    </span>
  );
}

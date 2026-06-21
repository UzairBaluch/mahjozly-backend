import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ClientAvatar } from '@/components/dashboard/client-avatar';
import { PageHeader } from '@/components/dashboard/page-header';
import { Thread } from '@/components/thread';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CLIENTS } from '@/lib/dashboard-data';

export default function ClientsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Clients"
        description="Everyone who has booked with you. Each profile has a thread of session memory."
        meta={`${CLIENTS.length} active clients`}
      />

      <div className="grid gap-4">
        {CLIENTS.map((client, i) => (
          <Card key={client.id} className="card-lift overflow-hidden p-0">
            <div className="grid gap-0 lg:grid-cols-[1fr_1.2fr]">
              <div className="border-b border-[color:var(--color-mist)] p-6 lg:border-b-0 lg:border-r">
                <div className="flex items-start gap-4">
                  <ClientAvatar name={client.name} index={i} />
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/dashboard/clients/${client.id}`}
                      className="display text-lg font-semibold hover:underline"
                    >
                      {client.name}
                    </Link>
                    <p className="text-sm text-[color:var(--color-ink-soft)]">{client.email}</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {client.tags.map((tag) => (
                        <span
                          key={tag}
                          className="mono rounded-full bg-[color:var(--color-paper-warm)] px-2 py-0.5 text-[0.55rem] uppercase tracking-wider text-[color:var(--color-ink-soft)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="mono mt-3 text-xs uppercase tracking-wider text-[color:var(--color-ink-soft)]">
                      {client.sessions} sessions · last {client.lastSeen}
                      {client.nextSession ? ` · next ${client.nextSession}` : ''}
                    </p>
                  </div>
                </div>
                <Link
                  href={`/dashboard/clients/${client.id}`}
                  className="mt-4 inline-flex items-center gap-1 text-sm text-[color:var(--color-thread)] hover:underline"
                >
                  Open full timeline
                  <ArrowRight size={14} />
                </Link>
              </div>

              <div className="bg-[color:var(--color-paper-warm)]/50 p-6">
                <div className="mb-3 flex items-center gap-2">
                  <Sparkles size={12} className="text-[color:var(--color-dusk)]" />
                  <span className="mono text-[0.6rem] uppercase tracking-wider text-[color:var(--color-ink-soft)]">
                    Thread preview
                  </span>
                </div>
                <Thread nodes={client.thread.slice(-4)} compact />
                <p className="ai mt-4 line-clamp-2 text-sm italic">&ldquo;{client.brief}&rdquo;</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

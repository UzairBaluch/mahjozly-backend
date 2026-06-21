import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const CLIENTS = [
  { id: 'aisha', name: 'Aisha Khan', sessions: 4, last: '12 Jun' },
  { id: 'marcus', name: 'Marcus Lin', sessions: 1, last: '21 Jun' },
  { id: 'priya', name: 'Priya Sharma', sessions: 7, last: '18 Jun' },
];

export default function ClientsPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="display text-3xl">Clients</h1>
        <p className="text-sm text-[color:var(--color-ink)]/70">
          Every person who has booked with you. Click into one for their thread.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>All clients</CardTitle>
          <CardDescription>{CLIENTS.length} active</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="divide-y divide-[color:var(--color-mist)]">
            {CLIENTS.map((c) => (
              <li key={c.id} className="flex items-center justify-between py-3">
                <div>
                  <Link href={`/dashboard/clients/${c.id}`} className="font-medium hover:underline">
                    {c.name}
                  </Link>
                  <div className="mono text-xs text-[color:var(--color-ink)]/60">
                    {c.sessions} sessions · last seen {c.last}
                  </div>
                </div>
                <Link
                  href={`/dashboard/clients/${c.id}`}
                  className="text-sm text-[color:var(--color-thread)] hover:underline"
                >
                  Open thread →
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

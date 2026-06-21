import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Placeholder — Phase B + C in checklist replaces the current `Service` model with `EventType`.
const PLACEHOLDER = [
  { id: 'discovery', name: 'Discovery call', duration: 30, price: 0 },
  { id: 'coaching', name: 'Coaching session', duration: 60, price: 120 },
];

export default function EventTypesPage() {
  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="display text-3xl">Event types</h1>
          <p className="text-sm text-[color:var(--color-ink)]/70">
            What people can book on your calendar. Each one has its own duration, price, and rules.
          </p>
        </div>
        <Button variant="accent">+ New event type</Button>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {PLACEHOLDER.map((et) => (
          <Card key={et.id}>
            <CardHeader>
              <CardTitle>{et.name}</CardTitle>
              <CardDescription>
                <span className="mono">/{et.id}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm">
                <span className="mono">{et.duration} min</span>
                <span className="mono">{et.price === 0 ? 'Free' : `$${et.price}`}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

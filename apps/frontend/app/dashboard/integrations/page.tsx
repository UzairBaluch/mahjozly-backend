import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function IntegrationsPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="display text-3xl">Integrations</h1>
        <p className="text-sm text-[color:var(--color-ink)]/70">
          Connect your calendar and video tools. Google Calendar is required to prevent double-booking.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Google Calendar</CardTitle>
            <CardDescription>Two-way sync. Required for conflict detection.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[color:var(--color-ink)]/70">
              Read your busy times to block slots; write confirmed bookings back to your calendar.
            </p>
            <Button className="mt-4" variant="outline">
              Connect Google
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Daily.co (video)</CardTitle>
            <CardDescription>Auto-create video rooms for bookings.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[color:var(--color-ink)]/70">
              When a booking is confirmed, we generate a join link automatically. Recordings feed the AI memory layer.
            </p>
            <Button className="mt-4" variant="outline" disabled>
              Coming in Phase E
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

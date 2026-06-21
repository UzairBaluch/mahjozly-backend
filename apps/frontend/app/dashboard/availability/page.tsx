import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const DEFAULT_HOURS: Record<string, [string, string] | null> = {
  Monday: ['09:00', '17:00'],
  Tuesday: ['09:00', '17:00'],
  Wednesday: ['09:00', '17:00'],
  Thursday: ['09:00', '17:00'],
  Friday: ['09:00', '17:00'],
  Saturday: null,
  Sunday: null,
};

export default function AvailabilityPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="display text-3xl">Availability</h1>
        <p className="text-sm text-[color:var(--color-ink)]/70">
          Your weekly working hours. Date overrides (OOO, custom hours) live below.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Weekly hours</CardTitle>
          <CardDescription>Stored in your timezone. Times shown to bookers are converted.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {DAYS.map((day) => {
            const hours = DEFAULT_HOURS[day];
            return (
              <div
                key={day}
                className="flex items-center justify-between rounded-md border border-[color:var(--color-mist)] px-3 py-2"
              >
                <span className="font-medium">{day}</span>
                <span className="mono text-sm text-[color:var(--color-ink)]/70">
                  {hours ? `${hours[0]} – ${hours[1]}` : 'Closed'}
                </span>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Date overrides</CardTitle>
          <CardDescription>One-off OOO days or special hours. Empty for now.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-[color:var(--color-ink)]/60">
            No overrides yet. Add one when you have an out-of-office day.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/dashboard/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DATE_OVERRIDES, ORG_PROFILE, WEEKLY_HOURS } from '@/lib/dashboard-data';
import { cn } from '@/lib/utils';

const DAYS = Object.keys(WEEKLY_HOURS);

export default function AvailabilityPage() {
  const [hours, setHours] = useState(WEEKLY_HOURS);
  const [timezone] = useState(ORG_PROFILE.timezone);

  const toggleDay = (day: string) => {
    setHours((prev) => ({
      ...prev,
      [day]: prev[day] ? null : (['09:00', '17:00'] as [string, string]),
    }));
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Availability"
        description="Weekly working hours and one-off overrides. Booker times convert from your timezone."
        meta={`Timezone · ${timezone}`}
        actions={<Button variant="accent">+ Add override</Button>}
      />

      <Card>
        <CardHeader>
          <CardTitle>Weekly hours</CardTitle>
          <CardDescription>Click a day to toggle open/closed. Edit times inline.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {DAYS.map((day) => {
            const dayHours = hours[day];
            const open = dayHours !== null && dayHours !== undefined;

            return (
              <div
                key={day}
                className={cn(
                  'flex flex-wrap items-center justify-between gap-3 rounded-lg border px-4 py-3 transition-colors',
                  open
                    ? 'border-[color:var(--color-mist)] bg-[color:var(--color-paper)]'
                    : 'border-[color:var(--color-mist)]/60 bg-[color:var(--color-paper-warm)] opacity-80',
                )}
              >
                <button
                  type="button"
                  onClick={() => toggleDay(day)}
                  className="flex items-center gap-3 text-left"
                >
                  <span
                    className={cn(
                      'size-2 rounded-full',
                      open ? 'bg-[color:var(--color-thread)]' : 'bg-[color:var(--color-mist)]',
                    )}
                  />
                  <span className="w-28 font-medium">{day}</span>
                </button>

                {open && dayHours ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="time"
                      value={dayHours[0]}
                      onChange={(e) =>
                        setHours((prev) => ({
                          ...prev,
                          [day]: [e.target.value, dayHours[1]] as [string, string],
                        }))
                      }
                      className="mono rounded-md border border-[color:var(--color-mist)] px-2 py-1 text-sm"
                    />
                    <span className="text-[color:var(--color-ink-soft)]">–</span>
                    <input
                      type="time"
                      value={dayHours[1]}
                      onChange={(e) =>
                        setHours((prev) => ({
                          ...prev,
                          [day]: [dayHours[0], e.target.value] as [string, string],
                        }))
                      }
                      className="mono rounded-md border border-[color:var(--color-mist)] px-2 py-1 text-sm"
                    />
                  </div>
                ) : (
                  <span className="mono text-sm text-[color:var(--color-ink-soft)]">Closed</span>
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Date overrides</CardTitle>
          <CardDescription>Out-of-office days or custom hours for specific dates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {DATE_OVERRIDES.map((override) => (
            <div
              key={override.date}
              className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[color:var(--color-mist)] px-4 py-3"
            >
              <div>
                <p className="font-medium">{override.label}</p>
                <p className="mono text-xs text-[color:var(--color-ink-soft)]">{override.date}</p>
              </div>
              <span className="mono text-sm text-[color:var(--color-ink-soft)]">
                {override.hours ? `${override.hours[0]} – ${override.hours[1]}` : 'Unavailable'}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Buffer & limits</CardTitle>
          <CardDescription>Cal-style scheduling rules</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-3">
          <Rule label="Minimum notice" value="4 hours" />
          <Rule label="Buffer between meetings" value="15 min" />
          <Rule label="Max bookings per day" value="8" />
        </CardContent>
      </Card>
    </div>
  );
}

function Rule({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-[color:var(--color-mist)] p-4">
      <p className="mono text-[0.6rem] uppercase tracking-wider text-[color:var(--color-ink-soft)]">
        {label}
      </p>
      <p className="mt-1 font-medium">{value}</p>
      <Button variant="ghost" size="sm" className="mt-2 h-auto p-0 text-[color:var(--color-thread)]">
        Edit
      </Button>
    </div>
  );
}

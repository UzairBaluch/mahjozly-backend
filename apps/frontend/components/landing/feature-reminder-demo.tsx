'use client';

import { Bell, CalendarCheck, Clock, Mail } from 'lucide-react';

const FEED = [
  {
    icon: CalendarCheck,
    title: 'New booking confirmed',
    body: 'Aisha booked a 60-min coaching session for Thu 12 June, 10:30.',
    meta: 'just now',
    tone: 'thread' as const,
  },
  {
    icon: Bell,
    title: 'Session reminder sent',
    body: 'Marcus — your call starts in 1 hour. Prep notes attached.',
    meta: '1 min ago',
    tone: 'dusk' as const,
  },
  {
    icon: Mail,
    title: 'AI brief ready',
    body: 'Summary + action items for Priya are saved to her timeline.',
    meta: '2 min ago',
    tone: 'dusk' as const,
  },
  {
    icon: Clock,
    title: 'Reschedule request',
    body: 'Sara wants to move her Friday session to next Monday.',
    meta: '5 min ago',
    tone: 'clay' as const,
  },
];

// Static feed — no cards sliding in/out (that resized the section).
export function FeatureReminderDemo() {
  return (
    <div className="min-h-[320px] rounded-xl border border-[color:var(--color-mist)] bg-[color:var(--color-paper)] p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <span className="mono text-[0.65rem] uppercase tracking-wider text-[color:var(--color-ink-soft)]">
          Activity feed
        </span>
        <span className="mono text-[0.65rem] uppercase tracking-wider text-[color:var(--color-thread)]">
          Live
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {FEED.map((n) => {
          const Icon = n.icon;
          const toneColor = {
            thread: 'var(--color-thread)',
            clay: 'var(--color-clay)',
            dusk: 'var(--color-dusk)',
            ink: 'var(--color-ink)',
          }[n.tone];
          return (
            <div
              key={n.title}
              className="flex items-start gap-3 rounded-md border border-[color:var(--color-mist)] bg-[color:var(--color-paper-warm)] p-3"
            >
              <span
                className="flex size-8 shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: `${toneColor}1A`, color: toneColor }}
              >
                <Icon size={14} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-medium">{n.title}</p>
                  <span className="mono shrink-0 text-[0.6rem] uppercase tracking-wider text-[color:var(--color-ink-soft)]">
                    {n.meta}
                  </span>
                </div>
                <p className="mt-0.5 line-clamp-2 text-xs text-[color:var(--color-ink-soft)]">{n.body}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

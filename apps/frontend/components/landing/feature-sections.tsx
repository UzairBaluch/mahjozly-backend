import type { ReactNode } from 'react';
import { CalendarRange, MessagesSquare, Layers, Bell } from 'lucide-react';
import { FeatureBookingDemo } from './feature-booking-demo';
import { FeatureAiNotesDemo } from './feature-ai-notes-demo';
import { FeatureTimelineDemo } from './feature-timeline-demo';
import { FeatureReminderDemo } from './feature-reminder-demo';
import { DemoFrame } from './demo-frame';
import { Reveal } from './reveal';

type Block = {
  eyebrow: string;
  title: string;
  body: string;
  bullets?: string[];
  icon: React.ComponentType<{ size?: number; className?: string }>;
  demo: ReactNode;
  reverse?: boolean;
};

const BLOCKS: Block[] = [
  {
    eyebrow: 'Booking',
    title: 'A booking link that actually respects your calendar.',
    body: 'Connect Google Calendar once. Your real availability — including buffer time, minimum notice, and one-off OOO days — becomes a public link in seconds.',
    bullets: [
      'Smart slot detection across multiple calendars',
      'Buffers, minimum notice, daily caps',
      'Embed on any site or share a short link',
    ],
    icon: CalendarRange,
    demo: (
      <DemoFrame>
        <FeatureBookingDemo />
      </DemoFrame>
    ),
  },
  {
    eyebrow: 'AI session memory',
    title: 'Every meeting becomes a brief, not a blur.',
    body: 'Each session is transcribed, summarized, and tagged with action items — automatically. You walk into the next call already up to speed.',
    bullets: [
      'Auto transcription from the built-in video room',
      'Concise summary, action items, next-session context',
      'Type your own notes for in-person calls',
    ],
    icon: MessagesSquare,
    demo: (
      <DemoFrame>
        <FeatureAiNotesDemo />
      </DemoFrame>
    ),
    reverse: true,
  },
  {
    eyebrow: 'Client timeline',
    title: 'The thread that connects every session.',
    body: 'Every appointment is stitched into a timeline per client. Six months in, you can replay the whole relationship in seconds.',
    bullets: [
      'Per-client thread, ordered by date',
      'AI tags milestones and patterns over time',
      'Optional client-side view ("Your journey")',
    ],
    icon: Layers,
    demo: (
      <DemoFrame>
        <FeatureTimelineDemo />
      </DemoFrame>
    ),
  },
  {
    eyebrow: 'Reminders & workflow',
    title: 'Fewer no-shows. Less admin. More signal.',
    body: 'Automated email + SMS reminders, smart reschedule links, and a live activity feed so nothing slips between sessions.',
    bullets: [
      '24h + 1h reminders, your timing rules',
      'One-click reschedule that respects your hours',
      'Webhooks to plug into your other tools',
    ],
    icon: Bell,
    demo: (
      <DemoFrame>
        <FeatureReminderDemo />
      </DemoFrame>
    ),
    reverse: true,
  },
];

export function FeatureSections() {
  return (
    <section id="features" className="bg-section-tint py-24">
      <div className="mx-auto max-w-6xl px-6">
        <header className="mx-auto max-w-2xl text-center">
          <p className="mono text-xs uppercase tracking-widest text-[color:var(--color-thread)]">Features</p>
          <h2 className="display mt-3 text-4xl font-semibold md:text-5xl">
            The full workflow — in one tool that remembers.
          </h2>
          <p className="mt-4 text-[color:var(--color-ink-soft)]">
            Booking, video, reminders, and AI memory in one place. Stop stitching Calendly + Zoom + Otter +
            Notion together.
          </p>
        </header>

        <div className="mt-20 space-y-28">
          {BLOCKS.map((b) => (
            <Reveal as="article" key={b.title} className="grid items-center gap-10 md:grid-cols-2">
              <div className={b.reverse ? 'md:order-2' : ''}>
                <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-mist)] bg-[color:var(--color-paper)] px-3 py-1">
                  <b.icon size={12} className="text-[color:var(--color-thread)]" />
                  <span className="mono text-[0.65rem] uppercase tracking-widest text-[color:var(--color-ink-soft)]">
                    {b.eyebrow}
                  </span>
                </div>
                <h3 className="display mt-4 text-balance text-3xl font-semibold leading-tight">
                  {b.title}
                </h3>
                <p className="mt-4 text-[color:var(--color-ink-soft)]">{b.body}</p>
                {b.bullets ? (
                  <ul className="mt-5 space-y-2">
                    {b.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2 text-sm">
                        <span className="mt-2 size-1 shrink-0 rounded-full bg-[color:var(--color-thread)]" />
                        <span className="text-[color:var(--color-ink-soft)]">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
              <div className={b.reverse ? 'md:order-1' : ''}>{b.demo}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

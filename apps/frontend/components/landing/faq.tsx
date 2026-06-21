'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const QS = [
  {
    q: 'Is Mahjozly a Calendly replacement?',
    a: 'Mostly yes — same booking link concept, with smarter calendar handling, an embedded video room, and the AI memory layer Calendly deliberately leaves out. Most coaches and consultants we talk to drop Calendly + Otter + a notes tool in favor of just us.',
  },
  {
    q: 'Do I have to use your video product?',
    a: 'No. You can keep using Zoom / Google Meet / Teams. We just won\'t have the recording for AI summaries unless you connect those tools (coming soon) or use our built-in video room, which is the easiest path.',
  },
  {
    q: 'What happens if my client doesn\'t want to be recorded?',
    a: 'Recording is per-event-type and per-session. You can disable it for sensitive calls, and each booker sees a consent screen before joining. Transcripts can be deleted on demand.',
  },
  {
    q: 'How much do AI summaries cost on the Free plan?',
    a: 'Free includes 20 AI summaries per month. Pro is unlimited. Cost-wise we err on the side of generosity — we\'d rather have you using it than gating it.',
  },
  {
    q: 'Can I export my data?',
    a: 'Always. Org-level JSON + CSV export of all clients, bookings, notes, and timelines is one click from settings. We treat your data as portable on principle.',
  },
  {
    q: 'Is this HIPAA-compliant?',
    a: 'Not yet. We position Mahjozly for coaching, tutoring, consulting, and other non-clinical work today. A HIPAA-equivalent track is on the roadmap but not priced or scoped publicly.',
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-[color:var(--color-paper)] py-24">
      <div className="mx-auto max-w-3xl px-6">
        <header className="text-center">
          <p className="mono text-xs uppercase tracking-widest text-[color:var(--color-thread)]">FAQ</p>
          <h2 className="display mt-3 text-4xl font-semibold md:text-5xl">Common questions</h2>
        </header>

        <ul className="mt-12 divide-y divide-[color:var(--color-mist)] overflow-hidden rounded-xl border border-[color:var(--color-mist)] bg-[color:var(--color-paper-warm)]">
          {QS.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition-colors hover:bg-[color:var(--color-paper)]"
                  aria-expanded={isOpen}
                >
                  <span className="font-medium">{item.q}</span>
                  <ChevronDown
                    size={18}
                    className={cn(
                      'shrink-0 text-[color:var(--color-ink-soft)] transition-transform',
                      isOpen && 'rotate-180 text-[color:var(--color-thread)]',
                    )}
                  />
                </button>
                <div
                  className="grid overflow-hidden transition-[grid-template-rows] duration-300"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm leading-relaxed text-[color:var(--color-ink-soft)]">
                      {item.a}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

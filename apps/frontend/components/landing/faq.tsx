'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, MessageCircle, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

type Item = { q: string; a: string };
type Category = { label: string; items: Item[] };

const CATEGORIES: Category[] = [
  {
    label: 'Product',
    items: [
      {
        q: 'Is Mahjozly a Calendly replacement?',
        a: 'Mostly yes — same booking link concept, with smarter calendar handling, an embedded video room, and the AI memory layer Calendly deliberately leaves out. Most coaches and consultants we talk to drop Calendly + Otter + a notes tool in favor of just us.',
      },
      {
        q: 'Do I have to use your video product?',
        a: "No. You can keep using Zoom / Google Meet / Teams. We just won't have the recording for AI summaries unless you connect those tools (coming soon) or use our built-in video room, which is the easiest path.",
      },
    ],
  },
  {
    label: 'Privacy & data',
    items: [
      {
        q: "What happens if my client doesn't want to be recorded?",
        a: 'Recording is per-event-type and per-session. You can disable it for sensitive calls, and each booker sees a consent screen before joining. Transcripts can be deleted on demand.',
      },
      {
        q: 'Can I export my data?',
        a: 'Always. Org-level JSON + CSV export of all clients, bookings, notes, and timelines is one click from settings. We treat your data as portable on principle.',
      },
    ],
  },
  {
    label: 'Pricing & limits',
    items: [
      {
        q: 'How much do AI summaries cost on the Free plan?',
        a: "Free includes 20 AI summaries per month. Pro is unlimited. Cost-wise we err on the side of generosity — we'd rather have you using it than gating it.",
      },
    ],
  },
  {
    label: 'Compliance',
    items: [
      {
        q: 'Is this HIPAA-compliant?',
        a: 'Not yet. We position Mahjozly for coaching, tutoring, consulting, and other non-clinical work today. A HIPAA-equivalent track is on the roadmap but not priced or scoped publicly.',
      },
    ],
  },
];

export function FAQ() {
  // Open the first question by default; key is `${categoryIdx}-${itemIdx}`.
  const [openKey, setOpenKey] = useState<string | null>('0-0');

  return (
    <section id="faq" className="bg-[color:var(--color-paper)] py-24">
      <div className="mx-auto max-w-3xl px-6">
        <header className="text-center">
          <p className="mono text-xs uppercase tracking-widest text-[color:var(--color-thread)]">
            FAQ
          </p>
          <h2 className="display mt-3 text-4xl font-semibold md:text-5xl">Common questions</h2>
          <p className="mt-4 text-[color:var(--color-ink-soft)]">
            The ones people actually ask in onboarding calls. Anything missing? Reach out below.
          </p>
        </header>

        <div className="mt-12 space-y-10">
          {CATEGORIES.map((category, ci) => (
            <div key={category.label}>
              <h3 className="mono mb-3 text-[0.65rem] uppercase tracking-widest text-[color:var(--color-ink-soft)]">
                {category.label}
              </h3>
              <ul className="divide-y divide-[color:var(--color-mist)] overflow-hidden rounded-xl border border-[color:var(--color-mist)] bg-[color:var(--color-paper-warm)]">
                {category.items.map((item, ii) => {
                  const key = `${ci}-${ii}`;
                  const isOpen = openKey === key;
                  return (
                    <li key={item.q}>
                      <button
                        type="button"
                        onClick={() => setOpenKey(isOpen ? null : key)}
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
          ))}
        </div>

        <ContactCard />
      </div>
    </section>
  );
}

function ContactCard() {
  return (
    <div className="mt-12 flex flex-col items-start justify-between gap-5 rounded-2xl border border-[color:var(--color-mist)] bg-[color:var(--color-paper-warm)] p-6 sm:flex-row sm:items-center sm:p-7">
      <div className="flex items-start gap-4">
        <span
          aria-hidden
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-thread-soft)] text-[color:var(--color-thread)]"
        >
          <MessageCircle size={18} />
        </span>
        <div>
          <p className="font-semibold">Still have questions?</p>
          <p className="mt-0.5 text-sm text-[color:var(--color-ink-soft)]">
            We answer in hours, not days. Real humans, no ticket queue.
          </p>
        </div>
      </div>

      <Link
        href="mailto:hello@mahjozly.com"
        className="mono inline-flex shrink-0 items-center gap-2 rounded-full bg-[color:var(--color-ink)] px-4 py-2 text-xs uppercase tracking-widest text-white transition-colors hover:bg-[color:var(--color-clay-hover)]"
      >
        <Mail size={14} />
        hello@mahjozly.com
      </Link>
    </div>
  );
}

import {
  Lock,
  Globe,
  Languages,
  CreditCard,
  Webhook,
  Sparkles,
  CalendarSync,
  Smartphone,
  Code2,
  RefreshCcw,
} from 'lucide-react';

const ITEMS = [
  {
    icon: CalendarSync,
    title: 'Two-way Google sync',
    body: 'Conflicts detected automatically. Confirmed bookings written back to your calendar.',
  },
  {
    icon: Sparkles,
    title: 'AI follow-ups',
    body: 'Draft post-session messages from the brief. Edit, then send.',
  },
  {
    icon: Webhook,
    title: 'Webhooks + API',
    body: 'Every booking, status change, and summary fires a signed webhook to your stack.',
  },
  {
    icon: CreditCard,
    title: 'Stripe deposits',
    body: 'Charge up-front for high-value sessions. Refund automatically on cancel.',
  },
  {
    icon: Code2,
    title: 'Embeddable',
    body: 'Drop your booking page on any site. Floating button, inline, or popover.',
  },
  {
    icon: RefreshCcw,
    title: 'Recurring sessions',
    body: 'Weekly, bi-weekly, custom — book a series in one click.',
  },
  {
    icon: Smartphone,
    title: 'Mobile-ready',
    body: 'Owner dashboard built for between-session check-ins on the go.',
  },
  {
    icon: Lock,
    title: 'Private by default',
    body: 'Recordings + transcripts encrypted at rest. Org-level data export & delete.',
  },
  {
    icon: Globe,
    title: 'Timezones, handled',
    body: 'Bookers see local time, you see yours, DST never breaks a session.',
  },
  {
    icon: Languages,
    title: 'Multi-language ready',
    body: 'i18n-friendly architecture so localized booking pages are a setting, not a fork.',
  },
];

export function FeatureGrid() {
  return (
    <section className="bg-[color:var(--color-paper)] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <header className="mx-auto max-w-2xl text-center">
          <p className="mono text-xs uppercase tracking-widest text-[color:var(--color-thread)]">
            Everything else
          </p>
          <h2 className="display mt-3 text-4xl font-semibold md:text-5xl">
            The fundamentals, taken seriously.
          </h2>
          <p className="mt-4 text-[color:var(--color-ink-soft)]">
            The stuff you only notice when it&apos;s missing.
          </p>
        </header>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {ITEMS.map((it) => (
            <article
              key={it.title}
              className="card-lift rounded-xl border border-[color:var(--color-mist)] bg-[color:var(--color-paper-warm)] p-5"
            >
              <span className="inline-flex size-9 items-center justify-center rounded-md bg-[color:var(--color-thread-soft)] text-[color:var(--color-thread)]">
                <it.icon size={16} />
              </span>
              <h3 className="mt-4 text-sm font-semibold">{it.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-[color:var(--color-ink-soft)]">{it.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

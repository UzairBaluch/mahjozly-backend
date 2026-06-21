import type { ReactNode } from 'react';
import {
  CalendarSync,
  Sparkles,
  Webhook,
  CreditCard,
  Code2,
  RefreshCcw,
  Smartphone,
  Lock,
  Globe,
} from 'lucide-react';

// Bento-style feature grid: 3 featured cards (with mini visuals) on top,
// 6 compact cards (icon + 1-liner) below. Replaces the previous uniform
// 10-card grid where everything looked the same flat tile.

export function FeatureGrid() {
  return (
    <section className="bg-[color:var(--color-paper)] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <header className="mx-auto max-w-2xl text-center">
          <p className="mono text-xs uppercase tracking-widest text-[color:var(--color-thread)]">
            Built deep
          </p>
          <h2 className="display mt-3 text-4xl font-semibold md:text-5xl">
            The fundamentals — taken seriously.
          </h2>
          <p className="mt-4 text-[color:var(--color-ink-soft)]">
            The boring stuff most schedulers ship as an afterthought. We didn&apos;t.
          </p>
        </header>

        {/* Featured row — 3 deeper cards with their own mini illustrations. */}
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          <FeaturedCard
            icon={CalendarSync}
            title="Two-way Google sync"
            body="Real availability, every time. We read your busy times, write bookings back, and catch conflicts before anyone clicks book."
            visual={<GoogleSyncViz />}
          />
          <FeaturedCard
            icon={Sparkles}
            title="AI follow-ups"
            body="Every session brief becomes a draft message — ready when the call ends. You edit. We did the boring part."
            visual={<FollowupViz />}
          />
          <FeaturedCard
            icon={Webhook}
            title="Webhooks + API"
            body="Bookings, status changes, AI summaries — every event fires a signed webhook. Pipe it into your CRM, billing, anything."
            visual={<WebhookViz />}
          />
        </div>

        {/* Compact row — small features, dense but readable. */}
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <CompactCard
            icon={CreditCard}
            title="Stripe deposits"
            body="Charge upfront. Refund on cancel. Zero manual work."
          />
          <CompactCard
            icon={Code2}
            title="Embed anywhere"
            body="Floating, inline, or popover. Yours to drop in."
          />
          <CompactCard
            icon={RefreshCcw}
            title="Recurring series"
            body="Weekly, bi-weekly, custom — book a whole arc."
          />
          <CompactCard
            icon={Smartphone}
            title="Mobile-first"
            body="Built for the phone, not adapted to it."
          />
          <CompactCard
            icon={Lock}
            title="Private by default"
            body="Encrypted at rest. Export & delete on demand."
          />
          <CompactCard
            icon={Globe}
            title="Globally ready"
            body="Timezones + i18n built in. DST is not your problem."
          />
        </div>
      </div>
    </section>
  );
}

// ── Card variants ─────────────────────────────────────────────────────────

type FeaturedProps = {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  body: string;
  visual: ReactNode;
};

function FeaturedCard({ icon: Icon, title, body, visual }: FeaturedProps) {
  return (
    <article className="card-lift group flex flex-col rounded-2xl border border-[color:var(--color-mist)] bg-[color:var(--color-paper-warm)] p-6">
      <div className="flex items-center gap-2">
        <span className="inline-flex size-7 items-center justify-center rounded-md bg-[color:var(--color-thread-soft)] text-[color:var(--color-thread)]">
          <Icon size={14} />
        </span>
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-ink-soft)]">{body}</p>
      <div className="mt-5 flex-1">{visual}</div>
    </article>
  );
}

type CompactProps = {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  body: string;
};

function CompactCard({ icon: Icon, title, body }: CompactProps) {
  return (
    <article className="card-lift rounded-xl border border-[color:var(--color-mist)] bg-[color:var(--color-paper)] p-4">
      <Icon size={16} className="text-[color:var(--color-thread)]" />
      <h3 className="mt-3 text-sm font-semibold">{title}</h3>
      <p className="mt-1 text-xs leading-relaxed text-[color:var(--color-ink-soft)]">{body}</p>
    </article>
  );
}

// ── Mini visuals ──────────────────────────────────────────────────────────

function GoogleSyncViz() {
  return (
    <div className="rounded-lg border border-[color:var(--color-mist)] bg-[color:var(--color-paper)] p-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="mono text-[0.6rem] uppercase tracking-wider text-[color:var(--color-ink-soft)]">
          Thu 12 Jun
        </span>
        <span className="mono inline-flex items-center gap-1 text-[0.6rem] uppercase tracking-wider text-[color:var(--color-thread)]">
          <span className="size-1.5 rounded-full bg-[color:var(--color-thread)] anim-pulse-soft" /> Synced
        </span>
      </div>
      <ul className="space-y-1.5">
        <SlotRow time="09:00" label="Coaching · Aisha" state="busy" />
        <SlotRow time="10:30" label="Free" state="free" />
        <SlotRow time="11:30" label="Lunch (Google Cal)" state="external" />
        <SlotRow time="14:00" label="Free" state="free" />
      </ul>
    </div>
  );
}

function SlotRow({
  time,
  label,
  state,
}: {
  time: string;
  label: string;
  state: 'free' | 'busy' | 'external';
}) {
  const tone = {
    free: 'bg-[color:var(--color-thread-soft)] text-[color:var(--color-thread)]',
    busy: 'bg-[color:var(--color-mist-soft)] text-[color:var(--color-ink-soft)]',
    external: 'bg-[color:var(--color-dusk-soft)] text-[color:var(--color-dusk)]',
  }[state];
  return (
    <li className="flex items-center justify-between gap-2 text-xs">
      <span className="mono text-[color:var(--color-ink-soft)]">{time}</span>
      <span className={'mono flex-1 truncate rounded-sm px-2 py-0.5 text-[0.65rem] ' + tone}>
        {label}
      </span>
    </li>
  );
}

function FollowupViz() {
  return (
    <div className="rounded-lg border border-[color:var(--color-mist)] bg-[color:var(--color-paper)] p-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="mono text-[0.6rem] uppercase tracking-wider text-[color:var(--color-ink-soft)]">
          Draft to Aisha
        </span>
        <span className="mono text-[0.6rem] uppercase tracking-wider text-[color:var(--color-dusk)]">
          AI draft
        </span>
      </div>
      <div className="rounded-md bg-[color:var(--color-paper-warm)] p-3">
        <p className="ai text-xs italic leading-relaxed">
          &ldquo;Thanks for today — sending the practice problems we discussed. Same time next Thursday?&rdquo;
        </p>
      </div>
      <div className="mt-2 flex justify-end gap-1.5">
        <button
          type="button"
          className="mono rounded-full border border-[color:var(--color-mist)] px-2 py-1 text-[0.6rem] uppercase tracking-wider text-[color:var(--color-ink-soft)]"
        >
          Edit
        </button>
        <button
          type="button"
          className="mono rounded-full bg-[color:var(--color-thread)] px-2 py-1 text-[0.6rem] uppercase tracking-wider text-white"
        >
          Send
        </button>
      </div>
    </div>
  );
}

function WebhookViz() {
  return (
    <div className="overflow-hidden rounded-lg border border-[color:var(--color-mist)] bg-[color:var(--color-ink)] p-3 text-[color:var(--color-paper)]">
      <div className="mb-2 flex items-center justify-between">
        <span className="mono text-[0.6rem] uppercase tracking-wider text-[color:var(--color-paper)]/60">
          POST /your/webhook
        </span>
        <span className="mono inline-flex items-center gap-1 text-[0.6rem] uppercase tracking-wider text-[color:var(--color-thread)]">
          <span className="size-1.5 rounded-full bg-[color:var(--color-thread)]" /> 200
        </span>
      </div>
      <pre className="mono overflow-hidden whitespace-pre text-[0.65rem] leading-relaxed text-[color:var(--color-paper)]/85">{`{
  "event": "booking.confirmed",
  "id": "bk_8f3a…",
  "client": "Aisha Khan",
  "at": "2026-06-12T10:30Z"
}`}</pre>
    </div>
  );
}

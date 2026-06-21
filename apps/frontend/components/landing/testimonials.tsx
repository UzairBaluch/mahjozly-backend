import { Star } from 'lucide-react';

type Quote = {
  quote: string;
  name: string;
  role: string;
  org: string;
  metric: { label: string; value: string };
  avatarTint: 'thread' | 'dusk' | 'clay';
};

const FEATURED: Quote = {
  quote:
    "I stopped opening Notion to scribble notes mid-session. The brief is just there in the dashboard when I sit down for the next call. It feels like a co-pilot for my practice.",
  name: 'Lena Park',
  role: 'Career coach',
  org: 'Independent · NYC',
  metric: { label: 'Active clients', value: '80+' },
  avatarTint: 'thread',
};

const SUPPORTING: Quote[] = [
  {
    quote:
      "My tutoring center had three tools for one workflow. Now it's one. Parents can see the journey their kid is on, and our retention is up 22% this term.",
    name: 'Omar Reyes',
    role: 'Owner',
    org: 'Atlas Tutoring',
    metric: { label: 'Retention lift', value: '+22%' },
    avatarTint: 'dusk',
  },
  {
    quote:
      'The thread visual sounds gimmicky on paper but it actually changes how I show up. Six months in, you can replay an entire relationship in 30 seconds.',
    name: 'Hadi Suleiman',
    role: 'Independent consultant',
    org: 'Strategy practice · Dubai',
    metric: { label: 'Time on Mahjozly', value: '6 mo' },
    avatarTint: 'clay',
  },
];

const TINTS: Record<Quote['avatarTint'], { bg: string; color: string }> = {
  thread: { bg: 'var(--color-thread-soft)', color: 'var(--color-thread)' },
  dusk: { bg: 'var(--color-dusk-soft)', color: 'var(--color-dusk)' },
  clay: { bg: '#fef0e6', color: '#bd6b3e' },
};

function initials(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function Testimonials() {
  return (
    <section className="bg-[color:var(--color-paper)] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <header className="mx-auto max-w-2xl text-center">
          <p className="mono text-xs uppercase tracking-widest text-[color:var(--color-thread)]">
            From early users
          </p>
          <h2 className="display mt-3 text-4xl font-semibold md:text-5xl">
            People we&apos;re building for.
          </h2>
          <p className="mt-4 text-[color:var(--color-ink-soft)]">
            Three workflows replaced. One tool. The part nobody else built.
          </p>
        </header>

        <div className="mt-14 grid gap-6 md:grid-cols-5">
          <FeaturedQuote q={FEATURED} />
          <div className="grid gap-6 md:col-span-2">
            {SUPPORTING.map((q) => (
              <SupportingQuote key={q.name} q={q} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedQuote({ q }: { q: Quote }) {
  const tint = TINTS[q.avatarTint];
  return (
    <figure className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[color:var(--color-mist)] bg-[color:var(--color-paper-warm)] p-8 md:col-span-3 md:p-10">
      <span
        aria-hidden
        className="display absolute right-6 top-2 text-[8rem] leading-none text-[color:var(--color-thread)]/10"
      >
        &ldquo;
      </span>

      <div className="relative">
        <Stars />
        <blockquote className="display mt-5 text-2xl font-medium leading-snug text-[color:var(--color-ink)] md:text-3xl">
          &ldquo;{q.quote}&rdquo;
        </blockquote>
      </div>

      <figcaption className="relative mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[color:var(--color-mist)] pt-6">
        <div className="flex items-center gap-3">
          <span
            className="display flex size-11 items-center justify-center rounded-full text-sm font-semibold"
            style={{ backgroundColor: tint.bg, color: tint.color }}
            aria-hidden
          >
            {initials(q.name)}
          </span>
          <div>
            <p className="text-sm font-semibold">{q.name}</p>
            <p className="mono mt-0.5 text-[0.65rem] uppercase tracking-wider text-[color:var(--color-ink-soft)]">
              {q.role} · {q.org}
            </p>
          </div>
        </div>

        <MetricPill value={q.metric.value} label={q.metric.label} tint={tint} />
      </figcaption>
    </figure>
  );
}

function SupportingQuote({ q }: { q: Quote }) {
  const tint = TINTS[q.avatarTint];
  return (
    <figure className="card-lift flex flex-col rounded-xl border border-[color:var(--color-mist)] bg-[color:var(--color-paper)] p-6">
      <Stars />
      <blockquote className="mt-3 text-sm leading-relaxed text-[color:var(--color-ink)]">
        &ldquo;{q.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-5 flex items-center justify-between gap-3 border-t border-[color:var(--color-mist)] pt-4">
        <div className="flex items-center gap-3">
          <span
            className="display flex size-9 items-center justify-center rounded-full text-xs font-semibold"
            style={{ backgroundColor: tint.bg, color: tint.color }}
            aria-hidden
          >
            {initials(q.name)}
          </span>
          <div>
            <p className="text-xs font-semibold">{q.name}</p>
            <p className="mono mt-0.5 text-[0.6rem] uppercase tracking-wider text-[color:var(--color-ink-soft)]">
              {q.role} · {q.org}
            </p>
          </div>
        </div>
        <span
          className="mono whitespace-nowrap rounded-full px-2 py-0.5 text-[0.6rem] uppercase tracking-wider"
          style={{ backgroundColor: tint.bg, color: tint.color }}
        >
          {q.metric.value} {q.metric.label.toLowerCase()}
        </span>
      </figcaption>
    </figure>
  );
}

function Stars() {
  return (
    <div className="flex gap-0.5 text-[color:var(--color-clay)]" aria-label="5 out of 5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={12} fill="currentColor" stroke="none" />
      ))}
    </div>
  );
}

function MetricPill({
  value,
  label,
  tint,
}: {
  value: string;
  label: string;
  tint: { bg: string; color: string };
}) {
  return (
    <div
      className="flex items-baseline gap-2 rounded-full border border-transparent px-3 py-1.5"
      style={{ backgroundColor: tint.bg, color: tint.color }}
    >
      <span className="display text-base font-semibold leading-none">{value}</span>
      <span className="mono text-[0.6rem] uppercase tracking-wider">{label}</span>
    </div>
  );
}

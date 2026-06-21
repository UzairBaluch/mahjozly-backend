import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedThread } from './animated-thread';

const HERO_NODES = [
  { label: '1st session', note: 'Goals + history' },
  { label: '2nd session', note: 'Wants morning slots' },
  { label: '3rd session' },
  { label: '6th session', note: 'Hit first milestone' },
  { label: '12th session', note: 'Ready for next level' },
];

export function Hero() {
  return (
    <section className="bg-hero relative overflow-hidden pt-32 pb-24">
      <div className="bg-grid absolute inset-0 opacity-40" aria-hidden="true" />

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <div className="anim-fade-up inline-flex items-center gap-2 rounded-full border border-[color:var(--color-mist)] bg-[color:var(--color-paper)]/80 px-3 py-1 text-xs backdrop-blur">
          <Sparkles size={12} className="text-[color:var(--color-dusk)]" />
          <span className="text-[color:var(--color-ink-soft)]">
            AI session memory · Built on Cal-style scheduling
          </span>
        </div>

        <h1 className="anim-fade-up display mt-6 text-balance text-5xl font-semibold leading-[1.05] md:text-7xl">
          Calendly remembers your <span className="italic">time slots</span>.
          <br />
          Mahjozly remembers your <span className="italic text-[color:var(--color-thread)]">clients</span>.
        </h1>

        <p className="anim-fade-up mx-auto mt-6 max-w-2xl text-balance text-base text-[color:var(--color-ink-soft)] md:text-lg">
          A booking platform whose real product is continuity — the thread connecting one session to the next.
          Every meeting leaves behind an AI brief, so you walk in already up to speed.
        </p>

        <div className="anim-fade-up mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" variant="accent" className="group">
            <Link href="/register">
              Start free
              <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="#features">See it in action</Link>
          </Button>
        </div>

        <p className="anim-fade-up mono mt-4 text-xs uppercase tracking-wide text-[color:var(--color-ink-soft)]/70">
          No credit card · Free during early access
        </p>

        <div className="mx-auto mt-16 max-w-3xl rounded-2xl border border-[color:var(--color-mist)] bg-[color:var(--color-paper)] p-6 shadow-md md:p-10">
          <p className="mono mb-4 text-[0.65rem] uppercase tracking-wider text-[color:var(--color-ink-soft)]">
            Aisha Khan · Coaching client
          </p>
          <AnimatedThread nodes={HERO_NODES} replayMs={3000} />
          <p className="ai mt-8 max-w-xl text-sm italic leading-relaxed">
            &ldquo;Latest brief: Discussed pacing again. Wants more practice problems before next exam. Open with a
            5-minute warm-up.&rdquo;
          </p>
        </div>
      </div>

      <TrustBar />
    </section>
  );
}

function TrustBar() {
  const COMPANIES = ['Lighthouse Coaching', 'Atlas Tutoring', 'Hearth Consulting', 'Forge Studio', 'Northwind Partners'];
  return (
    <div className="relative mx-auto mt-20 max-w-6xl px-6 text-center">
      <p className="mono text-xs uppercase tracking-widest text-[color:var(--color-ink-soft)]">
        Used by independent practices in early access
      </p>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 opacity-60">
        {COMPANIES.map((c) => (
          <span key={c} className="display text-base italic">
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}

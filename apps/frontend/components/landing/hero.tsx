import Link from 'next/link';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedThread } from './animated-thread';
import { MouseSpotlight } from './mouse-spotlight';
import { Marquee } from './marquee';

const HERO_NODES = [
  { label: '1st session', note: 'Goals + history' },
  { label: '2nd session', note: 'Wants morning slots' },
  { label: '3rd session' },
  { label: '6th session', note: 'Hit first milestone' },
  { label: '12th session', note: 'Ready for next level' },
];

const TRUST_BAR = [
  'Lighthouse Coaching',
  'Atlas Tutoring',
  'Hearth Consulting',
  'Forge Studio',
  'Northwind Partners',
  'Cedar Coaching Co.',
  'Beacon Therapy',
  'Threadline Tutors',
];

export function Hero() {
  return (
    <section className="bg-hero relative overflow-hidden pt-32 pb-24">
      {/* Cursor-following glow — Linear-style premium feel. */}
      <MouseSpotlight />

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-mist)] bg-[color:var(--color-paper)]/80 px-3 py-1 text-xs backdrop-blur">
          <span className="relative flex size-2" aria-hidden>
            <span className="relative inline-flex size-2 rounded-full bg-[color:var(--color-thread)]" />
          </span>
          <Sparkles size={12} className="text-[color:var(--color-dusk)]" />
          <span className="text-[color:var(--color-ink-soft)]">
            Open source scheduling · AI session memory
          </span>
        </div>

        <h1 className="mt-6 text-balance text-5xl font-bold leading-[1.02] tracking-tight md:text-7xl">
          Calendly remembers your{' '}
          <span className="text-[color:var(--color-ink-soft)] line-through decoration-[color:var(--color-mist)] decoration-2">
            time slots
          </span>
          .
          <br />
          Mahjozly remembers your{' '}
          <span className="text-[color:var(--color-thread)]">clients</span>.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-balance text-base text-[color:var(--color-ink-soft)] md:text-lg">
          A booking platform whose real product is continuity — the thread connecting one session to the next.
          Every meeting leaves behind an AI brief, so you walk in already up to speed.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" variant="accent" className="group">
            <Link href="/register">
              Start free
              <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="group">
            <Link href="#features">
              <Play
                size={14}
                className="mr-1.5 fill-current transition-transform group-hover:scale-110"
                aria-hidden
              />
              See it in action
            </Link>
          </Button>
        </div>

        <p className="mono mt-4 text-xs uppercase tracking-wide text-[color:var(--color-ink-soft)]/70">
          No credit card · Free during early access
        </p>

        <div className="mx-auto mt-16 max-w-3xl overflow-hidden rounded-2xl border border-[color:var(--color-mist)] bg-[color:var(--color-paper)] shadow-md">
          <div className="flex items-center gap-3 border-b border-[color:var(--color-mist)] bg-[color:var(--color-paper-warm)] px-4 py-3">
            <div className="flex gap-1.5" aria-hidden>
              <span className="size-2.5 rounded-full bg-[#ff5f57]" />
              <span className="size-2.5 rounded-full bg-[#febc2e]" />
              <span className="size-2.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="mono flex min-w-0 flex-1 items-center justify-center rounded-md border border-[color:var(--color-mist)] bg-[color:var(--color-paper)] px-3 py-1 text-[0.6rem] tracking-wide text-[color:var(--color-ink-soft)]">
              <span className="truncate">app.mahjozly.com/clients/aisha-khan</span>
            </div>
          </div>

          <div className="p-6 md:p-10">
            <p className="mono mb-4 text-[0.65rem] uppercase tracking-wider text-[color:var(--color-ink-soft)]">
              Aisha Khan · Coaching client
            </p>
            <AnimatedThread nodes={HERO_NODES} />
            <div className="mt-8 max-w-xl text-left">
              <p className="mono mb-2 text-[0.6rem] uppercase tracking-wider text-[color:var(--color-dusk)]">
                ★ Generated 2m ago · AI brief
              </p>
              <p className="ai text-sm italic leading-relaxed">
                &ldquo;Latest brief: Discussed pacing again. Wants more practice problems before next exam. Open with a
                5-minute warm-up.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>

      <TrustBar />
    </section>
  );
}

function TrustBar() {
  return (
    <div className="relative mx-auto mt-20 max-w-5xl px-6 text-center">
      <p className="mono text-xs uppercase tracking-widest text-[color:var(--color-ink-soft)]">
        Practices launching with us in beta
      </p>
      <div className="mt-6 opacity-70">
        <Marquee items={TRUST_BAR} />
      </div>
    </div>
  );
}

import Link from 'next/link';
import { Thread } from '@/components/thread';
import { Button } from '@/components/ui/button';

const HERO_NODES = [
  { label: '1st session', note: undefined },
  { label: '2nd session', note: 'Wants morning slots' },
  { label: '3rd session', note: undefined },
  { label: '4th session', note: 'Ready for next level' },
  { label: '12th session', note: undefined },
];

export default function Landing() {
  return (
    <main className="min-h-screen">
      {/* Top nav */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link href="/" className="display text-xl font-semibold text-[color:var(--color-ink)]">
          Mahjozly
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/#features" className="hover:underline">
            Features
          </Link>
          <Link href="/#pricing" className="hover:underline">
            Pricing
          </Link>
          <Link href="/login" className="hover:underline">
            Sign in
          </Link>
          <Button asChild size="sm">
            <Link href="/register">Get started</Link>
          </Button>
        </nav>
      </header>

      {/* Hero — the Thread IS the demo. */}
      <section className="mx-auto max-w-4xl px-6 pt-12 pb-24 text-center">
        <h1 className="display text-4xl leading-tight md:text-5xl">
          Calendly remembers your <span className="italic">time slots</span>.<br />
          Mahjozly remembers your <span className="italic">clients</span>.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base text-[color:var(--color-ink)]/70 md:text-lg">
          A booking platform whose real product is continuity — the thread connecting one session to the next.
          Every meeting leaves behind an AI-generated memory, so you walk into the next appointment already briefed.
        </p>

        <div className="mx-auto mt-12 max-w-3xl">
          <Thread nodes={HERO_NODES} />
        </div>

        <div className="mt-12 flex items-center justify-center gap-3">
          <Button asChild size="lg" variant="accent">
            <Link href="/register">Start free</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/#features">See it in action</Link>
          </Button>
        </div>

        <p className="mono mt-4 text-xs uppercase tracking-wide text-[color:var(--color-ink)]/50">
          No credit card · Built for coaches, tutors, consultants
        </p>
      </section>

      {/* Owner / Client side-by-side */}
      <section id="features" className="border-t border-[color:var(--color-mist)] bg-[color:var(--color-mist)]/30 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2">
          <div>
            <h2 className="display text-2xl">Owner side</h2>
            <ul className="mt-6 space-y-3 text-[color:var(--color-ink)]/80">
              <li>· Recurring bookings, capacity-enforced</li>
              <li>· AI session notes after every call</li>
              <li>· No-show insights + risk scoring</li>
              <li>· Client timeline — the thread of every relationship</li>
              <li>· Google Calendar sync, two-way</li>
            </ul>
          </div>
          <div>
            <h2 className="display text-2xl">Client side</h2>
            <ul className="mt-6 space-y-3 text-[color:var(--color-ink)]/80">
              <li>· Self-service booking, reschedule, cancel</li>
              <li>· &ldquo;Your journey&rdquo; view (their own thread)</li>
              <li>· Smart rebooking — &ldquo;book again in 2 weeks?&rdquo;</li>
              <li>· Personalized prep reminders</li>
              <li>· AI-suggested questions before next session</li>
            </ul>
          </div>
        </div>
      </section>

      {/* The wedge */}
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="display text-2xl italic leading-snug text-[color:var(--color-ink)]">
          &ldquo;No competitor links session history directly to the booking system.&rdquo;
        </p>
        <p className="mono mt-4 text-xs uppercase tracking-wide text-[color:var(--color-ink)]/50">
          Cal.com schedules · Otter transcribes · Mahjozly remembers
        </p>
      </section>

      {/* Pricing placeholder */}
      <section id="pricing" className="border-t border-[color:var(--color-mist)] py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="display text-3xl">Pricing</h2>
          <p className="mt-3 text-[color:var(--color-ink)]/70">
            Free while we&apos;re in early access. Pricing tiers land before public launch.
          </p>
          <Button asChild size="lg" variant="accent" className="mt-8">
            <Link href="/register">Join early access</Link>
          </Button>
        </div>
      </section>

      <footer className="border-t border-[color:var(--color-mist)] py-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 text-xs text-[color:var(--color-ink)]/60">
          <span className="mono">© 2026 Mahjozly</span>
          <span className="mono">Built to learn · Designed like it ships</span>
        </div>
      </footer>
    </main>
  );
}

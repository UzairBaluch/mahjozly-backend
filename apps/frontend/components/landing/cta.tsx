import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CtaBand() {
  return (
    <section className="bg-[color:var(--color-ink)] py-20 text-[color:var(--color-paper)]">
      <div className="bg-grid absolute inset-x-0 h-full opacity-10" aria-hidden="true" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <h2 className="display text-4xl font-semibold leading-tight md:text-5xl">
          Stop starting from scratch every session.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[color:var(--color-paper)]/70">
          Free during early access. Coaches, tutors, and consultants — bring your booking link, we&apos;ll
          handle the memory.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" variant="accent" className="group">
            <Link href="/register">
              Start free
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="ghost"
            className="text-[color:var(--color-paper)] hover:bg-[color:var(--color-paper)]/10"
          >
            <Link href="#features">See features</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

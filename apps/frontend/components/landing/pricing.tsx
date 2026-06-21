import Link from 'next/link';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Tier = {
  name: string;
  price: string;
  per: string;
  description: string;
  cta: { label: string; href: string };
  features: string[];
  popular?: boolean;
};

const TIERS: Tier[] = [
  {
    name: 'Free',
    price: '$0',
    per: 'forever',
    description: 'For solo practitioners getting started.',
    cta: { label: 'Get started', href: '/register' },
    features: [
      '1 event type',
      '20 AI summaries / month',
      'Google Calendar sync',
      'Email reminders',
      'Client timeline view',
    ],
  },
  {
    name: 'Pro',
    price: '$24',
    per: 'per month',
    description: 'For owners running a full practice.',
    cta: { label: 'Start Pro trial', href: '/register' },
    features: [
      'Unlimited event types',
      'Unlimited AI summaries',
      'Built-in video room with recording',
      'SMS reminders + workflows',
      'Stripe deposits',
      'Webhooks + Zapier',
      'Priority support',
    ],
    popular: true,
  },
  {
    name: 'Team',
    price: '$18',
    per: 'per user / month',
    description: 'For practices with multiple providers.',
    cta: { label: 'Talk to sales', href: '#' },
    features: [
      'Everything in Pro',
      'Round-robin scheduling',
      'Shared client timelines',
      'Org-level analytics',
      'SSO + audit log',
      'Dedicated onboarding',
    ],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="bg-section-tint py-24">
      <div className="mx-auto max-w-6xl px-6">
        <header className="mx-auto max-w-2xl text-center">
          <p className="mono text-xs uppercase tracking-widest text-[color:var(--color-thread)]">Pricing</p>
          <h2 className="display mt-3 text-4xl font-semibold md:text-5xl">
            Simple pricing. Free while we&apos;re in early access.
          </h2>
          <p className="mt-4 text-[color:var(--color-ink-soft)]">
            No surprise charges. AI features included on every tier — capped on Free, unlimited above.
          </p>
        </header>

        <div className="mt-14 grid items-stretch gap-6 md:grid-cols-3">
          {TIERS.map((t) => (
            <article
              key={t.name}
              className={cn(
                'flex flex-col rounded-xl border bg-[color:var(--color-paper)] p-8 transition-shadow',
                t.popular
                  ? 'border-[color:var(--color-thread)] shadow-md ring-1 ring-[color:var(--color-thread)]/30'
                  : 'border-[color:var(--color-mist)] shadow-xs',
              )}
            >
              <header className="flex items-baseline justify-between">
                <h3 className="display text-xl font-semibold">{t.name}</h3>
                {t.popular ? (
                  <span className="mono rounded-full bg-[color:var(--color-thread)] px-2 py-0.5 text-[0.6rem] uppercase tracking-widest text-[color:var(--color-paper)]">
                    Popular
                  </span>
                ) : null}
              </header>
              <p className="mt-2 text-sm text-[color:var(--color-ink-soft)]">{t.description}</p>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="display text-4xl font-semibold">{t.price}</span>
                <span className="mono text-xs uppercase tracking-wider text-[color:var(--color-ink-soft)]">
                  {t.per}
                </span>
              </div>

              <Button asChild variant={t.popular ? 'accent' : 'outline'} className="mt-6">
                <Link href={t.cta.href}>{t.cta.label}</Link>
              </Button>

              <ul className="mt-7 space-y-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check size={14} className="mt-0.5 shrink-0 text-[color:var(--color-thread)]" />
                    <span className="text-[color:var(--color-ink-soft)]">{f}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

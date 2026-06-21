'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Tier = {
  name: string;
  price: { monthly: string; annual: string };
  per: { monthly: string; annual: string };
  description: string;
  cta: { label: string; href: string };
  features: string[];
  popular?: boolean;
};

const TIERS: Tier[] = [
  {
    name: 'Free',
    price: { monthly: '$0', annual: '$0' },
    per: { monthly: 'forever', annual: 'forever' },
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
    price: { monthly: '$24', annual: '$19' },
    per: { monthly: 'per month', annual: 'per month, billed annually' },
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
    price: { monthly: '$18', annual: '$14' },
    per: { monthly: 'per user / month', annual: 'per user / month, billed annually' },
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

type Billing = 'monthly' | 'annual';

export function Pricing() {
  const [billing, setBilling] = useState<Billing>('monthly');

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

          <BillingToggle billing={billing} onChange={setBilling} />
        </header>

        <div className="mt-12 grid items-stretch gap-6 md:grid-cols-3">
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
                  <span className="mono rounded-full bg-[color:var(--color-thread)] px-2 py-0.5 text-[0.6rem] uppercase tracking-widest text-white">
                    Popular
                  </span>
                ) : null}
              </header>
              <p className="mt-2 text-sm text-[color:var(--color-ink-soft)]">{t.description}</p>

              <div className="mt-6 flex items-baseline gap-2">
                <PriceDisplay value={t.price[billing]} />
                <span className="mono text-xs uppercase tracking-wider text-[color:var(--color-ink-soft)]">
                  {t.per[billing]}
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

function BillingToggle({ billing, onChange }: { billing: Billing; onChange: (v: Billing) => void }) {
  return (
    <div className="mt-8 inline-flex items-center gap-1 rounded-full border border-[color:var(--color-mist)] bg-[color:var(--color-paper)] p-1 shadow-xs">
      <ToggleOption active={billing === 'monthly'} onClick={() => onChange('monthly')}>
        Monthly
      </ToggleOption>
      <ToggleOption active={billing === 'annual'} onClick={() => onChange('annual')}>
        <span>Annual</span>
        <span
          className={cn(
            'mono ml-2 rounded-full px-1.5 py-0.5 text-[0.6rem] uppercase tracking-widest transition-colors',
            billing === 'annual'
              ? 'bg-white/15 text-white'
              : 'bg-[color:var(--color-thread-soft)] text-[color:var(--color-thread)]',
          )}
        >
          −20%
        </span>
      </ToggleOption>
    </div>
  );
}

function ToggleOption({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
        active
          ? 'bg-[color:var(--color-ink)] text-white shadow-sm'
          : 'text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-ink)]',
      )}
      aria-pressed={active}
    >
      {children}
    </button>
  );
}

// Price flips with a quick fade so the toggle feels responsive, not jarring.
function PriceDisplay({ value }: { value: string }) {
  return (
    <span
      key={value}
      className="display text-4xl font-semibold"
      style={{ animation: 'fade-up 240ms var(--ease-out-soft) both' }}
    >
      {value}
    </span>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Tier = {
  name: string;
  tagline: string;
  price: { monthly: number; annual: number };
  per: { monthly: string; annual: string };
  description: string;
  cta: { label: string; href: string };
  features: string[];
  highlight?: string;
  popular?: boolean;
  free?: boolean;
};

const TIERS: Tier[] = [
  {
    name: 'Free',
    tagline: 'Try the memory layer',
    price: { monthly: 0, annual: 0 },
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
    free: true,
  },
  {
    name: 'Pro',
    tagline: 'For owners running a full practice',
    price: { monthly: 24, annual: 19 },
    per: { monthly: 'per month', annual: 'per month, billed annually' },
    description: 'Everything you need to replace Calendly + Otter + a notes tool.',
    cta: { label: 'Start Pro trial', href: '/register' },
    highlight: 'Unlimited AI summaries + built-in video',
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
    tagline: 'For practices with multiple providers',
    price: { monthly: 18, annual: 14 },
    per: { monthly: 'per user / month', annual: 'per user / month, billed annually' },
    description: 'Shared timelines, round-robin, and the controls ops people ask for.',
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

function formatPrice(n: number) {
  return `$${n}`;
}

export function Pricing() {
  const [billing, setBilling] = useState<Billing>('monthly');

  return (
    <section id="pricing" className="bg-section-tint py-24">
      <div className="mx-auto max-w-6xl px-6">
        <header className="mx-auto max-w-2xl text-center">
          <p className="mono text-xs uppercase tracking-widest text-[color:var(--color-thread)]">
            Pricing
          </p>
          <h2 className="display mt-3 text-4xl font-semibold md:text-5xl">
            Simple pricing. Free while we&apos;re in early access.
          </h2>
          <p className="mt-4 text-[color:var(--color-ink-soft)]">
            No surprise charges. AI features included on every tier — capped on Free, unlimited above.
          </p>

          <BillingToggle billing={billing} onChange={setBilling} />
        </header>

        <div className="mt-16 grid items-stretch gap-6 md:grid-cols-3 md:items-center">
          {TIERS.map((t) => (
            <TierCard key={t.name} tier={t} billing={billing} />
          ))}
        </div>

        <p className="mono mt-10 text-center text-[0.7rem] uppercase tracking-widest text-[color:var(--color-ink-soft)]">
          Prices in USD · 14-day Pro trial, no card required · cancel anytime
        </p>
      </div>
    </section>
  );
}

function TierCard({ tier, billing }: { tier: Tier; billing: Billing }) {
  const isPro = !!tier.popular;
  const price = tier.price[billing];
  const annualSavings = tier.free
    ? 0
    : Math.max(0, (tier.price.monthly - tier.price.annual) * 12);

  return (
    <article
      className={cn(
        'relative flex h-full flex-col rounded-2xl border bg-[color:var(--color-paper)] p-8 transition-shadow',
        isPro
          ? 'border-[color:var(--color-thread)] shadow-lg ring-1 ring-[color:var(--color-thread)]/40'
          : 'border-[color:var(--color-mist)] shadow-xs',
      )}
    >
      {isPro ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-px h-px"
          style={{
            background:
              'linear-gradient(90deg, transparent, var(--color-thread), transparent)',
          }}
        />
      ) : null}

      {isPro ? (
        <span className="mono absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-[color:var(--color-thread)] px-3 py-1 text-[0.6rem] uppercase tracking-widest text-white shadow-sm">
          <Sparkles size={10} />
          Most popular
        </span>
      ) : null}

      <header>
        <h3 className="display text-xl font-semibold">{tier.name}</h3>
        <p className="mono mt-1 text-[0.65rem] uppercase tracking-wider text-[color:var(--color-ink-soft)]">
          {tier.tagline}
        </p>
      </header>

      <p className="mt-3 text-sm text-[color:var(--color-ink-soft)]">{tier.description}</p>

      <div className="mt-6 flex items-baseline gap-2">
        <PriceDisplay value={formatPrice(price)} key={`${tier.name}-${billing}`} />
        <span className="mono text-xs uppercase tracking-wider text-[color:var(--color-ink-soft)]">
          {tier.per[billing]}
        </span>
      </div>

      {!tier.free && billing === 'annual' && annualSavings > 0 ? (
        <p
          key={`${tier.name}-savings`}
          className="mono mt-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-[color:var(--color-thread-soft)] px-2 py-0.5 text-[0.6rem] uppercase tracking-wider text-[color:var(--color-thread)]"
          style={{ animation: 'fade-up 240ms var(--ease-out-soft) both' }}
        >
          Save ${annualSavings}/yr
        </p>
      ) : null}

      <Button asChild variant={isPro ? 'accent' : 'outline'} className="mt-6">
        <Link href={tier.cta.href}>{tier.cta.label}</Link>
      </Button>

      {tier.highlight ? (
        <p
          className="mono mt-5 rounded-md border border-dashed border-[color:var(--color-thread)]/40 bg-[color:var(--color-thread-soft)]/60 px-3 py-2 text-[0.65rem] uppercase tracking-wider text-[color:var(--color-thread)]"
        >
          ★ {tier.highlight}
        </p>
      ) : null}

      <ul className="mt-7 space-y-3">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm">
            <Check
              size={14}
              className={cn(
                'mt-0.5 shrink-0',
                isPro ? 'text-[color:var(--color-thread)]' : 'text-[color:var(--color-ink-soft)]',
              )}
            />
            <span className="text-[color:var(--color-ink-soft)]">{f}</span>
          </li>
        ))}
      </ul>
    </article>
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

function PriceDisplay({ value }: { value: string }) {
  return (
    <span
      key={value}
      className="display text-5xl font-semibold tracking-tight"
      style={{ animation: 'fade-up 240ms var(--ease-out-soft) both' }}
    >
      {value}
    </span>
  );
}

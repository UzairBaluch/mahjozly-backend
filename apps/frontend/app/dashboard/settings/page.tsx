'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/dashboard/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ORG_PROFILE } from '@/lib/dashboard-data';
import { cn } from '@/lib/utils';

const TABS = ['Profile', 'AI & memory', 'Reminders', 'Billing', 'Team'] as const;
type Tab = (typeof TABS)[number];

export default function SettingsPage() {
  const [tab, setTab] = useState<Tab>('Profile');

  return (
    <div className="space-y-8">
      <PageHeader
        title="Settings"
        description="Profile, branding, AI behavior, and team controls."
      />

      <div className="flex flex-wrap gap-2 border-b border-[color:var(--color-mist)] pb-4">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn(
              'rounded-lg px-3 py-1.5 text-sm transition-colors',
              tab === t
                ? 'bg-[color:var(--color-ink)] font-medium text-white'
                : 'text-[color:var(--color-ink-soft)] hover:bg-[color:var(--color-paper-warm)]',
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'Profile' ? <ProfileSettings /> : null}
      {tab === 'AI & memory' ? <AiSettings /> : null}
      {tab === 'Reminders' ? <ReminderSettings /> : null}
      {tab === 'Billing' ? <BillingSettings /> : null}
      {tab === 'Team' ? <TeamSettings /> : null}
    </div>
  );
}

function ProfileSettings() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Organization profile</CardTitle>
          <CardDescription>Shown on your public booking page</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Field label="Business name" defaultValue={ORG_PROFILE.name} />
          <Field label="Public slug" defaultValue={ORG_PROFILE.slug} mono />
          <Field label="Email" defaultValue={ORG_PROFILE.email} />
          <Field label="Timezone" defaultValue={ORG_PROFILE.timezone} />
          <Field
            label="Description"
            defaultValue="Career coaching for mid-level professionals. Sessions include AI session memory."
            textarea
          />
          <Button variant="accent">Save profile</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Branding</CardTitle>
          <CardDescription>Logo and booking page appearance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex h-24 items-center justify-center rounded-lg border border-dashed border-[color:var(--color-mist)] bg-[color:var(--color-paper-warm)] text-sm text-[color:var(--color-ink-soft)]">
            Logo upload · wire to Cloudinary
          </div>
          <Field label="Accent color" defaultValue="#1f6feb" mono />
          <Button variant="outline">Upload logo</Button>
        </CardContent>
      </Card>
    </div>
  );
}

function AiSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI session memory</CardTitle>
        <CardDescription>How summaries, briefs, and client-facing sharing work</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ToggleRow
          title="Auto-generate summaries after recorded calls"
          description="Runs when Daily.co recording is ready"
          defaultOn
        />
        <ToggleRow
          title="Next-session brief on dashboard"
          description="Show AI brief on Today view and booking detail"
          defaultOn
        />
        <ToggleRow
          title="Share recap with client (opt-in per org)"
          description="Client portal can see their journey + homework"
          defaultOn={false}
        />
        <ToggleRow
          title="No-show risk scoring"
          description="Suggest deposits for higher-risk bookers"
          defaultOn={false}
        />
        <Field label="Monthly AI summary cap (Free tier preview)" defaultValue="20" mono />
        <Button variant="accent">Save AI preferences</Button>
      </CardContent>
    </Card>
  );
}

function ReminderSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reminders & workflows</CardTitle>
        <CardDescription>Email/SMS defaults for all event types</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ToggleRow title="Email confirmation on book" defaultOn />
        <ToggleRow title="Email reminder · 24h before" defaultOn />
        <ToggleRow title="SMS reminder · 2h before (Pro)" defaultOn />
        <ToggleRow
          title="Personalized prep reminder"
          description="Includes AI brief snippet for returning clients"
          defaultOn
        />
        <Button variant="accent">Save reminder rules</Button>
      </CardContent>
    </Card>
  );
}

function BillingSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing</CardTitle>
        <CardDescription>Plan, usage, and Stripe connect status</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg border border-[color:var(--color-thread)]/30 bg-[color:var(--color-thread-soft)]/40 p-4">
          <p className="font-medium">Pro · Early access</p>
          <p className="text-sm text-[color:var(--color-ink-soft)]">
            Unlimited AI summaries · video recording · SMS reminders
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <UsageStat label="AI summaries this month" value="11 / unlimited" />
          <UsageStat label="Video minutes recorded" value="4h 20m" />
        </div>
        <Button variant="outline">Manage subscription</Button>
      </CardContent>
    </Card>
  );
}

function TeamSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Team</CardTitle>
        <CardDescription>Multi-provider scheduling (Team plan)</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-[color:var(--color-ink-soft)]">
          Round-robin, shared client timelines, and org analytics unlock on Team. You&apos;re on
          Pro with a single provider seat.
        </p>
        <Button className="mt-4" variant="outline">
          Talk to sales
        </Button>
      </CardContent>
    </Card>
  );
}

function Field({
  label,
  defaultValue,
  mono,
  textarea,
}: {
  label: string;
  defaultValue: string;
  mono?: boolean;
  textarea?: boolean;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {textarea ? (
        <textarea
          defaultValue={defaultValue}
          rows={3}
          className="w-full rounded-lg border border-[color:var(--color-mist)] bg-[color:var(--color-paper-warm)] px-3 py-2 text-sm outline-none focus:border-[color:var(--color-thread)]"
        />
      ) : (
        <Input defaultValue={defaultValue} className={mono ? 'mono' : undefined} />
      )}
    </div>
  );
}

function ToggleRow({
  title,
  description,
  defaultOn,
}: {
  title: string;
  description?: string;
  defaultOn?: boolean;
}) {
  const [on, setOn] = useState(defaultOn ?? false);

  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border border-[color:var(--color-mist)] px-4 py-3">
      <div>
        <p className="text-sm font-medium">{title}</p>
        {description ? (
          <p className="mt-0.5 text-xs text-[color:var(--color-ink-soft)]">{description}</p>
        ) : null}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        onClick={() => setOn(!on)}
        className={cn(
          'relative h-6 w-11 shrink-0 rounded-full transition-colors',
          on ? 'bg-[color:var(--color-thread)]' : 'bg-[color:var(--color-mist)]',
        )}
      >
        <span
          className={cn(
            'absolute top-0.5 size-5 rounded-full bg-white shadow-sm transition-transform',
            on ? 'translate-x-5' : 'translate-x-0.5',
          )}
        />
      </button>
    </div>
  );
}

function UsageStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-[color:var(--color-mist)] p-4">
      <p className="text-xs text-[color:var(--color-ink-soft)]">{label}</p>
      <p className="mono mt-1 font-medium">{value}</p>
    </div>
  );
}

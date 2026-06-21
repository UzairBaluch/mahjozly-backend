'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { apiFetch, ApiError } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

type RegisterResponse = { token: string };
type Role = 'USER' | 'ORG';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>('ORG');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const data = await apiFetch<RegisterResponse>('/api/v1/auth/register', {
        method: 'POST',
        body: { name, email, password, role },
      });
      window.localStorage.setItem('mahjozly_token', data.token);
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not create account.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>Role is permanent — pick the one that matches you.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                minLength={6}
              />
              <p className="text-xs text-[color:var(--color-ink)]/60">At least 6 characters.</p>
            </div>
            <div className="space-y-2">
              <Label>I am a…</Label>
              <div className="grid grid-cols-2 gap-3">
                <RoleCard
                  active={role === 'ORG'}
                  onClick={() => setRole('ORG')}
                  title="Owner"
                  subtitle="Coach, tutor, consultant"
                />
                <RoleCard
                  active={role === 'USER'}
                  onClick={() => setRole('USER')}
                  title="Client"
                  subtitle="Booking sessions"
                />
              </div>
            </div>
            {error ? (
              <p className="text-sm text-[color:var(--color-clay)]" role="alert">
                {error}
              </p>
            ) : null}
            <Button type="submit" variant="accent" className="w-full" disabled={submitting}>
              {submitting ? 'Creating…' : 'Create account'}
            </Button>
            <p className="text-center text-sm text-[color:var(--color-ink)]/70">
              Already have an account?{' '}
              <Link href="/login" className="underline">
                Sign in
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}

function RoleCard({
  active,
  onClick,
  title,
  subtitle,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  subtitle: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-md border p-3 text-left text-sm transition-colors',
        active
          ? 'border-[color:var(--color-thread)] bg-[color:var(--color-thread)]/10'
          : 'border-[color:var(--color-mist)] hover:bg-[color:var(--color-mist)]/50',
      )}
    >
      <div className="font-medium">{title}</div>
      <div className="text-xs text-[color:var(--color-ink)]/60">{subtitle}</div>
    </button>
  );
}

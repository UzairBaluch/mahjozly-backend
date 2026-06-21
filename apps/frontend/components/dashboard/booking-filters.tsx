'use client';

import { useMemo, useState } from 'react';
import type { BookingStatus } from '@mahjozly/shared';
import { cn } from '@/lib/utils';

const FILTERS: Array<{ id: 'ALL' | BookingStatus; label: string }> = [
  { id: 'ALL', label: 'All' },
  { id: 'CONFIRMED', label: 'Confirmed' },
  { id: 'PENDING', label: 'Pending' },
  { id: 'COMPLETED', label: 'Completed' },
  { id: 'CANCELLED', label: 'Cancelled' },
];

type Item = { status: BookingStatus };

export function useBookingFilter<T extends Item>(items: T[]) {
  const [filter, setFilter] = useState<'ALL' | BookingStatus>('ALL');

  const filtered = useMemo(
    () => (filter === 'ALL' ? items : items.filter((i) => i.status === filter)),
    [items, filter],
  );

  return { filter, setFilter, filtered };
}

export function BookingFilterTabs({
  value,
  onChange,
  counts,
}: {
  value: 'ALL' | BookingStatus;
  onChange: (v: 'ALL' | BookingStatus) => void;
  counts: Record<string, number>;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {FILTERS.map((f) => (
        <button
          key={f.id}
          type="button"
          onClick={() => onChange(f.id)}
          className={cn(
            'mono rounded-full border px-3 py-1 text-[0.65rem] uppercase tracking-wider transition-colors',
            value === f.id
              ? 'border-[color:var(--color-thread)] bg-[color:var(--color-thread-soft)] text-[color:var(--color-thread)]'
              : 'border-[color:var(--color-mist)] text-[color:var(--color-ink-soft)] hover:border-[color:var(--color-thread)]/30',
          )}
        >
          {f.label}
          <span className="ml-1 opacity-70">({counts[f.id] ?? 0})</span>
        </button>
      ))}
    </div>
  );
}

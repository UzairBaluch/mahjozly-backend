'use client';

import { Check } from 'lucide-react';

const SLOTS = ['09:00', '09:30', '10:00', '10:30', '11:00', '14:00', '14:30', '15:00'];

// Static snapshot — no auto-loop (looping changed height and shifted the page).
export function FeatureBookingDemo() {
  const dateIdx = 11;
  const slotIdx = 3;

  return (
    <div className="min-h-[280px] rounded-xl border border-[color:var(--color-mist)] bg-[color:var(--color-paper)] p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <p className="mono text-[0.65rem] uppercase tracking-wider text-[color:var(--color-ink-soft)]">
          mahjozly.com/aisha/coaching-60
        </p>
        <p className="mono text-[0.65rem] uppercase tracking-wider text-[color:var(--color-thread)]">
          Step 2 · Pick a time
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="mb-2 text-xs font-medium text-[color:var(--color-ink-soft)]">June 2026</p>
          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
              <div key={i} className="mono text-[0.6rem] text-[color:var(--color-ink-soft)]/60">
                {d}
              </div>
            ))}
            {Array.from({ length: 21 }).map((_, i) => {
              const isSelected = dateIdx === i;
              const isBusy = [3, 8, 14].includes(i);
              return (
                <div
                  key={i}
                  className={
                    'mono aspect-square rounded-sm leading-6 ' +
                    (isSelected
                      ? 'bg-[color:var(--color-thread)] font-medium text-[color:var(--color-paper)]'
                      : isBusy
                        ? 'text-[color:var(--color-ink-soft)]/40 line-through'
                        : 'text-[color:var(--color-ink-soft)]')
                  }
                >
                  {i + 1}
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <p className="mb-2 text-xs font-medium text-[color:var(--color-ink-soft)]">Thu 12 June</p>
          <div className="grid grid-cols-2 gap-1.5">
            {SLOTS.map((s, i) => {
              const isSelected = slotIdx === i;
              return (
                <div
                  key={s}
                  className={
                    'mono rounded-sm border px-2 py-1.5 text-center text-xs ' +
                    (isSelected
                      ? 'border-[color:var(--color-thread)] bg-[color:var(--color-thread)] text-[color:var(--color-paper)]'
                      : 'border-[color:var(--color-mist)] text-[color:var(--color-ink)]')
                  }
                >
                  {s}
                </div>
              );
            })}
          </div>
          <div className="mt-4 flex items-center gap-2 rounded-md border border-[color:var(--color-thread)]/30 bg-[color:var(--color-thread-soft)]/50 px-2 py-1.5 text-xs text-[color:var(--color-thread)]">
            <Check size={12} />
            <span>Slot held · confirm to book</span>
          </div>
        </div>
      </div>
    </div>
  );
}

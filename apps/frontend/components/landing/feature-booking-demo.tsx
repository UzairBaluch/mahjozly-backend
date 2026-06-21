'use client';

import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { DemoStage } from './demo-stage';
import { cn } from '@/lib/utils';

const SLOTS = ['09:00', '09:30', '10:00', '10:30', '11:00', '14:00', '14:30', '15:00'];

type Phase = 'date' | 'time' | 'confirmed';

export function FeatureBookingDemo() {
  const [phase, setPhase] = useState<Phase>('date');
  const [dateIdx, setDateIdx] = useState<number | null>(null);
  const [slotIdx, setSlotIdx] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    const seq = async () => {
      while (!cancelled) {
        setPhase('date');
        setDateIdx(null);
        setSlotIdx(null);
        await wait(1100);
        if (cancelled) return;
        setDateIdx(11);
        await wait(900);
        if (cancelled) return;
        setPhase('time');
        await wait(900);
        if (cancelled) return;
        setSlotIdx(3);
        await wait(900);
        if (cancelled) return;
        setPhase('confirmed');
        await wait(2400);
      }
    };
    seq();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <DemoStage height={300}>
      <div className="mb-4 flex items-center justify-between">
        <p className="mono text-[0.65rem] uppercase tracking-wider text-[color:var(--color-ink-soft)]">
          mahjozly.com/aisha/coaching-60
        </p>
        <p className="mono text-[0.65rem] uppercase tracking-wider text-[color:var(--color-thread)]">
          {phase === 'date' && 'Step 1 · Pick a date'}
          {phase === 'time' && 'Step 2 · Pick a time'}
          {phase === 'confirmed' && 'Booked ✓'}
        </p>
      </div>

      {/* Both states stacked — crossfade only, no height change. */}
      <div className="relative h-[220px]">
        <div
          className={cn(
            'absolute inset-0 transition-opacity duration-300',
            phase === 'confirmed' ? 'pointer-events-none opacity-0' : 'opacity-100',
          )}
        >
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
                        'mono aspect-square rounded-sm leading-6 transition-colors ' +
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
              <p className="mb-2 text-xs font-medium text-[color:var(--color-ink-soft)]">
                {phase === 'time' ? 'Thu 12 June' : 'Select a date'}
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                {SLOTS.map((s, i) => {
                  const enabled = phase === 'time';
                  const isSelected = slotIdx === i;
                  return (
                    <div
                      key={s}
                      className={
                        'mono rounded-sm border px-2 py-1.5 text-center text-xs transition-all ' +
                        (isSelected
                          ? 'border-[color:var(--color-thread)] bg-[color:var(--color-thread)] text-[color:var(--color-paper)]'
                          : enabled
                            ? 'border-[color:var(--color-mist)] text-[color:var(--color-ink)]'
                            : 'border-[color:var(--color-mist)] text-[color:var(--color-ink-soft)]/30')
                      }
                    >
                      {s}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div
          className={cn(
            'absolute inset-0 flex flex-col items-center justify-center text-center transition-opacity duration-300',
            phase === 'confirmed' ? 'opacity-100' : 'pointer-events-none opacity-0',
          )}
        >
          <div className="flex size-12 items-center justify-center rounded-full bg-[color:var(--color-thread)] text-[color:var(--color-paper)]">
            <Check size={22} strokeWidth={2.5} />
          </div>
          <p className="display mt-3 text-lg font-semibold">Booked</p>
          <p className="mono mt-1 text-xs text-[color:var(--color-ink-soft)]">
            Thu 12 June · 10:30 · Coaching 60m
          </p>
          <p className="mt-2 text-xs text-[color:var(--color-ink-soft)]">
            Calendar invite + reminders + video link sent.
          </p>
        </div>
      </div>
    </DemoStage>
  );
}

function wait(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

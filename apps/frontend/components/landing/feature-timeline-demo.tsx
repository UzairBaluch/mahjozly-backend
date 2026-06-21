'use client';

import { useEffect, useState } from 'react';
import { DemoStage } from './demo-stage';

const FULL_TIMELINE = [
  { label: '1st', note: 'New client' },
  { label: '2nd', note: 'Wants morning slots' },
  { label: '3rd' },
  { label: '4th', note: 'Hit first goal' },
  { label: '5th' },
  { label: '6th', note: 'Ready for next level' },
  { label: '7th' },
  { label: '8th', note: 'Discussed pacing' },
];

export function FeatureTimelineDemo() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      while (!cancelled) {
        setCount(0);
        await wait(700);
        for (let i = 1; i <= FULL_TIMELINE.length; i++) {
          if (cancelled) return;
          setCount(i);
          await wait(450);
        }
        await wait(2400);
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <DemoStage height={300}>
      <div className="mb-3 flex items-center justify-between">
        <span className="mono text-[0.65rem] uppercase tracking-wider text-[color:var(--color-ink-soft)]">
          Marcus Lin · Coaching client
        </span>
        <span className="mono text-[0.65rem] uppercase tracking-wider text-[color:var(--color-thread)]">
          {count} sessions
        </span>
      </div>

      <svg
        viewBox="0 0 100 24"
        preserveAspectRatio="none"
        className="h-12 w-full"
        aria-hidden="true"
      >
        <line
          x1="0"
          y1="12"
          x2="100"
          y2="12"
          stroke="var(--color-thread)"
          strokeWidth="0.5"
          strokeDasharray="2 1.5"
          strokeLinecap="round"
          opacity={count > 0 ? 1 : 0.4}
        />
        {FULL_TIMELINE.map((_, i) => {
          const cx = (i / (FULL_TIMELINE.length - 1)) * 100;
          const visible = i < count;
          return (
            <circle
              key={i}
              cx={cx}
              cy={12}
              r={1.8}
              fill="var(--color-thread)"
              style={{
                opacity: visible ? 1 : 0.2,
                transition: 'opacity 280ms var(--ease-out-soft)',
              }}
            />
          );
        })}
      </svg>

      <ul
        className="mt-2 grid items-start gap-1.5"
        style={{ gridTemplateColumns: `repeat(${FULL_TIMELINE.length}, minmax(0, 1fr))` }}
      >
        {FULL_TIMELINE.map((n, i) => {
          const visible = i < count;
          return (
            <li key={i} className="text-center leading-tight">
              <div
                className="mono text-[0.6rem] font-medium uppercase tracking-wider text-[color:var(--color-ink-soft)]"
                style={{ opacity: visible ? 1 : 0.25, transition: 'opacity 280ms' }}
              >
                {n.label}
              </div>
              <div className="mt-0.5 h-[2rem] text-[0.65rem]">
                {n.note ? (
                  <span
                    className="ai block italic"
                    style={{ opacity: visible ? 1 : 0, transition: 'opacity 280ms' }}
                  >
                    {n.note}
                  </span>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>

      <p className="absolute inset-x-5 bottom-5 text-xs leading-relaxed text-[color:var(--color-ink-soft)]">
        Every session adds a node to the thread. AI keeps the relationship in context — you never start
        from scratch.
      </p>
    </DemoStage>
  );
}

function wait(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

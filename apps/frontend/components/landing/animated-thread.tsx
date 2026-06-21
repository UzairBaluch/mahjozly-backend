'use client';

import { useEffect, useState } from 'react';

export type ThreadNode = {
  label: string;
  note?: string;
};

type Props = {
  nodes: ThreadNode[];
  /** ms between each node revealing (default 600). */
  stagger?: number;
  /** Auto-replay loop interval in ms. 0 = no replay. */
  replayMs?: number;
};

export function AnimatedThread({ nodes, stagger = 600, replayMs = 0 }: Props) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (nodes.length === 0) return;
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const run = () => {
      setActive(0);
      let i = 0;
      const tick = () => {
        if (cancelled) return;
        i += 1;
        setActive(i);
        if (i < nodes.length) {
          timeoutId = setTimeout(tick, stagger);
        } else if (replayMs > 0) {
          timeoutId = setTimeout(run, replayMs);
        }
      };
      timeoutId = setTimeout(tick, stagger);
    };

    run();
    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [nodes, stagger, replayMs]);

  const stepX = nodes.length === 1 ? 50 : 100 / (nodes.length - 1);

  return (
    <div className="w-full">
      <svg
        viewBox="0 0 100 24"
        preserveAspectRatio="none"
        className="thread-animated h-14 w-full"
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
          style={{ animation: 'draw-line 1400ms var(--ease-out-soft) both' }}
        />
        {nodes.map((_, i) => {
          const visible = i < active;
          return (
            <circle
              key={i}
              cx={nodes.length === 1 ? 50 : i * stepX}
              cy={12}
              r={1.8}
              fill="var(--color-thread)"
              style={{
                opacity: visible ? 1 : 0,
                transformOrigin: `${i * stepX}% 50%`,
                animation: visible
                  ? `pop 380ms var(--ease-out-soft) ${i * 40}ms both`
                  : undefined,
              }}
            />
          );
        })}
      </svg>

      <ul
        className="mt-3 grid items-start gap-2"
        style={{ gridTemplateColumns: `repeat(${nodes.length}, minmax(0, 1fr))` }}
      >
        {nodes.map((n, i) => {
          const visible = i < active;
          return (
            <li
              key={i}
              className="min-h-[3.25rem] text-center leading-tight"
              style={{
                opacity: visible ? 1 : 0,
                transition: 'opacity 320ms var(--ease-out-soft)',
                transitionDelay: `${i * 40}ms`,
              }}
            >
              <div className="mono text-[0.65rem] font-medium uppercase tracking-wider text-[color:var(--color-ink-soft)]">
                {n.label}
              </div>
              <div className="mt-1 h-[2rem]">
                {n.note ? (
                  <div className="ai text-xs italic">&ldquo;{n.note}&rdquo;</div>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

'use client';

import { useState, cloneElement, isValidElement } from 'react';
import { RotateCcw } from 'lucide-react';

type Props = {
  /** A self-contained demo component. Re-mounted on click to restart the loop. */
  children: React.ReactElement;
  label?: string;
};

// Lightweight wrapper that gives every demo a "↻ Replay" affordance.
// Click bumps the `version` and forwards it as the demo's `key`, which forces
// React to unmount + remount — so any setTimeout-driven loop inside resets
// cleanly without each demo having to know about it.
export function DemoFrame({ children, label = 'Replay' }: Props) {
  const [version, setVersion] = useState(0);

  if (!isValidElement(children)) return null;
  const keyed = cloneElement(children, { key: version });

  return (
    <div className="group relative">
      {keyed}

      <button
        type="button"
        onClick={() => setVersion((v) => v + 1)}
        className="mono absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-[color:var(--color-mist)] bg-[color:var(--color-paper)]/90 px-2.5 py-1 text-[0.6rem] uppercase tracking-wider text-[color:var(--color-ink-soft)] opacity-0 shadow-xs backdrop-blur transition-all duration-200 group-hover:opacity-100 hover:border-[color:var(--color-thread)] hover:text-[color:var(--color-thread)]"
        aria-label={label}
      >
        <RotateCcw size={11} strokeWidth={2.5} />
        {label}
      </button>
    </div>
  );
}

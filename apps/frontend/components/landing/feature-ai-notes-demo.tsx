'use client';

import { Sparkles } from 'lucide-react';

const SUMMARY = [
  'Discussed pacing in last session.',
  'Wants more practice problems before next exam.',
  'Open next call with a 5-minute warm-up review.',
];

const ACTION_ITEMS = [
  'Send practice set on integrals',
  'Prep recap of week 2 + 3',
  'Schedule mock exam for next Thursday',
];

// Static snapshot — no typing loop (avoided layout shift).
export function FeatureAiNotesDemo() {
  return (
    <div className="min-h-[280px] rounded-xl border border-[color:var(--color-mist)] bg-[color:var(--color-paper)] p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles size={14} className="text-[color:var(--color-dusk)]" />
          <span className="mono text-[0.65rem] uppercase tracking-wider text-[color:var(--color-ink-soft)]">
            AI · Session summary
          </span>
        </div>
        <span className="mono text-[0.65rem] uppercase tracking-wider text-[color:var(--color-dusk)]">
          Saved to client thread
        </span>
      </div>

      <div className="min-h-[8.5rem] space-y-2">
        {SUMMARY.map((line, i) => (
          <p key={i} className="ai text-sm leading-relaxed italic">
            {line}
          </p>
        ))}
      </div>

      <div className="mt-4 border-t border-[color:var(--color-mist)] pt-4">
        <p className="mono text-[0.65rem] uppercase tracking-wider text-[color:var(--color-ink-soft)]">
          Action items
        </p>
        <ul className="ai mt-2 space-y-1 text-xs">
          {ACTION_ITEMS.map((a) => (
            <li key={a}>· {a}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

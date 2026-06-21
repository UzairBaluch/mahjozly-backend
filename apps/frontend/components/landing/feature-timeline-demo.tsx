'use client';

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

// Static full timeline — no build/reset loop.
export function FeatureTimelineDemo() {
  return (
    <div className="min-h-[280px] rounded-xl border border-[color:var(--color-mist)] bg-[color:var(--color-paper)] p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <span className="mono text-[0.65rem] uppercase tracking-wider text-[color:var(--color-ink-soft)]">
          Marcus Lin · Coaching client
        </span>
        <span className="mono text-[0.65rem] uppercase tracking-wider text-[color:var(--color-thread)]">
          {FULL_TIMELINE.length} sessions
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
        />
        {FULL_TIMELINE.map((_, i) => {
          const cx = (i / (FULL_TIMELINE.length - 1)) * 100;
          return <circle key={i} cx={cx} cy={12} r={1.8} fill="var(--color-thread)" />;
        })}
      </svg>
      <ul
        className="mt-2 grid items-start gap-1.5"
        style={{ gridTemplateColumns: `repeat(${FULL_TIMELINE.length}, minmax(0, 1fr))` }}
      >
        {FULL_TIMELINE.map((n, i) => (
          <li key={i} className="text-center leading-tight">
            <div className="mono text-[0.6rem] font-medium uppercase tracking-wider text-[color:var(--color-ink-soft)]">
              {n.label}
            </div>
            {n.note ? <div className="ai mt-0.5 text-[0.65rem] italic">{n.note}</div> : <div className="mt-0.5 h-[1rem]" />}
          </li>
        ))}
      </ul>

      <p className="mt-5 text-xs leading-relaxed text-[color:var(--color-ink-soft)]">
        Every session adds a node to the thread. AI keeps the relationship in context — you never start
        from scratch.
      </p>
    </div>
  );
}

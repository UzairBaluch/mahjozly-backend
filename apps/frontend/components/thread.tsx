// "The Thread" — the signature visual of Mahjozly.
// A single continuous line stitched through session nodes, each annotated with an AI-style note.
// Used in the landing hero, owner client-timeline, and client portal "Your journey".
// Respects `prefers-reduced-motion` via the .thread-animated escape hatch in globals.css.
import { cn } from '@/lib/utils';

export type ThreadNode = {
  label: string; // e.g. "1st session"
  note?: string; // optional AI annotation, e.g. "Wants morning slots"
};

type ThreadProps = {
  nodes: ThreadNode[];
  className?: string;
  // When true, label/note rendering shrinks for inline dashboard use.
  compact?: boolean;
};

export function Thread({ nodes, className, compact = false }: ThreadProps) {
  if (nodes.length === 0) return null;

  const width = 100; // viewBox width (%)
  const stepX = nodes.length === 1 ? 50 : 100 / (nodes.length - 1);

  return (
    <div className={cn('w-full', className)}>
      <svg
        viewBox={`0 0 ${width} 24`}
        preserveAspectRatio="none"
        className="thread-animated h-12 w-full"
        aria-hidden="true"
      >
        {/* Continuous stitched line connecting all nodes. */}
        <line
          x1="0"
          y1="12"
          x2={width}
          y2="12"
          stroke="var(--color-thread)"
          strokeWidth="0.6"
          strokeDasharray="2 1.5"
          strokeLinecap="round"
        />
        {nodes.map((_, i) => (
          <circle
            key={i}
            cx={nodes.length === 1 ? width / 2 : i * stepX}
            cy={12}
            r={1.6}
            fill="var(--color-thread)"
          />
        ))}
      </svg>

      <ul
        className={cn(
          'mt-2 grid items-start gap-2',
          compact ? 'text-xs' : 'text-sm',
        )}
        style={{ gridTemplateColumns: `repeat(${nodes.length}, minmax(0, 1fr))` }}
      >
        {nodes.map((n, i) => (
          <li key={i} className="text-center leading-tight">
            <div className="mono text-[0.7rem] tracking-wide uppercase text-[color:var(--color-ink)] opacity-70">
              {n.label}
            </div>
            {n.note ? <div className="ai mt-1 italic">&ldquo;{n.note}&rdquo;</div> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

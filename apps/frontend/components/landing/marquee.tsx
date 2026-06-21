'use client';

import { cn } from '@/lib/utils';

type Props = {
  items: string[];
  className?: string;
  /** seconds per full loop, lower = faster. */
  speed?: number;
};

// Infinite horizontal marquee. We render the items twice and translate -50% so
// when the first copy scrolls off, the second copy is exactly where the first
// started — seamless loop.
export function Marquee({ items, className, speed = 36 }: Props) {
  return (
    <div className={cn('group relative w-full overflow-hidden', className)}>
      <div
        className="flex w-max gap-x-12 will-change-transform"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationPlayState: 'running',
        }}
        // Pause when the cursor hovers the strip — gives users a chance to read.
        onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = 'paused')}
        onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = 'running')}
      >
        {[...items, ...items].map((label, i) => (
          <span
            key={`${label}-${i}`}
            className="shrink-0 text-sm font-medium tracking-tight text-[color:var(--color-ink-soft)]"
          >
            {label}
          </span>
        ))}
      </div>

      {/* Fade-out edges so the loop is invisible. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[color:var(--color-paper)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[color:var(--color-paper)] to-transparent" />

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .group > div[style*="marquee"] {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}

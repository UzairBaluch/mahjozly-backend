'use client';

import { cn } from '@/lib/utils';

type Props = {
  items: string[];
  className?: string;
};

// Static trust strip — marquee animation was removed (horizontal motion felt like page shift).
export function Marquee({ items, className }: Props) {
  return (
    <div className={cn('relative w-full overflow-hidden', className)}>
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
        {items.map((label) => (
          <span
            key={label}
            className="shrink-0 text-sm font-medium tracking-tight text-[color:var(--color-ink-soft)]"
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

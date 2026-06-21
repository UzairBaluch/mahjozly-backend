'use client';

import { useEffect, useRef } from 'react';

type Props = {
  /** Tailwind color tokens are not used here — pass an `rgb(r g b)` triplet (no parentheses needed in the var). */
  color?: string;
  size?: number;
  className?: string;
};

// A radial-gradient glow that follows the cursor inside its parent.
// Pure CSS variables + JS pointer-move handler — no rerenders, very cheap.
export function MouseSpotlight({
  color = '31 111 235', // accent blue, matches --color-thread
  size = 520,
  className = '',
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;

    // Hide entirely on touch devices and for reduced-motion preference.
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const touch = window.matchMedia('(hover: none)').matches;
    if (reduce || touch) return;

    parent.style.setProperty('--spot-x', '50%');
    parent.style.setProperty('--spot-y', '0%');
    parent.style.setProperty('--spot-opacity', '0');

    const onMove = (e: PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      parent.style.setProperty('--spot-x', `${x}%`);
      parent.style.setProperty('--spot-y', `${y}%`);
      parent.style.setProperty('--spot-opacity', '1');
    };
    const onLeave = () => parent.style.setProperty('--spot-opacity', '0');

    parent.addEventListener('pointermove', onMove);
    parent.addEventListener('pointerleave', onLeave);
    return () => {
      parent.removeEventListener('pointermove', onMove);
      parent.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${className}`}
      style={{
        opacity: 'var(--spot-opacity, 0)',
        background: `radial-gradient(${size}px ${size}px at var(--spot-x, 50%) var(--spot-y, 0%), rgb(${color} / 0.12), transparent 60%)`,
      }}
    />
  );
}

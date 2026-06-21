'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  children: React.ReactNode;
  /** ms delay before the reveal animation kicks in. */
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'header';
};

// Wrap any block to make it fade + slide up as it enters the viewport.
// Uses IntersectionObserver (no scroll listeners), unobserves after first reveal.
// Respects prefers-reduced-motion automatically because anim-fade-up has a media query.
export function Reveal({ children, delay = 0, className, as: Tag = 'div' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const style: CSSProperties = revealed
    ? { animationDelay: `${delay}ms` }
    : { opacity: 0, transform: 'translateY(12px)' };

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement & HTMLElement>}
      className={cn(revealed && 'anim-fade-up', className)}
      style={style}
    >
      {children}
    </Tag>
  );
}

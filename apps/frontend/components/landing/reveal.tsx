'use client';

import type { CSSProperties, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'header';
};

// Scroll reveal disabled — fade-up was contributing to perceived page movement.
export function Reveal({ children, className, as: Tag = 'div' }: Props) {
  const style: CSSProperties = {};
  return (
    <Tag className={className} style={style}>
      {children}
    </Tag>
  );
}

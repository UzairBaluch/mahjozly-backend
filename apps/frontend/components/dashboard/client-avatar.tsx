import { cn } from '@/lib/utils';

const TINTS = [
  { bg: 'var(--color-thread-soft)', color: 'var(--color-thread)' },
  { bg: 'var(--color-dusk-soft)', color: 'var(--color-dusk)' },
  { bg: '#fef0e6', color: '#bd6b3e' },
  { bg: '#ecfdf5', color: '#059669' },
];

function initials(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function ClientAvatar({
  name,
  size = 'md',
  index = 0,
}: {
  name: string;
  size?: 'sm' | 'md';
  index?: number;
}) {
  const tint = TINTS[index % TINTS.length]!;
  return (
    <span
      className={cn(
        'display inline-flex shrink-0 items-center justify-center rounded-full font-semibold',
        size === 'sm' ? 'size-8 text-xs' : 'size-10 text-sm',
      )}
      style={{ backgroundColor: tint.bg, color: tint.color }}
      aria-hidden
    >
      {initials(name)}
    </span>
  );
}

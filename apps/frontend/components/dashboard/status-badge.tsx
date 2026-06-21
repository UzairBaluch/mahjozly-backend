import type { BookingStatus } from '@mahjozly/shared';
import { cn } from '@/lib/utils';

const STYLES: Record<BookingStatus, string> = {
  CONFIRMED: 'bg-[color:var(--color-thread-soft)] text-[color:var(--color-thread)]',
  PENDING: 'bg-amber-50 text-amber-700',
  CANCELLED: 'bg-[color:var(--color-mist-soft)] text-[color:var(--color-ink-soft)]',
  COMPLETED: 'bg-emerald-50 text-emerald-700',
};

export function StatusBadge({ status }: { status: BookingStatus }) {
  return (
    <span
      className={cn(
        'mono inline-flex rounded-full px-2 py-0.5 text-[0.6rem] uppercase tracking-wider',
        STYLES[status],
      )}
    >
      {status}
    </span>
  );
}

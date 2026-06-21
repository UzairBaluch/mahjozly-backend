import { cn } from '@/lib/utils';

type Props = {
  title: string;
  description?: string;
  meta?: string;
  actions?: React.ReactNode;
  className?: string;
};

export function PageHeader({ title, description, meta, actions, className }: Props) {
  return (
    <header className={cn('flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between', className)}>
      <div>
        <h1 className="display text-3xl font-semibold">{title}</h1>
        {description ? (
          <p className="mt-1 text-sm text-[color:var(--color-ink-soft)]">{description}</p>
        ) : null}
        {meta ? (
          <p className="mono mt-2 text-xs uppercase tracking-wide text-[color:var(--color-ink-soft)]/80">
            {meta}
          </p>
        ) : null}
      </div>
      {actions ? <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div> : null}
    </header>
  );
}

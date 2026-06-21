import { cn } from '@/lib/utils';

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Fixed outer height — animations run inside without shifting the page. */
  height?: number;
};

export function DemoStage({ children, className, height = 300 }: Props) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl border border-[color:var(--color-mist)] bg-[color:var(--color-paper)] p-5 shadow-sm',
        className,
      )}
      style={{ height }}
    >
      {children}
    </div>
  );
}

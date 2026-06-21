import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type Props = {
  label: string;
  value: string;
  hint?: string;
  trend?: string;
  className?: string;
};

export function StatCard({ label, value, hint, trend, className }: Props) {
  return (
    <Card className={cn('p-5', className)}>
      <CardContent className="space-y-1 p-0">
        <p className="text-sm text-[color:var(--color-ink-soft)]">{label}</p>
        <p className="display text-2xl font-semibold">{value}</p>
        {hint ? <p className="text-xs text-[color:var(--color-ink-soft)]">{hint}</p> : null}
        {trend ? (
          <p className="mono text-[0.65rem] uppercase tracking-wider text-[color:var(--color-thread)]">
            {trend}
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}

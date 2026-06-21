import { Check, X, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

type Cell = 'yes' | 'no' | 'partial';

type Row = {
  feature: string;
  calendly: Cell;
  otter: Cell;
  us: Cell;
  note?: string;
};

type Group = {
  label: string;
  caption: string;
  rows: Row[];
};

const GROUPS: Group[] = [
  {
    label: 'Scheduling',
    caption: 'Table-stakes for any booking tool',
    rows: [
      { feature: 'Booking link + scheduling engine', calendly: 'yes', otter: 'no', us: 'yes' },
      {
        feature: 'Built-in video room',
        calendly: 'partial',
        otter: 'no',
        us: 'yes',
        note: 'Cal Video on paid',
      },
      { feature: 'Calendar sync (Google)', calendly: 'yes', otter: 'no', us: 'yes' },
    ],
  },
  {
    label: 'AI memory · where we win',
    caption: 'The gap nobody else fills',
    rows: [
      { feature: 'Auto transcription', calendly: 'no', otter: 'yes', us: 'yes' },
      { feature: 'AI session summary', calendly: 'no', otter: 'yes', us: 'yes' },
      { feature: 'Action items extraction', calendly: 'no', otter: 'partial', us: 'yes' },
      { feature: 'Per-client timeline', calendly: 'no', otter: 'no', us: 'yes' },
      { feature: 'Next-session AI brief', calendly: 'no', otter: 'no', us: 'yes' },
      { feature: 'No-show risk scoring', calendly: 'no', otter: 'no', us: 'yes' },
    ],
  },
  {
    label: 'Trust',
    caption: 'The boring stuff that matters at month 6',
    rows: [
      { feature: 'Open source / self-hostable', calendly: 'no', otter: 'no', us: 'yes' },
      { feature: 'Org-level data export', calendly: 'partial', otter: 'partial', us: 'yes' },
    ],
  },
];

const CELL: Record<Cell, { icon: React.ComponentType<{ size?: number }>; color: string; bg: string; label: string }> = {
  yes: { icon: Check, color: 'var(--color-thread)', bg: 'var(--color-thread-soft)', label: 'Yes' },
  no: { icon: X, color: 'var(--color-ink-soft)', bg: 'var(--color-mist-soft)', label: 'No' },
  partial: { icon: Minus, color: 'var(--color-dusk)', bg: 'var(--color-dusk-soft)', label: 'Partial' },
};

// Count wins to surface a stat in the header.
const ALL_ROWS = GROUPS.flatMap((g) => g.rows);
const SCORE = {
  us: ALL_ROWS.filter((r) => r.us === 'yes').length,
  total: ALL_ROWS.length,
};

export function Comparison() {
  return (
    <section id="comparison" className="bg-section-tint py-24">
      <div className="mx-auto max-w-5xl px-6">
        <header className="mx-auto max-w-2xl text-center">
          <p className="mono text-xs uppercase tracking-widest text-[color:var(--color-thread)]">Why us</p>
          <h2 className="display mt-3 text-4xl font-semibold md:text-5xl">
            No competitor links session memory to the booking itself.
          </h2>
          <p className="mt-4 text-[color:var(--color-ink-soft)]">
            You already use 2–3 tools. We replace all of them — and add the part nobody else built.
          </p>

          <div className="mono mt-6 inline-flex items-center gap-2 rounded-full border border-[color:var(--color-thread)]/30 bg-[color:var(--color-thread-soft)] px-3 py-1 text-[0.65rem] uppercase tracking-widest text-[color:var(--color-thread)]">
            <span className="size-1.5 rounded-full bg-[color:var(--color-thread)]" />
            <span>
              Mahjozly wins {SCORE.us} of {SCORE.total} features
            </span>
          </div>
        </header>

        <div className="mt-12 overflow-hidden rounded-2xl border border-[color:var(--color-mist)] bg-[color:var(--color-paper)] shadow-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs">
                <th className="bg-[color:var(--color-paper-warm)] py-5 pl-6 pr-4 font-medium uppercase tracking-wider text-[color:var(--color-ink-soft)]">
                  Feature
                </th>
                <th className="bg-[color:var(--color-paper-warm)] py-5 px-4 text-center font-medium text-[color:var(--color-ink-soft)]">
                  Calendly
                </th>
                <th className="bg-[color:var(--color-paper-warm)] py-5 px-4 text-center font-medium text-[color:var(--color-ink-soft)]">
                  Otter
                </th>
                <th className="relative bg-[color:var(--color-thread)] py-5 px-4 text-center text-white">
                  <span className="display text-base font-semibold">Mahjozly</span>
                  <span className="mono absolute -bottom-2 left-1/2 -translate-x-1/2 translate-y-full whitespace-nowrap rounded-full bg-[color:var(--color-clay)] px-2 py-0.5 text-[0.6rem] uppercase tracking-wider text-white shadow-sm">
                    ★ Our edge
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {GROUPS.map((group, gi) => (
                <GroupBlock key={group.label} group={group} isLast={gi === GROUPS.length - 1} />
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-center text-xs text-[color:var(--color-ink-soft)]">
          Comparison reflects Calendly &amp; Otter as of June 2026. Hover any cell to confirm.
        </p>
      </div>
    </section>
  );
}

function GroupBlock({ group, isLast }: { group: Group; isLast: boolean }) {
  return (
    <>
      <tr className="bg-[color:var(--color-paper-warm)]/50">
        <td colSpan={3} className="pt-8 pb-3 pl-6 pr-4">
          <div className="flex items-baseline gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[color:var(--color-ink)]">
              {group.label}
            </h3>
            <span className="text-xs text-[color:var(--color-ink-soft)]">{group.caption}</span>
          </div>
        </td>
        <td className="bg-[color:var(--color-thread)]/5 pt-8 pb-3 px-4" />
      </tr>
      {group.rows.map((row, i) => (
        <tr
          key={row.feature}
          className={cn(
            'group transition-colors hover:bg-[color:var(--color-paper-warm)]',
            isLast && i === group.rows.length - 1 ? '' : 'border-b border-[color:var(--color-mist)]/60',
          )}
        >
          <td className="py-3 pl-6 pr-4 text-sm">
            {row.feature}
            {row.note ? (
              <span className="mono ml-2 text-[0.6rem] uppercase tracking-wider text-[color:var(--color-ink-soft)]/70">
                {row.note}
              </span>
            ) : null}
          </td>
          <CellTd value={row.calendly} />
          <CellTd value={row.otter} />
          <CellTd value={row.us} highlight />
        </tr>
      ))}
    </>
  );
}

function CellTd({ value, highlight }: { value: Cell; highlight?: boolean }) {
  const { icon: Icon, color, bg, label } = CELL[value];
  return (
    <td
      className={cn(
        'py-3 px-4 text-center transition-colors',
        highlight && 'bg-[color:var(--color-thread)]/5 group-hover:bg-[color:var(--color-thread)]/10',
      )}
    >
      <span
        className="inline-flex size-7 items-center justify-center rounded-full"
        style={{ backgroundColor: bg, color }}
        aria-label={label}
        title={label}
      >
        <Icon size={14} />
      </span>
    </td>
  );
}

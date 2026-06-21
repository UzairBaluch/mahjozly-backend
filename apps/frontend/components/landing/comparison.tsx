import { Check, X, Minus } from 'lucide-react';

type Cell = 'yes' | 'no' | 'partial';

const ROWS: { feature: string; calendly: Cell; otter: Cell; us: Cell; note?: string }[] = [
  { feature: 'Booking link + scheduling engine', calendly: 'yes', otter: 'no', us: 'yes' },
  { feature: 'Built-in video room', calendly: 'partial', otter: 'no', us: 'yes', note: 'Cal Video on paid' },
  { feature: 'Auto transcription', calendly: 'no', otter: 'yes', us: 'yes' },
  { feature: 'AI session summary', calendly: 'no', otter: 'yes', us: 'yes' },
  { feature: 'Action items extraction', calendly: 'no', otter: 'partial', us: 'yes' },
  { feature: 'Per-client timeline', calendly: 'no', otter: 'no', us: 'yes' },
  { feature: 'Next-session AI brief', calendly: 'no', otter: 'no', us: 'yes' },
  { feature: 'No-show risk scoring', calendly: 'no', otter: 'no', us: 'yes' },
  { feature: 'Open source / self-hostable', calendly: 'no', otter: 'no', us: 'yes' },
];

const CELL: Record<Cell, { icon: React.ComponentType<{ size?: number }>; color: string; bg: string; label: string }> = {
  yes: { icon: Check, color: 'var(--color-thread)', bg: 'var(--color-thread-soft)', label: 'Yes' },
  no: { icon: X, color: 'var(--color-ink-soft)', bg: 'var(--color-mist-soft)', label: 'No' },
  partial: { icon: Minus, color: 'var(--color-dusk)', bg: 'var(--color-dusk-soft)', label: 'Partial' },
};

export function Comparison() {
  return (
    <section id="comparison" className="bg-section-tint py-24">
      <div className="mx-auto max-w-5xl px-6">
        <header className="mx-auto max-w-2xl text-center">
          <p className="mono text-xs uppercase tracking-widest text-[color:var(--color-thread)]">
            Why us
          </p>
          <h2 className="display mt-3 text-4xl font-semibold md:text-5xl">
            No competitor links session memory to the booking itself.
          </h2>
          <p className="mt-4 text-[color:var(--color-ink-soft)]">
            You already use 2–3 tools. We replace all of them — and add the part nobody else built.
          </p>
        </header>

        <div className="mt-12 overflow-hidden rounded-xl border border-[color:var(--color-mist)] bg-[color:var(--color-paper)] shadow-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[color:var(--color-paper-warm)] text-xs">
                <th className="py-4 pl-6 pr-4 font-medium uppercase tracking-wider text-[color:var(--color-ink-soft)]">
                  Feature
                </th>
                <th className="py-4 px-4 text-center font-medium text-[color:var(--color-ink-soft)]">Calendly</th>
                <th className="py-4 px-4 text-center font-medium text-[color:var(--color-ink-soft)]">Otter</th>
                <th className="py-4 px-4 text-center text-[color:var(--color-thread)]">
                  <span className="display text-base font-semibold">Mahjozly</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[color:var(--color-mist)]">
              {ROWS.map((row) => (
                <tr key={row.feature}>
                  <td className="py-3 pl-6 pr-4 text-sm">
                    {row.feature}
                    {row.note ? (
                      <span className="mono ml-2 text-[0.65rem] uppercase tracking-wider text-[color:var(--color-ink-soft)]/70">
                        {row.note}
                      </span>
                    ) : null}
                  </td>
                  <CellTd value={row.calendly} />
                  <CellTd value={row.otter} />
                  <CellTd value={row.us} highlight />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function CellTd({ value, highlight }: { value: Cell; highlight?: boolean }) {
  const { icon: Icon, color, bg, label } = CELL[value];
  return (
    <td className={'py-3 px-4 text-center ' + (highlight ? 'bg-[color:var(--color-thread)]/5' : '')}>
      <span
        className="inline-flex size-7 items-center justify-center rounded-full"
        style={{ backgroundColor: bg, color }}
        aria-label={label}
      >
        <Icon size={14} />
      </span>
    </td>
  );
}

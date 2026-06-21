import Link from 'next/link';

const COLS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'How it works', href: '#how' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Changelog', href: '#' },
    ],
  },
  {
    title: 'Use cases',
    links: [
      { label: 'Coaches', href: '#' },
      { label: 'Tutors', href: '#' },
      { label: 'Consultants', href: '#' },
      { label: 'Therapists', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Docs', href: '#' },
      { label: 'API', href: '#' },
      { label: 'Help center', href: '#' },
      { label: 'Status', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
];

export function LandingFooter() {
  return (
    <footer className="border-t border-[color:var(--color-mist)] bg-[color:var(--color-paper-warm)]">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-5">
          <div>
            <Link href="/" className="display text-xl font-semibold">
              Mahjozly
            </Link>
            <p className="mt-3 max-w-xs text-sm text-[color:var(--color-ink-soft)]">
              Scheduling that remembers. Booking + video + AI session memory for client-facing work.
            </p>
          </div>
          {COLS.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold">{col.title}</h4>
              <ul className="mt-3 space-y-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-ink)]"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-[color:var(--color-mist)] pt-6 text-xs text-[color:var(--color-ink-soft)] md:flex-row md:items-center">
          <span className="mono">© 2026 Mahjozly</span>
          <span className="mono">Built to learn · Designed like it ships</span>
        </div>
      </div>
    </footer>
  );
}

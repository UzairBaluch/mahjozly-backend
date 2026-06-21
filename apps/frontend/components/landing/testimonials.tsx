const QUOTES = [
  {
    quote:
      'I stopped opening Notion to scribble notes mid-session. The brief is just there in the dashboard when I sit down for the next call. It feels like a co-pilot for my practice.',
    name: 'Lena Park',
    role: 'Career coach · 80+ active clients',
  },
  {
    quote:
      'My tutoring center had three tools for one workflow. Now it&apos;s one. Parents can see the journey their kid is on, and our retention is up 22% this term.',
    name: 'Omar Reyes',
    role: 'Owner, Atlas Tutoring',
  },
  {
    quote:
      'The thread visual sounds gimmicky on paper but it actually changes how I show up. Six months in, you can replay an entire relationship in 30 seconds.',
    name: 'Hadi Suleiman',
    role: 'Independent consultant',
  },
];

export function Testimonials() {
  return (
    <section className="bg-[color:var(--color-paper)] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <header className="mx-auto max-w-2xl text-center">
          <p className="mono text-xs uppercase tracking-widest text-[color:var(--color-thread)]">
            From early users
          </p>
          <h2 className="display mt-3 text-4xl font-semibold md:text-5xl">
            People we&apos;re building for.
          </h2>
        </header>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {QUOTES.map((q) => (
            <figure
              key={q.name}
              className="card-lift rounded-xl border border-[color:var(--color-mist)] bg-[color:var(--color-paper-warm)] p-6"
            >
              <span aria-hidden className="display block text-4xl leading-none text-[color:var(--color-thread)]">
                &ldquo;
              </span>
              <blockquote
                className="mt-2 text-sm leading-relaxed text-[color:var(--color-ink)]"
                dangerouslySetInnerHTML={{ __html: q.quote }}
              />
              <figcaption className="mt-5 border-t border-[color:var(--color-mist)] pt-4">
                <p className="text-sm font-semibold">{q.name}</p>
                <p className="mono mt-0.5 text-[0.65rem] uppercase tracking-wider text-[color:var(--color-ink-soft)]">
                  {q.role}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

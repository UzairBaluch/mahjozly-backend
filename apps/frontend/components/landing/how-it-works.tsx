import { CalendarCheck, Video, Brain } from 'lucide-react';

const STEPS = [
  {
    n: '01',
    title: 'Clients book a session',
    body: 'Share a link, your booker picks a date, picks a slot. Google Calendar conflicts auto-detected. Reminders + confirmation emails fire automatically.',
    icon: CalendarCheck,
    visual: <StepCalendar />,
  },
  {
    n: '02',
    title: 'You meet — on us',
    body: 'Built-in video room (or any external link if you prefer). The call is recorded with consent. No more juggling Zoom links + note-taking apps mid-conversation.',
    icon: Video,
    visual: <StepVideo />,
  },
  {
    n: '03',
    title: 'AI remembers everything',
    body: 'The recording is transcribed, summarized, and stitched into your client\'s timeline. Next session, you walk in already briefed.',
    icon: Brain,
    visual: <StepBrief />,
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <header className="mx-auto max-w-2xl text-center">
          <p className="mono text-xs uppercase tracking-widest text-[color:var(--color-thread)]">How it works</p>
          <h2 className="display mt-3 text-4xl font-semibold md:text-5xl">
            Three steps. One continuous thread.
          </h2>
          <p className="mt-4 text-[color:var(--color-ink-soft)]">
            From booking link to next-session brief — the whole loop lives in one place.
          </p>
        </header>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {STEPS.map((s) => (
            <article
              key={s.n}
              className="card-lift relative rounded-xl border border-[color:var(--color-mist)] bg-[color:var(--color-paper)] p-6"
            >
              <div className="flex items-center gap-3">
                <span className="mono text-xs font-medium uppercase tracking-wider text-[color:var(--color-ink-soft)]">
                  {s.n}
                </span>
                <span className="h-px flex-1 bg-[color:var(--color-mist)]" />
                <s.icon size={18} className="text-[color:var(--color-thread)]" />
              </div>
              <h3 className="display mt-5 text-2xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-ink-soft)]">{s.body}</p>
              <div className="mt-6">{s.visual}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCalendar() {
  return (
    <div className="rounded-md border border-[color:var(--color-mist)] bg-[color:var(--color-paper-warm)] p-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="mono text-[0.65rem] uppercase tracking-wider text-[color:var(--color-ink-soft)]">
          June 2026
        </span>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-[0.65rem]">
        {Array.from({ length: 21 }).map((_, i) => {
          const isHighlighted = i === 12;
          const isBusy = [3, 7, 14, 18].includes(i);
          return (
            <div
              key={i}
              className={
                'mono aspect-square rounded-sm leading-[1.6rem] ' +
                (isHighlighted
                  ? 'bg-[color:var(--color-thread)] text-[color:var(--color-paper)] font-medium'
                  : isBusy
                  ? 'bg-[color:var(--color-mist)] text-[color:var(--color-ink-soft)]/60 line-through'
                  : 'text-[color:var(--color-ink-soft)] hover:bg-[color:var(--color-mist)]')
              }
            >
              {i + 1}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StepVideo() {
  return (
    <div className="overflow-hidden rounded-md border border-[color:var(--color-mist)] bg-[color:var(--color-ink)] p-2">
      <div className="grid grid-cols-2 gap-2">
        <div className="aspect-video rounded-sm bg-gradient-to-br from-[color:var(--color-thread)] to-[color:var(--color-ink-soft)]" />
        <div className="aspect-video rounded-sm bg-gradient-to-br from-[color:var(--color-clay)] to-[color:var(--color-dusk)]" />
      </div>
      <div className="mt-2 flex items-center justify-between text-[0.65rem]">
        <span className="mono flex items-center gap-1 text-[color:var(--color-paper)]/80">
          <span className="size-1.5 rounded-full bg-red-500 anim-pulse-soft" /> REC 23:14
        </span>
        <span className="mono text-[color:var(--color-paper)]/60">Transcribing…</span>
      </div>
    </div>
  );
}

function StepBrief() {
  return (
    <div className="rounded-md border border-[color:var(--color-mist)] bg-[color:var(--color-paper-warm)] p-4">
      <p className="mono text-[0.65rem] uppercase tracking-wider text-[color:var(--color-ink-soft)]">
        AI · Next-session brief
      </p>
      <p className="ai mt-2 text-sm italic leading-relaxed">
        &ldquo;Wants more practice problems. Open with last week&apos;s pacing recap.&rdquo;
      </p>
      <ul className="ai mt-3 space-y-1 text-xs">
        <li>· Review homework on integrals</li>
        <li>· Cover exam strategies for week 3</li>
      </ul>
    </div>
  );
}

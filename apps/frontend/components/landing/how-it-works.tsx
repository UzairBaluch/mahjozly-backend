'use client';

import { useCallback, useEffect, useState } from 'react';
import { Brain, CalendarCheck, Check, Mail, Video } from 'lucide-react';
import { cn } from '@/lib/utils';

const STEPS = [
  {
    n: '01',
    title: 'Clients book a session',
    body: 'Share a link, your booker picks a date, picks a slot. Google Calendar conflicts auto-detected. Reminders + confirmation emails fire automatically.',
    icon: CalendarCheck,
  },
  {
    n: '02',
    title: 'You meet — on us',
    body: 'Built-in video room (or any external link if you prefer). The call is recorded with consent. No more juggling Zoom links + note-taking apps mid-conversation.',
    icon: Video,
  },
  {
    n: '03',
    title: 'AI remembers everything',
    body: "The recording is transcribed, summarized, and stitched into your client's timeline. Next session, you walk in already briefed.",
    icon: Brain,
  },
] as const;

const BUSY_DAYS = new Set([3, 7, 14, 18]);
const SLOTS = ['09:00', '10:30', '14:00', '15:30'];

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  const selectStep = useCallback((index: number) => {
    setActiveStep(index);
  }, []);

  return (
    <section id="how" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <header className="mx-auto max-w-2xl text-center">
          <p className="mono text-xs uppercase tracking-widest text-[color:var(--color-thread)]">
            How it works
          </p>
          <h2 className="display mt-3 text-4xl font-semibold md:text-5xl">
            Three steps. One continuous thread.
          </h2>
          <p className="mt-4 text-[color:var(--color-ink-soft)]">
            From booking link to next-session brief — the whole loop lives in one place.
          </p>

          <StepProgress active={activeStep} onSelect={selectStep} />
        </header>

        <div className="relative mt-16">
          <ThreadConnector active={activeStep} />

          <div className="relative grid gap-8 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <StepCard
                key={s.n}
                step={s}
                isActive={activeStep === i}
                onSelect={() => selectStep(i)}
              >
                {i === 0 ? (
                  <StepCalendarDemo isActive={activeStep === 0} />
                ) : i === 1 ? (
                  <StepVideoDemo isActive={activeStep === 1} />
                ) : (
                  <StepBriefDemo isActive={activeStep === 2} />
                )}
              </StepCard>
            ))}
          </div>

          <p className="mono mt-8 text-center text-[0.65rem] uppercase tracking-wider text-[color:var(--color-ink-soft)]/70">
            Click a step to preview the demo
          </p>
        </div>
      </div>
    </section>
  );
}

function StepProgress({
  active,
  onSelect,
}: {
  active: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-[color:var(--color-mist)] bg-[color:var(--color-paper)] p-1 shadow-xs">
      {STEPS.map((s, i) => (
        <button
          key={s.n}
          type="button"
          onClick={() => onSelect(i)}
          className={cn(
            'mono rounded-full px-3 py-1.5 text-[0.65rem] uppercase tracking-wider transition-colors',
            active === i
              ? 'bg-[color:var(--color-thread)] text-white shadow-sm'
              : 'text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-ink)]',
          )}
          aria-pressed={active === i}
        >
          {s.n}
        </button>
      ))}
    </div>
  );
}

function ThreadConnector({ active }: { active: number }) {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-[4.5rem] hidden md:block"
      aria-hidden
    >
      <div className="mx-auto flex max-w-4xl items-center justify-between px-16">
        {[0, 1].map((i) => (
          <div key={i} className="relative h-px flex-1">
            <div className="absolute inset-0 bg-[color:var(--color-mist)]" />
            <div
              className="absolute inset-y-0 left-0 bg-[color:var(--color-thread)] transition-all duration-700 ease-out"
              style={{ width: active > i ? '100%' : '0%' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function StepCard({
  step,
  isActive,
  onSelect,
  children,
}: {
  step: (typeof STEPS)[number];
  isActive: boolean;
  onSelect: () => void;
  children: React.ReactNode;
}) {
  return (
    <article
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
      className={cn(
        'card-lift relative flex min-h-[540px] cursor-pointer flex-col rounded-xl border bg-[color:var(--color-paper)] p-6 text-left transition-colors duration-300',
        isActive
          ? 'border-[color:var(--color-thread)] shadow-md ring-1 ring-[color:var(--color-thread)]/30'
          : 'border-[color:var(--color-mist)] opacity-90 hover:opacity-100',
      )}
      aria-current={isActive ? 'step' : undefined}
    >
      <div className="flex items-center gap-3">
        <span
          className={cn(
            'mono text-xs font-medium uppercase tracking-wider transition-colors',
            isActive ? 'text-[color:var(--color-thread)]' : 'text-[color:var(--color-ink-soft)]',
          )}
        >
          {step.n}
        </span>
        <span className="h-px flex-1 bg-[color:var(--color-mist)]" />
        <step.icon
          size={18}
          className={cn(
            'transition-colors',
            isActive ? 'text-[color:var(--color-thread)]' : 'text-[color:var(--color-ink-soft)]',
          )}
        />
      </div>
      <h3 className="display mt-5 text-2xl font-semibold">{step.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-ink-soft)]">{step.body}</p>
      <div
        className="mt-6 min-h-[220px]"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        {children}
      </div>
      {isActive ? (
        <span className="mono absolute -top-2.5 right-4 rounded-full bg-[color:var(--color-thread)] px-2 py-0.5 text-[0.55rem] uppercase tracking-wider text-white">
          Live demo
        </span>
      ) : null}
    </article>
  );
}

function StepCalendarDemo({ isActive }: { isActive: boolean }) {
  const [phase, setPhase] = useState<'idle' | 'date' | 'slot' | 'booked'>('idle');
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [conflictDay, setConflictDay] = useState<number | null>(null);
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    if (!isActive) return;
    let cancelled = false;
    const loop = async () => {
      while (!cancelled && isActive) {
        setPhase('idle');
        setSelectedDate(null);
        setSelectedSlot(null);
        setEmailSent(false);
        await wait(700);
        setPhase('date');
        setSelectedDate(12);
        await wait(800);
        setPhase('slot');
        await wait(600);
        setSelectedSlot('10:30');
        await wait(500);
        setPhase('booked');
        setEmailSent(true);
        await wait(2400);
      }
    };
    loop();
    return () => {
      cancelled = true;
    };
  }, [isActive]);

  const pickDate = (day: number) => {
    if (BUSY_DAYS.has(day)) {
      setConflictDay(day);
      window.setTimeout(() => setConflictDay(null), 1200);
      return;
    }
    setSelectedDate(day);
    setSelectedSlot(null);
    setPhase('slot');
    setEmailSent(false);
  };

  const pickSlot = (slot: string) => {
    setSelectedSlot(slot);
    setPhase('booked');
    setEmailSent(true);
  };

  return (
    <div className="rounded-md border border-[color:var(--color-mist)] bg-[color:var(--color-paper-warm)] p-3">
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="mono text-[0.65rem] uppercase tracking-wider text-[color:var(--color-ink-soft)]">
          June 2026
        </span>
        <span className="mono text-[0.6rem] uppercase tracking-wider text-[color:var(--color-thread)]">
          {phase === 'booked' ? 'Booked ✓' : phase === 'slot' ? 'Pick a time' : 'Pick a date'}
        </span>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-[0.65rem]">
        {Array.from({ length: 21 }).map((_, i) => {
          const day = i + 1;
          const isBusy = BUSY_DAYS.has(i);
          const isSelected = selectedDate === i;
          const isConflict = conflictDay === i;

          return (
            <button
              key={i}
              type="button"
              onClick={() => pickDate(i)}
              className={cn(
                'mono aspect-square rounded-sm leading-[1.6rem] transition-all',
                isSelected && 'bg-[color:var(--color-thread)] font-medium text-[color:var(--color-paper)]',
                !isSelected && isBusy && 'bg-[color:var(--color-mist)] text-[color:var(--color-ink-soft)]/60 line-through',
                !isSelected && !isBusy && 'text-[color:var(--color-ink-soft)] hover:bg-[color:var(--color-thread-soft)]',
                isConflict && 'ring-2 ring-red-400/60',
              )}
            >
              {day}
            </button>
          );
        })}
      </div>

      <div className="relative mt-3 h-[7.5rem] overflow-hidden border-t border-[color:var(--color-mist)] pt-3">
        <p
          className={cn(
            'mono absolute left-0 top-0 text-[0.6rem] uppercase tracking-wider text-red-500 transition-opacity',
            conflictDay !== null ? 'opacity-100' : 'opacity-0',
          )}
        >
          Busy · synced from Google Calendar
        </p>

        <p className="mono mb-2 text-[0.6rem] uppercase tracking-wider text-[color:var(--color-ink-soft)]">
          Available slots
        </p>
        <div className="flex flex-wrap gap-1.5">
          {SLOTS.map((slot) => (
            <button
              key={slot}
              type="button"
              onClick={() => pickSlot(slot)}
              className={cn(
                'mono rounded-md border px-2 py-1 text-[0.65rem] transition-colors',
                selectedSlot === slot
                  ? 'border-[color:var(--color-thread)] bg-[color:var(--color-thread-soft)] text-[color:var(--color-thread)]'
                  : 'border-[color:var(--color-mist)] text-[color:var(--color-ink-soft)] hover:border-[color:var(--color-thread)]/40',
                (phase === 'idle' || phase === 'date') && 'opacity-40',
              )}
            >
              {slot}
            </button>
          ))}
        </div>

        <div
          className={cn(
            'mt-3 flex items-center gap-2 rounded-md border border-[color:var(--color-thread)]/30 bg-[color:var(--color-thread-soft)]/50 px-2 py-1.5 text-[0.65rem] text-[color:var(--color-thread)] transition-opacity',
            emailSent ? 'opacity-100' : 'opacity-0',
          )}
        >
          <Mail size={12} />
          <span className="mono uppercase tracking-wider">Confirmation email sent</span>
          <Check size={12} className="ml-auto" />
        </div>
      </div>
    </div>
  );
}

function StepVideoDemo({ isActive }: { isActive: boolean }) {
  const [phase, setPhase] = useState<'waiting' | 'recording' | 'transcribing'>('waiting');
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    let cancelled = false;
    const loop = async () => {
      while (!cancelled) {
        setPhase('waiting');
        setSeconds(0);
        await wait(900);
        if (cancelled) return;
        setPhase('recording');
        for (let s = 0; s <= 23; s++) {
          if (cancelled) return;
          setSeconds(s);
          await wait(120);
        }
        if (cancelled) return;
        setPhase('transcribing');
        await wait(2400);
      }
    };
    loop();
    return () => {
      cancelled = true;
    };
  }, [isActive]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');

  return (
    <div className="overflow-hidden rounded-md border border-[color:var(--color-mist)] bg-[color:var(--color-ink)] p-2">
      <button
        type="button"
        className={cn(
          'relative w-full overflow-hidden rounded-sm transition-opacity',
          phase === 'waiting' && 'opacity-80',
        )}
        onClick={() => {
          if (phase === 'waiting') {
            setPhase('recording');
          }
        }}
      >
        <div className="grid grid-cols-2 gap-2">
          <div
            className="aspect-video rounded-sm bg-gradient-to-br from-[color:var(--color-thread)] to-[color:var(--color-ink-soft)]"
          />
          <div className="aspect-video rounded-sm bg-gradient-to-br from-[color:var(--color-clay)] to-[color:var(--color-dusk)]" />
        </div>
        {phase === 'waiting' ? (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="rounded-full bg-black/50 px-3 py-1 text-[0.65rem] text-white backdrop-blur">
              Click to join call
            </span>
          </span>
        ) : null}
      </button>

      <div className="mt-2 flex items-center justify-between text-[0.65rem]">
        <span className="mono flex items-center gap-1 text-[color:var(--color-paper)]/80">
          {phase === 'recording' ? (
            <>
              <span className="size-1.5 rounded-full bg-red-500 anim-pulse-soft" />
              REC {mm}:{ss}
            </>
          ) : phase === 'transcribing' ? (
            <>
              <span className="size-1.5 rounded-full bg-[color:var(--color-dusk)] anim-pulse-soft" />
              Processing audio
            </>
          ) : (
            <span className="text-[color:var(--color-paper)]/50">Waiting for host…</span>
          )}
        </span>
        <span
          className={cn(
            'mono transition-colors',
            phase === 'transcribing'
              ? 'text-[color:var(--color-dusk)]'
              : 'text-[color:var(--color-paper)]/60',
          )}
        >
          {phase === 'transcribing' ? (
            <>
              Transcribing<span className="anim-blink">…</span>
            </>
          ) : (
            'Consent on file'
          )}
        </span>
      </div>
    </div>
  );
}

const BRIEF_QUOTE =
  'Wants more practice problems. Open with last week\'s pacing recap.';
const BRIEF_ITEMS = ['Review homework on integrals', 'Cover exam strategies for week 3'];

function StepBriefDemo({ isActive }: { isActive: boolean }) {
  const [phase, setPhase] = useState<'idle' | 'typing' | 'items' | 'done'>('idle');
  const [typed, setTyped] = useState('');
  const [visibleItems, setVisibleItems] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    let cancelled = false;
    const loop = async () => {
      while (!cancelled) {
        setPhase('idle');
        setTyped('');
        setVisibleItems(0);
        await wait(500);
        if (cancelled) return;
        setPhase('typing');
        for (let i = 1; i <= BRIEF_QUOTE.length; i++) {
          if (cancelled) return;
          setTyped(BRIEF_QUOTE.slice(0, i));
          await wait(16);
        }
        if (cancelled) return;
        setPhase('items');
        for (let i = 1; i <= BRIEF_ITEMS.length; i++) {
          if (cancelled) return;
          setVisibleItems(i);
          await wait(400);
        }
        if (cancelled) return;
        setPhase('done');
        await wait(2400);
      }
    };
    loop();
    return () => {
      cancelled = true;
    };
  }, [isActive]);

  return (
    <div className="rounded-md border border-[color:var(--color-mist)] bg-[color:var(--color-paper-warm)] p-4">
      <div className="flex items-center justify-between gap-2">
        <p className="mono text-[0.65rem] uppercase tracking-wider text-[color:var(--color-ink-soft)]">
          AI · Next-session brief
        </p>
        <span className="mono text-[0.6rem] uppercase tracking-wider text-[color:var(--color-dusk)]">
          {phase === 'idle' && 'Queued'}
          {phase === 'typing' && (
            <>
              <span className="anim-pulse-soft">●</span> Writing
            </>
          )}
          {phase === 'items' && 'Extracting actions'}
          {phase === 'done' && 'Saved to thread'}
        </span>
      </div>

      <p className="ai mt-2 h-[3.5rem] overflow-hidden text-sm italic leading-relaxed">
        {typed ? (
          <>
            &ldquo;{typed}
            {phase === 'typing' ? (
              <span className="anim-blink ml-0.5 inline-block h-3 w-[2px] translate-y-[1px] bg-[color:var(--color-dusk)] align-middle" />
            ) : null}
            &rdquo;
          </>
        ) : (
          <span className="opacity-40">Generating brief from last session…</span>
        )}
      </p>

      <ul className="ai mt-3 h-[2.5rem] space-y-1 overflow-hidden text-xs">
        {BRIEF_ITEMS.map((item, i) => (
          <li
            key={item}
            className="transition-opacity duration-300"
            style={{ opacity: i < visibleItems ? 1 : 0 }}
          >
            · {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function wait(ms: number) {
  return new Promise<void>((r) => window.setTimeout(r, ms));
}

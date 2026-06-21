'use client';

import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { DemoStage } from './demo-stage';

const SUMMARY = [
  'Discussed pacing in last session.',
  'Wants more practice problems before next exam.',
  'Open next call with a 5-minute warm-up review.',
];

const ACTION_ITEMS = [
  'Send practice set on integrals',
  'Prep recap of week 2 + 3',
  'Schedule mock exam for next Thursday',
];

export function FeatureAiNotesDemo() {
  const [phase, setPhase] = useState<'transcribing' | 'writing' | 'done'>('transcribing');
  const [writtenLines, setWrittenLines] = useState<string[]>([]);
  const [partial, setPartial] = useState('');

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      while (!cancelled) {
        setPhase('transcribing');
        setWrittenLines([]);
        setPartial('');
        await wait(1400);
        if (cancelled) return;
        setPhase('writing');

        for (const line of SUMMARY) {
          if (cancelled) return;
          for (let i = 1; i <= line.length; i++) {
            if (cancelled) return;
            setPartial(line.slice(0, i));
            await wait(18);
          }
          setWrittenLines((prev) => [...prev, line]);
          setPartial('');
          await wait(280);
        }
        if (cancelled) return;
        setPhase('done');
        await wait(2600);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <DemoStage height={300}>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles size={14} className="text-[color:var(--color-dusk)]" />
          <span className="mono text-[0.65rem] uppercase tracking-wider text-[color:var(--color-ink-soft)]">
            AI · Session summary
          </span>
        </div>
        <span className="mono text-[0.65rem] uppercase tracking-wider text-[color:var(--color-dusk)]">
          {phase === 'transcribing' && (
            <>
              <span className="anim-pulse-soft">●</span> Transcribing 47:12
            </>
          )}
          {phase === 'writing' && (
            <>
              <span className="anim-pulse-soft">●</span> Writing brief
            </>
          )}
          {phase === 'done' && 'Saved to client thread'}
        </span>
      </div>

      <div className="h-[8.5rem] overflow-hidden">
        <div className="space-y-2">
          {writtenLines.map((line, i) => (
            <p key={i} className="ai text-sm leading-relaxed italic">
              {line}
            </p>
          ))}
          {partial ? (
            <p className="ai text-sm leading-relaxed italic">
              {partial}
              <span className="anim-blink ml-0.5 inline-block h-3 w-[2px] translate-y-[1px] bg-[color:var(--color-dusk)] align-middle" />
            </p>
          ) : null}
          {phase === 'transcribing' ? (
            <p className="ai text-sm italic opacity-50">Listening…</p>
          ) : null}
        </div>
      </div>

      <div className="absolute inset-x-5 bottom-5 border-t border-[color:var(--color-mist)] pt-4">
        <p className="mono text-[0.65rem] uppercase tracking-wider text-[color:var(--color-ink-soft)]">
          Action items
        </p>
        <ul className="ai mt-2 h-[3.5rem] space-y-1 overflow-hidden text-xs">
          {ACTION_ITEMS.map((a) => (
            <li
              key={a}
              className="transition-opacity duration-300"
              style={{ opacity: phase === 'done' ? 1 : 0.15 }}
            >
              · {a}
            </li>
          ))}
        </ul>
      </div>
    </DemoStage>
  );
}

function wait(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

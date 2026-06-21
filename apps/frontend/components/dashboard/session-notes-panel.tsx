'use client';

import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type Props = {
  hasExistingNotes?: boolean;
};

export function SessionNotesPanel({ hasExistingNotes }: Props) {
  const [notes, setNotes] = useState('');
  const [phase, setPhase] = useState<'idle' | 'submitting' | 'processing' | 'done'>(
    hasExistingNotes ? 'done' : 'idle',
  );

  const submit = async () => {
    if (!notes.trim()) return;
    setPhase('submitting');
    await wait(600);
    setPhase('processing');
    await wait(1800);
    setPhase('done');
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-[color:var(--color-dusk)]" />
          <CardTitle>Session notes</CardTitle>
        </div>
        <CardDescription>
          Paste raw notes or a transcript. AI generates a summary, action items, and next-session brief.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {phase === 'done' ? (
          <div className="space-y-4">
            <div className="rounded-lg border border-[color:var(--color-dusk)]/20 bg-[color:var(--color-dusk-soft)]/50 p-4">
              <p className="mono text-[0.65rem] uppercase tracking-wider text-[color:var(--color-dusk)]">
                AI summary
              </p>
              <p className="ai mt-2 text-sm italic leading-relaxed">
                Discussed pacing again. Client wants more practice problems before the next exam. Suggest opening
                with a 5-minute warm-up review.
              </p>
            </div>
            <div>
              <p className="mono text-[0.65rem] uppercase tracking-wider text-[color:var(--color-ink-soft)]">
                Action items
              </p>
              <ul className="ai mt-2 space-y-1 text-sm">
                <li>· Review homework on integrals</li>
                <li>· Cover exam strategies for week 3</li>
              </ul>
            </div>
            <Button type="button" variant="outline" size="sm" onClick={() => setPhase('idle')}>
              Add more notes
            </Button>
          </div>
        ) : (
          <>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={6}
              placeholder="Paste session notes, bullet points, or a transcript…"
              className="w-full resize-none rounded-lg border border-[color:var(--color-mist)] bg-[color:var(--color-paper-warm)] px-3 py-2 text-sm outline-none focus:border-[color:var(--color-thread)]"
              disabled={phase !== 'idle'}
            />
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs text-[color:var(--color-ink-soft)]">
                {phase === 'submitting' && 'Saving notes…'}
                {phase === 'processing' && (
                  <span className="text-[color:var(--color-dusk)]">
                    <span className="anim-pulse-soft">●</span> AI processing queued
                  </span>
                )}
                {phase === 'idle' && 'Queued to worker · typically under 30s'}
              </p>
              <Button
                type="button"
                variant="accent"
                size="sm"
                onClick={submit}
                disabled={!notes.trim() || phase !== 'idle'}
              >
                Generate AI brief
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

function wait(ms: number) {
  return new Promise<void>((r) => window.setTimeout(r, ms));
}

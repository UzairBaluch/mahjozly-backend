import { Thread } from '@/components/thread';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TIMELINE: Record<string, { nodes: { label: string; note?: string }[]; brief: string }> = {
  aisha: {
    nodes: [
      { label: '1st', note: 'New client · pacing-focused' },
      { label: '2nd', note: 'Wants morning slots' },
      { label: '3rd' },
      { label: '4th', note: 'Ready for next level' },
    ],
    brief:
      'Discussed pacing again last session. Wants more practice problems before next exam. Suggest opening with a 5-minute warm-up.',
  },
};

export default async function ClientTimelinePage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = await params;
  const data = TIMELINE[clientId] ?? {
    nodes: [{ label: '1st' }],
    brief: 'No AI brief yet — record or transcribe a session to start the thread.',
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="display text-3xl capitalize">{clientId}</h1>
        <p className="mono text-xs uppercase tracking-wide text-[color:var(--color-ink)]/60">
          Client · {data.nodes.length} sessions
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>The thread</CardTitle>
        </CardHeader>
        <CardContent>
          <Thread nodes={data.nodes} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Latest AI brief</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="ai italic leading-relaxed">{data.brief}</p>
        </CardContent>
      </Card>
    </div>
  );
}

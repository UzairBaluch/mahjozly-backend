import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Calendar,
  Clock,
  ExternalLink,
  MapPin,
  Sparkles,
  User,
  Video,
} from 'lucide-react';
import { ClientAvatar } from '@/components/dashboard/client-avatar';
import { PageHeader } from '@/components/dashboard/page-header';
import { SessionNotesPanel } from '@/components/dashboard/session-notes-panel';
import { StatusBadge } from '@/components/dashboard/status-badge';
import { Thread } from '@/components/thread';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BOOKINGS, getBooking, getClient } from '@/lib/dashboard-data';

export default async function BookingDetailPage({
  params,
}: {
  params: Promise<{ bookingId: string }>;
}) {
  const { bookingId } = await params;
  const booking = getBooking(bookingId);
  if (!booking) notFound();

  const client = getClient(booking.clientId);
  const clientIndex = BOOKINGS.findIndex((b) => b.clientId === booking.clientId);

  return (
    <div className="space-y-8">
      <PageHeader
        title={booking.service}
        description={`${booking.client} · ${booking.whenLabel}`}
        meta={`Booking ${booking.id.toUpperCase()}`}
        actions={
          <>
            {booking.videoUrl ? (
              <Button asChild variant="accent">
                <Link href={booking.videoUrl} target="_blank">
                  <Video size={14} />
                  Join video room
                </Link>
              </Button>
            ) : null}
            <Button asChild variant="outline">
              <Link href={`/dashboard/clients/${booking.clientId}`}>Client thread</Link>
            </Button>
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Booking details</CardTitle>
              <CardDescription>Status, location, and quick actions</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <Detail icon={User} label="Client" value={booking.client} />
              <Detail icon={Calendar} label="When" value={booking.whenLabel} />
              <Detail icon={Clock} label="Duration" value={`${booking.duration} minutes`} />
              <Detail icon={MapPin} label="Location" value={booking.location.replace('_', ' ')} />
              <div className="sm:col-span-2 flex flex-wrap items-center gap-3 border-t border-[color:var(--color-mist)] pt-4">
                <StatusBadge status={booking.status} />
                <span className="mono text-sm">
                  {booking.price === 0 ? 'Free' : `$${booking.price}`}
                </span>
                {booking.status === 'PENDING' ? (
                  <Button size="sm" variant="outline">
                    Send reminder
                  </Button>
                ) : null}
                {booking.status === 'CONFIRMED' ? (
                  <Button size="sm" variant="outline">
                    Reschedule
                  </Button>
                ) : null}
              </div>
            </CardContent>
          </Card>

          <SessionNotesPanel hasExistingNotes={booking.hasNotes} />
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <ClientAvatar name={booking.client} index={clientIndex} />
                <div>
                  <CardTitle className="text-base">{booking.client}</CardTitle>
                  <CardDescription>{client?.email ?? 'client@example.com'}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {client?.tags.map((tag) => (
                <span
                  key={tag}
                  className="mono mr-2 inline-block rounded-full bg-[color:var(--color-paper-warm)] px-2 py-0.5 text-[0.6rem] uppercase tracking-wider text-[color:var(--color-ink-soft)]"
                >
                  {tag}
                </span>
              ))}
              <p className="text-sm text-[color:var(--color-ink-soft)]">
                {client?.sessions ?? 0} sessions total
              </p>
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link href={`/dashboard/clients/${booking.clientId}`}>
                  <ExternalLink size={14} />
                  Open client timeline
                </Link>
              </Button>
            </CardContent>
          </Card>

          {client ? (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Sparkles size={14} className="text-[color:var(--color-dusk)]" />
                  <CardTitle className="text-base">Client thread</CardTitle>
                </div>
                <CardDescription>Context before this session</CardDescription>
              </CardHeader>
              <CardContent>
                <Thread nodes={client.thread} compact />
                <p className="ai mt-4 text-sm italic leading-relaxed">&ldquo;{client.brief}&rdquo;</p>
              </CardContent>
            </Card>
          ) : null}

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Reminders</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-[color:var(--color-ink-soft)]">
              <p>✓ Email · 24h before</p>
              <p>✓ SMS · 2h before</p>
              <p className="text-xs">Personalized prep reminder includes AI brief snippet.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Detail({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon size={16} className="mt-0.5 text-[color:var(--color-ink-soft)]" />
      <div>
        <p className="mono text-[0.6rem] uppercase tracking-wider text-[color:var(--color-ink-soft)]">
          {label}
        </p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}

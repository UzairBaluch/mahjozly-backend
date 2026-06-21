import type { BookingStatus } from '@mahjozly/shared';
import type { ThreadNode } from '@/components/thread';

export type DashboardClient = {
  id: string;
  name: string;
  email: string;
  tags: string[];
  sessions: number;
  lastSeen: string;
  nextSession?: string;
  thread: ThreadNode[];
  brief: string;
  actionItems: string[];
};

export type DashboardBooking = {
  id: string;
  clientId: string;
  client: string;
  service: string;
  serviceSlug: string;
  date: string;
  time: string;
  whenLabel: string;
  duration: number;
  status: BookingStatus;
  location: 'DAILY_VIDEO' | 'GOOGLE_MEET' | 'IN_PERSON' | 'PHONE';
  price: number;
  hasThread: boolean;
  hasNotes: boolean;
  videoUrl?: string;
};

export type EventType = {
  id: string;
  slug: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  location: string;
  recording: boolean;
  reminders: string[];
  active: boolean;
  bookingsThisMonth: number;
};

export type SessionRecord = {
  id: string;
  date: string;
  service: string;
  summary?: string;
  actionItems?: string[];
  status: 'COMPLETE' | 'PENDING' | 'PROCESSING' | 'FAILED';
};

export const ORG_PROFILE = {
  name: 'Lena Park Coaching',
  slug: 'lena-park',
  email: 'lena@example.com',
  timezone: 'America/New_York',
  bookingUrl: 'mahjozly.com/lena-park',
};

export const WEEK_STATS = {
  sessionsBooked: 14,
  confirmed: 12,
  pending: 2,
  cancelled: 0,
  revenue: 1840,
  aiSummaries: 11,
  utilization: 78,
};

export const CLIENTS: DashboardClient[] = [
  {
    id: 'aisha',
    name: 'Aisha Khan',
    email: 'aisha@example.com',
    tags: ['coaching', 'exam-prep'],
    sessions: 12,
    lastSeen: '12 Jun',
    nextSession: 'Today · 09:00',
    thread: [
      { label: '1st', note: 'Goals + history' },
      { label: '4th', note: 'Wants morning slots' },
      { label: '8th' },
      { label: '10th', note: 'Hit first milestone' },
      { label: '12th', note: 'Ready for next level' },
    ],
    brief:
      'Discussed pacing again last session. Wants more practice problems before next exam. Open with a 5-minute warm-up review.',
    actionItems: ['Review homework on integrals', 'Cover exam strategies for week 3'],
  },
  {
    id: 'marcus',
    name: 'Marcus Lin',
    email: 'marcus@example.com',
    tags: ['discovery'],
    sessions: 1,
    lastSeen: '21 Jun',
    nextSession: 'Today · 10:30',
    thread: [{ label: '1st', note: 'Exploring career pivot' }],
    brief: 'First session — intake complete. Interested in bi-weekly cadence starting July.',
    actionItems: ['Send onboarding questionnaire'],
  },
  {
    id: 'priya',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    tags: ['coaching', 'returning'],
    sessions: 7,
    lastSeen: '18 Jun',
    nextSession: 'Tomorrow · 11:00',
    thread: [
      { label: '1st', note: 'Leadership goals' },
      { label: '3rd', note: 'Delegation focus' },
      { label: '5th' },
      { label: '7th', note: 'Promoted to lead' },
    ],
    brief: 'Celebrated promotion last call. Wants to practice difficult 1:1 conversations with new reports.',
    actionItems: ['Role-play scenario prep', 'Share feedback framework doc'],
  },
  {
    id: 'omar',
    name: 'Omar Reyes',
    email: 'omar@atlastutoring.com',
    tags: ['tutoring', 'org'],
    sessions: 4,
    lastSeen: '15 Jun',
    thread: [
      { label: '1st', note: 'Parent onboarding' },
      { label: '2nd', note: 'Retention focus' },
      { label: '4th' },
    ],
    brief: 'Atlas Tutoring pilot — wants shared timelines for parents. Follow up on multi-seat pricing.',
    actionItems: ['Send Team plan overview'],
  },
];

export const BOOKINGS: DashboardBooking[] = [
  {
    id: 'b1',
    clientId: 'aisha',
    client: 'Aisha Khan',
    service: 'Coaching · 60m',
    serviceSlug: 'coaching',
    date: '2026-06-21',
    time: '09:00',
    whenLabel: 'Today · 09:00',
    duration: 60,
    status: 'CONFIRMED',
    location: 'DAILY_VIDEO',
    price: 120,
    hasThread: true,
    hasNotes: true,
    videoUrl: 'https://mahjozly.daily.co/aisha-21jun',
  },
  {
    id: 'b2',
    clientId: 'marcus',
    client: 'Marcus Lin',
    service: 'Discovery · 30m',
    serviceSlug: 'discovery',
    date: '2026-06-21',
    time: '10:30',
    whenLabel: 'Today · 10:30',
    duration: 30,
    status: 'CONFIRMED',
    location: 'DAILY_VIDEO',
    price: 0,
    hasThread: false,
    hasNotes: false,
    videoUrl: 'https://mahjozly.daily.co/marcus-21jun',
  },
  {
    id: 'b3',
    clientId: 'priya',
    client: 'Priya Sharma',
    service: 'Coaching · 60m',
    serviceSlug: 'coaching',
    date: '2026-06-22',
    time: '11:00',
    whenLabel: 'Tomorrow · 11:00',
    duration: 60,
    status: 'PENDING',
    location: 'GOOGLE_MEET',
    price: 120,
    hasThread: true,
    hasNotes: true,
  },
  {
    id: 'b4',
    clientId: 'aisha',
    client: 'Aisha Khan',
    service: 'Coaching · 60m',
    serviceSlug: 'coaching',
    date: '2026-06-18',
    time: '14:00',
    whenLabel: 'Wed 18 Jun · 14:00',
    duration: 60,
    status: 'COMPLETED',
    location: 'DAILY_VIDEO',
    price: 120,
    hasThread: true,
    hasNotes: true,
  },
  {
    id: 'b5',
    clientId: 'omar',
    client: 'Omar Reyes',
    service: 'Strategy · 45m',
    serviceSlug: 'strategy',
    date: '2026-06-25',
    time: '16:00',
    whenLabel: 'Wed 25 Jun · 16:00',
    duration: 45,
    status: 'CONFIRMED',
    location: 'PHONE',
    price: 95,
    hasThread: true,
    hasNotes: false,
  },
];

export const EVENT_TYPES: EventType[] = [
  {
    id: 'et1',
    slug: 'discovery',
    name: 'Discovery call',
    description: 'Free intro for new clients. No recording by default.',
    duration: 30,
    price: 0,
    location: 'Daily video',
    recording: false,
    reminders: ['Email · 24h', 'Email · 1h'],
    active: true,
    bookingsThisMonth: 6,
  },
  {
    id: 'et2',
    slug: 'coaching',
    name: 'Coaching session',
    description: 'Standard 1:1. Auto-record + AI summary enabled.',
    duration: 60,
    price: 120,
    location: 'Daily video',
    recording: true,
    reminders: ['Email · 24h', 'SMS · 2h'],
    active: true,
    bookingsThisMonth: 18,
  },
  {
    id: 'et3',
    slug: 'strategy',
    name: 'Strategy intensive',
    description: 'Shorter working session for teams and org leads.',
    duration: 45,
    price: 95,
    location: 'Google Meet',
    recording: true,
    reminders: ['Email · 48h', 'Email · 2h'],
    active: true,
    bookingsThisMonth: 4,
  },
];

export const SESSION_HISTORY: Record<string, SessionRecord[]> = {
  aisha: [
    {
      id: 's12',
      date: '12 Jun 2026',
      service: 'Coaching · 60m',
      summary: 'Discussed pacing again. Wants more practice problems before next exam.',
      actionItems: ['Review homework on integrals', 'Cover exam strategies for week 3'],
      status: 'COMPLETE',
    },
    {
      id: 's10',
      date: '29 May 2026',
      service: 'Coaching · 60m',
      summary: 'Hit first milestone on practice tests. Confidence improving.',
      status: 'COMPLETE',
    },
    {
      id: 's8',
      date: '15 May 2026',
      service: 'Coaching · 60m',
      summary: 'Morning slots preferred. Adjusted recurring availability.',
      status: 'COMPLETE',
    },
  ],
  marcus: [],
  priya: [
    {
      id: 's7',
      date: '18 Jun 2026',
      service: 'Coaching · 60m',
      summary: 'Celebrated promotion. Focus on difficult 1:1 conversations.',
      actionItems: ['Role-play scenario prep'],
      status: 'COMPLETE',
    },
  ],
  omar: [
    {
      id: 's4',
      date: '15 Jun 2026',
      service: 'Strategy · 45m',
      status: 'PROCESSING',
    },
  ],
};

export const WEEKLY_HOURS: Record<string, [string, string] | null> = {
  Monday: ['09:00', '17:00'],
  Tuesday: ['09:00', '17:00'],
  Wednesday: ['09:00', '17:00'],
  Thursday: ['09:00', '17:00'],
  Friday: ['09:00', '15:00'],
  Saturday: null,
  Sunday: null,
};

export const DATE_OVERRIDES = [
  { date: '2026-07-04', label: 'Out of office', hours: null },
  { date: '2026-06-28', label: 'Half day', hours: ['09:00', '12:00'] as [string, string] },
];

export function getClient(id: string) {
  return CLIENTS.find((c) => c.id === id);
}

export function getBooking(id: string) {
  return BOOKINGS.find((b) => b.id === id);
}

export function getTodayBookings() {
  return BOOKINGS.filter((b) => b.whenLabel.startsWith('Today'));
}

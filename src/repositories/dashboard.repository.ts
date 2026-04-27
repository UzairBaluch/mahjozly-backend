import { BookingStatus } from '@prisma/client';
import { prisma } from '../lib/database.js';

const countBookingsByStatusesForOrg = async (orgId: string, statuses: BookingStatus[]) => {
  const rows = await prisma.booking.groupBy({
    by: ['status'],
    where: { orgId, deletedAt: null, status: { in: statuses } },
    _count: { _all: true },
  });
  return Object.fromEntries(rows.map((r) => [r.status, r._count._all])) as Partial<
    Record<BookingStatus, number>
  >;
};

const countUpcomingBookingsForOrg = async (orgId: string, from: Date, to: Date) => {
  return prisma.booking.count({
    where: {
      orgId,
      deletedAt: null,
      status: { in: [BookingStatus.PENDING, BookingStatus.CONFIRMED] },
      scheduledAt: { gte: from, lte: to },
    },
  });
};

export { countBookingsByStatusesForOrg, countUpcomingBookingsForOrg };

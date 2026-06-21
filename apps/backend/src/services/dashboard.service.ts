import { BookingStatus } from '@prisma/client';
import {
  countBookingsByStatusesForOrg,
  countUpcomingBookingsForOrg,
} from '../repositories/dashboard.repository.js';
import { findOrganizationByUserId } from '../repositories/business.repository.js';
import { ApiError } from '../utils/ApiError.js';
import { type DashboardOverviewQueryInput } from '../validations/dashboard.validation.js';

const getOrgDashboardOverview = async (userId: string, query: DashboardOverviewQueryInput) => {
  const org = await findOrganizationByUserId(userId);
  if (!org) {
    throw new ApiError(404, 'No Org found');
  }

  const from = query.from ? new Date(query.from) : new Date();
  const to = query.to ? new Date(query.to) : new Date(from.getTime() + 30 * 24 * 60 * 60 * 1000);
  if (from.getTime() >= to.getTime()) {
    throw new ApiError(400, 'Invalid window');
  }

  const statusCounts = await countBookingsByStatusesForOrg(org.id, [
    BookingStatus.PENDING,
    BookingStatus.CONFIRMED,
    BookingStatus.CANCELLED,
    BookingStatus.COMPLETED,
  ]);

  const upcoming = await countUpcomingBookingsForOrg(org.id, from, to);

  return {
    orgId: org.id,
    window: { from: from.toISOString(), to: to.toISOString() },
    bookingsByStatus: {
      PENDING: statusCounts[BookingStatus.PENDING] ?? 0,
      CONFIRMED: statusCounts[BookingStatus.CONFIRMED] ?? 0,
      CANCELLED: statusCounts[BookingStatus.CANCELLED] ?? 0,
      COMPLETED: statusCounts[BookingStatus.COMPLETED] ?? 0,
    },
    upcomingPendingOrConfirmedInWindow: upcoming,
  };
};

export { getOrgDashboardOverview };

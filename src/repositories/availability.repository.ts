import { prisma } from '../lib/database.js';

// Fetch one service row used by availability checks.
const findServiceByIdForAvailability = async (serviceId: string) => {
  return prisma.service.findFirst({
    where: { id: serviceId },
  });
};

// List bookings for one service in a half-open time window [from, to).
const findBookingsInRangeForService = async (serviceId: string, from: string, to: string) => {
  return prisma.booking.findMany({
    where: {
      serviceId,
      scheduledAt: {
        gte: new Date(from),
        lt: new Date(to),
      },
    },
  });
};

// List bookings at one exact slot timestamp for max-per-slot checks.
const findBookingsAtExactSlot = async (serviceId: string, slotAt: string) => {
  return prisma.booking.findMany({
    where: { serviceId, scheduledAt: { equals: new Date(slotAt) } },
  });
};

export { findServiceByIdForAvailability, findBookingsInRangeForService, findBookingsAtExactSlot };

import { BookingStatus, type Prisma } from '@prisma/client';
import { prisma } from '../lib/database.js';
import { type BookingListQueryInput } from '../validations/booking.validation.js';

// Service lookup for booking create — only active, non-soft-deleted rows are valid.
const findActiveServiceById = async (serviceId: string) => {
  return prisma.service.findFirst({
    where: { id: serviceId, isActive: true, deletedAt: null },
  });
};

// Addon lookup scoped by org — service compares count to reject invalid/cross-org addon ids.
const findActiveAddonsByOrgAndIds = async (orgId: string, addonIds: string[]) => {
  // Empty addon list is valid for booking create.
  if (addonIds.length === 0) {
    return [];
  } else
    return prisma.addon.findMany({
      where: { id: { in: addonIds }, orgId, isActive: true },
    });
};

// Slot occupancy count for `serviceId + scheduledAt` before create.
const countActiveBookingsForSlot = async (serviceId: string, scheduledAt: Date) => {
  return prisma.booking.count({
    // Cancelled bookings do not consume capacity.
    where: { serviceId, scheduledAt, status: { not: BookingStatus.CANCELLED }, deletedAt: null },
  });
};

// Atomic booking create with initial `PENDING` status log and optional addon rows.
const createBookingWithAddons = async (data: {
  userId: string;
  orgId: string;
  serviceId: string;
  scheduledAt: Date;
  totalPrice: number;
  notes?: string;
  addons: { addonId: string; quantity: number }[];
}) => {
  // Build one payload so related rows are created in the same operation.
  const bookingData: Prisma.BookingCreateInput = {
    user: { connect: { id: data.userId } },
    org: { connect: { id: data.orgId } },
    service: { connect: { id: data.serviceId } },
    scheduledAt: data.scheduledAt,
    totalPrice: data.totalPrice,
    ...(data.notes !== undefined ? { notes: data.notes } : {}),
    statusLog: { create: { status: BookingStatus.PENDING } },
    ...(data.addons.length > 0
      ? {
          addons: {
            create: data.addons.map((line) => ({
              addon: { connect: { id: line.addonId } },
              quantity: line.quantity,
            })),
          },
        }
      : {}),
  };

  // Include addon rows to avoid a follow-up query in the service/controller path.
  return prisma.booking.create({
    data: bookingData,
    include: { addons: true, service: true, org: true, user: true },
  });
};

// List bookings for one user — DB-only filters; caller passes already-validated query.
const findBookingsForUser = async (userId: string, query: BookingListQueryInput) => {
  return prisma.booking.findMany({
    where: {
      userId,
      deletedAt: null,
      ...(query.status ? { status: query.status } : {}),
      ...(query.cursor ? { id: { gt: query.cursor } } : {}),
      ...(query.from || query.to
        ? {
            scheduledAt: {
              ...(query.from ? { gte: new Date(query.from) } : {}),
              ...(query.to ? { lte: new Date(query.to) } : {}),
            },
          }
        : {}),
    },
    orderBy: { id: 'asc' },
    take: query.limit,
    include: { service: true, addons: true, org: true },
  });
};

// Org-scoped list — always filter by `orgId` + soft-delete marker.
const findBookingsForOrg = async (orgId: string, query: BookingListQueryInput) => {
  return prisma.booking.findMany({
    where: {
      orgId,
      deletedAt: null,
      ...(query.status ? { status: query.status } : {}),
      ...(query.cursor ? { id: { gt: query.cursor } } : {}),
      ...(query.from || query.to
        ? {
            scheduledAt: {
              ...(query.from ? { gte: new Date(query.from) } : {}),
              ...(query.to ? { lte: new Date(query.to) } : {}),
            },
          }
        : {}),
    },
    orderBy: { id: 'asc' },
    take: query.limit,
    include: { service: true, addons: true, user: true },
  });
};

const findBookingByIdForUser = async (bookingId: string, userId: string) => {
  return prisma.booking.findFirst({
    where: { id: bookingId, userId, deletedAt: null },
    include: { service: true, addons: true, org: true, statusLog: true },
  });
};

const findBookingByIdForOrg = async (bookingId: string, orgId: string) => {
  return prisma.booking.findFirst({
    where: { id: bookingId, orgId, deletedAt: null },
    include: { service: true, addons: true, user: true, statusLog: true },
  });
};

// Status change + audit log row must land together.
const updateBookingStatusWithLog = async (
  bookingId: string,
  orgId: string,
  nextStatus: BookingStatus,
) => {
  return prisma.$transaction(async (tx) => {
    const updated = await tx.booking.updateMany({
      where: { id: bookingId, orgId, deletedAt: null },
      data: { status: nextStatus },
    });
    if (updated.count === 0) {
      return { updatedCount: 0 as const };
    }
    await tx.bookingStatusLog.create({
      data: { bookingId, status: nextStatus },
    });
    const booking = await tx.booking.findFirst({
      where: { id: bookingId, orgId, deletedAt: null },
      include: { service: true, addons: true, user: true, statusLog: true },
    });
    return { updatedCount: 1 as const, booking };
  });
};

export {
  findActiveServiceById,
  findActiveAddonsByOrgAndIds,
  countActiveBookingsForSlot,
  createBookingWithAddons,
  findBookingsForUser,
  findBookingsForOrg,
  findBookingByIdForUser,
  findBookingByIdForOrg,
  updateBookingStatusWithLog,
};

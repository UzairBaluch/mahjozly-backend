import { BookingStatus, type Prisma } from '@prisma/client';
import { prisma } from '../lib/database.js';

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
    include: { addons: true },
  });
};

export {
  findActiveServiceById,
  findActiveAddonsByOrgAndIds,
  countActiveBookingsForSlot,
  createBookingWithAddons,
};

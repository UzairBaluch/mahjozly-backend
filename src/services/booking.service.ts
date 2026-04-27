import { BookingStatus } from '@prisma/client';
import { findUserById } from '../repositories/auth.repository.js';
import {
  findActiveServiceById,
  findActiveAddonsByOrgAndIds,
  countActiveBookingsForSlot,
  createBookingWithAddons,
  findBookingsForUser,
  findBookingsForOrg,
  findBookingByIdForUser,
  findBookingByIdForOrg,
  updateBookingStatusWithLog,
} from '../repositories/booking.repository.js';
import { findOrganizationByUserId } from '../repositories/business.repository.js';
import { sendBookingCreatedEmail } from './email.service.js';
import { ApiError } from '../utils/ApiError.js';
import {
  type CreateBookingInput,
  type BookingListQueryInput,
  type OrgUpdateBookingStatusInput,
} from '../validations/booking.validation.js';

// Create one booking after service/addon/capacity checks.
// `actor` is the JWT identity; `customerUserId` allows ORG staff to book for a USER customer.
const createBookingForUser = async (
  actor: { id: string; role: string },
  input: CreateBookingInput,
) => {
  // Booking can only be created against an active service.
  const service = await findActiveServiceById(input.serviceId);
  if (!service) {
    throw new ApiError(404, 'Service not found');
  }

  let bookingUserId = actor.id;
  if (input.customerUserId) {
    if (actor.role !== 'ORG') {
      throw new ApiError(403, 'Forbidden');
    }
    const customer = await findUserById(input.customerUserId);
    if (!customer || customer.role !== 'USER') {
      throw new ApiError(400, 'Invalid customer user');
    }
    bookingUserId = customer.id;
  }

  const addonIds = input.addons?.map((addon) => addon.addonId) ?? [];
  const scheduledAt = new Date(input.scheduledAt);

  let addons: Awaited<ReturnType<typeof findActiveAddonsByOrgAndIds>> = [];
  // Validate addon ownership/activity in one repo call.
  if (addonIds.length > 0) {
    addons = await findActiveAddonsByOrgAndIds(service.orgId, addonIds);
    if (addons.length !== addonIds.length) {
      throw new ApiError(400, 'Invalid addons');
    }
  }

  // Enforce slot capacity before insert.
  const count = await countActiveBookingsForSlot(service.id, scheduledAt);
  if (count >= service.maxPerSlot) {
    throw new ApiError(409, 'Selected slot is full');
  }

  // Snapshot total at booking time; later price changes should not affect this booking.
  let totalPrice = service.price;
  input.addons?.forEach((addon) => {
    const matchedAddon = addons.find((a) => a.id === addon.addonId);
    if (matchedAddon) {
      totalPrice += matchedAddon.price * addon.quantity;
    }
  });

  const createdBooking = await createBookingWithAddons({
    userId: bookingUserId,
    orgId: service.orgId,
    serviceId: service.id,
    scheduledAt,
    totalPrice,
    ...(input.notes !== undefined ? { notes: input.notes } : {}),
    addons: input.addons ?? [],
  });

  const recipientEmail = createdBooking.user?.email;
  if (recipientEmail) {
    void sendBookingCreatedEmail(
      recipientEmail,
      'Booking confirmed (pending)',
      `Your booking was created.\nBooking id: ${createdBooking.id}\nService: ${createdBooking.service?.name ?? input.serviceId}\nWhen: ${createdBooking.scheduledAt.toISOString()}\nTotal: ${createdBooking.totalPrice}`,
    );
  }

  return createdBooking;
};

// List bookings for one user — filters/pagination are validated on the route; repo enforces `userId` scope.
const listBookingsForUser = async (userId: string, query: BookingListQueryInput) => {
  return findBookingsForUser(userId, query);
};

const listBookingsForOrgUser = async (userId: string, query: BookingListQueryInput) => {
  const org = await findOrganizationByUserId(userId);
  if (!org) {
    throw new ApiError(404, 'No Org found');
  }
  return findBookingsForOrg(org.id, query);
};

const getBookingForUser = async (userId: string, bookingId: string) => {
  const booking = await findBookingByIdForUser(bookingId, userId);
  if (!booking) {
    throw new ApiError(404, 'Booking not found');
  }
  return booking;
};

const getBookingForOrgUser = async (userId: string, bookingId: string) => {
  const org = await findOrganizationByUserId(userId);
  if (!org) {
    throw new ApiError(404, 'No Org found');
  }
  const booking = await findBookingByIdForOrg(bookingId, org.id);
  if (!booking) {
    throw new ApiError(404, 'Booking not found');
  }
  return booking;
};

const assertOrgBookingTransition = (current: BookingStatus, next: BookingStatus) => {
  if (current === next) {
    throw new ApiError(409, 'No status change');
  }
  if (current === BookingStatus.CANCELLED || current === BookingStatus.COMPLETED) {
    throw new ApiError(409, 'Booking is terminal');
  }
  if (next === BookingStatus.CONFIRMED && current !== BookingStatus.PENDING) {
    throw new ApiError(409, 'Invalid status transition');
  }
  if (next === BookingStatus.COMPLETED && current !== BookingStatus.CONFIRMED) {
    throw new ApiError(409, 'Invalid status transition');
  }
  if (next === BookingStatus.CANCELLED && (current !== BookingStatus.PENDING && current !== BookingStatus.CONFIRMED)) {
    throw new ApiError(409, 'Invalid status transition');
  }
};

const updateBookingStatusForOrgUser = async (
  userId: string,
  bookingId: string,
  input: OrgUpdateBookingStatusInput,
) => {
  const org = await findOrganizationByUserId(userId);
  if (!org) {
    throw new ApiError(404, 'No Org found');
  }

  const booking = await findBookingByIdForOrg(bookingId, org.id);
  if (!booking) {
    throw new ApiError(404, 'Booking not found');
  }

  assertOrgBookingTransition(booking.status, input.status);
  const result = await updateBookingStatusWithLog(bookingId, org.id, input.status);
  if (result.updatedCount === 0 || !result.booking) {
    throw new ApiError(404, 'Booking not found');
  }
  return result.booking;
};

export {
  createBookingForUser,
  listBookingsForUser,
  listBookingsForOrgUser,
  getBookingForUser,
  getBookingForOrgUser,
  updateBookingStatusForOrgUser,
};

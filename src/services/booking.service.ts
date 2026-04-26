import {
  findActiveServiceById,
  findActiveAddonsByOrgAndIds,
  countActiveBookingsForSlot,
  createBookingWithAddons,
} from '../repositories/booking.repository.js';
import { ApiError } from '../utils/ApiError.js';
import { type CreateBookingInput } from '../validations/booking.validation.js';

// Create one booking for an authenticated user after service/addon/capacity checks.
const createBookingForUser = async (userId: string, input: CreateBookingInput) => {
  // Booking can only be created against an active service.
  const service = await findActiveServiceById(input.serviceId);
  if (!service) {
    throw new ApiError(404, 'Service not found');
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
    userId,
    orgId: service.orgId,
    serviceId: service.id,
    scheduledAt,
    totalPrice,
    ...(input.notes !== undefined ? { notes: input.notes } : {}),
    addons: input.addons ?? [],
  });

  return createdBooking;
};

export { createBookingForUser };

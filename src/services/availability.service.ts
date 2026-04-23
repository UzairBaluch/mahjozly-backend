import {
  findServiceByIdForAvailability,
  findBookingsInRangeForService,
} from '../repositories/availability.repository.js';
import { type AvailabilityQueryInput } from '../validations/availability.validation.js';
import { ApiError } from '../utils/ApiError.js';

const getServiceAvailability = async (input: AvailabilityQueryInput) => {
  const from = new Date(input.from);
  const to = new Date(input.to);

  const service = await findServiceByIdForAvailability(input.serviceId);
  if (!service) {
    throw new ApiError(404, 'Service not found');
  }
  const bookings = await findBookingsInRangeForService(input.serviceId, input.from, input.to);

  // Precompute counts per slot timestamp to avoid filtering bookings on each slot iteration.
  const bookingsBySlot = new Map<number, number>();
  for (const booking of bookings) {
    const key = booking.scheduledAt.getTime();
    bookingsBySlot.set(key, (bookingsBySlot.get(key) ?? 0) + 1);
  }

  const slots = [];
  const current = new Date(from);

  while (current < to) {
    const slotTime = new Date(current);
    const count = bookingsBySlot.get(slotTime.getTime()) ?? 0;
    slots.push({
      time: slotTime,
      bookingCount: count,
      available: count < service.maxPerSlot,
    });
    current.setMinutes(current.getMinutes() + service.duration);
  }

  return {
    service: { id: service.id, name: service.name },
    from: input.from,
    to: input.to,
    slots,
  };
};
export { getServiceAvailability };

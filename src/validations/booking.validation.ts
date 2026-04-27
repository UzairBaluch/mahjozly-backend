// Booking request shapes — business rules stay in booking.service.ts.
import { z } from 'zod';

// One addon line on a booking. Addon.price is fixed on the Addon model; quantity is per-booking.
const bookingAddonLineSchema = z.object({
  addonId: z.string().uuid(),
  // Default to 1 so clients can omit `quantity` when they want a single unit.
  quantity: z.int().positive().default(1),
});

const createBookingSchema = z.object({
  serviceId: z.string().uuid(),
  // ISO 8601 string. Must parse to a Date strictly in the future at validation time —
  // don't trust the client clock; compare against `new Date()` here.
  scheduledAt: z
    .string()
    .datetime()
    .refine((value) => new Date(value).getTime() > Date.now(), {
      message: 'scheduledAt must be in the future',
    }),
  // Trim + cap so empty-looking and oversized notes never reach the DB.
  notes: z.string().trim().max(500).optional(),
  // Optional list; when present must be non-empty with unique addonIds.
  // Dedup is shape-level (no DB needed), so it stays here, not in the service.
  addons: z
    .array(bookingAddonLineSchema)
    .nonempty()
    .refine((lines) => new Set(lines.map((line) => line.addonId)).size === lines.length, {
      message: 'addonId values must be unique within addons',
    })
    .optional(),
  // ORG staff can book on behalf of a customer user (must be validated in service using JWT role).
  customerUserId: z.string().uuid().optional(),
});

export type CreateBookingInput = z.infer<typeof createBookingSchema>;

export { createBookingSchema };

// GET /api/v1/bookings — querystring only; repo applies `userId` scope.
const bookingListQuerySchema = z
  .object({
    status: z.enum(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED']).optional(),
    from: z.string().datetime().optional(),
    to: z.string().datetime().optional(),
    limit: z.coerce.number().int().positive().max(100).default(20),
    // Keyset pagination: last seen booking id from previous page.
    cursor: z.string().uuid().optional(),
  })
  .refine(
    (data) => {
      if (!data.from || !data.to) return true;
      return new Date(data.from).getTime() < new Date(data.to).getTime();
    },
    {
      message: 'from must be before to',
      path: ['to'],
    },
  );
export type BookingListQueryInput = z.infer<typeof bookingListQuerySchema>;
export { bookingListQuerySchema };

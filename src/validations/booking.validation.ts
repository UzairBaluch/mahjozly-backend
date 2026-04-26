// POST /api/v1/bookings body — shape only.
// Business rules (service exists/active, addons share org with service, slot capacity, totalPrice snapshot)
// live in booking.service.ts — do not leak them into this file.
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
    .refine(
      (lines) => new Set(lines.map((line) => line.addonId)).size === lines.length,
      { message: 'addonId values must be unique within addons' },
    )
    .optional(),
});

export type CreateBookingInput = z.infer<typeof createBookingSchema>;

export { createBookingSchema };

import { z } from 'zod';

// Query params for availability lookups by service and time range.
const availabilityQuerySchema = z
  .object({
    serviceId: z.string().uuid(),
    from: z.string().datetime(),
    to: z.string().datetime(),
    limit: z.coerce.number().int().positive().max(100).optional(),
  })
  // Reject invalid windows early before any DB/work logic.
  .refine((data) => new Date(data.from) < new Date(data.to), {
    message: 'from must be before to',
    path: ['to'],
  });

export type AvailabilityQueryInput = z.infer<typeof availabilityQuerySchema>;

export { availabilityQuerySchema };

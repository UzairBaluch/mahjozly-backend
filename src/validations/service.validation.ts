// POST create-service body: matches Prisma `Service` fields the client may send; `orgId` is set server-side from the logged-in org.
import { z } from 'zod';

const createServiceSchema = z.object({
  name: z.string().min(1),
  // Must exist in `Category` — service layer should still verify before create.
  categoryId: z.string().uuid(),
  price: z.number().positive(),
  // Minutes; Prisma stores as Int.
  duration: z.int().positive(),
  description: z.string().optional(),
  // Omitted → Prisma default (1); if sent, must be a positive integer.
  maxPerSlot: z.int().positive().optional(),
  // Omitted → Prisma default (true).
  isActive: z.boolean().optional(),
});

export type CreateServiceInput = z.infer<typeof createServiceSchema>;
export { createServiceSchema };

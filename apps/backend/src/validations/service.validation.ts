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

// URL params for `GET /business/services/:serviceId` (and reuse for PATCH/DELETE by id later).
const serviceIdParamsSchema = z.object({
  serviceId: z.string().uuid(),
});

export type ServiceIdParamsInput = z.infer<typeof serviceIdParamsSchema>;

// PATCH body for `/business/services/:serviceId`: all fields optional, but at least one must be present.
const updateServiceSchema = z
  .object({
    name: z.string().min(1).optional(),
    categoryId: z.string().uuid().optional(),
    price: z.number().positive().optional(),
    duration: z.int().positive().optional(),
    description: z.string().optional(),
    maxPerSlot: z.int().positive().optional(),
    isActive: z.boolean().optional(),
  })
  .refine((data) => Object.values(data).some((value) => value !== undefined), {
    message: 'at least one field must be provided',
  });

export type UpdateServiceInput = z.infer<typeof updateServiceSchema>;

export { createServiceSchema, serviceIdParamsSchema, updateServiceSchema };

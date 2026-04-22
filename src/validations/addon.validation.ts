import { z } from 'zod';

// POST body for org addon creation.
const createAddonSchema = z.object({
  name: z.string().min(1),
  price: z.number().positive(),
  isActive: z.boolean().optional(),
});

export type CreateAddonInput = z.infer<typeof createAddonSchema>;

// PATCH body for addon updates: partial fields allowed, but reject empty payloads.
const updateAddonSchema = z
  .object({
    name: z.string().min(1).optional(),
    price: z.number().positive().optional(),
    isActive: z.boolean().optional(),
  })
  .refine((data) => Object.values(data).some((value) => value !== undefined), {
    message: 'at least one field must be provided',
  });

export type UpdateAddonInput = z.infer<typeof updateAddonSchema>;

// URL params for addon-by-id routes.
const addonIdParamsSchema = z.object({
  addonId: z.string().uuid(),
});

export type AddonIdParamsInput = z.infer<typeof addonIdParamsSchema>;

export { createAddonSchema, updateAddonSchema, addonIdParamsSchema };

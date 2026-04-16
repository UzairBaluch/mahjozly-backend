import { z } from 'zod';

const updateBusinessProfileSchema = z.object({
  name: z.string().optional(),
  location: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  logo: z.string().optional(),
  description: z.string().optional(),
});

export type UpdateBusinessProfileInput = z.infer<typeof updateBusinessProfileSchema>;

export { updateBusinessProfileSchema };

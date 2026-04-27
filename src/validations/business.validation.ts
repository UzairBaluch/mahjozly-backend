import { z } from 'zod';

// PATCH schema: every field is optional so clients can update only what changed.
const updateBusinessProfileSchema = z.object({
  name: z.string().optional(),
  location: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  logo: z.string().optional(),
  description: z.string().optional(),
});

export type UpdateBusinessProfileInput = z.infer<typeof updateBusinessProfileSchema>;

// POST logo upload — raw base64 bytes (no `data:` URL wrapper).
const uploadOrgLogoSchema = z.object({
  imageBase64: z.string().min(1).max(12_000_000),
});

export type UploadOrgLogoInput = z.infer<typeof uploadOrgLogoSchema>;

export { updateBusinessProfileSchema, uploadOrgLogoSchema };

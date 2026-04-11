// Zod builds rules that check request bodies; invalid data becomes ZodError for your error middleware.
import { z } from 'zod';

// Rules for POST /register (or similar): every field must pass before auth logic runs.
const registerSchema = z.object({
  // Display name: at least one character (not empty string).
  name: z.string().min(1),
  // Must look like a valid email address.
  email: z.string().email(),
  // New accounts need a slightly stronger password than "not empty".
  password: z.string().min(6),
  // Must match your Prisma Role enum exactly.
  role: z.enum(['USER', 'ORG']),
});

// TypeScript shape of a successful parse — use this for `req.body` after validation.
export type RegisterInput = z.infer<typeof registerSchema>;

// Rules for POST /login: only credentials; no name/role here.
const loginSchema = z.object({
  email: z.string().email(),
  // Non-empty is enough; real check is bcrypt compare in the service.
  password: z.string().min(1),
});

export type LoginInput = z.infer<typeof loginSchema>;

// Controllers/middleware import these to parse and validate incoming JSON.
export { registerSchema, loginSchema };

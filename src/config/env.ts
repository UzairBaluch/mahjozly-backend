// Load .env into process.env before we read it — Node does not read .env automatically,
// and Zod would see empty values if this ran later.
import 'dotenv/config';
import { z } from 'zod';

// One place that defines "the app is allowed to start only if config looks like this".
// Typos and missing keys get caught here instead of failing deep inside a random route.
const envSchema = z.object({
  // Restrict to known values so a typo like "develpment" fails fast and logs clearly.
  NODE_ENV: z.enum(['development', 'production', 'test']),
  // Env vars are always strings; we default so local dev works without setting PORT every time.
  PORT: z.string().default('8000'),
  DATABASE_URL: z.string(),
  // Short secrets are unsafe; min length rejects weak values before they reach production.
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string().default('7d'),
  REDIS_URL: z.string(),
  CLOUDINARY_CLOUD_NAME: z.string(),
  CLOUDINARY_API_KEY: z.string(),
  CLOUDINARY_API_SECRET: z.string(),
  SMTP_HOST: z.string(),
  SMTP_PORT: z.string(),
  SMTP_USER: z.string(),
  SMTP_PASS: z.string(),
  // URL check catches mistakes like missing https:// that would break CORS or redirects later.
  CLIENT_URL: z.string().url(),

  RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(900000),
  RATE_LIMIT_MAX: z.coerce.number().int().positive().default(300),
});

// safeParse returns a result object instead of throwing — we want to print errors and exit ourselves.
const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Missing or invalid environment variables:');
  console.error(parsed.error.format());
  // Exit before Express listens: running with bad config is worse than not starting at all.
  process.exit(1);
}

// Export a single typed object so the rest of the app never touches process.env directly
// (avoids scattered string access and "maybe undefined" everywhere).
export const env = parsed.data;

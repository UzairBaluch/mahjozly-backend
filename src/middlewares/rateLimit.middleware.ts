// express-rate-limit uses in-memory counters per process — swap to a Redis store when running multiple instances.
import rateLimit from 'express-rate-limit';

// Tight cap for login/register/refresh-style routes — mount only on auth routers, not on all of /api.
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'Too many attempts, please try again later' },
});

// Stricter general cap — optional for heavily public or unauthenticated endpoints.
const publicLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: { success: false, message: 'Too many requests, please try again later' },
});

// Default API budget — mounted on /api in index.ts until you split limits by route group.
const businessLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { success: false, message: 'Too many requests, please try again later' },
});

export { authLimiter, publicLimiter, businessLimiter };

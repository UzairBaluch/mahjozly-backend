// Version 1 route table — only mounts feature routers; does not implement handlers itself.
import { Router } from 'express';
import { authLimiter } from '../../middlewares/rateLimit.middleware.js';
import { healthRouter } from './health.routes.js';
import { authRouter } from './auth.routes.js';
import { businessRouter } from './business.routes.js';
import { availabilityRouter } from './availability.routes.js';

// Everything here is under /api/v1 (app uses /api + apiRouter uses /v1). Add auth, public, business routers the same way.
const v1Router = Router();

// /health + routes inside healthRouter (GET /) → full URL GET /api/v1/health
v1Router.use('/health', healthRouter);
// Stricter per-IP limit on auth endpoints (register/login/me/profile) — stacks with businessLimiter on /api.
v1Router.use('/auth', authLimiter, authRouter);
v1Router.use('/business', businessRouter);
// Public availability lookup endpoints (auth can be added later if product rules require it).
v1Router.use('/availability', availabilityRouter);

export { v1Router };

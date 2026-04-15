// Version 1 route table — only mounts feature routers; does not implement handlers itself.
import { Router } from 'express';
import { healthRouter } from './health.routes.js';
import { authRouter } from './auth.routes.js';
import { businessRouter } from './business.routes.js';

// Everything here is under /api/v1 (app uses /api + apiRouter uses /v1). Add auth, public, business routers the same way.
const v1Router = Router();

// /health + routes inside healthRouter (GET /) → full URL GET /api/v1/health
v1Router.use('/health', healthRouter);
v1Router.use('/auth', authRouter);
v1Router.use('/business', businessRouter);

export { v1Router };

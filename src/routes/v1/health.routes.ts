// Liveness/readiness-style endpoint — thin router that delegates to the health controller.
import { Router } from 'express';
import { getHealth } from '../../controllers/health.controller.js';

const healthRouter = Router();
// '/' is relative to the mount above: /api/v1 + /health + / → /api/v1/health
healthRouter.get('/', getHealth);

export { healthRouter };

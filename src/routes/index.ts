// Request flow:
// index.ts → /api → apiRouter → /v1 → v1Router → /health → healthRouter → controller → service
// Central router — mounts all versioned routers so index.ts stays clean.

import { Router } from 'express';
import { v1Router } from './v1/index.js';

const apiRouter = Router();

apiRouter.use('/v1', v1Router);

export { apiRouter };

import { authenticate } from '../../middlewares/auth.middleware.js';
import { Router } from 'express';
import { requireOrg } from '../../middlewares/requireOrg.middleware.js';
import { profileRouter } from './profile.routes.js';
import { serviceRouter } from './service.routes.js';

const businessRouter = Router();

// Org-only area: JWT → ORG role, then feature routers (each feature owns its own paths + validation).
businessRouter.use('/profile', authenticate, requireOrg, profileRouter);
businessRouter.use('/services', authenticate, requireOrg, serviceRouter);

export { businessRouter };

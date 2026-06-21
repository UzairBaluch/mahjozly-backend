import { authenticate } from '../../middlewares/auth.middleware.js';
import { Router } from 'express';
import { requireOrg } from '../../middlewares/requireOrg.middleware.js';
import { profileRouter } from './profile.routes.js';
import { serviceRouter } from './service.routes.js';
import { addonRouter } from './addon.routes.js';
import { businessBookingRouter } from './business-booking.routes.js';
import { dashboardRouter } from './dashboard.routes.js';

const businessRouter = Router();

// Org-only area: JWT → ORG role, then feature routers (each feature owns its own paths + validation).
businessRouter.use('/profile', authenticate, requireOrg, profileRouter);
businessRouter.use('/services', authenticate, requireOrg, serviceRouter);
// Addon management for orgs only (same auth + role gate as other business features).
businessRouter.use('/addons', authenticate, requireOrg, addonRouter);
businessRouter.use('/bookings', authenticate, requireOrg, businessBookingRouter);
businessRouter.use('/dashboard', authenticate, requireOrg, dashboardRouter);

export { businessRouter };

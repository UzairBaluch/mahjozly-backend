import { Router } from 'express';
import { validate } from '../../middlewares/validate.middleware.js';
import { getOrgDashboardOverviewHandler } from '../../controllers/dashboard.controller.js';
import { dashboardOverviewQuerySchema } from '../../validations/dashboard.validation.js';

const dashboardRouter = Router();

dashboardRouter.get('/overview', validate(dashboardOverviewQuerySchema), getOrgDashboardOverviewHandler);

export { dashboardRouter };

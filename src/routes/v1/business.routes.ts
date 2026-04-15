import { authenticate } from '../../middlewares/auth.middleware.js';
import { Router } from 'express';
import {
  getBusinessProfile,
  updateBusinessProfile,
} from '../../controllers/business.controller.js';

const businessRouter = Router();

businessRouter.get('/profile', authenticate, getBusinessProfile);
businessRouter.patch('/profile', authenticate, updateBusinessProfile);

export { businessRouter };

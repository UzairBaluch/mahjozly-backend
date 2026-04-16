import { authenticate } from '../../middlewares/auth.middleware.js';
import { Router } from 'express';
import {
  getBusinessProfile,
  updateBusinessProfile,
} from '../../controllers/business.controller.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { updateBusinessProfileSchema } from '../../validations/business.validation.js';

const businessRouter = Router();

// Read the authenticated org profile.
businessRouter.get('/profile', authenticate, getBusinessProfile);

// Update only allowed profile fields after auth + request-body validation.
businessRouter.patch(
  '/profile',
  authenticate,
  validate(updateBusinessProfileSchema),

  updateBusinessProfile,
);

export { businessRouter };

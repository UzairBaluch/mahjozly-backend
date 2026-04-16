import { authenticate } from '../../middlewares/auth.middleware.js';
import { Router } from 'express';
import {
  getBusinessProfile,
  updateBusinessProfile,
} from '../../controllers/business.controller.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { updateBusinessProfileSchema } from '../../validations/business.validation.js';
import { requireOrg } from '../../middlewares/requireOrg.middleware.js';

const businessRouter = Router();

// Order: JWT first, then ORG role gate, then handler.
// Read the authenticated org profile.
businessRouter.get('/profile', authenticate, requireOrg, getBusinessProfile);

// Order: JWT → ORG gate → Zod parses PATCH body → controller.
// Update only allowed profile fields after auth + request-body validation.
businessRouter.patch(
  '/profile',
  authenticate,
  requireOrg,
  validate(updateBusinessProfileSchema),
  updateBusinessProfile,
);

export { businessRouter };

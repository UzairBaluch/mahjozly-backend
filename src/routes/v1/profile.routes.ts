// Org profile: mounted under /business/profile — auth gates live on the parent business router.
import { Router } from 'express';
import { validate } from '../../middlewares/validate.middleware.js';
import { getBusinessProfile, updateBusinessProfile } from '../../controllers/profile.controller.js';
import { updateBusinessProfileSchema } from '../../validations/business.validation.js';

const profileRouter = Router();

profileRouter.get('/', getBusinessProfile);
profileRouter.patch('/', validate(updateBusinessProfileSchema), updateBusinessProfile);

export { profileRouter };

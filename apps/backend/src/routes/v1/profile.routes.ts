// Org profile: mounted under /business/profile — auth gates live on the parent business router.
import { Router } from 'express';
import { validate } from '../../middlewares/validate.middleware.js';
import { getBusinessProfile, updateBusinessProfile, uploadOrgLogo } from '../../controllers/profile.controller.js';
import { updateBusinessProfileSchema, uploadOrgLogoSchema } from '../../validations/business.validation.js';

const profileRouter = Router();

profileRouter.get('/', getBusinessProfile);
profileRouter.patch('/', validate(updateBusinessProfileSchema), updateBusinessProfile);
profileRouter.post('/logo', validate(uploadOrgLogoSchema), uploadOrgLogo);

export { profileRouter };

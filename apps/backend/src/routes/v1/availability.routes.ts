import { Router } from 'express';
import { validate } from '../../middlewares/validate.middleware.js';
import { getServiceAvailabilityHandler } from '../../controllers/availability.controller.js';
import { availabilityQuerySchema } from '../../validations/availability.validation.js';

const availabilityRouter = Router();
// Read availability for a service/time range from validated query parameters.
availabilityRouter.get('/', validate(availabilityQuerySchema), getServiceAvailabilityHandler);

export { availabilityRouter };

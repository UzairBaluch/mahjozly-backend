// Org catalog services: mounted under /business/services — auth gates live on the parent business router.
import { Router } from 'express';
import { validate } from '../../middlewares/validate.middleware.js';
import { createServiceHandler } from '../../controllers/service.controller.js';
import { createServiceSchema } from '../../validations/service.validation.js';

const serviceRouter = Router();

serviceRouter.post('/', validate(createServiceSchema), createServiceHandler);

export { serviceRouter };

// Org catalog services: mounted under /business/services — auth gates live on the parent business router.
import { Router } from 'express';
import { validate } from '../../middlewares/validate.middleware.js';
import {
  createServiceHandler,
  listServicesHandler,
  getServiceByIdHandler,
  updateServiceByIdHandler,
  softDeleteServiceByIdHandler,
} from '../../controllers/service.controller.js';
import {
  createServiceSchema,
  serviceIdParamsSchema,
  updateServiceSchema,
} from '../../validations/service.validation.js';

const serviceRouter = Router();

// List active services for the authenticated org (soft-deleted rows excluded in the repository).
// Keep this `GET '/'` before any future `GET '/:serviceId'` so the collection path is not parsed as an id.
serviceRouter.get('/', listServicesHandler);

// Read one service by id for the authenticated org; params are validated as UUID before controller logic.
serviceRouter.get('/:serviceId', validate(serviceIdParamsSchema), getServiceByIdHandler);

// Update one service by id for the authenticated org; validate both params and body before controller logic.
serviceRouter.patch(
  '/:serviceId',
  validate(serviceIdParamsSchema),
  validate(updateServiceSchema),
  updateServiceByIdHandler,
);

// Soft-delete one service by id for the authenticated org (params validated before controller logic).
serviceRouter.delete('/:serviceId', validate(serviceIdParamsSchema), softDeleteServiceByIdHandler);

// Create a service under that org; body validated with Zod before the handler runs.
serviceRouter.post('/', validate(createServiceSchema), createServiceHandler);

export { serviceRouter };

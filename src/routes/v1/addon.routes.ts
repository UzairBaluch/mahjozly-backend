import { Router } from 'express';
import { validate } from '../../middlewares/validate.middleware.js';
import {
  createAddonHandler,
  listAddonsHandler,
  getAddonByIdHandler,
  updateAddonByIdHandler,
  softDeleteAddonByIdHandler,
} from '../../controllers/addon.controller.js';
import {
  createAddonSchema,
  addonIdParamsSchema,
  updateAddonSchema,
} from '../../validations/addon.validation.js';

const addonRouter = Router();

// Create one addon for the authenticated org.
addonRouter.post('/', validate(createAddonSchema), createAddonHandler);
// List all addons for the authenticated org.
addonRouter.get('/', listAddonsHandler);
// Read one addon by id (UUID params validated before controller logic).
addonRouter.get('/:addonId', validate(addonIdParamsSchema), getAddonByIdHandler);

// Update one addon by id with validated params + body.
addonRouter.patch(
  '/:addonId',
  validate(addonIdParamsSchema),
  validate(updateAddonSchema),
  updateAddonByIdHandler,
);
// Delete (deactivate) one addon by id.
addonRouter.delete('/:addonId', validate(addonIdParamsSchema), softDeleteAddonByIdHandler);

export { addonRouter };

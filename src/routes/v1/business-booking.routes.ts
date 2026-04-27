import { Router } from 'express';
import { validate } from '../../middlewares/validate.middleware.js';
import {
  getBookingForOrgHandler,
  getBookingsForOrgHandler,
  patchBookingStatusForOrgHandler,
} from '../../controllers/business-booking.controller.js';
import {
  bookingIdParamsSchema,
  bookingListQuerySchema,
  orgUpdateBookingStatusSchema,
} from '../../validations/booking.validation.js';

const businessBookingRouter = Router();

// Collection + detail routes — keep `GET '/'` before `GET '/:bookingId'`.
businessBookingRouter.get('/', validate(bookingListQuerySchema), getBookingsForOrgHandler);
businessBookingRouter.get('/:bookingId', validate(bookingIdParamsSchema), getBookingForOrgHandler);
businessBookingRouter.patch(
  '/:bookingId',
  validate(bookingIdParamsSchema),
  validate(orgUpdateBookingStatusSchema),
  patchBookingStatusForOrgHandler,
);

export { businessBookingRouter };

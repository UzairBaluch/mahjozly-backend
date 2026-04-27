import { Router } from 'express';
import { authenticate } from '../../middlewares/auth.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import {
  getBookingForUserHandler,
  getBookingsForUserHandler,
  postBooking,
} from '../../controllers/booking.controller.js';
import {
  bookingIdParamsSchema,
  bookingListQuerySchema,
  createBookingSchema,
} from '../../validations/booking.validation.js';
const bookingRouter = Router();

// Create booking for authenticated users; validate body before controller logic.
bookingRouter.post('/', authenticate, validate(createBookingSchema), postBooking);
// List bookings for the authenticated user; validate query before controller logic.
bookingRouter.get('/', authenticate, validate(bookingListQuerySchema), getBookingsForUserHandler);
// Read one booking for the authenticated user; keep after `GET /` so `/` is not parsed as an id.
bookingRouter.get('/:bookingId', authenticate, validate(bookingIdParamsSchema), getBookingForUserHandler);
export { bookingRouter };

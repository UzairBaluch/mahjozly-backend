import { Router } from 'express';
import { authenticate } from '../../middlewares/auth.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { getBookingsForUserHandler, postBooking } from '../../controllers/booking.controller.js';
import { bookingListQuerySchema, createBookingSchema } from '../../validations/booking.validation.js';
const bookingRouter = Router();

// Create booking for authenticated users; validate body before controller logic.
bookingRouter.post('/', authenticate, validate(createBookingSchema), postBooking);
// List bookings for the authenticated user; validate query before controller logic.
bookingRouter.get('/', authenticate, validate(bookingListQuerySchema), getBookingsForUserHandler);
export { bookingRouter };

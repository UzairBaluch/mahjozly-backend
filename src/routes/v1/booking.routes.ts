import { Router } from 'express';
import { authenticate } from '../../middlewares/auth.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { postBooking } from '../../controllers/booking.controller.js';
import { createBookingSchema } from '../../validations/booking.validation.js';
const bookingRouter = Router();

// Create booking for authenticated users; validate body before controller logic.
bookingRouter.post('/', authenticate, validate(createBookingSchema), postBooking);
export { bookingRouter };

import { type Request, type Response } from 'express';
import { createBookingForUser } from '../services/booking.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { type CreateBookingInput } from '../validations/booking.validation.js';
import { ApiResponse } from '../utils/apiResponse.js';

// Creates one booking for the authenticated user from a validated request body.
const postBooking = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    throw new ApiError(401, 'Unauthorized request');
  }

  const input = req.body as CreateBookingInput;
  const result = await createBookingForUser(userId, input);

  return res.status(201).json(new ApiResponse(201, result, 'Booking created'));
});
export { postBooking };

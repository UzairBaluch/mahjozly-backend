import { type Request, type Response } from 'express';
import {
  createBookingForUser,
  getBookingForUser,
  listBookingsForUser,
} from '../services/booking.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import {
  type CreateBookingInput,
  type BookingListQueryInput,
  type BookingIdParamsInput,
} from '../validations/booking.validation.js';
import { ApiResponse } from '../utils/apiResponse.js';

// Creates one booking for the authenticated user from a validated request body.
const postBooking = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const role = req.user?.role;
  if (!userId || !role) {
    throw new ApiError(401, 'Unauthorized request');
  }

  const input = req.body as CreateBookingInput;
  const result = await createBookingForUser({ id: userId, role }, input);

  return res.status(201).json(new ApiResponse(201, result, 'Booking created'));
});

// Lists bookings for the authenticated user (query validated on the route).
const getBookingsForUserHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    throw new ApiError(401, 'Unauthorized request');
  }
  const query = req.query as unknown as BookingListQueryInput;
  const result = await listBookingsForUser(userId, query);
  return res.status(200).json(new ApiResponse(200, result, 'Bookings fetched'));
});

const getBookingForUserHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    throw new ApiError(401, 'Unauthorized request');
  }
  const { bookingId } = req.params as unknown as BookingIdParamsInput;
  const result = await getBookingForUser(userId, bookingId);
  return res.status(200).json(new ApiResponse(200, result, 'Booking fetched'));
});

export { postBooking, getBookingsForUserHandler, getBookingForUserHandler };

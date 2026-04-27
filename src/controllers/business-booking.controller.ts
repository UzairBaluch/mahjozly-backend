import { type Request, type Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/apiResponse.js';
import {
  getBookingForOrgUser,
  listBookingsForOrgUser,
  updateBookingStatusForOrgUser,
} from '../services/booking.service.js';
import {
  type BookingIdParamsInput,
  type BookingListQueryInput,
  type OrgUpdateBookingStatusInput,
} from '../validations/booking.validation.js';

const getBookingsForOrgHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    throw new ApiError(401, 'Unauthorized request');
  }
  const query = req.query as unknown as BookingListQueryInput;
  const result = await listBookingsForOrgUser(userId, query);
  return res.status(200).json(new ApiResponse(200, result, 'Bookings fetched'));
});

const getBookingForOrgHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    throw new ApiError(401, 'Unauthorized request');
  }
  const { bookingId } = req.params as unknown as BookingIdParamsInput;
  const result = await getBookingForOrgUser(userId, bookingId);
  return res.status(200).json(new ApiResponse(200, result, 'Booking fetched'));
});

const patchBookingStatusForOrgHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    throw new ApiError(401, 'Unauthorized request');
  }
  const { bookingId } = req.params as unknown as BookingIdParamsInput;
  const body = req.body as OrgUpdateBookingStatusInput;
  const result = await updateBookingStatusForOrgUser(userId, bookingId, body);
  return res.status(200).json(new ApiResponse(200, result, 'Booking updated'));
});

export { getBookingsForOrgHandler, getBookingForOrgHandler, patchBookingStatusForOrgHandler };

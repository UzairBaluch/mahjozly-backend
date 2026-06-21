import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { type Request, type Response } from 'express';
import { getServiceAvailability } from '../services/availability.service.js';
import { type AvailabilityQueryInput } from '../validations/availability.validation.js';

// GET availability summary for a service/time range (query is validated on the route).
const getServiceAvailabilityHandler = asyncHandler(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await getServiceAvailability(query as AvailabilityQueryInput);
  return res.status(200).json(new ApiResponse(200, result, 'Availability fetched'));
});

export { getServiceAvailabilityHandler };

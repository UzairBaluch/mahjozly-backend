import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { type Request, type Response } from 'express';
import { ApiError } from '../utils/ApiError.js';
import {
  getBusinessProfileService,
  updateBusinessProfileService,
} from '../services/business.service.js';

// HTTP layer only: read authenticated user id, delegate to service, return API envelope.
const getBusinessProfile = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    throw new ApiError(401, 'Unauthorized request');
  }
  // Controller only coordinates HTTP <-> service. Service decides not-found/business rules.
  const result = await getBusinessProfileService(userId);
  return res.status(200).json(new ApiResponse(200, result, '...'));
});

const updateBusinessProfile = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    throw new ApiError(401, 'Unauthorized request');
  }
  // PATCH payload is forwarded to service; validation middleware should guard shape.
  const result = await updateBusinessProfileService(userId, req.body);
  return res.status(200).json(new ApiResponse(200, result, '...'));
});

export { getBusinessProfile, updateBusinessProfile };

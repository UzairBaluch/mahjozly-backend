import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { type Request, type Response } from 'express';
import {
  getBusinessProfileService,
  updateBusinessProfileService,
} from '../services/business.service.js';

const getBusinessProfile = asyncHandler(async (req: Request, res: Response) => {
  const result = await getBusinessProfileService(req.user.id);
  return res.status(200).json(new ApiResponse(200, result, '...'));
});

const updateBusinessProfile = asyncHandler(async (req: Request, res: Response) => {
  const result = await updateBusinessProfileService(req.user.id, req.body);
  return res.status(200).json(new ApiResponse(200, result, '...'));
});

export { getBusinessProfile, updateBusinessProfile };

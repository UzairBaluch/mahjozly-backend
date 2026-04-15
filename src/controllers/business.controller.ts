import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { type Request, type Response } from 'express';

const getBusinessProfile = asyncHandler(async (req: Request, res: Response) => {
  return res.status(200).json(new ApiResponse(200, {}, '...'));
});

const updateBusinessProfile = asyncHandler(async (req: Request, res: Response) => {
    return res.status(200).json(new ApiResponse(200, {}, '...'));
});

export { getBusinessProfile, updateBusinessProfile };

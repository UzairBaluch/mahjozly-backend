import { type Request, type Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { getOrgDashboardOverview } from '../services/dashboard.service.js';
import { type DashboardOverviewQueryInput } from '../validations/dashboard.validation.js';

const getOrgDashboardOverviewHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    throw new ApiError(401, 'Unauthorized request');
  }
  const query = req.query as unknown as DashboardOverviewQueryInput;
  const result = await getOrgDashboardOverview(userId, query);
  return res.status(200).json(new ApiResponse(200, result, 'Dashboard overview'));
});

export { getOrgDashboardOverviewHandler };

import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { type Request, type Response } from 'express';
import { ApiError } from '../utils/ApiError.js';
import {
  createServiceForOrgUser,
  listServicesForOrgUser,
  getServiceByIdForOrgUser,
} from '../services/service.service.js';
import { type CreateServiceInput } from '../validations/service.validation.js';

// HTTP only: `authenticate` + `requireOrg` on parent router; body validated on route — controller only bridges req → service.
const createServiceHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    throw new ApiError(401, 'Unauthorized request');
  }
  // `req.body` is already `CreateServiceInput` after `validate(createServiceSchema)` on the router.
  const result = await createServiceForOrgUser(userId, req.body as CreateServiceInput);
  // 201 Created — new `Service` row.
  return res.status(201).json(new ApiResponse(201, result, 'Service created'));
});

// GET list — 200 OK (never 201; 201 is for successful POST that creates a resource).
const listServicesHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    throw new ApiError(401, 'Unauthorized request');
  }
  const result = await listServicesForOrgUser(userId);
  return res.status(200).json(new ApiResponse(200, result, 'Services fetched'));
});

// GET one service by id for the authenticated org user (org ownership enforced in the service layer).
const getServiceByIdHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    throw new ApiError(401, 'Unauthorized request');
  }
  const { serviceId } = req.params;
  if (!serviceId || Array.isArray(serviceId)) {
    throw new ApiError(400, 'Invalid service id');
  }
  const result = await getServiceByIdForOrgUser(userId, serviceId);

  return res.status(200).json(new ApiResponse(200, result, 'Service fetched'));
});

export { createServiceHandler, listServicesHandler, getServiceByIdHandler };

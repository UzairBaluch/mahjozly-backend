import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { type Request, type Response } from 'express';
import { ApiError } from '../utils/ApiError.js';
import { createServiceForOrgUser } from '../services/service.service.js';
import { type CreateServiceInput } from '../validations/service.validation.js';

// HTTP only: org gate + body validation run on the route; this handler wires userId + parsed body → service → 201.
const createServiceHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    throw new ApiError(401, 'Unauthorized request');
  }
  // `req.body` is already `CreateServiceInput` after `validate(createServiceSchema)` on the router.
  const result = await createServiceForOrgUser(userId, req.body as CreateServiceInput);
  return res.status(201).json(new ApiResponse(201, result, '...'));
});

export { createServiceHandler };

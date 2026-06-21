import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { type Request, type Response } from 'express';
import { ApiError } from '../utils/ApiError.js';

import {
  createAddonForOrgUser,
  listAddonsForOrgUser,
  getAddonByIdForOrgUser,
  updateAddonByIdForOrgUser,
  softDeleteAddonByIdForOrgUser,
} from '../services/addon.service.js';

import { type CreateAddonInput, type UpdateAddonInput } from '../validations/addon.validation.js';

// POST one addon for the authenticated org user.
const createAddonHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    throw new ApiError(401, 'Unauthorized request');
  }

  const result = await createAddonForOrgUser(userId, req.body as CreateAddonInput);
  return res.status(201).json(new ApiResponse(201, result, 'Addon created'));
});

// GET all addons for the authenticated org user.
const listAddonsHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    throw new ApiError(401, 'Unauthorized request');
  }

  const result = await listAddonsForOrgUser(userId);
  return res.status(200).json(new ApiResponse(200, result, 'Addon fetched'));
});

// GET one addon by id for the authenticated org user.
const getAddonByIdHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    throw new ApiError(401, 'Unauthorized request');
  }
  const { addonId } = req.params;
  if (!addonId || Array.isArray(addonId)) {
    throw new ApiError(400, 'Invalid addon id');
  }

  const result = await getAddonByIdForOrgUser(userId, addonId);
  return res.status(200).json(new ApiResponse(200, result, 'Addon fetched'));
});

// PATCH one addon by id for the authenticated org user.
const updateAddonByIdHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    throw new ApiError(401, 'Unauthorized request');
  }

  const { addonId } = req.params;
  if (!addonId || Array.isArray(addonId)) {
    throw new ApiError(400, 'Invalid addon id');
  }
  const result = await updateAddonByIdForOrgUser(userId, addonId, req.body as UpdateAddonInput);
  return res.status(200).json(new ApiResponse(200, result, 'Addon updated'));
});

// DELETE (deactivate) one addon by id for the authenticated org user.
const softDeleteAddonByIdHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    throw new ApiError(401, 'Unauthorized request');
  }

  const { addonId } = req.params;
  if (!addonId || Array.isArray(addonId)) {
    throw new ApiError(400, 'Invalid addon id');
  }

  const result = await softDeleteAddonByIdForOrgUser(userId, addonId);
  return res.status(200).json(new ApiResponse(200, result, 'Addon deleted'));
});

export {
  createAddonHandler,
  listAddonsHandler,
  getAddonByIdHandler,
  updateAddonByIdHandler,
  softDeleteAddonByIdHandler,
};

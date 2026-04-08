import { asyncHandler } from '../utils/asyncHandler.js';
import { getHealthStatus } from '../services/health.service.js';
import { ApiResponse } from '../utils/apiResponse.js';

// HTTP layer only: call the service, send status + JSON. No DB or business rules here.
const getHealth = asyncHandler(async (_req, res) => {
  // Service returns pure runtime/app status; controller only wraps transport shape.
  const payload = getHealthStatus();
  // Keep success envelope consistent with other endpoints.
  return res.status(200).json(new ApiResponse(200, payload, 'Health is ok'));
});

export { getHealth };

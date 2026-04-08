import { type ErrorRequestHandler } from 'express';
import { ApiError } from '../utils/ApiError.js';
import { logger } from '../utils/logger.js';

// Central error boundary for HTTP responses.
// Start simple: known ApiError -> structured client response, everything else -> generic 500.
const errorMiddleware: ErrorRequestHandler = (err, req, res, _next) => {
  if (err instanceof ApiError) {
    // Operational error we intentionally throw from app logic.
    return res.status(err.statusCode).json({
      success: err.success,
      message: err.message,
      errors: err.errors,
    });
  }
  // Unknown errors: log request context + normalized error details for debugging/incident tracing.
  logger.error({
    requestId: req.id,
    path: req.path,
    message: err instanceof Error ? err.message : String(err),
    stack: err instanceof Error ? err.stack : undefined,
  });
  // Keep client payload generic (no stack/details leak); support can trace by requestId in logs.
  return res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
};

export { errorMiddleware };

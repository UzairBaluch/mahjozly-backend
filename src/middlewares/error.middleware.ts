import { type ErrorRequestHandler } from 'express';
import { ApiError } from '../utils/ApiError.js';

// Central error boundary for HTTP responses.
// Start simple: known ApiError -> structured client response, everything else -> generic 500.
const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof ApiError) {
    // Operational error we intentionally throw from app logic.
    return res.status(err.statusCode).json({
      success: err.success,
      message: err.message,
      errors: err.errors,
    });
  }
  // Unknown/programming error details are logged elsewhere; keep API response safe.
  return res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
};

export { errorMiddleware };

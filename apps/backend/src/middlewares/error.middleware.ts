// Maps thrown errors (ApiError, Zod, Prisma, unknown) to one JSON contract — register last in Express after routes.
import { type ErrorRequestHandler } from 'express';
import { ApiError } from '../utils/ApiError.js';
import { logger } from '../utils/logger.js';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';

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

  if (err instanceof ZodError) {
    // Zod gives structured field issues; map them into a client-friendly array.
    // requestId is included so frontend/support can correlate this response with backend logs.
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: err.issues.map((e) => ({
        path: e.path.join('.'),
        message: e.message,
      })),
      requestId: req.id,
    });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // Prisma known request errors expose stable codes (P20xx). Start with uniqueness conflicts.
    if (err.code === 'P2002') {
      logger.error({
        requestId: req.id,
        path: req.path,
        code: err.code,
      });
      return res.status(409).json({
        success: false,
        message: 'A record with this value already exists',
        requestId: req.id,
      });
    }
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
    requestId: req.id,
    success: false,
    message: 'Internal server error',
  });
};

export { errorMiddleware };

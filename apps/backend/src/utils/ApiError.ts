// Throw this from services for expected failures (validation handled by Zod middleware, DB conflicts often via Prisma codes).
// Operational errors you intend to send to the client (4xx/5xx). Throw from services or pass via next(err); map to JSON in a global error middleware.
// Do not use for programming bugs — those stay as generic 500s after logging.
class ApiError extends Error {
  /** HTTP status (e.g. 400, 404, 409). */
  statusCode: number;

  /** Optional payload for the client; extend constructor later if you need to attach metadata. */
  data: unknown | null;

  /** Mirrors API convention so serialized errors align with success bodies that use `success: true`. */
  success: boolean;

  /** Field-level or validation messages; empty when not applicable. */
  errors: string[];

  constructor(
    statusCode: number,
    message: string = 'Something is wrong',
    errors: string[] = [],
    stackTrace: string = '',
  ) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.data = null;
    this.success = false;
    // Copy so callers cannot mutate the array after construction.
    this.errors = [...errors];
    if (stackTrace) {
      this.stack = stackTrace;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };

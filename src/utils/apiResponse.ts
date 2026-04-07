// Shape of successful API JSON. Use with res.status(code).json(new ApiResponse(...)) or a small helper that calls res.json().
// Pairs conceptually with ApiError (errors) — keep both envelopes consistent for the frontend.
class ApiResponse {
  /** HTTP status echoed in the body (some clients read it; others rely only on the response status line). */
  statusCode: number;

  /** Response payload; `unknown` until you switch to ApiResponse<T> for stronger typing per endpoint. */
  data: unknown;

  /** Human-readable summary (e.g. for toasts); not a substitute for error `errors[]` on failures. */
  message: string;

  /** Derived from statusCode < 400 — matches common “success vs failure” split; 3xx counts as success here. */
  success: boolean;

  constructor(statusCode: number, data: unknown, message: string = 'success') {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

export { ApiResponse };

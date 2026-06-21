// Thin typed fetch wrapper. Server actions or components call this; backend errors propagate as `ApiError`.
import type { ApiResponseBody } from '@mahjozly/shared';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8001';

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code?: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

type FetchOptions = Omit<RequestInit, 'body'> & {
  body?: unknown;
  token?: string | null;
};

export async function apiFetch<T>(path: string, options: FetchOptions = {}): Promise<T> {
  const { body, token, headers, ...rest } = options;

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    cache: 'no-store',
  });

  let payload: ApiResponseBody<T>;
  try {
    payload = (await res.json()) as ApiResponseBody<T>;
  } catch {
    throw new ApiError(`Non-JSON response (${res.status})`, res.status);
  }

  if (!payload.success) {
    throw new ApiError(payload.message ?? `Request failed (${res.status})`, res.status, payload.code);
  }

  return payload.data;
}

// Cross-workspace types, enums, and DTO contracts shared between backend, worker, and frontend.
// Keep this package source-only (no runtime side effects on import) so it stays cheap to consume.

export const QUEUE_NAMES = {
  TRANSCRIPTION: 'transcription',
  SUMMARIZATION: 'summarization',
  REMINDERS: 'reminders',
  CALENDAR_SYNC: 'calendar-sync',
} as const;

export type QueueName = (typeof QUEUE_NAMES)[keyof typeof QUEUE_NAMES];

export type SessionNoteStatus = 'PENDING' | 'PROCESSING' | 'COMPLETE' | 'FAILED';

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';

export type LocationType = 'DAILY_VIDEO' | 'GOOGLE_MEET' | 'IN_PERSON' | 'PHONE';

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  code?: string;
}

export type ApiResponseBody<T> = ApiSuccessResponse<T> | ApiErrorResponse;

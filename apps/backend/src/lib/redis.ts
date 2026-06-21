// Redis client — Phase 13 (jobs / auto-expiry). Replace this file’s placeholder with a real connection.

// 1. Pick client: `ioredis` (common with BullMQ) — add dependency + types when you implement (not in this comment-only step).
// 2. Read `REDIS_URL` from `../config/env.js` (`env.REDIS_URL` is already required at boot).
// 3. Export `getRedis()` singleton (lazy init): create client once, reuse across workers/queue setup.
// 4. Wire basic lifecycle hooks: `error` → log; optional `connect`/`ready` logs in dev only.
// 5. Export `disconnectRedis()` for graceful shutdown from `index.ts` (optional, but avoids dirty exits in prod).
// 6. Do not import Prisma here — Redis is infra, not DB.

// Next implementation slice after client exists: create `src/queues/*` + `src/workers/*` and enqueue “expire pending booking” jobs per roadmap.

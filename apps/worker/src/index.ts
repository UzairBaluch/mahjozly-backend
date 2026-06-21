// Worker process placeholder — you (the user) will wire real BullMQ Workers here.
// Pattern to follow when you build it out: one Worker per queue (transcription, summarization,
// reminders, calendar-sync), each calling into a service-layer function that talks to repos.
import { config as loadEnv } from 'dotenv';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
loadEnv({ path: resolve(here, '../../../.env') });

console.log('[worker] up — no queues registered yet. Add Workers in src/workers/*.ts and import them here.');

// Keep the process alive so `tsx watch` stays open during dev even with zero workers attached.
setInterval(() => {}, 1 << 30);

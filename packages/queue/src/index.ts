// BullMQ + Redis client wrapper — single connection reused across queues and workers.
// Backend enqueues jobs via getQueue(); worker app imports getQueue() + makes Workers.
//
// We pass a `connection` config object to BullMQ (not a pre-built ioredis instance) so the
// types stay aligned with BullMQ's nested ioredis copy. For non-queue Redis usage, getRedis()
// still returns an instance from our own ioredis dep.
import { Queue, type QueueOptions, type ConnectionOptions } from 'bullmq';
import IORedis, { type Redis } from 'ioredis';
import { QUEUE_NAMES, type QueueName } from '@mahjozly/shared';

const globalForQueue = globalThis as unknown as {
  redis: Redis | undefined;
  queues: Map<QueueName, Queue> | undefined;
};

function redisUrl(): string {
  return process.env.REDIS_URL ?? 'redis://localhost:6379';
}

export function getRedis(): Redis {
  if (!globalForQueue.redis) {
    globalForQueue.redis = new IORedis(redisUrl(), { maxRetriesPerRequest: null });
  }
  return globalForQueue.redis;
}

function bullConnection(): ConnectionOptions {
  // BullMQ accepts a connection string-shaped object; it builds its own ioredis client internally.
  const url = new URL(redisUrl());
  return {
    host: url.hostname,
    port: Number(url.port || 6379),
    password: url.password || undefined,
    username: url.username || undefined,
  };
}

const defaultQueueOptions: Omit<QueueOptions, 'connection'> = {
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: 'exponential', delay: 5_000 },
    removeOnComplete: { age: 24 * 60 * 60, count: 1000 },
    removeOnFail: { age: 7 * 24 * 60 * 60 },
  },
};

export function getQueue(name: QueueName): Queue {
  if (!globalForQueue.queues) {
    globalForQueue.queues = new Map();
  }
  const existing = globalForQueue.queues.get(name);
  if (existing) return existing;

  const queue = new Queue(name, {
    connection: bullConnection(),
    ...defaultQueueOptions,
  });
  globalForQueue.queues.set(name, queue);
  return queue;
}

export { QUEUE_NAMES, bullConnection };
export type { QueueName };

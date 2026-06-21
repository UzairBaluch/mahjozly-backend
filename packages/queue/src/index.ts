// BullMQ + Redis client wrapper — single connection reused across queues and workers.
// Backend enqueues jobs via getQueue(); worker app imports getQueue() + makes Workers.
import { Queue, type QueueOptions } from 'bullmq';
import IORedis, { type Redis } from 'ioredis';
import { QUEUE_NAMES, type QueueName } from '@mahjozly/shared';

const globalForQueue = globalThis as unknown as {
  redis: Redis | undefined;
  queues: Map<QueueName, Queue> | undefined;
};

export function getRedis(): Redis {
  if (!globalForQueue.redis) {
    globalForQueue.redis = new IORedis(process.env.REDIS_URL ?? 'redis://localhost:6379', {
      maxRetriesPerRequest: null,
    });
  }
  return globalForQueue.redis;
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
    connection: getRedis(),
    ...defaultQueueOptions,
  });
  globalForQueue.queues.set(name, queue);
  return queue;
}

export { QUEUE_NAMES };
export type { QueueName };

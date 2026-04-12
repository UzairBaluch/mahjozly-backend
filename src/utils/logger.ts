// Winston transports switch on NODE_ENV — production rotates JSON files; dev prints colorized lines to the terminal.
// Single app-wide logger — import { logger } from './utils/logger.js'. Prefer metadata objects (logger.info('msg', { key })) for JSON file logs in production.
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const { combine, timestamp, json, colorize, simple } = winston.format;

// Production: one file per day under logs/; old files dropped after maxFiles. JSON + timestamp helps grep and log aggregators.
const fileTransport = new DailyRotateFile({
  filename: 'logs/apps-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '30d',
  format: combine(timestamp(), json()),
});

// Non-production: human-readable colored lines to the terminal (no log files required for local dev).
const consoleTransport = new winston.transports.Console({
  format: combine(colorize(), simple()),
});

const logger = winston.createLogger({
  // debug shows more in dev; info avoids noise in prod while still capturing operational messages.
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  transports: [process.env.NODE_ENV === 'production' ? fileTransport : consoleTransport],
});

export { logger };

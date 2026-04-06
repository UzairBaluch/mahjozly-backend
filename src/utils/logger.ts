import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const { combine, timestamp, json, colorize, simple } = winston.format;

const fileTransport = new DailyRotateFile({
  filename: 'logs/apps-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '30d',
  format: combine(timestamp(), json()),
});

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  transports: [
    process.env.NODE_ENV === 'production'
      ? fileTransport
      : new winston.transports.Console({ format: combine(colorize(), simple()) }),
  ],
});

export { logger };

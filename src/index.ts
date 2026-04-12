// HTTP entrypoint: middleware order matters (request id → security → parse body → routes → error handler).
// Loads and validates .env via env.ts — import first so we never boot with bad config.
import { env } from './config/env.js';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { businessLimiter } from './middlewares/rateLimit.middleware.js';
import { apiRouter } from './routes/index.js';
import { requestId } from './middlewares/requestId.middleware.js';
import { logger } from './utils/logger.js';
import { errorMiddleware } from './middlewares/error.middleware.js';

const app = express();

// Request id first so every downstream middleware, route, and logger can use req.id / X-Request-ID.
app.use(requestId);

// Sets safer default headers (XSS, clickjacking, etc.) early — cheap baseline before routes exist.
app.use(helmet());

// Browser clients may only call us from CLIENT_URL; credentials allows cookies later if we use them.
app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  }),
);

// Parses JSON bodies into req.body — needed before any route that reads POST/PUT JSON.
app.use(express.json());

// One-line request log in the terminal — separate from later Winston “inside the app” logging.
app.use(morgan('dev'));

// Per-IP cap on all /api/* — businessLimiter runs before the router; mount authLimiter/publicLimiter on specific routers later.
// Versioned API under /api; add v2 in routes/index.ts with apiRouter.use('/v2', v2Router).
app.use('/api', businessLimiter, apiRouter);

// Global error boundary — keep this after routes so thrown/rejected errors map to one JSON shape.
app.use(errorMiddleware);

const server = app.listen(Number(env.PORT), () => {
  logger.info(`Server is running on Port ${env.PORT}`);
});

// listen() can fail before the server accepts connections — attach 'error' so we log instead of an unhandled throw.
server.on('error', (err: NodeJS.ErrnoException) => {
  if (err.code === 'EADDRINUSE') {
    // Same port as another process (common when an old node is still bound).
    logger.error(
      `Port ${env.PORT} is already in use — another process (often an old node) is still listening.\nStop it, then restart: lsof -i :${env.PORT}`,
    );
  } else {
    // Any other bind/listen failure — surface the real errno/message for debugging.
    logger.error('Server failed to start:', err);
  }
  process.exit(1);
});

// Anything that escapes try/catch on the main thread — log then exit so orchestration can restart a clean process.
process.on('uncaughtException', (err) => {
  logger.error('Uncaught exception', { message: err.message, stack: err.stack });
  process.exit(1);
});

// The rejection value is `unknown` — often Error, but can be a string, number, or plain object.
process.on('unhandledRejection', (reason) => {
  if (reason instanceof Error) {
    logger.error('Unhandled rejection', {
      message: reason.message,
      stack: reason.stack,
    });
  } else {
    const detail =
      typeof reason === 'string'
        ? reason
        : typeof reason === 'object' && reason !== null
          ? JSON.stringify(reason)
          : String(reason);
    logger.error('Unhandled rejection', { reason: detail });
  }
  process.exit(1);
});

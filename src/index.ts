// Loads and validates .env via env.ts — import first so we never boot with bad config.
import { env } from './config/env.js';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { businessLimiter } from './middlewares/rateLimit.middleware.js';
import { apiRouter } from './routes/index.js';

const app = express();

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

const server = app.listen(Number(env.PORT), () => {
  console.log(`Server is running on Port ${env.PORT}`);
});

// listen() can fail before the server accepts connections — attach 'error' so we log instead of an unhandled throw.
server.on('error', (err: NodeJS.ErrnoException) => {
  if (err.code === 'EADDRINUSE') {
    // Same port as another process (common when an old node is still bound).
    console.error(
      `Port ${env.PORT} is already in use — another process (often an old node) is still listening.\nStop it, then restart: lsof -i :${env.PORT}`,
    );
  } else {
    // Any other bind/listen failure — surface the real errno/message for debugging.
    console.error('Server failed to start:', err);
  }
  process.exit(1);
});

# Mahjozly — Complete Learning & Building Roadmap

Build one thing at a time. Learn only what you need when you need it. Same approach that built BizxFlow.

---

## Phase 1 — TypeScript Foundation
**Goal:** Get comfortable with TypeScript before touching the project

### Watch
- Search YouTube: "TypeScript crash course for JavaScript developers"
- Best options: Traversy Media or Fireship TypeScript crash course
- Time: 1-2 hours max
- Do NOT code along — just watch and understand

### What to understand
- Basic types — string, number, boolean, array
- Interfaces and type aliases
- Functions with types
- Classes with types
- Generics basics
- How TypeScript works with Node.js

### Then immediately
- Open your BizxFlow code
- Read it and mentally think — what type would this variable be
- That is enough for now

---

## Phase 2 — Project Setup
**Goal:** Get Mahjozly backend running with TypeScript

### Watch
- Search YouTube: "Node.js Express TypeScript setup 2024"
- Time: 30 minutes

### Build
```
mkdir mahjozly-backend
cd mahjozly-backend
npm init -y
```

Install these:
```
npm install express dotenv cors helmet morgan express-rate-limit
npm install -D typescript ts-node nodemon @types/express @types/node @types/cors @types/morgan eslint prettier
```

Setup in this order:
1. tsconfig.json
2. .env file
3. .gitignore
4. ESLint + Prettier config
5. src/config/env.ts — validate all env variables at startup and crash early if any are missing
6. src/index.ts — basic Express server running
7. npm run dev working with nodemon

### Folder structure to create
```
src/
├── config/
│   └── env.ts          ← validates all env vars at startup
├── lib/
│   ├── database.ts     ← Prisma singleton
│   └── redis.ts        ← Redis singleton
├── controllers/
├── services/           ← all business logic lives here
├── repositories/       ← all Prisma queries live here
├── middlewares/
├── routes/
├── queues/             ← BullMQ queue definitions
├── workers/            ← BullMQ job processors
├── types/              ← shared TypeScript interfaces and type extensions
├── utils/
├── validations/
└── index.ts
```

### Why 3 layers instead of 2
Controllers handle HTTP only. Services handle business logic only. Repositories handle database only.
This means you can change your database tomorrow without touching a single controller.
This means you can test your business logic without spinning up Express.
This is what production codebases look like.

### env.ts — validate at startup
```typescript
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.string().default('8000'),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string().default('7d'),
  REDIS_URL: z.string(),
  CLOUDINARY_CLOUD_NAME: z.string(),
  CLOUDINARY_API_KEY: z.string(),
  CLOUDINARY_API_SECRET: z.string(),
  SMTP_HOST: z.string(),
  SMTP_PORT: z.string(),
  SMTP_USER: z.string(),
  SMTP_PASS: z.string(),
  CLIENT_URL: z.string().url(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Missing or invalid environment variables:');
  console.error(parsed.error.format());
  process.exit(1); // crash immediately — do not start the server
}

export const env = parsed.data;
```

### lib/database.ts — Prisma singleton
```typescript
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

### Rate limit strategy
Define different limits per route group in `src/middlewares/rateLimit.middleware.ts`:

```typescript
import rateLimit from 'express-rate-limit';

// Auth routes — strictest — prevent brute force attacks
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: { success: false, message: 'Too many attempts, please try again later' },
});

// Public booking routes — moderate — customers submitting bookings
export const publicLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: { success: false, message: 'Too many requests, please try again later' },
});

// Business dashboard routes — relaxed — authenticated users managing their account
export const businessLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { success: false, message: 'Too many requests, please try again later' },
});
```

Apply per route group in `src/routes/`:
```typescript
router.use('/api/v1/auth', authLimiter);
router.use('/api/v1/public', publicLimiter);
router.use('/api/v1/business', businessLimiter);
router.use('/api/v1/bookings', businessLimiter);
```

### Done when
Server runs on localhost:8000 with TypeScript and nodemon watching for changes. App crashes immediately if any env variable is missing. Different rate limits applied per route group.

---

## Phase 3 — PostgreSQL + Prisma + Docker
**Goal:** Database running locally and schema created

### Watch
- Search YouTube: "Prisma crash course with PostgreSQL 2024"
- Search YouTube: "Docker PostgreSQL local setup"
- Time: 1-2 hours total

### Setup Docker for local PostgreSQL
- Search YouTube: "Docker PostgreSQL setup for beginners"
- Install Docker Desktop
- Create docker-compose.yml with PostgreSQL and Redis services
- Run docker compose up

### docker-compose.yml
```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_USER: mahjozly
      POSTGRES_PASSWORD: mahjozly
      POSTGRES_DB: mahjozly
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
```

### Install Prisma
```
npm install prisma @prisma/client
npx prisma init
```

### Build your schema
Write this in prisma/schema.prisma:

```prisma
model User {
  id           String    @id @default(cuid())
  nameEn       String
  nameAr       String?
  email        String    @unique
  password     String
  logo         String?
  slug         String    @unique
  descriptionEn String?
  descriptionAr String?
  phone        String?
  businessType String
  bankName     String?
  accountName  String?
  iban         String?
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
  services     Service[]
  bookings     Booking[]
  availability Availability[]
}

model Service {
  id            String    @id @default(cuid())
  nameEn        String
  nameAr        String?
  descriptionEn String?
  descriptionAr String?
  basePrice     Decimal
  userId        String
  user          User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  addons        Addon[]
  availability  Availability[]
  bookings      Booking[]
}

model Addon {
  id           String   @id @default(cuid())
  nameEn       String
  nameAr       String?
  pricePerUnit Decimal             ← price for one unit (one chair, one hour, one person)
  unit         String?             ← "chair", "hour", "person" — display only
  serviceId    String
  service      Service  @relation(fields: [serviceId], references: [id], onDelete: Cascade)
  bookingAddons BookingAddon[]
}

model Availability {
  id        String   @id @default(cuid())
  date      DateTime
  isBooked  Boolean  @default(false)
  isBlocked Boolean  @default(false)
  serviceId String
  service   Service  @relation(fields: [serviceId], references: [id], onDelete: Cascade)
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([serviceId, date])    ← customer checking available dates for a service
  @@index([userId, date])       ← business viewing their calendar
}

model Booking {
  id             String        @id @default(cuid())
  customerName   String
  customerEmail  String
  customerPhone  String
  customerNotes  String?
  date           DateTime
  totalPrice     Decimal
  status         BookingStatus @default(PENDING)
  slipUrl        String?
  expiresAt      DateTime?
  serviceId      String
  service        Service       @relation(fields: [serviceId], references: [id])
  userId         String
  user           User          @relation(fields: [userId], references: [id])
  createdAt      DateTime      @default(now())
  updatedAt      DateTime      @updatedAt
  bookingAddons  BookingAddon[]

  @@index([userId, date])       ← business fetching their bookings by date
  @@index([userId, status])     ← filtering by status is very frequent
  @@index([serviceId])          ← looking up bookings per service
}

model BookingAddon {
  id        String  @id @default(cuid())
  bookingId String
  booking   Booking @relation(fields: [bookingId], references: [id], onDelete: Cascade)
  addonId   String
  addon     Addon   @relation(fields: [addonId], references: [id])
  quantity  Int             ← how many the customer picked
  unitPrice Decimal         ← price per unit at time of booking — never recalculate from current addon
  total     Decimal         ← quantity × unitPrice — stored so old bookings are never affected by price changes
}

enum BookingStatus {
  PENDING
  CONFIRMED
  SLIP_UPLOADED
  COMPLETED
  EXPIRED
  CANCELLED
}
```

### Run migration
```
npx prisma migrate dev --name init
npx prisma generate
```

### Done when
Database tables created and Prisma client working as a singleton.

---

## Phase 4 — Logging
**Goal:** Structured logging in place before writing any real code

### Why do this now
morgan only logs HTTP requests. When something breaks in production you need to know what happened inside your app — which service failed, what the error was, what the user was doing. Without structured logging you are blind.

### Watch
- Search YouTube: "Winston logger Node.js setup"
- Time: 20 minutes

### Install
```
npm install winston winston-daily-rotate-file uuid
npm install -D @types/uuid
```

### Build
1. src/middlewares/requestId.middleware.ts — attach a unique ID to every request
2. src/utils/logger.ts — Winston setup with two transports
   - Console transport in development — colorized, readable
   - File transport in production — JSON format, daily rotation, kept 30 days
3. Replace all console.log in your code with logger.info, logger.error, logger.warn

### requestId.middleware.ts
```typescript
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

export const requestId = (req: Request, res: Response, next: NextFunction) => {
  req.id = uuidv4();
  res.setHeader('X-Request-ID', req.id); // send it back in the response header too
  next();
};
```

Add `id` to the Express Request type in `src/types/express.d.ts`:
```typescript
declare namespace Express {
  interface Request {
    id: string;
  }
}
```

Wire it as the very first middleware in `src/index.ts` before everything else. Then include `req.id` in every log so you can trace exactly what happened during a single request when debugging production issues.

### logger.ts
```typescript
import winston from 'winston';
import 'winston-daily-rotate-file';

const { combine, timestamp, json, colorize, simple } = winston.format;

const fileTransport = new winston.transports.DailyRotateFile({
  filename: 'logs/app-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '30d',
  format: combine(timestamp(), json()),
});

export const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  transports: [
    process.env.NODE_ENV === 'production'
      ? fileTransport
      : new winston.transports.Console({ format: combine(colorize(), simple()) }),
  ],
});
```

### Done when
All logs go through Winston. No console.log anywhere in the codebase. Every request has a unique ID visible in logs and in the response header `X-Request-ID`.

---

## Phase 5 — Error Handling
**Goal:** All errors caught, formatted consistently, and tracked in production

### Install
```
npm install @sentry/node
```

### Build in this order
1. src/utils/ApiError.ts — custom error class with statusCode and isOperational flag
2. src/utils/ApiResponse.ts — standard success response format
3. src/middlewares/errorHandler.middleware.ts — global error handler
4. src/middlewares/notFound.middleware.ts — 404 handler
5. Wire both into src/index.ts at the very bottom after all routes
6. Initialize Sentry at the very top of src/index.ts before anything else

### ApiError.ts
```typescript
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public isOperational = true,
    public errors: unknown[] = []
  ) {
    super(message);
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
```

### errorHandler.middleware.ts
```typescript
import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';
import { Prisma } from '@prisma/client';
import { ZodError } from 'zod';
import { logger } from '../utils/logger';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Zod validation errors
  if (err instanceof ZodError) {
    return res.status(422).json({
      success: false,
      message: 'Validation failed',
      errors: err.errors.map(e => ({ field: e.path.join('.'), message: e.message })),
    });
  }

  // Prisma unique constraint errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      return res.status(409).json({ success: false, message: 'Resource already exists' });
    }
    if (err.code === 'P2025') {
      return res.status(404).json({ success: false, message: 'Resource not found' });
    }
  }

  // Known operational errors (ApiError)
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...(err.errors.length && { errors: err.errors }),
    });
  }

  // Unknown errors — log and hide details from client
  logger.error('Unhandled error', { error: err.message, stack: err.stack, path: req.path });
  return res.status(500).json({ success: false, message: 'Internal server error' });
};
```

### index.ts — handle unhandled rejections
```typescript
process.on('uncaughtException', (err) => {
  logger.error('Uncaught exception', { error: err.message });
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled rejection', { reason });
  process.exit(1);
});
```

### Sentry — production error tracking
Create a free project at sentry.io and get your DSN. Initialize at the very top of `src/index.ts`:

```typescript
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: env.SENTRY_DSN,
  environment: env.NODE_ENV,
  enabled: env.NODE_ENV === 'production', // only runs in production
});
```

Add `SENTRY_DSN` to your `env.ts` schema:
```typescript
SENTRY_DSN: z.string().optional(), // optional so local dev works without it
```

Then capture unknown errors in the error handler before sending the 500 response:
```typescript
// Unknown errors — capture in Sentry and hide details from client
Sentry.captureException(err);
logger.error('Unhandled error', { error: err.message, stack: err.stack, path: req.path, requestId: req.id });
return res.status(500).json({ success: false, message: 'Internal server error' });
```

Sentry will alert you immediately when something breaks in production with a full stack trace, request details, and the request ID so you can match it to your logs.

### Done when
Every error in the app — Zod, Prisma, or custom — goes through one handler and returns the same shape. Unknown errors are captured in Sentry in production.

---

## Phase 6 — Auth
**Goal:** Register and login working with TypeScript and Zod

### Watch
- Search YouTube: "Zod validation crash course"
- Time: 30 minutes
- You already know JWT and bcrypt — just apply in TypeScript

### Install
```
npm install bcryptjs jsonwebtoken zod
npm install -D @types/bcryptjs @types/jsonwebtoken
```

### Build in this order — follow the 3-layer pattern
1. src/validations/auth.validation.ts — Zod schemas
2. src/repositories/auth.repository.ts — findByEmail, createUser — only Prisma queries here
3. src/services/auth.service.ts — register and login logic — calls repository, never touches Prisma directly
4. src/controllers/auth.controller.ts — calls service, returns response — no business logic here
5. src/middlewares/auth.middleware.ts — JWT verify middleware
6. src/routes/auth.routes.ts — POST /api/v1/auth/register and login
7. Wire routes into src/index.ts

### How the 3 layers look
```typescript
// repository — only knows about Prisma
export const findUserByEmail = (email: string) =>
  prisma.user.findUnique({ where: { email } });

// service — only knows about business rules
export const loginUser = async (email: string, password: string) => {
  const user = await findUserByEmail(email);
  if (!user) throw new ApiError(401, 'Invalid credentials');
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new ApiError(401, 'Invalid credentials');
  const token = jwt.sign({ id: user.id }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
  return { token, user };
};

// controller — only knows about HTTP
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const result = await loginUser(email, password);
    return res.status(200).json(new ApiResponse(200, result, 'Login successful'));
  } catch (err) {
    next(err); // always pass to error handler
  }
};
```

### Done when
- POST /api/v1/auth/register creates a user in database
- POST /api/v1/auth/login returns JWT token
- Protected route returns 401 without token
- All errors pass through the global error handler

---

## Phase 7 — Business Profile
**Goal:** Business can view and update their profile

### Watch
- Search YouTube: "Cloudinary Node.js image upload multer"
- Time: 20 minutes
- You already know this from BizxFlow

### Install
```
npm install cloudinary multer
npm install -D @types/multer
```

### Build in this order
1. src/utils/cloudinary.ts — cloudinary config
2. src/middlewares/upload.middleware.ts — multer setup with file type and size validation
3. src/repositories/business.repository.ts — findById, updateProfile
4. src/services/business.service.ts — getProfile, updateProfile logic
5. src/controllers/business.controller.ts — calls service
6. src/routes/business.routes.ts — GET and PATCH /api/v1/business/profile

### upload.middleware.ts — validate file type and size
```typescript
import multer from 'multer';
import { ApiError } from '../utils/ApiError';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (req, file, cb) => {
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.mimetype)) {
      return cb(new ApiError(400, 'Only JPEG, PNG, and WebP images are allowed') as unknown as null, false);
    }
    cb(null, true);
  },
});

export default upload;
```

### Done when
Business can update their name, logo, bank details, phone, description. Invalid file types and oversized files are rejected.

---

## Phase 8 — Services and Addons
**Goal:** Business can add and manage their services and addons

### Build in this order — follow the 3-layer pattern every time
1. src/validations/service.validation.ts — Zod schemas
2. src/repositories/service.repository.ts — all Prisma queries
3. src/services/service.service.ts — business logic
4. src/controllers/service.controller.ts — HTTP layer
5. src/routes/service.routes.ts
6. Same pattern for addons

### Done when
Business can create, read, update, delete services and addons.

---

## Phase 9 — Availability
**Goal:** Business can set and block available dates

### Build in this order
1. src/validations/availability.validation.ts
2. src/repositories/availability.repository.ts
3. src/services/availability.service.ts
4. src/controllers/availability.controller.ts
5. src/routes/availability.routes.ts

### Done when
- Business can add available dates
- Business can manually block a date
- Booked dates show as unavailable

---

## Phase 10 — Public Booking Page
**Goal:** Customer can view business page and submit a booking

### Install
```
npm install nodemailer
npm install -D @types/nodemailer
```

### Build in this order
1. src/repositories/public.repository.ts — getBusinessBySlug, getAvailability, createBooking
2. src/utils/sendEmail.ts — Nodemailer setup with HTML email templates
3. src/services/public.service.ts
   - getBusinessProfile — fetch business info and services by slug
   - getAvailableDates — fetch open dates for a service
   - submitBooking — create booking, trigger emails
4. src/controllers/public.controller.ts
5. src/routes/public.routes.ts — no auth middleware on these routes
   - GET /api/v1/public/:slug
   - GET /api/v1/public/:slug/services/:serviceId/availability
   - POST /api/v1/public/bookings
6. Send confirmation email to customer on booking submit
7. Send notification email to business on new booking

### Done when
Customer can view business page and submit a booking. Both customer and business receive emails.

---

## Phase 11 — Booking Management
**Goal:** Business can manage bookings through full status flow

### Build in this order
1. src/repositories/booking.repository.ts — all booking queries with pagination
2. src/services/booking.service.ts — status transition logic with guards
3. src/controllers/booking.controller.ts
   - GET /api/v1/bookings — all bookings with filtering and pagination
   - GET /api/v1/bookings/:id — single booking
   - PATCH /api/v1/bookings/:id/confirm
   - PATCH /api/v1/bookings/:id/complete
   - PATCH /api/v1/bookings/:id/cancel
4. PATCH /api/v1/public/bookings/:id/slip — customer uploads payment slip
5. Email customer at every status change

### Add status transition guards in the service layer
```typescript
// services/booking.service.ts
const validTransitions: Record<BookingStatus, BookingStatus[]> = {
  PENDING: ['CONFIRMED', 'CANCELLED', 'EXPIRED'],
  CONFIRMED: ['SLIP_UPLOADED', 'CANCELLED'],
  SLIP_UPLOADED: ['COMPLETED', 'CANCELLED'],
  COMPLETED: [],
  EXPIRED: [],
  CANCELLED: [],
};

export const transitionBooking = async (id: string, newStatus: BookingStatus, userId: string) => {
  const booking = await findBookingById(id);
  if (!booking) throw new ApiError(404, 'Booking not found');
  if (booking.userId !== userId) throw new ApiError(403, 'Forbidden');
  if (!validTransitions[booking.status].includes(newStatus)) {
    throw new ApiError(400, `Cannot transition from ${booking.status} to ${newStatus}`);
  }
  return updateBookingStatus(id, newStatus);
};
```

### Done when
Full status flow works — PENDING → CONFIRMED → SLIP_UPLOADED → COMPLETED. Invalid transitions are rejected.

---

## Phase 12 — Dashboard
**Goal:** Business sees basic stats

### Build
1. src/repositories/dashboard.repository.ts — aggregation queries
2. src/services/dashboard.service.ts
3. GET /api/v1/business/dashboard
   - Total bookings
   - Upcoming bookings
   - Pending actions count
   - Revenue this month
   - Use Prisma aggregation queries

### Done when
Dashboard returns real stats from database.

---

## Phase 13 — Auto Expiry with Redis
**Goal:** PENDING bookings auto expire after 24-48 hours

### Watch
- Search YouTube: "Redis Node.js crash course"
- Search YouTube: "BullMQ Node.js job scheduling"
- Time: 1-2 hours

### Install
```
npm install redis bullmq
```

### Build
1. src/lib/redis.ts — Redis singleton connection
2. src/queues/booking.queue.ts — BullMQ queue setup
3. src/workers/booking.worker.ts — job processor
4. When booking is created in the service — add job with 24 hour delay
5. Worker runs — checks if still PENDING — marks as EXPIRED — sends email

### redis.ts — singleton
```typescript
import { createClient } from 'redis';
import { logger } from '../utils/logger';

export const redis = createClient({ url: env.REDIS_URL });

redis.on('error', (err) => logger.error('Redis error', { error: err.message }));
redis.connect();
```

### Done when
PENDING bookings automatically expire after 24-48 hours.

---

## Phase 14 — Testing with Jest
**Goal:** Core routes have tests

### Watch
- Search YouTube: "Jest Supertest Node.js API testing"
- Time: 1 hour

### Install
```
npm install -D jest supertest ts-jest @types/jest @types/supertest
```

### Write tests for
- POST /api/v1/auth/register
- POST /api/v1/auth/login
- POST /api/v1/public/bookings
- PATCH /api/v1/bookings/:id/confirm
- Test invalid status transitions are rejected
- Test env validation crashes on missing vars

### Use a separate test database
```
DATABASE_URL=postgresql://mahjozly:mahjozly@localhost:5432/mahjozly_test
```

### Done when
npm test runs and passes for core routes.

---

## Phase 15 — Swagger Docs
**Goal:** Full API documentation

### Watch
- You already know Swagger from BizxFlow
- Just apply same pattern in TypeScript

### Done when
All endpoints documented at /api-docs with JWT auth.

---

## Phase 16 — GitHub Actions CI/CD
**Goal:** Tests run automatically on every push

### Watch
- Search YouTube: "GitHub Actions Node.js CI/CD pipeline"
- Time: 30 minutes

### Build
Create .github/workflows/ci.yml:
- On every push to main
- Install dependencies
- Run npm test
- If tests fail — block merge

### Done when
Every push to GitHub triggers automatic test run.

---

## Phase 17 — Deploy Backend
**Goal:** Backend live on Railway

### Steps
- You already know Railway from BizxFlow
- Add PostgreSQL plugin on Railway
- Add Redis plugin on Railway
- Set environment variables — all will be validated at startup
- Deploy

### Done when
API live at mahjozly-production.up.railway.app

---

## Phase 18 — Frontend with Next.js
**Goal:** Build the UI

### Watch
- Search YouTube: "Next.js crash course 2024 for beginners"
- Search YouTube: "Zustand crash course"
- Time: 2-3 hours total

### Install
```
npx create-next-app@latest mahjozly-frontend --typescript --tailwind --app
cd mahjozly-frontend
npm install axios zustand react-hook-form zod @hookform/resolvers
```

### Pages to build in order
1. Landing page — mahjozly.com
2. Register page — business signup
3. Login page
4. Dashboard — business bookings and stats
5. Services page — manage services and addons
6. Availability page — set available dates
7. Public booking page — mahjozly.com/slug
8. Booking confirmation page

### Done when
Full flow works end to end — business signs up, adds services, customer books, emails sent.

---

## Phase 19 — Deploy Frontend
**Goal:** Frontend live on Vercel

### Steps
- Push to GitHub
- Connect repo to Vercel
- Set NEXT_PUBLIC_API_URL environment variable
- Deploy

### Done when
mahjozly.com (or your domain) is live and working end to end.

---

## Summary Timeline

| Phase | Task | Time Estimate |
|-------|------|--------------|
| 1 | TypeScript crash course | 2 days |
| 2 | Project setup + env validation | 1 day |
| 3 | PostgreSQL + Prisma + Docker | 3 days |
| 4 | Logging + request IDs | 1 day |
| 5 | Global error handling + Sentry | 1 day |
| 6 | Auth | 3 days |
| 7 | Business profile | 2 days |
| 8 | Services and addons | 3 days |
| 9 | Availability | 2 days |
| 10 | Public booking page | 3 days |
| 11 | Booking management | 4 days |
| 12 | Dashboard | 2 days |
| 13 | Redis auto expiry | 3 days |
| 14 | Jest testing | 3 days |
| 15 | Swagger docs | 2 days |
| 16 | GitHub Actions | 1 day |
| 17 | Deploy backend | 1 day |
| 18 | Next.js frontend | 2-3 weeks |
| 19 | Deploy frontend | 1 day |

**Total backend: roughly 6-7 weeks at 2 hours daily**
**Total frontend: roughly 2-3 weeks at 2 hours daily**

---

## What Changed From The Original

**Request IDs** — added `requestId` middleware that attaches a unique UUID to every request and sends it back as `X-Request-ID` in the response header. Every log line includes the request ID so you can trace exactly what happened during a single request when debugging production issues.

**Sentry** — added to Phase 5. Unknown errors are captured in Sentry in production and you get an immediate alert with a full stack trace, request details, and the request ID to match against your logs. Only runs in production — local dev works without a DSN.

**Rate limit strategy** — `express-rate-limit` was already installed but with no rules defined. Added three tiers: auth routes get the strictest limit to prevent brute force attacks, public routes get a moderate limit, business routes get a relaxed limit for authenticated users managing their account.

**Database indexes** — added `@@index` on `Booking` for `userId+date`, `userId+status`, and `serviceId`. Added `@@index` on `Availability` for `serviceId+date` and `userId+date`. These are the most frequent queries in the app. Without indexes Prisma does a full table scan every time which gets slow as data grows.

**Removed express-mongo-sanitize** — that package sanitizes MongoDB operator injection. You are using PostgreSQL. Prisma handles SQL injection through parameterized queries by default so this package was irrelevant and incorrect for your stack.

**Added queues/ and workers/ to folder structure** — Phase 13 creates BullMQ queues and workers but the folders were missing from the structure defined in Phase 2. Cursor needs to know where they live from the start.

**Folder structure** — Separated `config/` and `lib/`. Config now only holds `env.ts`. Singleton connections (Prisma, Redis) moved to `lib/` which is the common convention. Removed `models/` which would sit empty in a Prisma project. Added `types/` for shared TypeScript interfaces like `req.user` extensions.

**Addon schema** — Changed from a flat fixed price to a quantity based model. `price` became `pricePerUnit` and `unit` was added for display. `BookingAddon` now stores `quantity`, `unitPrice`, and `total` separately so old bookings are never affected when a business changes their prices.

**Logging** — Added Phase 4 with Winston. morgan only logs requests. Winston logs everything happening inside your app. You need this to debug production issues.

**Error handling** — Moved up to Phase 5 and made it much more complete. Now catches Zod errors, Prisma errors, and unknown errors all in one place. Original only had a custom error class with no global handler.

**Env validation** — Added env.ts that validates all environment variables at startup and crashes immediately if anything is missing. Original just used dotenv with no validation.

**Database** — Added Prisma singleton to prevent connection pool exhaustion. Added onDelete: Cascade on relations. Added updatedAt fields. Added Docker Compose with Redis included.

**File uploads** — Added file type and size validation to the upload middleware. Original had no validation.

**Status transitions** — Added guards in the service layer so invalid booking transitions are rejected with a clear error. Original had no protection against this.

**Unhandled rejections** — Added process-level handlers for uncaughtException and unhandledRejection so the app crashes cleanly instead of silently failing.

**Test database** — Added note to use a separate test database so tests do not touch your real data.

---

## Repo Setup

Two separate GitHub repositories — one for backend, one for frontend. They deploy independently. Backend to Railway, frontend to Vercel. No confusion between pipelines.

```
mahjozly-backend/     ← this repo
mahjozly-frontend/    ← separate repo
```

This file lives in the root of `mahjozly-backend/` and is listed in `.gitignore` so it never gets pushed. Cursor reads it as context while you build.

```
mahjozly-backend/
├── src/
├── prisma/
├── .env
├── .gitignore         ← add ROADMAP.md here
└── ROADMAP.md         ← this file
```

---



- Learn only when you are about to use it
- Build first — perfect later
- One phase at a time — never jump ahead
- When stuck — Google the exact error — do not watch new tutorials
- Commit to GitHub after every feature — not at the end
- Test manually in Postman after every endpoint
- Do not start frontend until backend is fully working and deployed
- Controllers never touch Prisma directly — that is what repositories are for
- Services never touch Express — that is what controllers are for
- All errors pass through the global error handler — never send a response directly in a catch block

---

*Same approach that built BizxFlow. Trust the process.*

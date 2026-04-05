# Mahjozly — Complete Learning & Building Roadmap

Build one thing at a time. Learn only what you need when you need it. Same approach that built BizxFlow.

---

## Progress checklist

**How to use:** tick `[x]` when something is truly done; leave `[ ]` for not started. Edit this section whenever you ship a slice. *(This `docs/` folder is gitignored — the checklist stays on your machine unless you change that.)*

### At a glance

| Area | Status |
|------|--------|
| Phase 1 — TypeScript foundation | Optional / self-paced — not tracked in repo |
| Phase 2 — Project setup | **Done** |
| Phase 3 — DB + Prisma + Docker | **Next** — not started in repo |
| Phases 4–19 | Not started |

### Phase 1 — TypeScript foundation

- [ ] Watched / worked through TS basics (crash course — no codealong required per roadmap)

### Phase 2 — Project setup

- [x] `tsconfig` + `npm` scripts (`dev`, `build`, `start`, `lint`, `lint:fix`, `format`)
- [x] `src/config/env.ts` — Zod validation, crash on bad/missing env
- [x] `src/index.ts` — helmet, cors, `express.json`, morgan, listen + clear `EADDRINUSE` / error logging
- [x] API mounted at `/api` → v1 router → `/health` (controller → service pattern)
- [x] ESLint (flat config) + Prettier
- [x] `express-rate-limit` — `businessLimiter` on `/api`; `authLimiter` / `publicLimiter` exported for later route groups
- [ ] Wire **auth** vs **public** vs **business** route groups with their limiters (as in "Rate limit strategy" below) once those routers exist
- [ ] Full folder skeleton from Phase 2 (`repositories/`, `queues/`, `workers/`, `lib/database.ts`, …) — add as you need them

### Phase 3 — PostgreSQL + Prisma + Docker

- [ ] Docker Desktop + `docker-compose.yml` (Postgres + Redis)
- [ ] `npm i prisma @prisma/client` + `npx prisma init`
- [ ] `prisma/schema.prisma` matches **Build your schema** in this doc + `npx prisma migrate dev`
- [ ] `prisma/seed.ts` — seed Category table with fixed platform categories
- [ ] `npx prisma db seed`
- [ ] `src/lib/database.ts` — Prisma singleton + generate client

### Phase 4 — Logging

- [ ] Winston (or Pino) + request ID middleware; replace ad-hoc `console` where it matters

### Phase 5 — Error handling

- [ ] Global error middleware + stable JSON shape; optional Sentry in prod

### Phase 6 — Auth

- [ ] Register / login, JWT (or sessions), `auth` routes + `auth.middleware`
- [ ] Role split after register — USER vs ORG

### Phase 7 — Business profile

- [ ] Org profile CRUD + upload (Cloudinary) per roadmap

### Phase 8 — Services and addons

- [ ] Service + addon CRUD (3-layer + Zod)

### Phase 9 — Availability

- [ ] Availability / calendar behavior per roadmap

### Phase 10 — Public booking page

- [ ] Public routes + email (Nodemailer) flow

### Phase 11 — Booking management

- [ ] Business booking APIs + status transitions + guards

### Phase 12 — Dashboard

- [ ] Aggregations / stats endpoint(s)

### Phase 13 — Auto expiry (Redis)

- [ ] BullMQ (or similar) + Redis-backed jobs

### Phase 14 — Testing

- [ ] Jest + Prisma test DB strategy

### Phase 15 — Swagger

- [ ] OpenAPI / Swagger for API docs

### Phase 16 — CI/CD

- [ ] GitHub Actions — lint, build, test

### Phase 17 — Deploy backend

- [ ] Hosted API (e.g. Railway) + env + DB

### Phase 18 — Frontend (Next.js)

- [ ] App router app + auth + role-based dashboard + booking UX

### Phase 19 — Deploy frontend

- [ ] Vercel (or chosen host) + `NEXT_PUBLIC_API_URL`

---

## Product decisions (locked)

These were decided before writing any code. Do not revisit them mid-build.

### Platform model
- Not a marketplace — orgs bring their own customers to the platform
- Public listing of orgs is a side benefit, not the core acquisition channel
- Platform takes no cut of transactions (no payments in MVP)

### Registration flow
- Single registration form — email + password
- After register: user picks **USER** or **ORG** role
- Role is permanent — no switching

### USER dashboard pages
- **Home / Browse** — search and browse all orgs (name, type, location)
- **Services** — browse by category (fixed platform categories), see which orgs offer each service
- **My bookings** — all bookings with status
- **Tracking** — single booking detail, status timeline, cancel option
- **Profile** — update name, phone, password

### ORG dashboard pages
- **Dashboard** — overview stats (total bookings, pending count, upcoming)
- **Bookings** — all incoming bookings, filter by status/date, confirm or cancel
- **Create service** — add a service (name, category, price, duration, max per slot, description)
- **Addons** — manage addons (name, price) — shown to user during booking
- **Calendar** — visual view of bookings by day/week
- **Profile / Settings** — update org name, logo, description, location, phone, email

### Booking rules
- User must be registered to book — no guest checkout
- Booking flow: pick service → pick date/time → pick addons (optional) → see total → confirm
- Total = service price + sum of (addon price × quantity chosen)
- `totalPrice` is stored at booking time — not calculated dynamically — so price changes don't affect old bookings
- Every status change must insert a `BookingStatusLog` row manually in the service layer
- Before creating a booking, check `Service.maxPerSlot` against existing bookings for that slot

### Categories
- Fixed list — managed by platform admin only
- Orgs pick a category when creating a service
- Users browse services by category
- Categories are seeded via `prisma/seed.ts` — never entered manually
- Adding a new category = add a row via seed, no schema migration needed

### Deferred to post-MVP
- Google Calendar integration
- Reviews and star ratings
- Working hours / availability slots
- Payment processing
- WhatsApp / SMS notifications
- Revenue tracking on dashboard
- Float → Decimal on price fields (do before real users)

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
  SENTRY_DSN: z.string().optional(),
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

// express-rate-limit uses in-memory counters per process — swap to a Redis store when running multiple instances.

// Auth routes — strictest — prevent brute force attacks
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
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
// Mounted globally on /api; auth and public routes stack their own stricter limiter on top.
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
Write this in `prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─── Enums ───────────────────────────────────────────────

enum Role {
  USER
  ORG
}

enum BookingStatus {
  PENDING
  CONFIRMED
  CANCELLED
  COMPLETED
}

// ─── User ────────────────────────────────────────────────

model User {
  id        String    @id @default(uuid())
  name      String
  email     String    @unique
  phone     String?
  password  String
  role      Role
  createdAt DateTime  @default(now())
  deletedAt DateTime?

  org      Organization?
  bookings Booking[]
}

// ─── Organization ────────────────────────────────────────

model Organization {
  id          String    @id @default(uuid())
  userId      String    @unique
  user        User      @relation(fields: [userId], references: [id])
  name        String
  location    String
  phone       String?
  email       String?
  logo        String?
  description String?
  isVerified  Boolean   @default(false)
  isActive    Boolean   @default(true)
  createdAt   DateTime  @default(now())
  deletedAt   DateTime?

  services Service[]
  addons   Addon[]
  bookings Booking[]

  @@index([deletedAt])
}

// ─── Category ────────────────────────────────────────────

// Fixed list — managed by platform admin, seeded via prisma/seed.ts
// Orgs pick from this when creating a service
// Users browse services by category
model Category {
  id       String    @id @default(uuid())
  name     String    @unique
  slug     String    @unique
  icon     String?
  order    Int       @default(0)

  services Service[]
}

// ─── Service ─────────────────────────────────────────────

model Service {
  id          String       @id @default(uuid())
  orgId       String
  org         Organization @relation(fields: [orgId], references: [id])
  categoryId  String
  category    Category     @relation(fields: [categoryId], references: [id])
  name        String
  description String?
  price       Float
  duration    Int          // minutes
  maxPerSlot  Int          @default(1)
  isActive    Boolean      @default(true)
  deletedAt   DateTime?

  bookings Booking[]

  @@index([deletedAt])
  @@index([orgId])
  @@index([categoryId])
}

// ─── Addon ───────────────────────────────────────────────

// quantity lives on BookingAddon only — this is just the definition
// org creates addons with a name and price; user picks quantity during booking
model Addon {
  id       String       @id @default(uuid())
  orgId    String
  org      Organization @relation(fields: [orgId], references: [id])
  name     String
  price    Float
  isActive Boolean      @default(true)

  bookingAddons BookingAddon[]

  @@index([orgId])
}

// ─── Booking ─────────────────────────────────────────────

// CRITICAL: every status change must insert a BookingStatusLog row manually in the service layer
// CRITICAL: check Service.maxPerSlot against existing bookings for that slot before creating
model Booking {
  id          String        @id @default(uuid())
  userId      String
  user        User          @relation(fields: [userId], references: [id])
  orgId       String
  org         Organization  @relation(fields: [orgId], references: [id])
  serviceId   String
  service     Service       @relation(fields: [serviceId], references: [id])
  scheduledAt DateTime
  totalPrice  Float         // stored at booking time — not recalculated — price changes don't affect old bookings
  notes       String?
  status      BookingStatus @default(PENDING)
  createdAt   DateTime      @default(now())
  deletedAt   DateTime?

  addons    BookingAddon[]
  statusLog BookingStatusLog[]

  @@unique([userId, serviceId, scheduledAt])
  @@index([deletedAt])
  @@index([scheduledAt])
  @@index([orgId, scheduledAt])
  @@index([userId])
}

// ─── Booking addon ───────────────────────────────────────

model BookingAddon {
  id        String  @id @default(uuid())
  bookingId String
  booking   Booking @relation(fields: [bookingId], references: [id])
  addonId   String
  addon     Addon   @relation(fields: [addonId], references: [id])
  quantity  Int     @default(1)

  @@unique([bookingId, addonId])
}

// ─── Booking status log ──────────────────────────────────

model BookingStatusLog {
  id        String        @id @default(uuid())
  bookingId String
  booking   Booking       @relation(fields: [bookingId], references: [id])
  status    BookingStatus
  changedAt DateTime      @default(now())
}
```

### Seed categories
Create `prisma/seed.ts`:

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const categories = [
    { name: 'Hair & Beauty', slug: 'hair-beauty', icon: '✂️', order: 1 },
    { name: 'Health & Wellness', slug: 'health-wellness', icon: '🌿', order: 2 },
    { name: 'Fitness', slug: 'fitness', icon: '💪', order: 3 },
    { name: 'Consulting', slug: 'consulting', icon: '💼', order: 4 },
    { name: 'Events & Venues', slug: 'events-venues', icon: '🎉', order: 5 },
    { name: 'Education', slug: 'education', icon: '📚', order: 6 },
    { name: 'Photography', slug: 'photography', icon: '📷', order: 7 },
    { name: 'Other', slug: 'other', icon: '🔧', order: 99 },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
  }

  console.log('Categories seeded.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

Add to `package.json`:
```json
"prisma": {
  "seed": "ts-node prisma/seed.ts"
}
```

### Run migration and seed
```
npx prisma migrate dev --name init
npx prisma generate
npx prisma db seed
```

### Known limitations to fix before real users
- `price` fields are `Float` — change to `Decimal @db.Decimal(10,2)` before financial data exists
- `User.phone` is nullable — make required when WhatsApp notifications are added
- `Service.maxPerSlot` is not enforced by DB — must check in booking service before creating
- `BookingStatusLog` is not auto-written — insert manually every time `Booking.status` changes

### Done when
Database tables created, Prisma client working as singleton, categories seeded.

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

### Watch
- Search YouTube: "Sentry Node.js setup error tracking"
- Time: 15 minutes

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
  enabled: env.NODE_ENV === 'production',
});
```

Add `SENTRY_DSN` to your `env.ts` schema:
```typescript
SENTRY_DSN: z.string().optional(), // optional so local dev works without it
```

Then capture unknown errors in the error handler before sending the 500 response:
```typescript
Sentry.captureException(err);
logger.error('Unhandled error', { error: err.message, stack: err.stack, path: req.path, requestId: req.id });
return res.status(500).json({ success: false, message: 'Internal server error' });
```

### Done when
Every error in the app — Zod, Prisma, or custom — goes through one handler and returns the same shape. Unknown errors are captured in Sentry in production.

---

## Phase 6 — Auth
**Goal:** Register and login working with TypeScript and Zod

### Watch
- Search YouTube: "JWT authentication Node.js TypeScript 2024"
- Search YouTube: "bcrypt password hashing Node.js"
- Time: 45 minutes total
- You already know JWT and bcrypt — just watch how they wire up in TypeScript

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

### Register flow
- User submits name, email, password, role (USER or ORG)
- Hash password with bcrypt
- Create User row
- If role is ORG — redirect frontend to org profile setup
- If role is USER — redirect frontend to browse page

### How the 3 layers look
```typescript
// repository — only knows about Prisma
export const findUserByEmail = (email: string) =>
  prisma.user.findUnique({ where: { email, deletedAt: null } });

// service — only knows about business rules
export const loginUser = async (email: string, password: string) => {
  const user = await findUserByEmail(email);
  if (!user) throw new ApiError(401, 'Invalid credentials');
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new ApiError(401, 'Invalid credentials');
  const token = jwt.sign({ id: user.id, role: user.role }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
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
- POST /api/v1/auth/register creates a user with correct role
- POST /api/v1/auth/login returns JWT with role embedded
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
3. src/repositories/org.repository.ts — findById, updateProfile
4. src/services/org.service.ts — getProfile, updateProfile logic
5. src/controllers/org.controller.ts — calls service
6. src/routes/org.routes.ts — GET and PATCH /api/v1/business/profile

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
Org can update their name, logo, description, location, phone, email. Invalid file types and oversized files are rejected.

---

## Phase 8 — Services and Addons
**Goal:** Org can add and manage their services and addons

### Build in this order — follow the 3-layer pattern every time
1. src/validations/service.validation.ts — Zod schemas
2. src/repositories/service.repository.ts — all Prisma queries
3. src/services/service.service.ts — business logic
4. src/controllers/service.controller.ts — HTTP layer
5. src/routes/service.routes.ts
6. Same pattern for addons

### Addon rules
- Org defines addon with name and price only — no quantity on the definition
- Quantity is chosen by the user during booking and stored on BookingAddon
- Org can mark addon as inactive to hide it without deleting

### Done when
Org can create, read, update, soft-delete services and addons.

---

## Phase 9 — Availability
**Goal:** Org can set and block available dates

### Build in this order
1. src/validations/availability.validation.ts
2. src/repositories/availability.repository.ts
3. src/services/availability.service.ts
4. src/controllers/availability.controller.ts
5. src/routes/availability.routes.ts

### Done when
- Org can add available dates
- Org can manually block a date
- Booked dates show as unavailable

---

## Phase 10 — Public Booking Page
**Goal:** User can browse orgs, browse services by category, and submit a booking

### Watch
- Search YouTube: "Nodemailer Node.js send email 2024"
- Time: 20 minutes

### Install
```
npm install nodemailer
npm install -D @types/nodemailer
```

### Public routes — no auth middleware on these
```
GET  /api/v1/public/orgs                        ← list all orgs
GET  /api/v1/public/orgs/:id                    ← single org + services
GET  /api/v1/public/categories                  ← all categories
GET  /api/v1/public/categories/:slug/services   ← services by category
POST /api/v1/public/bookings                    ← submit booking (auth required)
```

### Build in this order
1. src/repositories/public.repository.ts — getOrgs, getOrgById, getCategories, getServicesByCategory, createBooking
2. src/utils/sendEmail.ts — Nodemailer setup with HTML email templates
3. src/services/public.service.ts
   - getOrgs — fetch all active verified orgs
   - getServicesByCategory — fetch services filtered by category slug
   - submitBooking — validate slot, check maxPerSlot, calculate total, create booking + addons, send emails
4. src/controllers/public.controller.ts
5. src/routes/public.routes.ts

### Booking total calculation
```
totalPrice = service.price + sum of (addon.price × quantity chosen)
```
Store this on `Booking.totalPrice` at creation time — never recalculate from current prices.

### Emails to send
- Confirmation email to user — booking reference, service, date, total
- Notification email to org — new booking received

### Done when
User can browse orgs and services by category, submit a booking, and both parties receive emails.

---

## Phase 11 — Booking Management
**Goal:** Org can manage bookings through full status flow

### Watch
- No new watch needed — you know this pattern by now

### Status flow
```
PENDING → CONFIRMED → COMPLETED
PENDING → CANCELLED
CONFIRMED → CANCELLED
```

### Build in this order
1. src/repositories/booking.repository.ts — all booking queries with pagination
2. src/services/booking.service.ts — status transition logic with guards
3. src/controllers/booking.controller.ts
   - GET /api/v1/bookings — all bookings with filtering and pagination
   - GET /api/v1/bookings/:id — single booking
   - PATCH /api/v1/bookings/:id/confirm
   - PATCH /api/v1/bookings/:id/complete
   - PATCH /api/v1/bookings/:id/cancel
4. Email user at every status change

### Status transition guard in service layer
```typescript
const validTransitions: Record<BookingStatus, BookingStatus[]> = {
  PENDING: ['CONFIRMED', 'CANCELLED'],
  CONFIRMED: ['COMPLETED', 'CANCELLED'],
  COMPLETED: [],
  CANCELLED: [],
};

export const transitionBooking = async (id: string, newStatus: BookingStatus, orgId: string) => {
  const booking = await findBookingById(id);
  if (!booking) throw new ApiError(404, 'Booking not found');
  if (booking.orgId !== orgId) throw new ApiError(403, 'Forbidden');
  if (!validTransitions[booking.status].includes(newStatus)) {
    throw new ApiError(400, `Cannot transition from ${booking.status} to ${newStatus}`);
  }
  const updated = await updateBookingStatus(id, newStatus);
  // CRITICAL: always write the log
  await createStatusLog(id, newStatus);
  return updated;
};
```

### Done when
Full status flow works. Invalid transitions are rejected. Status log is written on every change.

---

## Phase 12 — Dashboard
**Goal:** Org sees basic stats from database

### Build
1. src/repositories/dashboard.repository.ts — Prisma aggregation queries
2. src/services/dashboard.service.ts
3. GET /api/v1/business/dashboard returns:
   - Total bookings
   - Upcoming bookings
   - Pending count
   - Confirmed count

### Note
No revenue tracking in MVP — prices stored but no payment system yet.

### Done when
Dashboard returns real stats from database.

---

## Phase 13 — Auto Expiry with Redis
**Goal:** PENDING bookings auto cancel after 24 hours

### Watch
- Search YouTube: "Redis Node.js crash course"
- Search YouTube: "BullMQ Node.js job queue tutorial"
- Time: 1-2 hours total
- Watch Redis first — BullMQ builds on top of it

### Install
```
npm install redis bullmq
```

### Build
1. src/lib/redis.ts — Redis singleton connection
2. src/queues/booking.queue.ts — BullMQ queue setup
3. src/workers/booking.worker.ts — job processor
4. When booking is created in the service — add job with 24 hour delay
5. Worker runs — checks if still PENDING — marks as CANCELLED — writes status log — sends email

### redis.ts — singleton
```typescript
import { createClient } from 'redis';
import { logger } from '../utils/logger';

export const redis = createClient({ url: env.REDIS_URL });

redis.on('error', (err) => logger.error('Redis error', { error: err.message }));
redis.connect();
```

### Done when
PENDING bookings automatically cancelled after 24 hours if org does not confirm.

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
- POST /api/v1/auth/register (USER and ORG roles)
- POST /api/v1/auth/login
- POST /api/v1/public/bookings
- PATCH /api/v1/bookings/:id/confirm
- Invalid status transitions are rejected
- Env validation crashes on missing vars

### Use a separate test database
```
DATABASE_URL=postgresql://mahjozly:mahjozly@localhost:5432/mahjozly_test
```

### Done when
`npm test` runs and passes for core routes.

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
API live and `/health` returns 200.

---

## Phase 18 — Frontend with Next.js
**Goal:** Build the full UI with role-based dashboards

### Watch
- Search YouTube: "Next.js crash course 2024 app router"
- Search YouTube: "Zustand state management React tutorial"
- Search YouTube: "React Hook Form Zod validation tutorial"
- Search YouTube: "Tailwind CSS crash course" (if not already familiar)
- Time: 3-4 hours total — watch before starting this phase

### Install
```
npx create-next-app@latest mahjozly-frontend --typescript --tailwind --app
cd mahjozly-frontend
npm install axios zustand react-hook-form zod @hookform/resolvers
```

### Pages — USER
1. Register page — name, email, password, role selection
2. Login page
3. Role selection screen — shown once after register
4. Home / Browse — search and browse all orgs (name, type, location)
5. Services — category grid → services list → org detail
6. Booking flow — service → date/time → addons → total → confirm
7. Booking confirmation page — summary + reference
8. My bookings — list with status badges
9. Booking detail / tracking — status timeline, cancel option
10. Profile — update name, phone, password

### Pages — ORG
1. Register page — name, email, password, role selection
2. Login page
3. Org profile setup — required immediately after ORG register before anything else
4. Dashboard — stats overview (total, pending, upcoming)
5. Bookings — list with filter by status/date, confirm/cancel actions
6. Create service — name, category, price, duration, maxPerSlot, description
7. Addons — manage addons list (name, price, active toggle)
8. Calendar — bookings by day/week view
9. Profile / Settings — update org details, logo

### Done when
Full flow works end to end — org registers, sets up profile, adds services and addons, user registers, browses by category, books, org confirms, user sees status update.

---

## Phase 19 — Deploy Frontend
**Goal:** Frontend live on Vercel

### Steps
- Push to GitHub
- Connect repo to Vercel
- Set `NEXT_PUBLIC_API_URL` environment variable
- Deploy

### Done when
App is live and full booking flow works end to end in production.

---

## Summary Timeline

| Phase | Task | Time Estimate |
|-------|------|--------------|
| 1 | TypeScript crash course | 2 days |
| 2 | Project setup | **Done** |
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

**Database indexes** — added `@@index` on `Booking` for `userId`, `scheduledAt`, and `orgId+scheduledAt`. Added `@@index` on `Service` for `orgId`, `categoryId`, and `deletedAt`. These are the most frequent queries in the app. Without indexes Prisma does a full table scan every time which gets slow as data grows.

**Removed express-mongo-sanitize** — that package sanitizes MongoDB operator injection. You are using PostgreSQL. Prisma handles SQL injection through parameterized queries by default so this package was irrelevant and incorrect for your stack.

**Added queues/ and workers/ to folder structure** — Phase 13 creates BullMQ queues and workers but the folders were missing from the structure defined in Phase 2. Cursor needs to know where they live from the start.

**Folder structure** — Separated `config/` and `lib/`. Config now only holds `env.ts`. Singleton connections (Prisma, Redis) moved to `lib/` which is the common convention. Removed `models/` which would sit empty in a Prisma project. Added `types/` for shared TypeScript interfaces like `req.user` extensions.

**Schema — final decisions from design session**
- `Addon` has no `quantity` field — quantity belongs only on `BookingAddon`
- `Organization` has no `type` or `categoryId` — category lives on `Service` only, so orgs can offer services across any category
- `Category` groups services only — not orgs
- `BookingStatus` enum is `PENDING / CONFIRMED / CANCELLED / COMPLETED` only — no `EXPIRED` or `SLIP_UPLOADED`
- Status transition guards match this enum exactly
- `Booking.totalPrice` stored at creation time — not recalculated dynamically
- `@@unique([userId, serviceId, scheduledAt])` on Booking prevents duplicate bookings
- `@@unique([bookingId, addonId])` on BookingAddon prevents duplicate addons per booking

**Category seeding** — categories are fixed and platform-managed. Added `prisma/seed.ts` and `npx prisma db seed` step. Without seeding, orgs cannot create services.

**Product decisions section** — added at the top so all decisions made during design are documented in one place and not forgotten mid-build.

**Frontend pages updated** — reflect the role-based flow decided during design: USER and ORG see completely different dashboards after the same register/login flow. Removed old slug-based public page concept.

**Watch sections** — added missing watch suggestions for JWT/bcrypt in TypeScript (Phase 6), Nodemailer (Phase 10), BullMQ specifically (Phase 13), and all frontend libraries — Zustand, React Hook Form, Tailwind (Phase 18). Sentry watch added to Phase 5.

**Status transition guards** — updated to match the final `BookingStatus` enum. Removed `EXPIRED` and `SLIP_UPLOADED` which were in the original but not in the schema.

**Logging** — Phase 4 with Winston. morgan only logs requests. Winston logs everything happening inside your app.

**Error handling** — Phase 5 catches Zod errors, Prisma errors, and unknown errors all in one place.

**Unhandled rejections** — process-level handlers for `uncaughtException` and `unhandledRejection` so the app crashes cleanly instead of silently failing.

**Test database** — separate test database so tests do not touch real data.

**BookingStatusLog rule** — added to rules section at the bottom: every status change on Booking must write a BookingStatusLog row, no exceptions.

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

## Rules

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
- Every status change on Booking must write a BookingStatusLog row — no exceptions

---

*Same approach that built BizxFlow. Trust the process.*
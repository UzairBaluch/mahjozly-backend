# Mahjozly

Backend API for **Mahjozly** — a B2B SaaS booking product for service businesses. Product notes and the production roadmap live under **`docs/`** locally; that folder is **gitignored** and is **not** on GitHub.

**GitHub:** [github.com/UzairBaluch/mahjozly-backend](https://github.com/UzairBaluch/mahjozly-backend)

## Stack

- Node.js, **TypeScript**, **Express 5**
- **PostgreSQL** + **Prisma** (schema in `prisma/schema.prisma`)
- **Zod** for environment and request-body validation
- **JWT** auth, **bcrypt** for passwords
- **ESM** (`"type": "module"`), output in `dist/`

## Prerequisites

- Node.js **20+** (LTS recommended; **24** works with the current dev script)
- PostgreSQL reachable from the app (see `.env.example` for `DATABASE_URL`)

## Setup

```bash
npm install
cp .env.example .env
# Edit .env — all keys in src/config/env.ts must be satisfied or the process exits at startup.
npx prisma generate
# Apply migrations when you have them: npx prisma migrate dev
```

## Scripts

| Command                | Description                                   |
| ---------------------- | --------------------------------------------- |
| `npm run dev`          | Rebuild on `src/**/*.ts` changes, run `dist/` |
| `npm run build`        | `tsc` → `dist/`                               |
| `npm start`            | Run compiled app (run `npm run build` first)  |
| `npm run format`       | Prettier write                                |
| `npm run format:check` | Prettier check only                           |
| `npm run lint`         | ESLint                                        |

Local **PORT** comes from `.env` (example uses **8001** to avoid clashes with other apps on **8000**).

## API

- Base path: **`/api`**
- Current version: **`/api/v1`**
- Health: **`GET /api/v1/health`**

### Auth (`/api/v1/auth`)

Stricter rate limiting is applied on this prefix (see `src/routes/v1/index.ts`).

| Method | Path        | Auth   | Description                          |
| ------ | ----------- | ------ | ------------------------------------ |
| `POST` | `/register` | —      | Register (payload validated with Zod) |
| `POST` | `/login`    | —      | Login, returns JWT                   |
| `GET`  | `/me`       | JWT    | Current user                         |
| `GET`  | `/profile`  | JWT    | Same as `/me` (alias)                |

### Business / org (`/api/v1/business`)

All routes below use **`authenticate`** then **`requireOrg`** — only users with role **`ORG`** can access them; **`USER`** receives **403**.

| Method | Path         | Description                                      |
| ------ | ------------ | ------------------------------------------------ |
| `GET`  | `/profile`   | Organization profile for the authenticated org |
| `PATCH`| `/profile`   | Partial profile update (validated body)        |
| `POST` | `/services`  | Create a **Service** row for that org (validated body, **201**) |

Feature code is split by area: **`profile.*`** and **`service.*`** (controllers, services, routes); **`business.routes.ts`** only mounts those routers and the shared auth gates.

## Architecture

- **Controllers** — HTTP only: read `req.user` / `req.body`, call services, send status + **`ApiResponse`**. No Prisma.
- **Services** — business rules and orchestration; throw **`ApiError`** for expected failures.
- **Repositories** — Prisma / DB only. Inserts use names like **`insert*`** (e.g. **`insertService`**) on purpose so they are not confused with Zod **`createServiceSchema`** or app/service-layer **`create*`** helpers at a glance.

Errors go through the **global error middleware**; successes use **`ApiResponse`** (`src/utils/apiResponse.ts`).

## Project layout

```
src/
├── config/           # env validation (Zod)
├── controllers/    # HTTP — auth, health, profile, service
├── services/       # Business logic — auth, health, profile, service
├── repositories/   # Prisma — auth, business (org), service (inserts)
├── validations/    # Zod schemas (auth, business profile, service create)
├── routes/
│   ├── index.ts      # /api → v1
│   └── v1/
│       ├── index.ts          # mounts health, auth, business
│       ├── health.routes.ts
│       ├── auth.routes.ts
│       ├── business.routes.ts  # authenticate + requireOrg → profile + service routers
│       ├── profile.routes.ts
│       └── service.routes.ts
├── middlewares/      # auth, requireOrg, validate, errors, rate limits, request id
├── lib/              # prisma client, redis client
├── types/            # Express augmentation (e.g. req.user)
├── utils/            # ApiError, ApiResponse, asyncHandler, logger
└── index.ts          # Express bootstrap
```

## Cursor / rules

Project rules for the AI assistant live in `.cursor/rules/` (`mahjozly-project.mdc`, `mahjozly-roadmap.mdc`).

# Mahjozly

Backend API for **Mahjozly** — a B2B SaaS booking product for service businesses (see `docs/Mahjozly-Master-Document.md` for product context and `docs/Mahjozly-Roadmap-Production.md` for the build plan).

**GitHub:** [github.com/UzairBaluch/mahjozly-backend](https://github.com/UzairBaluch/mahjozly-backend)

## Stack

- Node.js, **TypeScript**, **Express 5**
- **Zod** for environment validation
- **ESM** (`"type": "module"`), output in `dist/`

## Prerequisites

- Node.js **20+** (LTS recommended; **24** works with the current dev script)

## Setup

```bash
npm install
cp .env.example .env
# Edit .env — all keys in src/config/env.ts must be satisfied or the process exits at startup.
```

## Scripts

| Command            | Description                                      |
| ------------------ | ------------------------------------------------ |
| `npm run dev`      | Rebuild on `src/**/*.ts` changes, run `dist/`    |
| `npm run build`    | `tsc` → `dist/`                                  |
| `npm start`        | Run compiled app (run `npm run build` first)     |
| `npm run format`   | Prettier write                                   |
| `npm run format:check` | Prettier check only                          |

Local **PORT** comes from `.env` (example uses **8001** to avoid clashes with other apps on **8000**).

## API

- Base path: **`/api`**
- Current version: **`/api/v1`**
- Health check: **`GET /api/v1/health`**  
  Example: `http://localhost:<PORT>/api/v1/health`

## Project layout

```
src/
├── config/        # env validation (Zod)
├── controllers/   # HTTP handlers → call services
├── services/      # Business logic
├── repositories/  # DB access (Prisma later)
├── routes/        # apiRouter → v1 → feature routers
├── middlewares/
├── lib/
└── index.ts       # Express app bootstrap
```

## Cursor / rules

Project rules for the AI assistant live in `.cursor/rules/` (`mahjozly-project.mdc`, `mahjozly-roadmap.mdc`).

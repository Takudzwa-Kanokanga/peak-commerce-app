# Mini E-commerce Backend

A minimal TypeScript/Node backend for a small e-commerce sample app.

Features
- REST endpoints for product, cart, checkout, and orders (see `src/controllers`).
- Prisma ORM with PostgreSQL (schema in `prisma/schema.prisma`).
- Redis helpers for caching (see `src/redis.ts` and `src/controllers/product.ts`).
- Email sending via Nodemailer (see `src/services/email.ts`).
- JWT-based auth utilities (see `src/utils/jwt.ts`).

Tech stack
- Node.js + TypeScript
- Express
- Prisma + PostgreSQL
- Redis (optional, for caching)
- Nodemailer for transactional emails

Prerequisites
- Node.js 18+ and npm
- PostgreSQL running and reachable by `DATABASE_URL`
- (Optional) Redis server for caching

Important files
- `src/server.ts` — app entry point
- `src/routes` / `src/controllers` — API routes and business logic
- `prisma/schema.prisma` — Prisma schema
- `prisma/seed.ts` — DB seed script
- `.env` — environment variables (not committed)

Environment variables
Create a `.env` file at project root (this repo includes an example `.env` with placeholders). The important keys used by the app are:

- `DATABASE_URL` — Prisma Postgres connection string (required)
- `JWT_SECRET` — secret used to sign JWTs (required)
- `REDIS_URL` — optional Redis connection string (leave empty if not using Redis)
- `MAIL_HOST` — SMTP host for outgoing email (e.g. Mailtrap)
- `MAIL_PORT` — SMTP port (number)
- `MAIL_USER` — SMTP username
- `MAIL_PASS` — SMTP password
- `NODE_ENV` — `development` | `production` (optional)
- `PORT` — port for the server (optional, default 3000)

Quickstart (local)
1. Install dependencies

```powershell
npm install
```

2. Prepare `.env` (copy and update values)

```powershell
copy .env .env.local
# then edit .env.local with your DB and secrets
```

3. Generate Prisma client

```powershell
npx prisma generate
# or: npm run prisma:generate
```

4. Run migrations and seed DB

```powershell
npm run prisma:migrate
npx prisma db seed
```

5. Start the app in development

```powershell
npm run dev
```

The server will run on `http://localhost:3000` by default and expose a health endpoint at `/health`.

Build / Production

```powershell
npm run build
npm start
```

Prisma notes
- Migrations: `npm run prisma:migrate` (runs `prisma migrate dev`).
- Seed: this repository includes `prisma/seed.ts`. Use `npx prisma db seed` after migrations to run it.

Redis notes
- Redis is optional. The repo uses a lightweight Redis helper in `src/redis.ts`. If `REDIS_URL` is empty the helper may be a no-op — check the file before running.

Email (Nodemailer)
- The project expects SMTP credentials in `MAIL_HOST`, `MAIL_PORT`, `MAIL_USER`, `MAIL_PASS`.
- For local dev, Mailtrap or similar sandbox SMTP providers are recommended.

Common troubleshooting
- "Cannot connect to database": verify `DATABASE_URL`, Postgres is running, and the DB user/password are correct.
- "Prisma client not found": run `npx prisma generate`.
- Type errors on startup: ensure TypeScript dev dependencies are installed and you run `npm install`.

Where to go next
- Explore `src/controllers` to add or modify endpoints.
- Hook up your frontend to `http://localhost:3000` (CORS currently allows `http://localhost:3001`).

Contributing
- Open an issue or PR with changes. Keep changes focused and add tests where appropriate.

License
- This repository is a starter example; include your chosen license if you publish it.

Setup Guide — Mini E-commerce Backend

This guide provides step-by-step local setup commands for Windows PowerShell.

1) Clone and install

```powershell
# from your preferred folder
git clone <repo-url>
cd mini-ecommerce-backend
npm install
```

2) Create / edit environment file

```powershell
# copy the provided .env (if present) or create one
copy .env .env.local
notepad .env.local
# update DATABASE_URL, JWT_SECRET, MAIL_*, REDIS_URL as needed
```

3) Prisma & DB
- Ensure PostgreSQL is running and the `DATABASE_URL` points to the right DB.

```powershell
# generate client
npx prisma generate

# run migrations (interactive dev migration)
npm run prisma:migrate

# run seed (runs prisma/seed.ts via prisma's seed config)
npx prisma db seed
```

4) Start server (development)

```powershell
npm run dev
```

5) Access the API
- Health: `GET http://localhost:3000/health`
- Product routes: `http://localhost:3000/products` (see `src/routes/productRoutes.ts`)

Troubleshooting
- If `npm run dev` exits with errors:
  - Make sure Node 18+ is installed.
  - Confirm `DATABASE_URL` is correct and Postgres accepts the connection.
  - Run `npx prisma generate` then `npm run prisma:migrate` to ensure Prisma client is built.

Optional: Running in production mode

```powershell
npm run build
npm start
```

Notes
- Redis is optional; leave `REDIS_URL` blank for no caching.
- The app uses `MAIL_*` env vars for transactional emails; for development, use Mailtrap or similar.

If you want, I can:
- add an `.env.example` file
- add a small `Makefile`/PowerShell script to automate setup
- add a GitHub Actions workflow for CI


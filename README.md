# JBBC Website

Corporate site and admin for Japan Bangla Bridge Corporation. Next.js 16 App Router,
TypeScript, Tailwind v4, shadcn/ui, Prisma on MongoDB, Auth.js.

## Setup

```bash
npm install            # also runs prisma generate
cp .env.example .env.local   # fill in values
npm run dev
```

Create the first admin user:

```bash
npm run admin:create
```

## Scripts

| Script         | What it does                          |
| -------------- | ------------------------------------- |
| `dev`          | Dev server                            |
| `build`        | Prisma generate + production build    |
| `check`        | Typecheck, lint, tests (CI runs this) |
| `db:push`      | Push schema changes to MongoDB        |
| `admin:create` | Create or reset an admin user         |

## Layout

```
src/
  app/(site)      public pages, server-rendered
  app/(admin)     admin pages, protected by proxy.ts + requireAdmin()
  app/api         browser-called endpoints only (auth, like, subscribe, forms)
  components/ui   shadcn primitives (do not edit by hand; use `npx shadcn add`)
  components/site public site components
  components/admin
  server/         db, auth, queries (reads), actions (writes), email, sheets, storage
  content/        static Japanese copy as typed data
  config/         site, nav, env (validated), cdn
  lib/            pure helpers
```

## Rules

- Pages read through `server/queries`, never Prisma directly.
- Admin writes go through `server/actions` and start with `requireAdmin()`.
- Public write endpoints validate with zod, rate limit, and verify Turnstile when configured.
- Cache tags live in `server/cache.ts`; writes call `invalidate()`.
- No secrets in the repo. `.env.local` only.

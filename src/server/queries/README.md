# server/queries

Read-only data access, one file per domain. Rules:

- Import `db` from `@/server/db`; pages never touch Prisma directly.
- Public queries filter `status: "PUBLISHED"` and are wrapped in `unstable_cache`
  with a tag from `@/server/cache` so admin actions can invalidate them.
- Admin queries take a pagination argument and are not cached.
- Return dates as ISO strings. `unstable_cache` stores JSON, so a `Date` in the
  return type would be a lie on every cache hit.

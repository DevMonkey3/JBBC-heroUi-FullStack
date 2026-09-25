# server/actions

Server Actions for admin mutations, one file per domain. Every exported
function must:

1. Start with `"use server"` at file top.
2. Call `await requireAdmin()` before touching data.
3. Validate input with a zod schema from `@/lib/validation`.
4. Call `invalidate(tags.x)` from `@/server/cache` after a write.
5. Return `{ ok: true, data }` or `{ ok: false, error }`; never throw to the client.

Public write endpoints (subscribe, like, form submissions) live in
`src/app/api` because they are called from the browser without a session.

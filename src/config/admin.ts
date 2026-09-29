/**
 * Public URL prefix of the admin area. Deliberately unguessable.
 *
 * To change it: rename the folder `src/app/(admin)/<path>` to the new value,
 * update this constant, and update the literal in `src/proxy.ts` (Next.js
 * requires proxy matchers to be plain string literals). The test in
 * `tests/admin-path.test.ts` fails if the two drift apart.
 *
 * Never list this path in robots.txt or link to it from the public site.
 */
export const ADMIN_PATH = "/jbbc-console-7h3k9d";

export const ADMIN_LOGIN_PATH = `${ADMIN_PATH}/login`;

/** Build an admin URL from a path relative to the admin root. */
export function adminUrl(path = ""): string {
  return path ? `${ADMIN_PATH}/${path.replace(/^\/+/, "")}` : ADMIN_PATH;
}

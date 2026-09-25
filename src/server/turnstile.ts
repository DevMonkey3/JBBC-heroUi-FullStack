import "server-only";
import { env } from "@/config/env";

/**
 * Verify a Cloudflare Turnstile token. When no secret is configured the check
 * passes, so forms keep working before Turnstile is set up.
 */
export async function verifyTurnstile(token: string | undefined, ip: string): Promise<boolean> {
  if (!env.TURNSTILE_SECRET_KEY) return true;
  if (!token) return false;

  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret: env.TURNSTILE_SECRET_KEY, response: token, remoteip: ip }),
  });
  const data = (await res.json()) as { success: boolean };
  return data.success === true;
}

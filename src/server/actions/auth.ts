"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/server/auth";
import { rateLimit, clientIp } from "@/server/ratelimit";
import { headers } from "next/headers";

export type LoginState = { error: string | null };

export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const ip = clientIp(await headers());
  if (!rateLimit(`login:${ip}`, { limit: 10, windowMs: 15 * 60 * 1000 }).ok) {
    return { error: "試行回数が多すぎます。しばらくしてから再度お試しください。" };
  }

  try {
    await signIn("credentials", {
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
      redirectTo: "/admin",
    });
    return { error: null };
  } catch (err) {
    if (err instanceof AuthError) {
      return { error: "メールアドレスまたはパスワードが正しくありません。" };
    }
    // signIn throws a redirect on success; let Next handle it.
    throw err;
  }
}

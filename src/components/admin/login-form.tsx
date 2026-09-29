"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const messages: Record<string, string> = {
  CredentialsSignin: "メールアドレスまたはパスワードが正しくありません。",
  RateLimited: "試行回数が多すぎます。しばらくしてから再度お試しください。",
};

/**
 * Plain form POST to the Auth.js credentials callback. Auth.js sets the
 * session cookie and redirects to `callbackUrl`, or back here with ?error=.
 */
export function LoginForm({ error, callbackUrl }: { error?: string; callbackUrl: string }) {
  const [csrf, setCsrf] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/auth/csrf")
      .then((r) => r.json())
      .then((d: { csrfToken: string }) => setCsrf(d.csrfToken))
      .catch(() => setCsrf(null));
  }, []);

  const message = error ? (messages[error] ?? "ログインに失敗しました。") : null;

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>管理画面ログイン</CardTitle>
      </CardHeader>
      <CardContent>
        <form method="post" action="/api/auth/callback/credentials" className="space-y-4">
          <input type="hidden" name="csrfToken" value={csrf ?? ""} />
          <input type="hidden" name="callbackUrl" value={callbackUrl} />
          <div className="space-y-2">
            <Label htmlFor="email">メールアドレス</Label>
            <Input id="email" name="email" type="email" autoComplete="username" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">パスワード</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
          </div>
          {message && (
            <p className="text-destructive text-sm" role="alert">
              {message}
            </p>
          )}
          <Button type="submit" className="w-full" disabled={!csrf}>
            {csrf ? "ログイン" : "読み込み中..."}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

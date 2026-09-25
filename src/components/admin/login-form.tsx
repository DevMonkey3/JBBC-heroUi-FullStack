"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "@/server/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const initial: LoginState = { error: null };

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, initial);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>管理画面ログイン</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-4">
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
          {state.error && (
            <p className="text-destructive text-sm" role="alert">
              {state.error}
            </p>
          )}
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "ログイン中..." : "ログイン"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

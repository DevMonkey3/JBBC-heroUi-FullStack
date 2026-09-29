"use client";

import { useActionState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { changeOwnPassword, updateProfile, type UserFormState } from "@/server/actions/users";
import { Field } from "@/components/admin/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const initial: UserFormState = { ok: false };

function useResult(state: UserFormState, success: string, onSuccess?: () => void) {
  const handled = useRef(state);
  useEffect(() => {
    if (handled.current === state) return;
    handled.current = state;
    if (state.ok) {
      toast.success(success);
      onSuccess?.();
    } else if (state.error) toast.error(state.error);
  }, [state, success, onSuccess]);
}

export function ProfileForm({ name }: { name: string }) {
  const router = useRouter();
  const [state, action, pending] = useActionState(updateProfile, initial);
  useResult(state, "保存しました", () => router.refresh());
  return (
    <form action={action} className="space-y-4 rounded-lg border bg-white p-4">
      <h2 className="font-semibold">表示名</h2>
      <Field label="名前" required error={state.fieldErrors?.name}>
        <Input name="name" defaultValue={name} required />
      </Field>
      <Button type="submit" disabled={pending}>
        {pending ? "保存中..." : "保存"}
      </Button>
    </form>
  );
}

export function PasswordForm() {
  const [state, action, pending] = useActionState(changeOwnPassword, initial);
  const formRef = useRef<HTMLFormElement>(null);
  useResult(state, "パスワードを変更しました", () => formRef.current?.reset());
  const err = (k: string) => state.fieldErrors?.[k];
  return (
    <form ref={formRef} action={action} className="space-y-4 rounded-lg border bg-white p-4">
      <h2 className="font-semibold">パスワード変更</h2>
      <Field label="現在のパスワード" required error={err("currentPassword")}>
        <Input name="currentPassword" type="password" required autoComplete="current-password" />
      </Field>
      <Field
        label="新しいパスワード"
        required
        error={err("newPassword")}
        hint="12文字以上、英字と数字を含む"
      >
        <Input
          name="newPassword"
          type="password"
          required
          minLength={12}
          autoComplete="new-password"
        />
      </Field>
      <Field label="新しいパスワード（確認）" required error={err("confirmPassword")}>
        <Input name="confirmPassword" type="password" required autoComplete="new-password" />
      </Field>
      <Button type="submit" disabled={pending}>
        {pending ? "変更中..." : "パスワードを変更"}
      </Button>
    </form>
  );
}

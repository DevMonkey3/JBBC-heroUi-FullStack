"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { UserPlus, KeyRound, Trash2, ShieldCheck, Pencil } from "lucide-react";
import {
  createUser,
  deleteUser,
  resetUserPassword,
  setUserRole,
  type UserFormState,
} from "@/server/actions/users";
import { ConfirmButton } from "@/components/admin/confirm-button";
import { Field } from "@/components/admin/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const initial: UserFormState = { ok: false };

export function CreateUserButton() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<UserFormState>(initial);
  const [pending, start] = useTransition();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    start(async () => {
      const r = await createUser(initial, data);
      if (r.ok) {
        toast.success("ユーザーを追加しました");
        setState(initial);
        setOpen(false);
        router.refresh();
      } else {
        setState(r);
        if (r.error) toast.error(r.error);
      }
    });
  }

  const err = (k: string) => state.fieldErrors?.[k];

  return (
    <>
      <Button size="sm" onClick={() => setOpen(true)}>
        <UserPlus className="size-4" aria-hidden />
        ユーザーを追加
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <DialogHeader>
              <DialogTitle>ユーザーを追加</DialogTitle>
              <DialogDescription>
                管理者はすべて操作できます。編集者は記事の作成・編集・公開ができ、送信・削除・ユーザー管理はできません。
              </DialogDescription>
            </DialogHeader>
            <Field label="メールアドレス" required error={err("email")}>
              <Input name="email" type="email" required autoComplete="off" />
            </Field>
            <Field label="名前" error={err("name")}>
              <Input name="name" />
            </Field>
            <Field label="権限" required error={err("role")}>
              <select
                name="role"
                defaultValue="EDITOR"
                className="focus-visible:ring-ring/50 h-9 w-full rounded-md border bg-white px-3 text-sm outline-none focus-visible:ring-3"
              >
                <option value="EDITOR">編集者</option>
                <option value="ADMIN">管理者</option>
              </select>
            </Field>
            <Field
              label="初期パスワード"
              required
              error={err("password")}
              hint="12文字以上、英字と数字を含む。本人に伝えたあと、本人がプロフィールから変更できます"
            >
              <Input
                name="password"
                type="text"
                required
                minLength={12}
                autoComplete="new-password"
              />
            </Field>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={pending}
              >
                キャンセル
              </Button>
              <Button type="submit" disabled={pending}>
                {pending ? "追加中..." : "追加する"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

function ResetPasswordButton({ id, email }: { id: string; email: string }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [pending, start] = useTransition();

  function submit() {
    start(async () => {
      const r = await resetUserPassword(id, value);
      if (r.ok) {
        toast.success(r.message);
        setOpen(false);
        setValue("");
      } else toast.error(r.error);
    });
  }

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)} title="パスワードを再設定">
        <KeyRound className="size-4" aria-hidden />
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>パスワードを再設定</DialogTitle>
            <DialogDescription>{email} の新しいパスワードを設定します。</DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor={`pw-${id}`}>新しいパスワード（12文字以上、英字と数字）</Label>
            <Input
              id={`pw-${id}`}
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              autoComplete="new-password"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)} disabled={pending}>
              キャンセル
            </Button>
            <Button onClick={submit} disabled={pending || value.length < 12}>
              {pending ? "保存中..." : "変更する"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function UserRowActions({
  id,
  email,
  role,
  isSelf,
}: {
  id: string;
  email: string;
  role: "ADMIN" | "EDITOR";
  isSelf: boolean;
}) {
  const router = useRouter();
  const wrap = (fn: () => ReturnType<typeof setUserRole>) => async () => {
    const r = await fn();
    if (r.ok) router.refresh();
    return r;
  };
  if (isSelf) {
    return (
      <span className="text-muted-foreground inline-flex items-center gap-1 text-xs">
        <Pencil className="size-3" aria-hidden />
        プロフィールから変更
      </span>
    );
  }
  return (
    <div className="flex justify-end gap-1">
      <ConfirmButton
        variant="outline"
        action={wrap(() => setUserRole(id, role === "ADMIN" ? "EDITOR" : "ADMIN"))}
        title={role === "ADMIN" ? "編集者に変更しますか？" : "管理者に変更しますか？"}
        description={
          role === "ADMIN"
            ? "送信・削除・ユーザー管理ができなくなります。"
            : "すべての操作ができるようになります。"
        }
        confirmLabel="変更する"
      >
        <ShieldCheck className="size-4" aria-hidden />
        {role === "ADMIN" ? "編集者にする" : "管理者にする"}
      </ConfirmButton>
      <ResetPasswordButton id={id} email={email} />
      <ConfirmButton
        variant="destructive"
        action={wrap(() => deleteUser(id))}
        title="ユーザーを削除しますか？"
        description={`${email} はログインできなくなります。元に戻せません。`}
        confirmLabel="削除する"
      >
        <Trash2 className="size-4" aria-hidden />
      </ConfirmButton>
    </div>
  );
}

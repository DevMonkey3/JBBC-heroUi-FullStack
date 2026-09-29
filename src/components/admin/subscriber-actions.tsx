"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { UserPlus, Trash2, BellOff, Bell } from "lucide-react";
import { addSubscriber, deleteSubscriber, setSubscriberActive } from "@/server/actions/subscribers";
import { ConfirmButton } from "@/components/admin/confirm-button";
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

export function AddSubscriberButton() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [pending, start] = useTransition();

  function submit() {
    start(async () => {
      const r = await addSubscriber(email);
      if (r.ok) {
        toast.success(r.message);
        setOpen(false);
        setEmail("");
        router.refresh();
      } else toast.error(r.error);
    });
  }

  return (
    <>
      <Button size="sm" onClick={() => setOpen(true)}>
        <UserPlus className="size-4" aria-hidden />
        購読者を追加
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>購読者を追加</DialogTitle>
            <DialogDescription>
              本人の同意を得たアドレスのみ追加してください。以後のメール配信の対象になります。
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="sub-email">メールアドレス</Label>
            <Input
              id="sub-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)} disabled={pending}>
              キャンセル
            </Button>
            <Button onClick={submit} disabled={pending || !email}>
              {pending ? "追加中..." : "追加する"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function SubscriberRowActions({ id, active }: { id: string; active: boolean }) {
  const router = useRouter();
  const wrap = (fn: () => ReturnType<typeof setSubscriberActive>) => async () => {
    const r = await fn();
    if (r.ok) router.refresh();
    return r;
  };
  return (
    <div className="flex justify-end gap-1">
      <ConfirmButton
        variant="outline"
        action={wrap(() => setSubscriberActive(id, !active))}
        title={active ? "配信を停止しますか？" : "配信を再開しますか？"}
        description={
          active
            ? "このアドレスにはメールが届かなくなります。"
            : "このアドレスへの配信を再開します。"
        }
        confirmLabel={active ? "停止する" : "再開する"}
      >
        {active ? (
          <BellOff className="size-4" aria-hidden />
        ) : (
          <Bell className="size-4" aria-hidden />
        )}
        {active ? "停止" : "再開"}
      </ConfirmButton>
      <ConfirmButton
        variant="destructive"
        action={wrap(() => deleteSubscriber(id))}
        title="購読者を削除しますか？"
        description="送信履歴も削除されます。元に戻せません。"
        confirmLabel="削除する"
      >
        <Trash2 className="size-4" aria-hidden />
      </ConfirmButton>
    </div>
  );
}

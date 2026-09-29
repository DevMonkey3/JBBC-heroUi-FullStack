"use client";

import { useState, useTransition } from "react";
import { FlaskConical } from "lucide-react";
import { toast } from "sonner";
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

/** Sends the announcement email to a single address the admin types in. */
export function TestSendButton({
  action,
  defaultEmail,
}: {
  action: (to: string) => Promise<{ ok: boolean; message?: string; error?: string }>;
  defaultEmail?: string;
}) {
  const [open, setOpen] = useState(false);
  const [to, setTo] = useState(defaultEmail ?? "");
  const [pending, start] = useTransition();

  function send() {
    start(async () => {
      const r = await action(to);
      if (r.ok) {
        toast.success(r.message ?? "送信しました");
        setOpen(false);
      } else toast.error(r.error ?? "送信に失敗しました");
    });
  }

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        <FlaskConical className="size-4" aria-hidden />
        テスト送信
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>テストメールを送信</DialogTitle>
            <DialogDescription>
              購読者には送られません。入力したアドレスにだけ、購読者に届くものと同じメールを送ります。
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="test-to">送信先メールアドレス</Label>
            <Input
              id="test-to"
              type="email"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="you@example.com"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)} disabled={pending}>
              キャンセル
            </Button>
            <Button onClick={send} disabled={pending || !to}>
              {pending ? "送信中..." : "送信する"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

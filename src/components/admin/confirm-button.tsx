"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export type ActionResult = { ok: true; message?: string } | { ok: false; error: string };

/**
 * Button that asks for confirmation, then runs a server action and shows a toast.
 * Used for delete, publish, send and other irreversible operations.
 */
export function ConfirmButton({
  action,
  title,
  description,
  confirmLabel = "実行",
  variant = "destructive",
  size = "sm",
  children,
}: {
  action: () => Promise<ActionResult>;
  title: string;
  description?: string;
  confirmLabel?: string;
  variant?: "destructive" | "default" | "outline";
  size?: "sm" | "default";
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [pending, start] = useTransition();

  function run() {
    start(async () => {
      const res = await action();
      if (res.ok) toast.success(res.message ?? "完了しました");
      else toast.error(res.error);
      setOpen(false);
    });
  }

  return (
    <>
      <Button variant={variant} size={size} onClick={() => setOpen(true)}>
        {children}
      </Button>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            {description && <AlertDialogDescription>{description}</AlertDialogDescription>}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={pending}>キャンセル</AlertDialogCancel>
            <AlertDialogAction onClick={run} disabled={pending}>
              {pending ? "処理中..." : confirmLabel}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

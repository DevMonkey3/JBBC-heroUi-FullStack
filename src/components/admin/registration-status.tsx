"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { setRegistrationStatus } from "@/server/actions/seminars";

type Status = "SUBMITTED" | "CONFIRMED" | "CANCELLED";

export function RegistrationStatusButtons({ id, status }: { id: string; status: Status }) {
  const router = useRouter();
  const [pending, start] = useTransition();

  const set = (next: Status) =>
    start(async () => {
      const r = await setRegistrationStatus(id, next);
      if (r.ok) {
        toast.success(r.message);
        router.refresh();
      } else toast.error(r.error);
    });

  return (
    <div className="flex justify-end gap-1">
      {status !== "CONFIRMED" && (
        <Button size="xs" variant="outline" disabled={pending} onClick={() => set("CONFIRMED")}>
          確定
        </Button>
      )}
      {status !== "CANCELLED" && (
        <Button size="xs" variant="ghost" disabled={pending} onClick={() => set("CANCELLED")}>
          キャンセル
        </Button>
      )}
      {status === "CANCELLED" && (
        <Button size="xs" variant="ghost" disabled={pending} onClick={() => set("SUBMITTED")}>
          戻す
        </Button>
      )}
    </div>
  );
}

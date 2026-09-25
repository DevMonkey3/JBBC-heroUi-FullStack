"use client";

import { Button } from "@/components/ui/button";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-24 text-center">
      <h1 className="text-2xl font-bold">エラーが発生しました</h1>
      <p className="text-muted-foreground">時間をおいて再度お試しください。</p>
      <Button onClick={reset}>再読み込み</Button>
    </div>
  );
}

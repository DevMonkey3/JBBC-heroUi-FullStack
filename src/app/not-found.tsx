import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-24 text-center">
      <p className="text-muted-foreground text-sm">404</p>
      <h1 className="text-2xl font-bold">ページが見つかりません</h1>
      <p className="text-muted-foreground">
        お探しのページは移動または削除された可能性があります。
      </p>
      <Button nativeButton={false} render={<Link href="/" />}>
        ホームへ戻る
      </Button>
    </div>
  );
}

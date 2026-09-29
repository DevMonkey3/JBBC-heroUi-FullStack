import Link from "next/link";
import { LogOut } from "lucide-react";
import { auth, signOut } from "@/server/auth";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { AdminNav } from "@/components/admin/admin-nav";
import { AdminMobileNav } from "@/components/admin/admin-mobile-nav";

export async function AdminShell({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const role = session?.user?.role ?? "EDITOR";

  return (
    <div className="bg-muted/30 flex min-h-screen">
      <aside className="bg-sidebar text-sidebar-foreground hidden w-60 shrink-0 flex-col border-r md:flex">
        <Link href="/admin" className="px-6 py-5 text-lg font-bold">
          JBBC <span className="text-brand">Admin</span>
        </Link>
        <div className="flex-1 overflow-y-auto py-2">
          <AdminNav role={role} />
        </div>
        <div className="border-t px-6 py-3 text-xs">
          <p className="truncate font-medium">{session?.user?.name}</p>
          <p className="text-sidebar-foreground/60 truncate">{session?.user?.email}</p>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="bg-background flex h-14 items-center justify-between gap-3 border-b px-4 md:px-6">
          <div className="flex items-center gap-2">
            <AdminMobileNav role={role} />
            <Link href="/admin" className="font-bold md:hidden">
              JBBC Admin
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-brand-soft text-brand-dark hidden rounded-full px-2.5 py-0.5 text-xs font-semibold sm:inline">
              {role === "ADMIN" ? "管理者" : "編集者"}
            </span>
            <Link
              href="/"
              target="_blank"
              className="text-muted-foreground text-sm hover:underline"
            >
              サイトを見る
            </Link>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/admin/login" });
              }}
            >
              <Button type="submit" variant="outline" size="sm">
                <LogOut className="size-4" aria-hidden />
                ログアウト
              </Button>
            </form>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
      <Toaster position="top-right" richColors />
    </div>
  );
}

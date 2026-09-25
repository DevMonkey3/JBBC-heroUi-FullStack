import Link from "next/link";
import { adminNav } from "@/config/nav";
import { auth, signOut } from "@/server/auth";
import { Button } from "@/components/ui/button";

export async function AdminShell({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <div className="flex min-h-screen">
      <aside className="bg-sidebar text-sidebar-foreground hidden w-60 flex-col border-r md:flex">
        <div className="px-5 py-5 text-lg font-bold">JBBC 管理画面</div>
        <nav className="flex flex-1 flex-col gap-1 px-3" aria-label="管理メニュー">
          {adminNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:bg-sidebar-accent rounded-md px-3 py-2 text-sm font-medium"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b px-6">
          <span className="text-muted-foreground text-sm">{session?.user?.email}</span>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/admin/login" });
            }}
          >
            <Button type="submit" variant="outline" size="sm">
              ログアウト
            </Button>
          </form>
        </header>
        <div className="flex-1 p-6">{children}</div>
      </div>
    </div>
  );
}

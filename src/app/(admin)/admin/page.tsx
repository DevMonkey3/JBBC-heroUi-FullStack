import { auth } from "@/server/auth";

export default async function AdminDashboardPage() {
  const session = await auth();

  return (
    <div>
      <h1 className="text-2xl font-bold">ダッシュボード</h1>
      <p className="text-muted-foreground mt-2">ログイン中: {session?.user?.email}</p>
    </div>
  );
}

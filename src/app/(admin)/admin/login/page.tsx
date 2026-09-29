import { LoginForm } from "@/components/admin/login-form";

export const metadata = { title: "Login" };

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; callbackUrl?: string }>;
}) {
  const { error, callbackUrl } = await searchParams;
  // Only allow same-site admin paths as the post-login destination.
  const safeCallback = callbackUrl?.startsWith("/admin") ? callbackUrl : "/admin";

  return (
    <div className="bg-muted flex min-h-screen items-center justify-center p-4">
      <LoginForm error={error} callbackUrl={safeCallback} />
    </div>
  );
}

import { LoginForm } from "@/components/admin/login-form";
import { ADMIN_PATH } from "@/config/admin";

export const metadata = { title: "Login", robots: { index: false, follow: false } };

/**
 * Standalone login page. It sits outside the (shell) route group on purpose
 * so nothing from the admin chrome renders before sign-in.
 */
export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; callbackUrl?: string }>;
}) {
  const { error, callbackUrl } = await searchParams;
  // Only allow same-site admin paths as the post-login destination.
  const safeCallback = callbackUrl?.startsWith(ADMIN_PATH) ? callbackUrl : ADMIN_PATH;

  return (
    <main className="bg-muted flex min-h-screen items-center justify-center p-4">
      <LoginForm error={error} callbackUrl={safeCallback} />
    </main>
  );
}

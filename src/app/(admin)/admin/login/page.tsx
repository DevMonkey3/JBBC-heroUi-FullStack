import { LoginForm } from "@/components/admin/login-form";

export const metadata = { title: "ログイン" };

export default function AdminLoginPage() {
  return (
    <div className="bg-muted flex min-h-screen items-center justify-center p-4">
      <LoginForm />
    </div>
  );
}

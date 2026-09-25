import { AdminShell } from "@/components/admin/admin-shell";

export const metadata = {
  title: { default: "管理画面", template: "%s | 管理画面" },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}

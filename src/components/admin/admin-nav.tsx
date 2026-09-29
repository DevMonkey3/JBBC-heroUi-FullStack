"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Gauge, Book, Calendar, Megaphone, Mail, Users, Shield, User } from "lucide-react";
import { adminNav, type AdminNavItem } from "@/config/nav";
import { ADMIN_PATH } from "@/config/admin";
import { cn } from "@/lib/utils";

const icons = {
  gauge: Gauge,
  book: Book,
  calendar: Calendar,
  megaphone: Megaphone,
  mail: Mail,
  users: Users,
  shield: Shield,
  user: User,
};

export function AdminNav({
  role,
  onNavigate,
}: {
  role: "ADMIN" | "EDITOR";
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const canSee = (item: AdminNavItem) => !item.roles || item.roles.includes(role);
  const isActive = (href: string) =>
    href === ADMIN_PATH ? pathname === ADMIN_PATH : pathname.startsWith(href);

  return (
    <nav className="flex flex-col gap-5 px-3" aria-label="管理メニュー">
      {adminNav.map((group) => {
        const items = group.items.filter(canSee);
        if (items.length === 0) return null;
        return (
          <div key={group.heading}>
            <p className="text-sidebar-foreground/50 mb-1 px-3 text-[11px] font-semibold tracking-wider uppercase">
              {group.heading}
            </p>
            <ul className="space-y-0.5">
              {items.map((item) => {
                const Icon = icons[item.icon];
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        active
                          ? "bg-brand text-white"
                          : "text-sidebar-foreground hover:bg-sidebar-accent",
                      )}
                    >
                      <Icon className="size-4" aria-hidden />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </nav>
  );
}

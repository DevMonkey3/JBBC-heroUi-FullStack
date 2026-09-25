import type { DefaultSession } from "next-auth";

type AdminRole = "ADMIN" | "EDITOR";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      role: AdminRole;
    };
  }

  interface User {
    role: AdminRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: AdminRole;
  }
}

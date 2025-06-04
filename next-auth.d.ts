// types/next-auth.d.ts
import { DefaultSession } from "next-auth";
import { UserRole } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      phone: string;
      role: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: UserRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    role: UserRole;
  }
}

"use client";
// utils/adminRoleCheck.ts
import { getServerSession } from "next-auth";
import { redirect, notFound } from "next/navigation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { UserRole } from "@prisma/client";
import { authOptions } from "@/config/auth";

// Types
export interface AdminSession {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    role: UserRole;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export interface AdminCheckResult {
  session: AdminSession;
  isAdmin: boolean;
}

// Server-side admin check with redirect to not found
export async function requireAdminServer(): Promise<AdminSession> {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== UserRole.ADMIN) {
    notFound();
  }

  return session as AdminSession;
}

// Server-side admin check without redirect (returns boolean)
export async function checkAdminServer(): Promise<AdminCheckResult | null> {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  return {
    session: session as AdminSession,
    isAdmin: session.user.role === UserRole.ADMIN,
  };
}

// Client-side admin check hook with redirect
export function useRequireAdmin() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Still loading

    if (!session) {
      router.push("/login");
      return;
    }

    if (session.user.role !== UserRole.ADMIN) {
      router.push("/404");
      return;
    }
  }, [session, status, router]);

  return {
    session: session as AdminSession | null,
    isLoading: status === "loading",
    isAdmin: session?.user.role === UserRole.ADMIN,
  };
}

// Client-side admin check hook without redirect
export function useAdminCheck() {
  const { data: session, status } = useSession();

  return {
    session: session as AdminSession | null,
    isLoading: status === "loading",
    isAdmin: session?.user.role === UserRole.ADMIN,
    isAuthenticated: !!session,
  };
}

// Utility function to check if user is admin (can be used anywhere)
export function isUserAdmin(session: any): boolean {
  return session?.user?.role === UserRole.ADMIN;
}

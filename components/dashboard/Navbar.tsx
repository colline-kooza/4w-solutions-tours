"use client";
import React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Session } from "next-auth";
import Logo from "../global/Logo";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { sidebarLinks } from "@/config/sidebar";
import { UserDropdownMenu } from "../UserDropdownMenu";
import { UserRole } from "@prisma/client";

// Organization Banner Component
const OrganizationBanner = ({
  userName = "",
  userRole = "USER",
}: {
  userName?: string;
  userRole?: UserRole;
}) => {
  return (
    <div className="hidden md:flex items-center gap-4 text-sm text-muted-foreground">
      <div className="flex flex-col">
        <div className="flex gap-3 items-center">
          <span className="font-medium text-xl text-foreground">{userName}</span>
          <span className="text-sm capitalize">{userRole.toLowerCase()}</span>
        </div>
      </div>
    </div>
  );
};

export default function Navbar({ session }: { session: Session }) {
  const router = useRouter();
  const pathname = usePathname();
  const user = session.user;

  // Helper function to check if user has access based on role
  const hasAccess = (requiredRole?: UserRole): boolean => {
    if (!requiredRole) return true; // No role requirement means accessible to all
    if (user.role === "ADMIN") return true; // Admin has access to everything
    return user.role === requiredRole;
  };

  // Filter sidebar links based on user role
  const filteredLinks = sidebarLinks.filter((link) => {
    // Check main link role requirement
    if (!hasAccess(link.requiredRole)) {
      return false;
    }

    // If it's a dropdown, check if user has access to any dropdown item
    if (link.dropdown && link.dropdownMenu) {
      return link.dropdownMenu.some((item) => hasAccess(item.requiredRole));
    }

    return true;
  });

  // Flatten dropdown menus for mobile view
  const mobileLinks = filteredLinks.reduce(
    (acc, link) => {
      // Add main link if it's not a dropdown
      if (!link.dropdown) {
        acc.push({
          title: link.title,
          href: link.href || "#",
          icon: link.icon,
          requiredRole: link.requiredRole,
        });
        return acc;
      }

      // Add dropdown items if user has access
      if (link.dropdownMenu) {
        link.dropdownMenu.forEach((item) => {
          if (hasAccess(item.requiredRole)) {
            acc.push({
              title: item.title,
              href: item.href,
              icon: link.icon,
              requiredRole: item.requiredRole,
            });
          }
        });
      }

      return acc;
    },
    [] as Array<{ title: string; href: string; icon: any; requiredRole?: UserRole }>
  );

  async function handleLogout() {
    try {
      await signOut();
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  }

  const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.name || "";

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-muted/60 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Logo href="/dashboard" />

            {/* Mobile user info */}
            <div className="px-3 py-2 text-sm border-b border-border mb-2">
              <div className="font-medium">{fullName}</div>
              <div className="text-xs text-muted-foreground">
                {user.email}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Role: {user.role}
              </div>
            </div>

            {/* Render mobile navigation links */}
            {mobileLinks.map((item, i) => {
              const Icon = item.icon;
              const isActive = item.href === pathname;

              return (
                <Link
                  key={i}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    isActive && "bg-muted text-primary"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.title}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto">
            <Button onClick={handleLogout} size="sm" className="w-full">
              Logout
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <div className="w-full flex-1">
        {/* Organization banner for desktop */}
        <OrganizationBanner
          userName={fullName}
          userRole={user.role}
        />
      </div>

      <div className="p-4">
        <UserDropdownMenu
          username={fullName}
          email={user.email ?? ""}
          avatarUrl={
            user.image ??
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20(54)-NX3G1KANQ2p4Gupgnvn94OQKsGYzyU.png"
          }
        />
      </div>
    </header>
  );
}
import { UserRole } from "@prisma/client";
import {
  LayoutDashboard,
  Package,
  Users,
  Settings,
  BookImageIcon,
  Telescope,
  FerrisWheel,
} from "lucide-react";

export interface ISidebarLink {
  title: string;
  href?: string;
  icon: any;
  dropdown?: boolean;
  requiredRole?: UserRole;
  dropdownMenu?: Array<{
    title: string;
    href: string;
    requiredRole?: UserRole;
  }>;
}

export const sidebarLinks: ISidebarLink[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    // No requiredRole means accessible to both ADMIN and USER
  },
  {
    title: "Bookings Management",
    href: "/dashboard/admin/bookings",
    icon: BookImageIcon,
    requiredRole: "ADMIN",
  },
  {
    title: "Bookings",
    href: "/dashboard/bookings",
    icon: BookImageIcon,
    requiredRole: "USER",
  },
  {
    title: "Tours",
    href: "/dashboard/tours",
    icon: Telescope,
    requiredRole: "ADMIN",
  },
  {
    title: "Attractions",
    href: "/dashboard/attractions",
    icon: FerrisWheel,
    requiredRole: "ADMIN",
  },
  {
    title: "Destinations",
    href: "/dashboard/destinations",
    icon: FerrisWheel,
    requiredRole: "ADMIN",
  },
  {
    title: "Users",
    href: "/dashboard/users",
    icon: Users,
    requiredRole: "ADMIN",
  },
  // {
  //   title: "Bookings",
  //   href: "/dashboard/bookings",
  //   icon: BookImageIcon,
  //   requiredRole: "ADMIN",
  // },
  // {
  //   title: "Reports",
  //   icon: FileBarChart,
  //   dropdown: true,
  //   requiredRole: "ADMIN", // Only admins can access reports
  //   dropdownMenu: [
  //     {
  //       title: "Sales Reports",
  //       href: "/dashboard/reports/sales",
  //       requiredRole: "ADMIN",
  //     },
  //     {
  //       title: "Inventory Reports",
  //       href: "/dashboard/reports/inventory",
  //       requiredRole: "ADMIN",
  //     },
  //   ],
  // },
  {
    title: "Our Team",
    href: "/dashboard/our-team",
    icon: Settings,
    requiredRole: "ADMIN",
  },
  {
    title: "Blogs",
    href: "/dashboard/blogs",
    icon: Package,
    requiredRole: "ADMIN",
  },
  {
    title: "Wishlists",
    href: "/wishlist",
    icon: Package,
    // requiredRole: "ADMIN",
  },
  // {
  //   title: "Settings",
  //   href: "/dashboard/settings",
  //   icon: Settings,
  //   requiredRole: "ADMIN",
  // },
];

// Example of role-based access patterns:
// - No requiredRole: Accessible to both ADMIN and USER
// - requiredRole: "ADMIN": Only accessible to ADMIN users
// - requiredRole: "USER": Only accessible to USER role (rarely used since ADMIN should have access to everything)

// Helper function to check if user has access to a link
export function hasLinkAccess(
  userRole: UserRole,
  requiredRole?: UserRole
): boolean {
  if (!requiredRole) return true; // No role requirement
  if (userRole === "ADMIN") return true; // Admin has access to everything
  return userRole === requiredRole;
}

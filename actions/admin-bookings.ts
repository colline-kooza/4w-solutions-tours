"use server";

import { db } from "@/prisma/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/config/auth";
import { revalidatePath } from "next/cache";
import type {
  BookingFilters,
  BookingStatus,
  PaymentStatus,
} from "@/types/booking";

// Verify admin access
async function verifyAdminAccess() {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized: Admin access required");
  }
  return session.user;
}

// Get date range filter
function getDateRangeFilter(dateRange?: string) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  switch (dateRange) {
    case "today":
      return {
        gte: today,
        lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
      };
    case "weekly":
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - today.getDay());
      return {
        gte: weekStart,
        lt: new Date(weekStart.getTime() + 7 * 24 * 60 * 60 * 1000),
      };
    case "monthly":
      const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
      const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 1);
      return {
        gte: monthStart,
        lt: monthEnd,
      };
    case "last-month":
      const lastMonthStart = new Date(
        today.getFullYear(),
        today.getMonth() - 1,
        1
      );
      const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 1);
      return {
        gte: lastMonthStart,
        lt: lastMonthEnd,
      };
    case "yearly":
      const yearStart = new Date(today.getFullYear(), 0, 1);
      const yearEnd = new Date(today.getFullYear() + 1, 0, 1);
      return {
        gte: yearStart,
        lt: yearEnd,
      };
    default:
      return undefined;
  }
}

export async function getAdminBookings(filters: BookingFilters = {}) {
  try {
    await verifyAdminAccess();

    const {
      status,
      paymentStatus,
      dateRange,
      search,
      page = 1,
      limit = 10,
    } = filters;

    const skip = (page - 1) * limit;
    const dateFilter = getDateRangeFilter(dateRange);

    // Build where clause
    const where: any = {};

    // Only add status filter if it's not "all" and is a valid enum value
    if (status && status !== "all") {
      where.status = status;
    }

    // Only add paymentStatus filter if it's not "all" and is a valid enum value
    if (paymentStatus && paymentStatus !== "all") {
      where.paymentStatus = paymentStatus;
    }

    if (dateFilter) {
      where.createdAt = dateFilter;
    }

    if (search) {
      where.OR = [
        {
          user: {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { email: { contains: search, mode: "insensitive" } },
            ],
          },
        },
        {
          tour: {
            title: { contains: search, mode: "insensitive" },
          },
        },
        {
          contactEmail: { contains: search, mode: "insensitive" },
        },
        {
          contactPhone: { contains: search, mode: "insensitive" },
        },
      ];
    }

    // Get bookings with pagination
    const [bookings, total] = await Promise.all([
      db.booking.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
            },
          },
          tour: {
            select: {
              id: true,
              title: true,
              images: true,
              location: true,
              duration: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      db.booking.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      success: true,
      data: {
        bookings,
        total,
        totalPages,
        currentPage: page,
      },
    };
  } catch (error) {
    console.error("Error fetching admin bookings:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to fetch bookings",
    };
  }
}

export async function getAdminBookingById(id: string) {
  try {
    await verifyAdminAccess();

    const booking = await db.booking.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            image: true,
          },
        },
        tour: {
          select: {
            id: true,
            title: true,
            images: true,
            location: true,
            duration: true,
            description: true,
            price: true,
            discountPrice: true,
          },
        },
      },
    });

    if (!booking) {
      return {
        success: false,
        error: "Booking not found",
      };
    }

    return {
      success: true,
      data: booking,
    };
  } catch (error) {
    console.error("Error fetching booking details:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch booking details",
    };
  }
}

export async function updateBookingStatus(id: string, status: BookingStatus) {
  try {
    await verifyAdminAccess();

    const booking = await db.booking.findUnique({
      where: { id },
    });

    if (!booking) {
      return {
        success: false,
        error: "Booking not found",
      };
    }

    await db.booking.update({
      where: { id },
      data: {
        status,
        updatedAt: new Date(),
      },
    });

    revalidatePath("/admin/bookings");
    revalidatePath(`/admin/bookings/${id}`);

    return {
      success: true,
      message: "Booking status updated successfully",
    };
  } catch (error) {
    console.error("Error updating booking status:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to update booking status",
    };
  }
}

export async function updatePaymentStatus(
  id: string,
  paymentStatus: PaymentStatus
) {
  try {
    await verifyAdminAccess();

    const booking = await db.booking.findUnique({
      where: { id },
    });

    if (!booking) {
      return {
        success: false,
        error: "Booking not found",
      };
    }

    await db.booking.update({
      where: { id },
      data: {
        paymentStatus,
        updatedAt: new Date(),
      },
    });

    revalidatePath("/admin/bookings");
    revalidatePath(`/admin/bookings/${id}`);

    return {
      success: true,
      message: "Payment status updated successfully",
    };
  } catch (error) {
    console.error("Error updating payment status:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to update payment status",
    };
  }
}

export async function getBookingStats() {
  try {
    await verifyAdminAccess();

    const [
      totalBookings,
      pendingBookings,
      confirmedBookings,
      completedBookings,
      cancelledBookings,
      totalRevenue,
      pendingPayments,
    ] = await Promise.all([
      db.booking.count(),
      db.booking.count({ where: { status: "PENDING" } }),
      db.booking.count({ where: { status: "CONFIRMED" } }),
      db.booking.count({ where: { status: "COMPLETED" } }),
      db.booking.count({ where: { status: "CANCELLED" } }),
      db.booking.aggregate({
        where: { paymentStatus: "PAID" },
        _sum: { totalAmount: true },
      }),
      db.booking.aggregate({
        where: { paymentStatus: "PENDING" },
        _sum: { totalAmount: true },
      }),
    ]);

    return {
      success: true,
      data: {
        totalBookings,
        pendingBookings,
        confirmedBookings,
        completedBookings,
        cancelledBookings,
        totalRevenue: totalRevenue._sum.totalAmount || 0,
        pendingPayments: pendingPayments._sum.totalAmount || 0,
      },
    };
  } catch (error) {
    console.error("Error fetching booking stats:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch booking statistics",
    };
  }
}

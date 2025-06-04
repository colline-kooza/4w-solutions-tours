"use server";

import { db } from "@/prisma/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/config/auth";

async function getSession() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  return session.user;
}

async function verifyAdminAccess() {
  const user = await getSession();
  if (user.role !== "ADMIN") {
    throw new Error("Admin access required");
  }
  return user;
}

function getDateRangeFilter(period: string) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  switch (period) {
    case "yesterday":
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      return {
        gte: yesterday,
        lt: today,
      };
    case "weekly":
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - 7);
      return {
        gte: weekStart,
        lt: new Date(),
      };
    case "monthly":
      const monthStart = new Date(today);
      monthStart.setMonth(today.getMonth() - 1);
      return {
        gte: monthStart,
        lt: new Date(),
      };
    case "yearly":
      const yearStart = new Date(today);
      yearStart.setFullYear(today.getFullYear() - 1);
      return {
        gte: yearStart,
        lt: new Date(),
      };
    default:
      return {
        gte: today,
        lt: new Date(),
      };
  }
}

export async function getAdminDashboardStats(period = "weekly") {
  try {
    await verifyAdminAccess();

    const dateFilter = getDateRangeFilter(period);
    const previousPeriodFilter = getDateRangeFilter(period);

    // Adjust previous period for comparison
    const timeDiff = dateFilter.lt.getTime() - dateFilter.gte.getTime();
    previousPeriodFilter.lt = new Date(dateFilter.gte.getTime());
    previousPeriodFilter.gte = new Date(dateFilter.gte.getTime() - timeDiff);

    const [
      totalStats,
      periodStats,
      previousPeriodStats,
      bookingsByStatus,
      revenueByMonth,
      topTours,
      recentBookings,
      userGrowth,
    ] = await Promise.all([
      // Total stats
      Promise.all([
        db.booking.count(),
        db.tour.count(),
        db.user.count(),
        db.category.count(),
        db.booking.aggregate({
          where: { paymentStatus: "PAID" },
          _sum: { totalAmount: true },
        }),
      ]),

      // Period stats
      Promise.all([
        db.booking.count({ where: { createdAt: dateFilter } }),
        db.booking.aggregate({
          where: {
            createdAt: dateFilter,
            paymentStatus: "PAID",
          },
          _sum: { totalAmount: true },
        }),
        db.user.count({ where: { createdAt: dateFilter } }),
      ]),

      // Previous period stats for comparison
      Promise.all([
        db.booking.count({ where: { createdAt: previousPeriodFilter } }),
        db.booking.aggregate({
          where: {
            createdAt: previousPeriodFilter,
            paymentStatus: "PAID",
          },
          _sum: { totalAmount: true },
        }),
        db.user.count({ where: { createdAt: previousPeriodFilter } }),
      ]),

      // Bookings by status
      Promise.all([
        db.booking.count({ where: { status: "PENDING" } }),
        db.booking.count({ where: { status: "CONFIRMED" } }),
        db.booking.count({ where: { status: "COMPLETED" } }),
        db.booking.count({ where: { status: "CANCELLED" } }),
      ]),

      // Revenue by month (last 6 months)
      db.booking.groupBy({
        by: ["createdAt"],
        where: {
          paymentStatus: "PAID",
          createdAt: {
            gte: new Date(new Date().setMonth(new Date().getMonth() - 6)),
          },
        },
        _sum: { totalAmount: true },
        _count: true,
      }),

      // Top performing tours
      db.tour.findMany({
        include: {
          bookings: {
            where: { status: { not: "CANCELLED" } },
          },
          _count: {
            select: { bookings: true },
          },
        },
        orderBy: {
          bookings: {
            _count: "desc",
          },
        },
        take: 5,
      }),

      // Recent bookings
      db.booking.findMany({
        include: {
          user: {
            select: { name: true, email: true, image: true },
          },
          tour: {
            select: { title: true, images: true },
          },
        },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),

      // User growth over time
      db.user.groupBy({
        by: ["createdAt"],
        where: {
          createdAt: {
            gte: new Date(new Date().setMonth(new Date().getMonth() - 6)),
          },
        },
        _count: true,
      }),
    ]);

    const [
      totalBookings,
      totalTours,
      totalUsers,
      totalCategories,
      totalRevenueAgg,
    ] = totalStats;
    const [periodBookings, periodRevenueAgg, periodUsers] = periodStats;
    const [prevPeriodBookings, prevPeriodRevenueAgg, prevPeriodUsers] =
      previousPeriodStats;
    const [
      pendingBookings,
      confirmedBookings,
      completedBookings,
      cancelledBookings,
    ] = bookingsByStatus;

    const totalRevenue = totalRevenueAgg._sum.totalAmount || 0;
    const periodRevenue = periodRevenueAgg._sum.totalAmount || 0;
    const prevPeriodRevenue = prevPeriodRevenueAgg._sum.totalAmount || 0;

    // Calculate percentage changes
    const bookingChange =
      prevPeriodBookings > 0
        ? ((periodBookings - prevPeriodBookings) / prevPeriodBookings) * 100
        : 0;
    const revenueChange =
      prevPeriodRevenue > 0
        ? ((periodRevenue - prevPeriodRevenue) / prevPeriodRevenue) * 100
        : 0;
    const userChange =
      prevPeriodUsers > 0
        ? ((periodUsers - prevPeriodUsers) / prevPeriodUsers) * 100
        : 0;

    return {
      success: true,
      data: {
        overview: {
          totalBookings,
          totalTours,
          totalUsers,
          totalCategories,
          totalRevenue,
          periodBookings,
          periodRevenue,
          periodUsers,
          bookingChange,
          revenueChange,
          userChange,
        },
        bookingsByStatus: {
          pending: pendingBookings,
          confirmed: confirmedBookings,
          completed: completedBookings,
          cancelled: cancelledBookings,
        },
        revenueByMonth,
        topTours,
        recentBookings,
        userGrowth,
      },
    };
  } catch (error) {
    console.error("Error fetching admin dashboard stats:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch dashboard stats",
    };
  }
}

export async function getUserDashboardStats(period = "weekly") {
  try {
    const user = await getSession();
    const dateFilter = getDateRangeFilter(period);

    const [userBookings, userStats, recentBookings, favoriteCategories] =
      await Promise.all([
        // User's bookings
        db.booking.findMany({
          where: {
            userId: user.id,
            createdAt: dateFilter,
          },
          include: {
            tour: {
              select: { title: true, images: true, category: true },
            },
          },
          orderBy: { createdAt: "desc" },
        }),

        // User stats
        Promise.all([
          db.booking.count({ where: { userId: user.id } }),
          db.booking.count({
            where: {
              userId: user.id,
              status: "COMPLETED",
            },
          }),
          db.booking.aggregate({
            where: {
              userId: user.id,
              paymentStatus: "PAID",
            },
            _sum: { totalAmount: true },
          }),
          db.review.count({ where: { userId: user.id } }),
        ]),

        // Recent bookings
        db.booking.findMany({
          where: { userId: user.id },
          include: {
            tour: {
              select: { title: true, images: true, location: true },
            },
          },
          orderBy: { createdAt: "desc" },
          take: 5,
        }),

        // Favorite categories based on bookings
        db.booking.groupBy({
          by: ["tourId"],
          where: { userId: user.id },
          _count: true,
          orderBy: { _count: { tourId: "desc" } },
          take: 5,
        }),
      ]);

    const [totalBookings, completedTours, totalSpentAgg, totalReviews] =
      userStats;
    const totalSpent = totalSpentAgg._sum.totalAmount || 0;

    const bookingsByStatus = {
      pending: userBookings.filter((b) => b.status === "PENDING").length,
      confirmed: userBookings.filter((b) => b.status === "CONFIRMED").length,
      completed: userBookings.filter((b) => b.status === "COMPLETED").length,
      cancelled: userBookings.filter((b) => b.status === "CANCELLED").length,
    };

    return {
      success: true,
      data: {
        overview: {
          totalBookings,
          completedTours,
          totalSpent,
          totalReviews,
        },
        bookingsByStatus,
        recentBookings,
        favoriteCategories,
        periodBookings: userBookings.length,
      },
    };
  } catch (error) {
    console.error("Error fetching user dashboard stats:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch dashboard stats",
    };
  }
}

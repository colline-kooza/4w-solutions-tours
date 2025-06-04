"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getAdminDashboardStats,
  getUserDashboardStats,
} from "@/actions/dashboard-analytics";

export const useAdminDashboard = (period = "weekly") => {
  const query = useQuery({
    queryKey: ["admin-dashboard", period],
    queryFn: async () => {
      const result = await getAdminDashboardStats(period);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
    staleTime: 60 * 1000, // 1 minute
    gcTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    data: query.data,
    isLoading: query.isPending,
    error: query.error,
    isError: query.isError,
    refetch: query.refetch,
  };
};

export const useUserDashboard = (period = "weekly") => {
  const query = useQuery({
    queryKey: ["user-dashboard", period],
    queryFn: async () => {
      const result = await getUserDashboardStats(period);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  return {
    data: query.data,
    isLoading: query.isPending,
    error: query.error,
    isError: query.isError,
    refetch: query.refetch,
  };
};

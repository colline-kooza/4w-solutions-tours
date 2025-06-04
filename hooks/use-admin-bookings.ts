"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAdminBookings,
  getAdminBookingById,
  updateBookingStatus,
  updatePaymentStatus,
  getBookingStats,
} from "@/actions/admin-bookings";
import type {
  BookingFilters,
  BookingStatus,
  PaymentStatus,
} from "@/types/booking";
import { toast } from "sonner";

// Hook for admin bookings with filters
export const useAdminBookings = (filters: BookingFilters = {}) => {
  const query = useQuery({
    queryKey: ["admin-bookings", filters],
    queryFn: async () => {
      const result = await getAdminBookings(filters);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    bookings: query.data?.bookings || [],
    total: query.data?.total || 0,
    totalPages: query.data?.totalPages || 0,
    currentPage: query.data?.currentPage || 1,
    isLoading: query.isPending,
    error: query.error,
    isError: query.isError,
    refetch: query.refetch,
  };
};

// Hook for single booking details
export const useAdminBookingById = (id: string) => {
  const query = useQuery({
    queryKey: ["admin-booking", id],
    queryFn: async () => {
      const result = await getAdminBookingById(id);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
    enabled: !!id,
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  return {
    booking: query.data,
    isLoading: query.isPending,
    error: query.error,
    isError: query.isError,
    refetch: query.refetch,
  };
};

// Hook for booking statistics
export const useBookingStats = () => {
  const query = useQuery({
    queryKey: ["booking-stats"],
    queryFn: async () => {
      const result = await getBookingStats();
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
    staleTime: 60 * 1000, // 1 minute
    gcTime: 5 * 60 * 1000,
  });

  return {
    stats: query.data,
    isLoading: query.isPending,
    error: query.error,
    isError: query.isError,
    refetch: query.refetch,
  };
};

// Mutation for updating booking status
export const useUpdateBookingStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string;
      status: BookingStatus;
    }) => {
      const result = await updateBookingStatus(id, status);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["admin-bookings"] });
      queryClient.invalidateQueries({ queryKey: ["admin-booking"] });
      queryClient.invalidateQueries({ queryKey: ["booking-stats"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

// Mutation for updating payment status
export const useUpdatePaymentStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      paymentStatus,
    }: {
      id: string;
      paymentStatus: PaymentStatus;
    }) => {
      const result = await updatePaymentStatus(id, paymentStatus);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["admin-bookings"] });
      queryClient.invalidateQueries({ queryKey: ["admin-booking"] });
      queryClient.invalidateQueries({ queryKey: ["booking-stats"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

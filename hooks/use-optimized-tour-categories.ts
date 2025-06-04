"use client";

import { useQuery } from "@tanstack/react-query";
import { getOptimizedTourCategories } from "@/actions/tour-categories";

// React Query hook for optimized tour categories
export const useOptimizedTourCategories = () => {
  const categoriesQuery = useQuery({
    queryKey: ["optimizedTourCategories"],
    queryFn: async () => await getOptimizedTourCategories(),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return {
    categories: categoriesQuery.data || [],
    isLoading: categoriesQuery.isPending,
    error: categoriesQuery.error,
    isError: categoriesQuery.isError,
    refetch: categoriesQuery.refetch,
  };
};

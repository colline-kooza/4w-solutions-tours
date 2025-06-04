"use client";

import {
  addTourReview,
  getFeaturedTours,
  getSimilarTours,
  getTourBySlug,
  getTourReviews,
} from "@/actions/tour-detailed";
import { transformTourToCarouselCard } from "@/lib/tour-helpers";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
export const useTour = (slug: string) => {
  const query = useQuery({
    queryKey: ["tour", slug],
    queryFn: async () => await getTourBySlug(slug),
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    enabled: !!slug,
  });

  return {
    tour: query.data,
    isLoading: query.isPending,
    error: query.error,
    isError: query.isError,
  };
};

export const useTourReviews = (tourId: string, page = 1, limit = 10) => {
  const query = useQuery({
    queryKey: ["tour-reviews", tourId, page, limit],
    queryFn: async () => await getTourReviews(tourId, page, limit),
    staleTime: 5 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    enabled: !!tourId,
  });

  return {
    reviews: query.data?.reviews || [],
    totalCount: query.data?.totalCount || 0,
    averageRating: query.data?.averageRating || 0,
    isLoading: query.isPending,
    error: query.error,
    isError: query.isError,
  };
};

export const useSimilarTours = (
  tourId: string,
  categoryId: string,
  limit = 6
) => {
  const query = useQuery({
    queryKey: ["similar-tours", tourId, categoryId, limit],
    queryFn: async () => await getSimilarTours(tourId, categoryId, limit),
    staleTime: 15 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    enabled: !!tourId && !!categoryId,
  });

  return {
    tours: query.data || [],
    isLoading: query.isPending,
    error: query.error,
    isError: query.isError,
  };
};

export const useAddReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTourReview,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["tour-reviews", variables.tourId],
      });
      // Invalidate tour data to update review count
      queryClient.invalidateQueries({
        queryKey: ["tour"],
      });
    },
  });
};

// Hook for featured tours
export const useFeaturedTours = (limit = 8) => {
  const query = useQuery({
    queryKey: ["featured-tours", limit],
    queryFn: async () => await getFeaturedTours(limit),
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
  });

  return {
    tours: query.data || [],
    isLoading: query.isPending,
    error: query.error,
    isError: query.isError,
  };
};

export { transformTourToCarouselCard };

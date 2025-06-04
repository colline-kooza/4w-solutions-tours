"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getFeaturedTours,
  getMoreTours,
  getNonFeaturedTours,
  type FeaturedTour,
} from "@/actions/featured-tours";

// Hook for featured tours
export const useFeaturedTours = () => {
  const query = useQuery({
    queryKey: ["tours", "featured"],
    queryFn: async () => await getFeaturedTours(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  return {
    tours: query.data || [],
    isLoading: query.isPending,
    error: query.error,
    isError: query.isError,
  };
};

// Hook for non-featured tours
export const useNonFeaturedTours = () => {
  const query = useQuery({
    queryKey: ["tours", "non-featured"],
    queryFn: async () => await getNonFeaturedTours(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  return {
    tours: query.data || [],
    isLoading: query.isPending,
    error: query.error,
    isError: query.isError,
  };
};
// Hook for more tours (remaining tours after first 6)
export const useMoreTours = () => {
  const query = useQuery({
    queryKey: ["tours", "more"],
    queryFn: async () => await getMoreTours(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  return {
    tours: query.data || [],
    isLoading: query.isPending,
    error: query.error,
    isError: query.isError,
  };
};

// Helper function to transform tour data to carousel card format
export const transformTourToCarouselCard = (tour: FeaturedTour) => {
  const averageRating =
    tour.reviews.length > 0
      ? tour.reviews.reduce((sum, review) => sum + review.rating, 0) /
        tour.reviews.length
      : 4.5;

  return {
    id: tour.id, // Keep as string instead of converting to number
    image: tour.images[0] || "/placeholder.svg?height=240&width=400",
    location: tour.Destination?.name || "Location TBD",
    rating: Math.round(averageRating * 10) / 10,
    reviewCount: tour._count.reviews,
    title: tour.title,
    slug: tour.slug,
    price: tour.price || 0,
    isLikelyToSellOut: tour.featured,
    isLiked: false,
  };
};

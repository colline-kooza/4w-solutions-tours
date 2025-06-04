"use client";

import {
  CategoryData,
  getAllTours,
  getCategoryBySlug,
  getFeaturedTours,
  getTourCategories,
  getToursByCategory,
  TourData,
} from "@/actions/front-tour-categories";
import { useQuery } from "@tanstack/react-query";

// Hook for all tour categories
export const useTourCategories = () => {
  const query = useQuery({
    queryKey: ["tour-categories"],
    queryFn: async () => await getTourCategories(),
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
  });

  return {
    categories: query.data || [],
    isLoading: query.isPending,
    error: query.error,
    isError: query.isError,
  };
};

// Hook for category by slug
export const useCategoryBySlug = (slug: string) => {
  const query = useQuery({
    queryKey: ["tour-category", slug],
    queryFn: async () => await getCategoryBySlug(slug),
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
    enabled: !!slug,
  });

  return {
    category: query.data,
    isLoading: query.isPending,
    error: query.error,
    isError: query.isError,
  };
};

// Hook for tours by category
export const useToursByCategory = (categorySlug: string) => {
  const query = useQuery({
    queryKey: ["tours", "category", categorySlug],
    queryFn: async () => await getToursByCategory(categorySlug),
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    enabled: !!categorySlug,
  });

  return {
    tours: query.data || [],
    isLoading: query.isPending,
    error: query.error,
    isError: query.isError,
  };
};

// Hook for all tours
export const useAllTours = () => {
  const query = useQuery({
    queryKey: ["tours", "all"],
    queryFn: async () => await getAllTours(),
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });

  return {
    tours: query.data || [],
    isLoading: query.isPending,
    error: query.error,
    isError: query.isError,
  };
};

// Hook for featured tours
export const useFeaturedTours = () => {
  const query = useQuery({
    queryKey: ["tours", "featured"],
    queryFn: async () => await getFeaturedTours(),
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });

  return {
    tours: query.data || [],
    isLoading: query.isPending,
    error: query.error,
    isError: query.isError,
  };
};

// Helper function to transform tour data to carousel card format
export const transformTourToCarouselCard = (tour: TourData) => {
  const averageRating =
    tour.reviews.length > 0
      ? tour.reviews.reduce((sum, review) => sum + review.rating, 0) /
        tour.reviews.length
      : 4.5;

  return {
    id: tour.id,
    image: tour.images[0] || "/placeholder.png",
    location: tour.location || "Location TBD",
    rating: Number(averageRating.toFixed(1)),
    reviewCount: tour._count.reviews,
    title: tour.title,
    slug: tour.slug,
    price: tour.discountPrice || tour.price || 0,
    isLikelyToSellOut: tour.featured || tour._count.bookings > 10,
    isLiked: false,
  };
};

// Helper function to transform category data
export const transformCategoryData = (category: CategoryData) => {
  return {
    id: category.id,
    title: category.title,
    slug: category.slug,
    imageUrl: category.imageUrl,
    description: category.description,
    tourCount: category._count.tours,
  };
};

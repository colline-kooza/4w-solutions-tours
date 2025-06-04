"use client";

import {
  getFeaturedAttractions,
  getAttractionBySlug,
  getAttractions,
  getToursByAttraction,
} from "@/actions/front-attractions";
import { transformAttractionData } from "@/lib/attractions";
import { useQuery } from "@tanstack/react-query";

// Hook for all attractions
export const useAttractions = () => {
  const query = useQuery({
    queryKey: ["attractions"],
    queryFn: async () => await getAttractions(),
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });

  return {
    attractions: query.data?.map(transformAttractionData) || [],
    isLoading: query.isPending,
    error: query.error,
    isError: query.isError,
  };
};

// Hook for featured attractions
export const useFeaturedAttractions = () => {
  const query = useQuery({
    queryKey: ["attractions", "featured"],
    queryFn: async () => await getFeaturedAttractions(),
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });

  return {
    attractions: query.data?.map(transformAttractionData) || [],
    isLoading: query.isPending,
    error: query.error,
    isError: query.isError,
  };
};

// Hook for a single attraction by slug
export const useAttractionBySlug = (slug: string) => {
  const query = useQuery({
    queryKey: ["attraction", slug],
    queryFn: async () => await getAttractionBySlug(slug),
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    enabled: !!slug,
  });

  return {
    attraction: query.data ? transformAttractionData(query.data) : null,
    isLoading: query.isPending,
    error: query.error,
    isError: query.isError,
  };
};

// Hook for tours by attraction
export const useToursByAttraction = (attractionId: string) => {
  const query = useQuery({
    queryKey: ["tours", "attraction", attractionId],
    queryFn: async () => await getToursByAttraction(attractionId),
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    enabled: !!attractionId,
  });

  return {
    tours: query.data || [],
    isLoading: query.isPending,
    error: query.error,
    isError: query.isError,
  };
};

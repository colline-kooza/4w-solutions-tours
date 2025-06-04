"use client";

import {
  getFeaturedDestinations,
  getDestinationBySlug,
  getDestinations,
  getToursByDestination,
} from "@/actions/front-destinations";
import { transformDestinationData } from "@/lib/destinations";
import { useQuery } from "@tanstack/react-query";

// Hook for all destinations
export const useDestinations = () => {
  const query = useQuery({
    queryKey: ["destinations"],
    queryFn: async () => await getDestinations(),
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });

  return {
    destinations: query.data?.map(transformDestinationData) || [],
    isLoading: query.isPending,
    error: query.error,
    isError: query.isError,
  };
};

// Hook for featured destinations
export const useFeaturedDestinations = () => {
  const query = useQuery({
    queryKey: ["destinations", "featured"],
    queryFn: async () => await getFeaturedDestinations(),
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });

  return {
    destinations: query.data?.map(transformDestinationData) || [],
    isLoading: query.isPending,
    error: query.error,
    isError: query.isError,
  };
};

// Hook for a single destination by slug
export const useDestinationBySlug = (slug: string) => {
  const query = useQuery({
    queryKey: ["destination", slug],
    queryFn: async () => await getDestinationBySlug(slug),
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    enabled: !!slug,
  });

  return {
    destination: query.data ? transformDestinationData(query.data) : null,
    isLoading: query.isPending,
    error: query.error,
    isError: query.isError,
  };
};

// Hook for tours by destination
export const useToursByDestination = (destinationId: string) => {
  const query = useQuery({
    queryKey: ["tours", "destination", destinationId],
    queryFn: async () => await getToursByDestination(destinationId),
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    enabled: !!destinationId,
  });

  return {
    tours: query.data || [],
    isLoading: query.isPending,
    error: query.error,
    isError: query.isError,
  };
};

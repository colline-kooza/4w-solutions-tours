// hooks/useAttractions.ts
"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAttraction,
  deleteAttractionById,
  getAttractionById,
  getDashboardAttractions,
  updateAttractionById,
  createTourAttraction,
  deleteTourAttractionById,
  getTourAttractionsByTourId,
  updateTourAttractionById,
  AttractionData,
  getFeaturedAttractions,
  getFeaturedAttractionsForFooter,
  PopularAttractionData,
} from "@/actions/attractions";
import toast from "react-hot-toast";
import {
  AttractionCreateProps,
  AttractionUpdateProps,
  TourAttractionCreateProps,
  TourAttractionUpdateProps,
} from "@/types/attractions";

// Fetch all attractions
export const useFetchAttractions = () => {
  const attractionsQuery = useQuery({
    queryKey: ["attractions"],
    queryFn: async () => await getDashboardAttractions(),
  });

  return {
    attractions: attractionsQuery.data || [],
    isLoading: attractionsQuery.isPending,
    error: attractionsQuery.error,
  };
};

// Fetch a single attraction
export const useFetchAttraction = (attractionId: string) => {
  const attractionQuery = useQuery({
    queryKey: ["attractions", attractionId],
    queryFn: async () => await getAttractionById(attractionId),
    enabled: !!attractionId,
  });

  return {
    attraction: attractionQuery.data,
    isLoading: attractionQuery.isPending,
    error: attractionQuery.error,
  };
};

// Create an attraction
export const useCreateAttraction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: AttractionCreateProps) =>
      await createAttraction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attractions"] });
      toast.success("Attraction created successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to create attraction");
    },
  });
};

// Update an attraction
export const useUpdateAttraction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: AttractionUpdateProps;
    }) => await updateAttractionById(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attractions"] });
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to update attraction");
    },
  });
};

// Delete an attraction
export const useDeleteAttraction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => await deleteAttractionById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attractions"] });
      toast.success("Attraction deleted successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to delete attraction");
    },
  });
};

// Fetch tour attractions by tour ID
export const useFetchTourAttractions = (tourId: string) => {
  const tourAttractionsQuery = useQuery({
    queryKey: ["tourAttractions", tourId],
    queryFn: async () => await getTourAttractionsByTourId(tourId),
    enabled: !!tourId,
  });

  return {
    tourAttractions: tourAttractionsQuery.data || [],
    isLoading: tourAttractionsQuery.isPending,
    error: tourAttractionsQuery.error,
  };
};

// Create a tour attraction
export const useCreateTourAttraction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: TourAttractionCreateProps) =>
      await createTourAttraction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tourAttractions"] });
      toast.success("Tour attraction added successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to add tour attraction");
    },
  });
};

// Update a tour attraction
export const useUpdateTourAttraction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: TourAttractionUpdateProps;
    }) => await updateTourAttractionById(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tourAttractions"] });
      toast.success("Tour attraction updated successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to update tour attraction");
    },
  });
};

// Delete a tour attraction
export const useDeleteTourAttraction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => await deleteTourAttractionById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tourAttractions"] });
      toast.success("Tour attraction removed successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to remove tour attraction");
    },
  });
};
// Hook for featured attractions
export const useFeaturedAttractions = () => {
  const query = useQuery({
    queryKey: ["attractions", "featured"],
    queryFn: async () => await getFeaturedAttractions(),
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
  });

  return {
    attractions: query.data || [],
    isLoading: query.isPending,
    error: query.error,
    isError: query.isError,
  };
};

// Helper function to transform attraction data
export const transformAttractionData = (attraction: AttractionData) => {
  return {
    id: attraction.id,
    image: attraction.images[0] || "/placeholder.svg?height=80&width=80",
    title: attraction.name,
    toursCount: attraction._count.tours,
    location: attraction.location,
    type: attraction.type,
    description: attraction.description,
  };
};
// Hook for featured attractions in footer
export const useFeaturedAttractionsForFooter = () => {
  const query = useQuery({
    queryKey: ["attractions", "footer", "featured"],
    queryFn: async () => await getFeaturedAttractionsForFooter(),
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
  });

  return {
    attractions: query.data || [],
    isLoading: query.isPending,
    error: query.error,
    isError: query.isError,
  };
};

// Helper function to transform attraction data for footer
export const transformAttractionForFooter = (
  attraction: PopularAttractionData
) => {
  return {
    id: attraction.id,
    name: attraction.name,
    slug: attraction.slug || attraction.id,
    tourCount: attraction._count.tours,
  };
};

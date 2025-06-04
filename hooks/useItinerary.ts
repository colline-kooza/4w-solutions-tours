"use client";

import {
  createTourItinerary,
  getTourItineraries,
  getBriefTourItineraries,
  getTourItineraryById,
  updateTourItinerary,
  deleteTourItinerary,
  reorderTourItineraries,
} from "@/actions/itinerary";
import {
  TourItineraryCreateProps,
  TourItineraryUpdateProps,
} from "@/types/itinerary";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

// Fetch all tour itineraries for a specific tour
export const useFetchTourItineraries = (tourId: string) => {
  const itineraryQuery = useQuery({
    queryKey: ["tour-itineraries", tourId],
    queryFn: async () => await getTourItineraries(tourId),
    enabled: !!tourId,
  });

  return {
    itineraries: itineraryQuery.data || [],
    isLoading: itineraryQuery.isPending,
    error: itineraryQuery.error,
    refetch: itineraryQuery.refetch,
  };
};

// Fetch brief tour itineraries for dashboard
export const useFetchBriefTourItineraries = (tourId: string) => {
  const briefItineraryQuery = useQuery({
    queryKey: ["brief-tour-itineraries", tourId],
    queryFn: async () => await getBriefTourItineraries(tourId),
    enabled: !!tourId,
  });

  return {
    briefItineraries: briefItineraryQuery.data || [],
    isLoading: briefItineraryQuery.isPending,
    error: briefItineraryQuery.error,
  };
};

// Fetch single tour itinerary by ID
export const useFetchTourItineraryById = (id: string) => {
  const itineraryQuery = useQuery({
    queryKey: ["tour-itinerary", id],
    queryFn: async () => await getTourItineraryById(id),
    enabled: !!id,
  });

  return {
    itinerary: itineraryQuery.data,
    isLoading: itineraryQuery.isPending,
    error: itineraryQuery.error,
  };
};

// Create tour itinerary mutation
export const useCreateTourItinerary = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: TourItineraryCreateProps) => {
      const result = await createTourItinerary(data);
      if (!result) {
        throw new Error("Failed to create tour itinerary");
      }
      return result;
    },
    onSuccess: (data) => {
      toast.success("Tour itinerary created successfully!");
      queryClient.invalidateQueries({
        queryKey: ["tour-itineraries", data.tourId],
      });
      queryClient.invalidateQueries({
        queryKey: ["brief-tour-itineraries", data.tourId],
      });
    },
    onError: (error) => {
      console.error("Error creating tour itinerary:", error);
      toast.error("Failed to create tour itinerary");
    },
  });
};

// Update tour itinerary mutation
export const useUpdateTourItinerary = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: TourItineraryUpdateProps) => {
      const result = await updateTourItinerary(data);
      if (!result) {
        throw new Error("Failed to update tour itinerary");
      }
      return result;
    },
    onSuccess: (data) => {
      toast.success("Tour itinerary updated successfully!");
      queryClient.invalidateQueries({
        queryKey: ["tour-itineraries", data.tourId],
      });
      queryClient.invalidateQueries({
        queryKey: ["brief-tour-itineraries", data.tourId],
      });
      queryClient.invalidateQueries({
        queryKey: ["tour-itinerary", data.id],
      });
    },
    onError: (error) => {
      console.error("Error updating tour itinerary:", error);
      toast.error("Failed to update tour itinerary");
    },
  });
};

// Delete tour itinerary mutation
export const useDeleteTourItinerary = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const result = await deleteTourItinerary(id);
      if (!result) {
        throw new Error("Failed to delete tour itinerary");
      }
      return result;
    },
    onSuccess: (data) => {
      toast.success("Tour itinerary deleted successfully!");
      queryClient.invalidateQueries({
        queryKey: ["tour-itineraries", data.tourId],
      });
      queryClient.invalidateQueries({
        queryKey: ["brief-tour-itineraries", data.tourId],
      });
    },
    onError: (error) => {
      console.error("Error deleting tour itinerary:", error);
      toast.error("Failed to delete tour itinerary");
    },
  });
};

// Reorder tour itineraries mutation
export const useReorderTourItineraries = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      tourId,
      reorderedItems,
    }: {
      tourId: string;
      reorderedItems: { id: string; day: number }[];
    }) => {
      const result = await reorderTourItineraries(tourId, reorderedItems);
      if (!result) {
        throw new Error("Failed to reorder tour itineraries");
      }
      return result;
    },
    onSuccess: (_, variables) => {
      toast.success("Tour itineraries reordered successfully!");
      queryClient.invalidateQueries({
        queryKey: ["tour-itineraries", variables.tourId],
      });
      queryClient.invalidateQueries({
        queryKey: ["brief-tour-itineraries", variables.tourId],
      });
    },
    onError: (error) => {
      console.error("Error reordering tour itineraries:", error);
      toast.error("Failed to reorder tour itineraries");
    },
  });
};

"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type {
  TourAttractionCreateProps,
  TourAttractionUpdateProps,
} from "@/types/attractions";
import {
  addTourToAttraction,
  getAttractionWithTours,
  getAvailableToursForAttraction,
  removeTourFromAttraction,
  updateAttractionTour,
} from "@/actions/attraction-tours";

// Fetch attraction with its tours
export function useFetchAttractionWithTours(attractionId: string) {
  return useQuery({
    queryKey: ["attraction-tours", attractionId],
    queryFn: () => getAttractionWithTours(attractionId),
    enabled: !!attractionId,
  });
}

// Fetch available tours for an attraction
export function useFetchAvailableToursForAttraction(attractionId: string) {
  return useQuery({
    queryKey: ["available-tours", attractionId],
    queryFn: () => getAvailableToursForAttraction(attractionId),
    enabled: !!attractionId,
  });
}

// Add tour to attraction
export function useAddTourToAttraction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TourAttractionCreateProps) => addTourToAttraction(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["attraction-tours", variables.attractionId],
      });
      queryClient.invalidateQueries({
        queryKey: ["available-tours", variables.attractionId],
      });
    },
  });
}

// Remove tour from attraction
export function useRemoveTourFromAttraction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      tourAttractionId,
      attractionId,
    }: {
      tourAttractionId: string;
      attractionId: string;
    }) => removeTourFromAttraction(tourAttractionId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["attraction-tours", variables.attractionId],
      });
      queryClient.invalidateQueries({
        queryKey: ["available-tours", variables.attractionId],
      });
    },
  });
}

// Update tour-attraction relationship
export function useUpdateAttractionTour() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
      attractionId,
    }: {
      id: string;
      data: TourAttractionUpdateProps;
      attractionId: string;
    }) => updateAttractionTour(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["attraction-tours", variables.attractionId],
      });
    },
  });
}

"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createDestination,
  deleteDestinationById,
  DestinationData,
  getDashboardDestinations,
  getDestinationById,
  getDestinationsForSelect,
  getFeaturedDestinations,
  updateDestinationById,
  type DestinationCreateProps,
  type DestinationUpdateProps,
} from "@/actions/destinations";
import toast from "react-hot-toast";

// Fetch all destinations
export const useFetchDestinations = () => {
  const destinationsQuery = useQuery({
    queryKey: ["destinations"],
    queryFn: async () => await getDashboardDestinations(),
  });

  return {
    destinations: destinationsQuery.data || [],
    isLoading: destinationsQuery.isPending,
    error: destinationsQuery.error,
  };
};

// Fetch a single destination
export const useFetchDestination = (destinationId: string) => {
  const destinationQuery = useQuery({
    queryKey: ["destinations", destinationId],
    queryFn: async () => await getDestinationById(destinationId),
    enabled: !!destinationId,
  });

  return {
    destination: destinationQuery.data,
    isLoading: destinationQuery.isPending,
    error: destinationQuery.error,
  };
};

// Fetch destinations for select options
export const useFetchDestinationsForSelect = () => {
  const destinationsQuery = useQuery({
    queryKey: ["destinations", "select"],
    queryFn: async () => await getDestinationsForSelect(),
  });

  return {
    destinations: destinationsQuery.data || [],
    isLoading: destinationsQuery.isPending,
    error: destinationsQuery.error,
  };
};

// Create destination mutation
export const useCreateDestination = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: DestinationCreateProps) => {
      const result = await createDestination(data);
      if (!result) {
        throw new Error("Failed to create destination");
      }
      return result;
    },
    onSuccess: (newDestination) => {
      queryClient.invalidateQueries({ queryKey: ["destinations"] });
      toast.success("Destination created successfully!");
    },
    onError: (error) => {
      toast.error("Failed to create destination");
      console.error(error);
    },
  });
};

// Update destination mutation
export const useUpdateDestination = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: DestinationUpdateProps;
    }) => {
      const result = await updateDestinationById(id, data);
      if (!result) {
        throw new Error("Failed to update destination");
      }
      return result;
    },
    onSuccess: (updatedDestination) => {
      queryClient.invalidateQueries({ queryKey: ["destinations"] });
      queryClient.invalidateQueries({
        queryKey: ["destinations", updatedDestination.id],
      });
    },
    onError: (error) => {
      toast.error("Failed to update destination");
      console.error(error);
    },
  });
};

// Delete destination mutation
export const useDeleteDestination = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const result = await deleteDestinationById(id);
      if (!result) {
        throw new Error("Failed to delete destination");
      }
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["destinations"] });
      toast.success("Destination deleted successfully!");
    },
    onError: (error) => {
      toast.error("Failed to delete destination");
      console.error(error);
    },
  });
};
export const useFeaturedDestinations = () => {
  const query = useQuery({
    queryKey: ["destinations", "featured"],
    queryFn: async () => await getFeaturedDestinations(),
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
  });

  return {
    destinations: query.data || [],
    isLoading: query.isPending,
    error: query.error,
    isError: query.isError,
  };
};
export const transformDestinationData = (destination: DestinationData) => {
  return {
    id: destination.id,
    name: destination.name,
    slug: destination.slug,
    image: destination.images[0] || "/placeholder.svg",
    description: destination.description,
  };
};

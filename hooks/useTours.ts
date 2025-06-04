"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createNewTour,
  createTourCategory,
  deleteTourById,
  deleteTourCategory,
  getDashboardTours,
  getTourById,
  getTourCategories,
  updateTourById,
  BriefTour,
  CategoryProps,
  TourCreateProps,
  TourUpdateProps,
} from "@/actions/tours";
import toast from "react-hot-toast";

// Fetch all tours
export const useFetchTours = () => {
  const toursQuery = useQuery({
    queryKey: ["tours"],
    queryFn: async () => await getDashboardTours(),
  });

  return {
    tours: toursQuery.data || [],
    isLoading: toursQuery.isPending,
    error: toursQuery.error,
  };
};

// Fetch a single tour
export const useFetchTour = (tourId: string) => {
  const tourQuery = useQuery({
    queryKey: ["tours", tourId],
    queryFn: async () => await getTourById(tourId),
    enabled: !!tourId,
  });

  return {
    tour: tourQuery.data,
    isLoading: tourQuery.isPending,
    error: tourQuery.error,
  };
};

// Fetch all tour categories
export const useFetchTourCategories = () => {
  const categoriesQuery = useQuery({
    queryKey: ["tourCategories"],
    queryFn: async () => await getTourCategories(),
  });

  return {
    categories: categoriesQuery.data || [],
    isLoading: categoriesQuery.isPending,
    error: categoriesQuery.error,
  };
};

// Create a tour
export const useCreateTour = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: TourCreateProps) => await createNewTour(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tours"] });
      toast.success("Tour created successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to create tour");
    },
  });
};

// Update a tour
export const useUpdateTour = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: TourUpdateProps }) =>
      await updateTourById(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tours"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

// Delete a tour
export const useDeleteTour = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => await deleteTourById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tours"] });
      toast.success("Tour deleted successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to delete tour");
    },
  });
};

// Create a tour category
export const useCreateTourCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CategoryProps) => await createTourCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tourCategories"] });
      toast.success("Category created successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to create category");
    },
  });
};

// Delete a tour category
export const useDeleteTourCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => await deleteTourCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tourCategories"] });
      toast.success("Category deleted successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to delete category");
    },
  });
};

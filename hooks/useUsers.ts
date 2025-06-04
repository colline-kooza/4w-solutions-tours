"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createUser,
  deleteUserById,
  getUserById,
  getDashboardUsers,
  updateUserById,
} from "@/actions/users";
import toast from "react-hot-toast";
import { UserCreateProps, UserUpdateProps } from "@/types/users";

// Fetch all users
export const useFetchUsers = () => {
  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: async () => await getDashboardUsers(),
  });

  return {
    users: usersQuery.data || [],
    isLoading: usersQuery.isPending,
    error: usersQuery.error,
  };
};

// Fetch a single user
export const useFetchUser = (userId: string) => {
  const userQuery = useQuery({
    queryKey: ["users", userId],
    queryFn: async () => await getUserById(userId),
    enabled: !!userId,
  });

  return {
    user: userQuery.data,
    isLoading: userQuery.isPending,
    error: userQuery.error,
  };
};

// Create a user
export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: UserCreateProps) => await createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User created successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to create user");
    },
  });
};

// Update a user
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UserUpdateProps }) =>
      await updateUserById(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User updated successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to update user");
    },
  });
};

// Delete a user
export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => await deleteUserById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User deleted successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to delete user");
    },
  });
};

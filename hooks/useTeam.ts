"use client";

import {
  createTeamMember,
  deleteTeamMemberById,
  getDashboardTeamMembers,
  getTeamMemberById,
  getTeamMembers,
  TeamMemberData,
  updateTeamMemberById,
} from "@/actions/team";
import { TeamCreateProps, TeamUpdateProps } from "@/types/team";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

// Fetch all team members
export const useFetchTeamMembers = () => {
  const teamQuery = useQuery({
    queryKey: ["team"],
    queryFn: async () => await getDashboardTeamMembers(),
  });

  return {
    teamMembers: teamQuery.data || [],
    isLoading: teamQuery.isPending,
    error: teamQuery.error,
  };
};

// Fetch a single team member
export const useFetchTeamMember = (memberId: string) => {
  const memberQuery = useQuery({
    queryKey: ["team", memberId],
    queryFn: async () => await getTeamMemberById(memberId),
    enabled: !!memberId,
  });

  return {
    teamMember: memberQuery.data,
    isLoading: memberQuery.isPending,
    error: memberQuery.error,
  };
};

// Create a team member
export const useCreateTeamMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: TeamCreateProps) => await createTeamMember(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team"] });
      toast.success("Team member created successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to create team member");
    },
  });
};

// Update a team member
export const useUpdateTeamMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: TeamUpdateProps }) =>
      await updateTeamMemberById(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team"] });
      toast.success("Team member updated successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to update team member");
    },
  });
};

export const useDeleteTeamMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => await deleteTeamMemberById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team"] });
      toast.success("Team member deleted successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to delete team member");
    },
  });
};
// Hook for all team members
export const useTeamMembers = () => {
  const query = useQuery({
    queryKey: ["team"],
    queryFn: async () => await getTeamMembers(),
    staleTime: 60 * 60 * 1000, // 1 hour (team data changes infrequently)
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
  });

  return {
    team: query.data || [],
    isLoading: query.isPending,
    error: query.error,
    isError: query.isError,
  };
};
export const transformTeamMember = (member: TeamMemberData) => {
  return {
    id: member.id,
    name: member.name,
    nickname: member.nickname || "Team Member",
    position: member.position,
    image: member.image || "/placeholder.png",
    bio:
      member.bio ||
      `${member.name} is a valued member of our team, bringing expertise and passion to create unforgettable safari experiences for our clients.`,
    featured:
      member.position.toLowerCase().includes("ceo") ||
      member.position.toLowerCase().includes("founder"),
  };
};

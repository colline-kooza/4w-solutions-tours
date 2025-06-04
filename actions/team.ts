"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/prisma/db";
import type {
  BriefTeamMember,
  TeamCreateProps,
  TeamUpdateProps,
} from "@/types/team";
export interface TeamMemberData {
  id: string;
  name: string;
  nickname: string | null;
  position: string;
  image: string | null;
  bio: string | null;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}
// Create a new Team Member
export async function createTeamMember(data: TeamCreateProps) {
  try {
    const teamMember = await db.team.create({
      data: {
        name: data.name,
        nickname: data.nickname,
        position: data.position,
        image: data.image || "/placeholder.png",
        bio: data.bio,
        status: data.status ?? true,
      },
    });

    revalidatePath("/dashboard/our-team");
    return teamMember;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Get all Team Members for Dashboard
export async function getDashboardTeamMembers(): Promise<BriefTeamMember[]> {
  try {
    const teamMembers = await db.team.findMany({
      orderBy: { createdAt: "desc" },
    });
    return teamMembers;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Get a single Team Member by ID
export async function getTeamMemberById(id: string) {
  try {
    const teamMember = await db.team.findUnique({
      where: { id },
    });
    return teamMember;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Update a Team Member by ID
export async function updateTeamMemberById(id: string, data: TeamUpdateProps) {
  try {
    const teamMember = await db.team.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.nickname !== undefined && { nickname: data.nickname }),
        ...(data.position && { position: data.position }),
        ...(data.image && { image: data.image }),
        ...(data.bio !== undefined && { bio: data.bio }),
        ...(data.status !== undefined && { status: data.status }),
      },
    });

    revalidatePath("/dashboard/our-team");
    return teamMember;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Delete a Team Member by ID
export async function deleteTeamMemberById(id: string) {
  try {
    const teamMember = await db.team.delete({
      where: { id },
    });

    revalidatePath("/dashboard/our-team");
    return teamMember;
  } catch (error) {
    console.error(error);
    return null;
  }
}
// Get all active team members
export async function getTeamMembers(): Promise<TeamMemberData[]> {
  try {
    const team = await db.team.findMany({
      where: {
        status: true, // Only active team members
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return team;
  } catch (error) {
    console.error("Error fetching team members:", error);
    return [];
  }
}

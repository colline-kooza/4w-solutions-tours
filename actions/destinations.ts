"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/prisma/db";
import type { DestinationClimate } from "@prisma/client";

export type DestinationCreateProps = {
  name: string;
  climate?: DestinationClimate;
};
export interface DestinationData {
  id: string;
  name: string;
  slug: string;
  images: string[];
  description: string | null;
  active: boolean;
}
export type DestinationUpdateProps = {
  name?: string;
  description?: string;
  images?: string[];
  bestTimeToVisit?: string;
  climate?: DestinationClimate;
  active?: boolean;
  verified?: boolean;
};

export type BriefDestination = {
  id: string;
  name: string;
  slug: string;
  images: string[];
  climate: DestinationClimate | null;
  active: boolean;
  verified: boolean;
  createdAt: Date;
  _count?: {
    tours: number;
  };
};

// Create a new Destination
export async function createDestination(data: DestinationCreateProps) {
  try {
    const slug = data.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    const destination = await db.destination.create({
      data: {
        name: data.name,
        slug,
        description: "Destination description coming soon...",
        climate: data.climate || "TROPICAL",
        images: [],
        active: true,
        verified: false,
      },
    });
    revalidatePath("/dashboard/destinations");
    return destination;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Get all Destinations for Dashboard
export async function getDashboardDestinations(): Promise<BriefDestination[]> {
  try {
    const destinations = await db.destination.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        images: true,
        climate: true,
        active: true,
        verified: true,
        createdAt: true,
        _count: {
          select: {
            tours: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    return destinations;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Get a single Destination by ID
export async function getDestinationById(id: string) {
  try {
    const destination = await db.destination.findUnique({
      where: { id },
      include: {
        tours: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
    });
    return destination;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Update Destination
export async function updateDestinationById(
  id: string,
  data: DestinationUpdateProps
) {
  try {
    const updateData: any = { ...data };

    // Generate new slug if name is being updated
    if (data.name) {
      updateData.slug = data.name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
    }

    const destination = await db.destination.update({
      where: { id },
      data: updateData,
    });

    revalidatePath("/dashboard/destinations");
    revalidatePath(`/dashboard/destinations/update/${id}`);
    return destination;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Delete Destination
export async function deleteDestinationById(id: string) {
  try {
    await db.destination.delete({
      where: { id },
    });
    revalidatePath("/dashboard/destinations");
    return { success: true };
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Get destinations for select options
export async function getDestinationsForSelect() {
  try {
    const destinations = await db.destination.findMany({
      where: { active: true },
      select: {
        id: true,
        name: true,
      },
      orderBy: { name: "asc" },
    });

    return destinations.map((dest) => ({
      label: dest.name,
      value: dest.id,
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}
// Get featured destinations (limit 10 for top destinations)
export async function getFeaturedDestinations(): Promise<DestinationData[]> {
  try {
    const destinations = await db.destination.findMany({
      where: {
        active: true,
        // verified: true,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        images: true,
        description: true,
        active: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return destinations;
  } catch (error) {
    console.error("Error fetching featured destinations:", error);
    return [];
  }
}

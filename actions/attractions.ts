// actions/attractions.ts
"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/prisma/db";
import {
  AttractionCreateProps,
  AttractionUpdateProps,
  BriefAttraction,
  TourAttractionCreateProps,
  TourAttractionUpdateProps,
} from "@/types/attractions";
export interface AttractionData {
  id: string;
  name: string;
  description: string | null;
  location: string;
  images: string[];
  type: string;
  _count: {
    tours: number;
  };
}
export interface PopularAttractionData {
  id: string;
  name: string;
  slug?: string;
  _count: {
    tours: number;
  };
}
export async function createAttraction(data: AttractionCreateProps) {
  try {
    const attraction = await db.attraction.create({
      data: {
        name: data.name,
        type: data.type,
        location: "Location TBD", // Default as per schema
        description: "Attraction description coming soon...",
        images: [],
      },
    });
    revalidatePath("/dashboard/attractions");
    return attraction;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Get all Attractions for Dashboard
export async function getDashboardAttractions(): Promise<BriefAttraction[]> {
  try {
    const attractions = await db.attraction.findMany({
      select: {
        id: true,
        name: true,
        type: true,
        location: true,
        images: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return attractions;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Get a single Attraction by ID
export async function getAttractionById(id: string) {
  try {
    const attraction = await db.attraction.findUnique({
      where: { id },
    });
    return attraction;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Update an Attraction
export async function updateAttractionById(
  id: string,
  data: AttractionUpdateProps
) {
  try {
    const updatedAttraction = await db.attraction.update({
      where: { id },
      data,
    });
    revalidatePath("/dashboard/attractions");
    return updatedAttraction;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Delete an Attraction
export async function deleteAttractionById(id: string) {
  try {
    const attraction = await db.attraction.delete({
      where: { id },
    });
    revalidatePath("/dashboard/attractions");
    return { ok: true, data: attraction };
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Create a TourAttraction
export async function createTourAttraction(data: TourAttractionCreateProps) {
  try {
    const tourAttraction = await db.tourAttraction.create({
      data,
    });
    revalidatePath("/dashboard/attractions");
    return tourAttraction;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Get TourAttractions by Tour ID
export async function getTourAttractionsByTourId(tourId: string) {
  try {
    const tourAttractions = await db.tourAttraction.findMany({
      where: { tourId },
      include: { attraction: true },
      orderBy: { visitOrder: "asc" },
    });
    return tourAttractions;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Update a TourAttraction
export async function updateTourAttractionById(
  id: string,
  data: TourAttractionUpdateProps
) {
  try {
    const updatedTourAttraction = await db.tourAttraction.update({
      where: { id },
      data,
    });
    revalidatePath("/dashboard/attractions");
    return updatedTourAttraction;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Delete a TourAttraction
export async function deleteTourAttractionById(id: string) {
  try {
    const tourAttraction = await db.tourAttraction.delete({
      where: { id },
    });
    revalidatePath("/dashboard/attractions");
    return { ok: true, data: tourAttraction };
  } catch (error) {
    console.error(error);
    return null;
  }
}
export async function getFeaturedAttractions(): Promise<AttractionData[]> {
  try {
    const attractions = await db.attraction.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        location: true,
        images: true,
        type: true,
        _count: {
          select: {
            tours: true,
          },
        },
      },
      orderBy: {
        tours: {
          _count: "desc",
        },
      },
    });

    return attractions;
  } catch (error) {
    console.error("Error fetching featured attractions:", error);
    return [];
  }
}
export async function getFeaturedAttractionsForFooter(): Promise<
  PopularAttractionData[]
> {
  try {
    const attractions = await db.attraction.findMany({
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            tours: true,
          },
        },
      },

      orderBy: {
        tours: {
          _count: "desc",
        },
      },
    });

    return attractions;
  } catch (error) {
    console.error("Error fetching featured attractions for footer:", error);
    return [];
  }
}

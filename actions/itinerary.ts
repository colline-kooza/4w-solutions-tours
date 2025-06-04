"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/prisma/db";
import {
  TourItineraryCreateProps,
  TourItineraryUpdateProps,
  BriefTourItinerary,
  TourItinerary,
} from "@/types/itinerary";

// Create a new TourItinerary
export async function createTourItinerary(data: TourItineraryCreateProps) {
  try {
    const itinerary = await db.tourItinerary.create({
      data: {
        tourId: data.tourId,
        day: data.day,
        title: data.title,
        description: data.description,
        activities: data.activities,
      },
    });
    revalidatePath(`/dashboard/tours/${data.tourId}`);
    return itinerary;
  } catch (error) {
    console.error("Error creating tour itinerary:", error);
    return null;
  }
}

// Get all TourItineraries for a specific tour
export async function getTourItineraries(
  tourId: string
): Promise<TourItinerary[]> {
  try {
    const itineraries = await db.tourItinerary.findMany({
      where: { tourId },
      orderBy: { day: "asc" },
    });
    return itineraries;
  } catch (error) {
    console.error("Error fetching tour itineraries:", error);
    return [];
  }
}

// Get brief TourItineraries for a specific tour (for dashboard)
export async function getBriefTourItineraries(
  tourId: string
): Promise<BriefTourItinerary[]> {
  try {
    const itineraries = await db.tourItinerary.findMany({
      where: { tourId },
      select: {
        id: true,
        day: true,
        title: true,
        activities: true,
      },
      orderBy: { day: "asc" },
    });
    return itineraries;
  } catch (error) {
    console.error("Error fetching brief tour itineraries:", error);
    return [];
  }
}

// Get a single TourItinerary by ID
export async function getTourItineraryById(
  id: string
): Promise<TourItinerary | null> {
  try {
    const itinerary = await db.tourItinerary.findUnique({
      where: { id },
    });
    return itinerary;
  } catch (error) {
    console.error("Error fetching tour itinerary:", error);
    return null;
  }
}

// Update a TourItinerary
export async function updateTourItinerary(data: TourItineraryUpdateProps) {
  try {
    const itinerary = await db.tourItinerary.update({
      where: { id: data.id },
      data: {
        ...(data.day !== undefined && { day: data.day }),
        ...(data.title !== undefined && { title: data.title }),
        ...(data.description !== undefined && {
          description: data.description,
        }),
        ...(data.activities !== undefined && { activities: data.activities }),
      },
    });

    // Get tourId to revalidate the correct path
    const tourItinerary = await db.tourItinerary.findUnique({
      where: { id: data.id },
      select: { tourId: true },
    });

    if (tourItinerary) {
      revalidatePath(`/dashboard/tours/${tourItinerary.tourId}`);
    }
    return itinerary;
  } catch (error) {
    console.error("Error updating tour itinerary:", error);
    return null;
  }
}

// Delete a TourItinerary
export async function deleteTourItinerary(id: string) {
  try {
    // Get tourId before deletion for revalidation
    const tourItinerary = await db.tourItinerary.findUnique({
      where: { id },
      select: { tourId: true },
    });

    const deleted = await db.tourItinerary.delete({
      where: { id },
    });

    if (tourItinerary) {
      revalidatePath(`/dashboard/tours/${tourItinerary.tourId}/`);
    }
    return deleted;
  } catch (error) {
    console.error("Error deleting tour itinerary:", error);
    return null;
  }
}

// Reorder itinerary days
export async function reorderTourItineraries(
  tourId: string,
  reorderedItems: { id: string; day: number }[]
) {
  try {
    const updatePromises = reorderedItems.map((item) =>
      db.tourItinerary.update({
        where: { id: item.id },
        data: { day: item.day },
      })
    );

    await Promise.all(updatePromises);
    revalidatePath(`/dashboard/tours/${tourId}`);
    return true;
  } catch (error) {
    console.error("Error reordering tour itineraries:", error);
    return false;
  }
}

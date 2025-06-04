"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/prisma/db";
import type {
  TourAttractionCreateProps,
  TourAttractionUpdateProps,
} from "@/types/attractions";

// Get attraction with its tours
export async function getAttractionWithTours(attractionId: string) {
  try {
    const attraction = await db.attraction.findUnique({
      where: { id: attractionId },
      include: {
        tours: {
          include: {
            tour: {
              select: {
                id: true,
                title: true,
                price: true,
                images: true,
              },
            },
          },
          orderBy: { visitOrder: "asc" },
        },
      },
    });
    return attraction;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Get available tours that can be added to an attraction
export async function getAvailableToursForAttraction(attractionId: string) {
  try {
    // Get tours that are not already associated with this attraction
    const tours = await db.tour.findMany({
      where: {
        active: true,
        NOT: {
          attractions: {
            some: {
              attractionId: attractionId,
            },
          },
        },
      },
      select: {
        id: true,
        title: true,
        price: true,
        images: true,
      },
      orderBy: { title: "asc" },
    });

    return tours.map((tour) => ({
      id: tour.id,
      title: tour.title,
      label: tour.title,
      value: tour.id,
      price: tour.price,
      images: tour.images,
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Add tour to attraction
export async function addTourToAttraction(data: TourAttractionCreateProps) {
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

// Remove tour from attraction
export async function removeTourFromAttraction(tourAttractionId: string) {
  try {
    const tourAttraction = await db.tourAttraction.delete({
      where: { id: tourAttractionId },
    });
    revalidatePath("/dashboard/attractions");
    return { ok: true, data: tourAttraction };
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Update tour-attraction relationship
export async function updateAttractionTour(
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

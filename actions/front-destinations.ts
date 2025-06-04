"use server";

import { db } from "@/prisma/db";

export interface DestinationData {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  images: string[];
  bestTimeToVisit: string | null;
  climate: string | null;
  active: boolean;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
  _count?: {
    tours: number;
  };
}

// Helper function to transform destination data (moved to utils)
const transformDestinationDataHelper = (destination: DestinationData) => {
  return {
    id: destination.id,
    name: destination.name,
    slug: destination.slug,
    description: destination.description || "",
    images:
      destination.images.length > 0
        ? destination.images
        : ["/placeholder.svg?height=400&width=600"],
    bestTimeToVisit: destination.bestTimeToVisit || "Year-round",
    climate: destination.climate || "TROPICAL",
    tourCount: destination._count?.tours || 0,
  };
};

// Get all active destinations
export async function getDestinations(): Promise<DestinationData[]> {
  try {
    const destinations = await db.destination.findMany({
      where: {
        active: true,
      },
      include: {
        _count: {
          select: {
            tours: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });
    return destinations;
  } catch (error) {
    console.error("Error fetching destinations:", error);
    return [];
  }
}

// Get featured destinations (those with most tours)
export async function getFeaturedDestinations(): Promise<DestinationData[]> {
  try {
    const destinations = await db.destination.findMany({
      where: {
        active: true,
      },
      include: {
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
      take: 6,
    });
    return destinations;
  } catch (error) {
    console.error("Error fetching featured destinations:", error);
    return [];
  }
}

// Get a single destination by slug
export async function getDestinationBySlug(
  slug: string
): Promise<DestinationData | null> {
  try {
    const destination = await db.destination.findUnique({
      where: {
        slug,
        active: true,
      },
      include: {
        _count: {
          select: {
            tours: true,
          },
        },
      },
    });
    return destination;
  } catch (error) {
    console.error(`Error fetching destination with slug ${slug}:`, error);
    return null;
  }
}

// Get tours by destination
export async function getToursByDestination(destinationId: string) {
  try {
    const tours = await db.tour.findMany({
      where: {
        destinationId,
        active: true,
      },
      include: {
        category: true,
        reviews: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return tours;
  } catch (error) {
    console.error(
      `Error fetching tours for destination ${destinationId}:`,
      error
    );
    return [];
  }
}

// Server action wrapper for transform function
export async function transformDestinationData(destination: DestinationData) {
  return transformDestinationDataHelper(destination);
}

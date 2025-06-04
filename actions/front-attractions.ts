"use server";

import { db } from "@/prisma/db";

export interface AttractionData {
  id: string;
  name: string;
  description: string | null;
  location: string;
  images: string[];
  type: string;
  createdAt: Date;
  updatedAt: Date;
  _count?: {
    tours: number;
  };
}

// Helper function to transform attraction data (moved to utils)
const transformAttractionDataHelper = (attraction: AttractionData) => {
  return {
    id: attraction.id,
    name: attraction.name,
    description: attraction.description || "",
    location: attraction.location,
    images:
      attraction.images.length > 0
        ? attraction.images
        : ["/placeholder.svg?height=400&width=600"],
    type: attraction.type,
    tourCount: attraction._count?.tours || 0,
    // Create a slug from the name
    slug: attraction.name.toLowerCase().replace(/\s+/g, "-"),
  };
};

// Get all attractions
export async function getAttractions(): Promise<AttractionData[]> {
  try {
    const attractions = await db.attraction.findMany({
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
    return attractions;
  } catch (error) {
    console.error("Error fetching attractions:", error);
    return [];
  }
}

// Get featured attractions (those with most tours)
export async function getFeaturedAttractions(): Promise<AttractionData[]> {
  try {
    const attractions = await db.attraction.findMany({
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
    return attractions;
  } catch (error) {
    console.error("Error fetching featured attractions:", error);
    return [];
  }
}

export async function getAttractionBySlug(
  id: string
): Promise<AttractionData | null> {
  try {
    const attraction = await db.attraction.findUnique({
      where: {
        id: id,
      },
      include: {
        _count: {
          select: {
            tours: true,
          },
        },
      },
    });

    return attraction;
  } catch (error) {
    console.error(`Error fetching attraction with id ${id}:`, error);
    return null;
  }
}

// Get tours by attraction
export async function getToursByAttraction(attractionId: string) {
  try {
    const tourAttractions = await db.tourAttraction.findMany({
      where: {
        attractionId,
      },
      include: {
        tour: {
          include: {
            category: true,
            reviews: true,
          },
        },
      },
      orderBy: {
        visitOrder: "asc",
      },
    });

    // Extract just the tour data
    return tourAttractions.map((ta) => ta.tour).filter((tour) => tour.active);
  } catch (error) {
    console.error(
      `Error fetching tours for attraction ${attractionId}:`,
      error
    );
    return [];
  }
}

// Server action wrapper for transform function
export async function transformAttractionData(attraction: AttractionData) {
  return transformAttractionDataHelper(attraction);
}

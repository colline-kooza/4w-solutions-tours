"use server";

import { db } from "@/prisma/db";

export interface FeaturedTour {
  id: string;
  title: string;
  slug: string;
  images: string[];
  price: number | null;
  //   location: string
  featured: boolean;
  category: {
    title: string;
  };
  Destination: {
    name: string;
  } | null;
  reviews: {
    rating: number;
  }[];
  _count: {
    reviews: number;
  };
}

// Get featured tours (limit 6)
export async function getFeaturedTours(): Promise<FeaturedTour[]> {
  try {
    const tours = await db.tour.findMany({
      where: {
        featured: true,
        active: true,
      },
      select: {
        id: true,
        title: true,
        slug: true,
        images: true,
        price: true,
        // location: true,
        featured: true,
        category: {
          select: {
            title: true,
          },
        },
        Destination: {
          select: {
            name: true,
          },
        },
        reviews: {
          select: {
            rating: true,
          },
        },
        _count: {
          select: {
            reviews: true,
          },
        },
      },
      take: 6,
      orderBy: {
        createdAt: "desc",
      },
    });

    return tours;
  } catch (error) {
    console.error("Error fetching featured tours:", error);
    return [];
  }
}

// Get non-featured tours (limit 6)
export async function getNonFeaturedTours(): Promise<FeaturedTour[]> {
  try {
    const tours = await db.tour.findMany({
      where: {
        featured: false,
        active: true,
      },
      select: {
        id: true,
        title: true,
        slug: true,
        images: true,
        price: true,
        location: true,
        featured: true,
        category: {
          select: {
            title: true,
          },
        },
        Destination: {
          select: {
            name: true,
          },
        },
        reviews: {
          select: {
            rating: true,
          },
        },
        _count: {
          select: {
            reviews: true,
          },
        },
      },
      take: 6,
      orderBy: {
        createdAt: "desc",
      },
    });

    return tours;
  } catch (error) {
    console.error("Error fetching non-featured tours:", error);
    return [];
  }
}

// Get more tours (skip first 6 non-featured, take next 6)
export async function getMoreTours(): Promise<FeaturedTour[]> {
  try {
    const tours = await db.tour.findMany({
      where: {
        featured: false,
        active: true,
      },
      select: {
        id: true,
        title: true,
        slug: true,
        images: true,
        price: true,
        location: true,
        featured: true,
        category: {
          select: {
            title: true,
          },
        },
        Destination: {
          select: {
            name: true,
          },
        },
        reviews: {
          select: {
            rating: true,
          },
        },
        _count: {
          select: {
            reviews: true,
          },
        },
      },
      skip: 6, // Skip the first 6 tours
      take: 6, // Take the next 6 tours
      orderBy: {
        createdAt: "desc",
      },
    });

    return tours;
  } catch (error) {
    console.error("Error fetching more tours:", error);
    return [];
  }
}

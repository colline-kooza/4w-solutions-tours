"use server";

import { db } from "@/prisma/db";

export interface TourData {
  id: string;
  title: string;
  slug: string;
  shortDescription: string | null;
  images: string[];
  price: number | null;
  discountPrice: number | null;
  duration: number | null;
  maxGroupSize: number | null;
  difficulty: string | null;
  location: string | null;
  featured: boolean;
  active: boolean;
  category: {
    id: string;
    title: string;
    slug: string;
    imageUrl: string | null;
    description: string;
  };
  reviews: {
    rating: number;
  }[];
  _count: {
    reviews: number;
    bookings: number;
  };
}

export interface CategoryData {
  id: string;
  title: string;
  slug: string;
  imageUrl: string | null;
  description: string;
  _count: {
    tours: number;
  };
}

// Get all tour categories
export async function getTourCategories(): Promise<CategoryData[]> {
  try {
    const categories = await db.category.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        imageUrl: true,
        description: true,
        _count: {
          select: {
            tours: true,
          },
        },
      },
      orderBy: { title: "asc" },
    });

    return categories;
  } catch (error) {
    console.error("Error fetching tour categories:", error);
    return [];
  }
}

// Get category by slug
export async function getCategoryBySlug(
  slug: string
): Promise<CategoryData | null> {
  try {
    const category = await db.category.findUnique({
      where: { slug },
      select: {
        id: true,
        title: true,
        slug: true,
        imageUrl: true,
        description: true,
        _count: {
          select: {
            tours: true,
          },
        },
      },
    });

    return category;
  } catch (error) {
    console.error("Error fetching category by slug:", error);
    return null;
  }
}

// Get tours by category slug
export async function getToursByCategory(
  categorySlug: string
): Promise<TourData[]> {
  try {
    const tours = await db.tour.findMany({
      where: {
        category: {
          slug: categorySlug,
        },
        active: true,
      },
      select: {
        id: true,
        title: true,
        slug: true,
        shortDescription: true,
        images: true,
        price: true,
        discountPrice: true,
        duration: true,
        maxGroupSize: true,
        difficulty: true,
        location: true,
        featured: true,
        active: true,
        category: {
          select: {
            id: true,
            title: true,
            slug: true,
            imageUrl: true,
            description: true,
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
            bookings: true,
          },
        },
      },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    });

    return tours;
  } catch (error) {
    console.error("Error fetching tours by category:", error);
    return [];
  }
}

// Get all tours
export async function getAllTours(): Promise<TourData[]> {
  try {
    const tours = await db.tour.findMany({
      where: {
        active: true,
      },
      select: {
        id: true,
        title: true,
        slug: true,
        shortDescription: true,
        images: true,
        price: true,
        discountPrice: true,
        duration: true,
        maxGroupSize: true,
        difficulty: true,
        location: true,
        featured: true,
        active: true,
        category: {
          select: {
            id: true,
            title: true,
            slug: true,
            imageUrl: true,
            description: true,
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
            bookings: true,
          },
        },
      },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    });

    return tours;
  } catch (error) {
    console.error("Error fetching all tours:", error);
    return [];
  }
}

// Get featured tours
export async function getFeaturedTours(): Promise<TourData[]> {
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
        shortDescription: true,
        images: true,
        price: true,
        discountPrice: true,
        duration: true,
        maxGroupSize: true,
        difficulty: true,
        location: true,
        featured: true,
        active: true,
        category: {
          select: {
            id: true,
            title: true,
            slug: true,
            imageUrl: true,
            description: true,
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
            bookings: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 12,
    });

    return tours;
  } catch (error) {
    console.error("Error fetching featured tours:", error);
    return [];
  }
}

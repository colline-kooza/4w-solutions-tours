"use server";

import { db } from "@/prisma/db";
import { revalidatePath } from "next/cache";
import type { TourDifficulty } from "@prisma/client";

export interface TourData {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  shortDescription: string | null;
  images: string[];
  price: number | null;
  discountPrice: number | null;
  duration: number | null;
  maxGroupSize: number | null;
  difficulty: TourDifficulty | null;
  location: string | null;
  coordinates: any;
  includes: string[];
  excludes: string[];
  featured: boolean;
  active: boolean;
  createdAt: Date;
  category: {
    id: string;
    title: string;
    slug: string;
  };
  Destination: {
    id: string;
    name: string;
    slug: string;
  } | null;
  itinerary: {
    id: string;
    day: number;
    title: string;
    description: string;
    activities: string[];
  }[];
  attractions: {
    id: string;
    visitOrder: number | null;
    duration: number | null;
    attraction: {
      id: string;
      name: string;
      description: string | null;
      location: string;
      images: string[];
      type: string;
    };
  }[];
  reviews: {
    id: string;
    rating: number;
    title: string | null;
    comment: string | null;
    helpful: number;
    verified: boolean;
    createdAt: Date;
    user: {
      id: string;
      name: string;
      image: string | null;
    };
  }[];
  _count: {
    reviews: number;
    bookings: number;
  };
}

export interface ReviewData {
  id: string;
  rating: number;
  title: string | null;
  comment: string | null;
  helpful: number;
  verified: boolean;
  createdAt: Date;
  user: {
    id: string;
    name: string;
    image: string | null;
  };
}

export interface SimilarTourData {
  id: string;
  title: string;
  slug: string;
  images: string[];
  price: number | null;
  discountPrice: number | null;
  duration: number | null;
  location: string | null;
  featured: boolean;
  category: {
    title: string;
  };
  reviews: {
    rating: number;
  }[];
  _count: {
    reviews: number;
  };
}

// Get tour by slug with all related data
export async function getTourBySlug(slug: string): Promise<TourData | null> {
  try {
    const tour = await db.tour.findUnique({
      where: {
        slug,
        active: true,
      },
      include: {
        category: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
        Destination: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        itinerary: {
          orderBy: { day: "asc" },
        },
        attractions: {
          include: {
            attraction: true,
          },
          orderBy: { visitOrder: "asc" },
        },
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
          orderBy: { createdAt: "desc" },
          take: 10, // Limit initial reviews
        },
        _count: {
          select: {
            reviews: true,
            bookings: true,
          },
        },
      },
    });

    return tour;
  } catch (error) {
    console.error("Error fetching tour:", error);
    return null;
  }
}

// Get tour reviews with pagination
export async function getTourReviews(
  tourId: string,
  page = 1,
  limit = 10
): Promise<{
  reviews: ReviewData[];
  totalCount: number;
  averageRating: number;
}> {
  try {
    const skip = (page - 1) * limit;

    const [reviews, totalCount, ratingStats] = await Promise.all([
      db.review.findMany({
        where: { tourId },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      db.review.count({
        where: { tourId },
      }),
      db.review.aggregate({
        where: { tourId },
        _avg: {
          rating: true,
        },
      }),
    ]);

    return {
      reviews,
      totalCount,
      averageRating: ratingStats._avg.rating || 0,
    };
  } catch (error) {
    console.error("Error fetching tour reviews:", error);
    return {
      reviews: [],
      totalCount: 0,
      averageRating: 0,
    };
  }
}

// Get similar tours
export async function getSimilarTours(
  tourId: string,
  categoryId: string,
  limit = 6
): Promise<SimilarTourData[]> {
  try {
    const tours = await db.tour.findMany({
      where: {
        active: true,
        categoryId,
        NOT: {
          id: tourId,
        },
      },
      include: {
        category: {
          select: {
            title: true,
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
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
      take: limit,
    });

    return tours;
  } catch (error) {
    console.error("Error fetching similar tours:", error);
    return [];
  }
}

// Add a review
export async function addTourReview(data: {
  tourId: string;
  userId: string;
  rating: number;
  title?: string;
  comment?: string;
}) {
  try {
    const review = await db.review.create({
      data: {
        tourId: data.tourId,
        userId: data.userId,
        rating: data.rating,
        title: data.title,
        comment: data.comment,
        verified: false, // You can implement verification logic
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    revalidatePath(`/tours/${data.tourId}`);
    return review;
  } catch (error) {
    console.error("Error adding review:", error);
    return null;
  }
}

// Get featured tours for homepage/similar tours
export async function getFeaturedTours(limit = 8): Promise<SimilarTourData[]> {
  try {
    const tours = await db.tour.findMany({
      where: {
        active: true,
        featured: true,
      },
      include: {
        category: {
          select: {
            title: true,
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
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    return tours;
  } catch (error) {
    console.error("Error fetching featured tours:", error);
    return [];
  }
}

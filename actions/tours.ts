"use server";

import { revalidatePath } from "next/cache";
import { Tour, TourDifficulty } from "@prisma/client";
import { generateSlug } from "@/lib/generateSlug";
import { db } from "@/prisma/db";

// Types for Tour creation and update
export interface TourCreateProps {
  title: string;
  categoryId: string;
  price: number;
}

export interface TourUpdateProps {
  title?: string;
  description?: string;
  shortDescription?: string;
  categoryId?: string;
  TourUpdateProps?: string;
  images?: string[];
  price?: number;
  discountPrice?: number;
  duration?: number;
  maxGroupSize?: number;
  difficulty?: TourDifficulty;
  location?: string;
  coordinates?: { lat: number; lng: number };
  includes?: string[];
  excludes?: string[];
  featured?: boolean;
  active?: boolean;
  destinationId?: string | null;
}

export interface CategoryProps {
  title: string;
  description: string;
  imageUrl?: string;
  slug?: string;
}

// Create a new Tour Category
export async function createTourCategory(data: CategoryProps) {
  try {
    const category = await db.category.create({
      data: {
        title: data.title,
        description: data.description,
        imageUrl: data.imageUrl,
        slug: data.slug || generateSlug(data.title),
      },
    });
    revalidatePath("/dashboard/tours");
    return category;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Get all Tour Categories
export async function getTourCategories() {
  try {
    const categories = await db.category.findMany({
      orderBy: { createdAt: "desc" },
    });
    return categories;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Delete a Tour Category
export async function deleteTourCategory(id: string) {
  try {
    const category = await db.category.delete({
      where: { id },
    });
    revalidatePath("/dashboard/tours");
    return { ok: true, data: category };
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Create a new Tour
export async function createNewTour(data: TourCreateProps) {
  try {
    const tour = await db.tour.create({
      data: {
        title: data.title,
        slug: generateSlug(data.title),
        categoryId: data.categoryId,
        price: data.price,
      },
    });
    revalidatePath("/dashboard/tours");
    return tour;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Get all Tours for Dashboard
export interface BriefTour extends Partial<Tour> {
  categoryTitle?: string;
  destinationTitle?: string | null;
}

export async function getDashboardTours(): Promise<BriefTour[]> {
  try {
    const tours = await db.tour.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        images: true,
        price: true,
        category: { select: { title: true } },
        Destination: { select: { name: true } },
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return tours.map((tour) => ({
      ...tour,
      categoryTitle: tour.category.title,
      destinationTitle: tour.Destination?.name || null,
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}
// Get a single Tour by ID
export async function getTourById(id: string) {
  try {
    const tour = await db.tour.findUnique({
      where: { id },
      include: {
        Destination: {
          select: { name: true },
        },
      },
    });

    return tour;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Update a Tour
export async function updateTourById(id: string, data: TourUpdateProps) {
  try {
    const updatedTour = await db.tour.update({
      where: { id },
      data: {
        ...data,
        slug: data.title ? generateSlug(data.title) : undefined,
      },
    });
    revalidatePath("/dashboard/tours");
    return updatedTour;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Delete a Tour
export async function deleteTourById(id: string) {
  try {
    const tour = await db.tour.delete({
      where: { id },
    });
    revalidatePath("/dashboard/tours");
    return { ok: true, data: tour };
  } catch (error) {
    console.error(error);
    return null;
  }
}

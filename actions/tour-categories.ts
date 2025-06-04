"use server";

import { db } from "@/prisma/db";

export interface OptimizedCategory {
  id: string;
  title: string;
  slug: string;
}

export async function getOptimizedTourCategories(): Promise<
  OptimizedCategory[]
> {
  try {
    const categories = await db.category.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return categories;
  } catch (error) {
    console.error("Error fetching optimized tour categories:", error);
    return [];
  }
}

import { db } from "@/prisma/db";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchQuery = request.nextUrl.searchParams.get("q");

  console.log("Search API called with query:", searchQuery);

  if (!searchQuery || searchQuery.length < 2) {
    console.log("Query too short or empty, returning empty array");
    return NextResponse.json([]);
  }

  try {
    // First, let's check if we have any active tours at all
    const totalActiveTours = await db.tour.count({
      where: { active: true },
    });
    console.log("Total active tours in database:", totalActiveTours);

    // Then perform the actual search with more flexible matching
    const tours = await db.tour.findMany({
      where: {
        AND: [
          { active: true },
          {
            OR: [
              { title: { contains: searchQuery, mode: "insensitive" } },
              {
                shortDescription: {
                  contains: searchQuery,
                  mode: "insensitive",
                },
              },
              { description: { contains: searchQuery, mode: "insensitive" } },
              { location: { contains: searchQuery, mode: "insensitive" } },
              // Add category search
              {
                category: {
                  title: { contains: searchQuery, mode: "insensitive" },
                },
              },
            ],
          },
        ],
      },
      select: {
        id: true,
        title: true,
        slug: true,
        price: true,
        discountPrice: true,
        images: true,
        shortDescription: true,
        location: true,
        duration: true,
      },
      take: 10,
    });

    console.log(`Found ${tours.length} tours matching "${searchQuery}"`);
    console.log(
      "Tour titles found:",
      tours.map((t) => t.title)
    );

    return NextResponse.json(tours);
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Failed to search tours" },
      { status: 500 }
    );
  }
}

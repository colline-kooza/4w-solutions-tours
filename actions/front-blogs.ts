"use server";

import { db } from "@/prisma/db";

export interface BlogData {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  thumbnail: string | null;
  content: string | null;
  published: boolean | null;
  featured: boolean | null;
  author: {
    name: string;
    image: string | null;
  };
  authorName: string;
  authorImage: string | null;
  authorTitle: string | null;
  category: {
    name: string;
    slug: string;
  };
  categoryTitle: string;
  readingTime: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogCategoryData {
  id: string;
  name: string;
  slug: string;
  _count: {
    blogs: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Get all blog categories with blog counts
export async function getBlogCategories(): Promise<BlogCategoryData[]> {
  try {
    const categories = await db.blogCategory.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            blogs: true,
          },
        },
      },
      orderBy: {
        blogs: {
          _count: "desc", // Order by most popular categories
        },
      },
    });

    return categories;
  } catch (error) {
    console.error("Error fetching blog categories:", error);
    return [];
  }
}

// Get all published blogs
export async function getBlogs(): Promise<BlogData[]> {
  try {
    const blogs = await db.blog.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        thumbnail: true,
        content: true,
        published: true,
        featured: true,
        author: {
          select: {
            name: true,
            image: true,
          },
        },
        authorName: true,
        authorImage: true,
        authorTitle: true,
        category: {
          select: {
            name: true,
            slug: true,
          },
        },
        categoryTitle: true,
        readingTime: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return blogs;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

// Get blogs by category
export async function getBlogsByCategory(
  categorySlug: string
): Promise<BlogData[]> {
  try {
    const blogs = await db.blog.findMany({
      where: {
        // published: true,
        category: {
          slug: categorySlug,
        },
      },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        thumbnail: true,
        content: true,
        published: true,
        featured: true,
        author: {
          select: {
            name: true,
            image: true,
          },
        },
        authorName: true,
        authorImage: true,
        authorTitle: true,
        category: {
          select: {
            name: true,
            slug: true,
          },
        },
        categoryTitle: true,
        readingTime: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return blogs;
  } catch (error) {
    console.error(`Error fetching blogs for category ${categorySlug}:`, error);
    return [];
  }
}

// Get featured/trending blogs
export async function getFeaturedBlogs(): Promise<BlogData[]> {
  try {
    const blogs = await db.blog.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        thumbnail: true,
        content: true,
        published: true,
        featured: true,
        author: {
          select: {
            name: true,
            image: true,
          },
        },
        authorName: true,
        authorImage: true,
        authorTitle: true,
        category: {
          select: {
            name: true,
            slug: true,
          },
        },
        categoryTitle: true,
        readingTime: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return blogs;
  } catch (error) {
    console.error("Error fetching featured blogs:", error);
    return [];
  }
}

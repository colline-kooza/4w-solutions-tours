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
  authorId: string;
  authorName: string;
  authorImage: string | null;
  authorTitle: string | null;
  categoryId: string;
  categoryTitle: string;
  readingTime: number | null;
  createdAt: Date;
  updatedAt: Date;
  author?: {
    name: string;
    image: string | null;
  };
  category?: {
    name: string;
    slug: string;
  };
}

export interface BlogCategoryData {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  _count: {
    blogs: number;
  };
}

// Get all published blogs
export async function getBlogs(): Promise<BlogData[]> {
  try {
    const blogs = await db.blog.findMany({
      where: {
        published: true,
      },
      include: {
        author: {
          select: {
            name: true,
            image: true,
          },
        },
        category: {
          select: {
            name: true,
            slug: true,
          },
        },
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

// Get featured blogs
export async function getFeaturedBlogs(): Promise<BlogData[]> {
  try {
    const blogs = await db.blog.findMany({
      where: {
        published: true,
        featured: true,
      },
      include: {
        author: {
          select: {
            name: true,
            image: true,
          },
        },
        category: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 6,
    });
    return blogs;
  } catch (error) {
    console.error("Error fetching featured blogs:", error);
    return [];
  }
}

// Get a single blog by slug
export async function getBlogBySlug(slug: string): Promise<BlogData | null> {
  try {
    const blog = await db.blog.findUnique({
      where: {
        slug,
        published: true,
      },
      include: {
        author: {
          select: {
            name: true,
            image: true,
          },
        },
        category: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
    });
    return blog;
  } catch (error) {
    console.error(`Error fetching blog with slug ${slug}:`, error);
    return null;
  }
}

// Get blogs by category
export async function getBlogsByCategory(
  categorySlug: string
): Promise<BlogData[]> {
  try {
    const blogs = await db.blog.findMany({
      where: {
        published: true,
        category: {
          slug: categorySlug,
        },
      },
      include: {
        author: {
          select: {
            name: true,
            image: true,
          },
        },
        category: {
          select: {
            name: true,
            slug: true,
          },
        },
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

// Get all blog categories
export async function getBlogCategories(): Promise<BlogCategoryData[]> {
  try {
    const categories = await db.blogCategory.findMany({
      include: {
        _count: {
          select: {
            blogs: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });
    return categories;
  } catch (error) {
    console.error("Error fetching blog categories:", error);
    return [];
  }
}

"use client";

import {
  BlogCategoryData,
  BlogData,
  getBlogBySlug,
  getBlogCategories,
  getBlogs,
  getBlogsByCategory,
  getFeaturedBlogs,
} from "@/actions/front-blogs2";
import { useQuery } from "@tanstack/react-query";

// Hook for all blog categories
export const useBlogCategories = () => {
  const query = useQuery({
    queryKey: ["blog-categories"],
    queryFn: async () => {
      try {
        return await getBlogCategories();
      } catch (error) {
        console.error("Error fetching blog categories:", error);
        throw error;
      }
    },
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  return {
    categories: query.data || [],
    isLoading: query.isPending,
    error: query.error,
    isError: query.isError,
    refetch: query.refetch,
  };
};

// Hook for all blogs
export const useBlogs = () => {
  const query = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      try {
        return await getBlogs();
      } catch (error) {
        console.error("Error fetching blogs:", error);
        throw error;
      }
    },
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  return {
    blogs: query.data || [],
    isLoading: query.isPending,
    error: query.error,
    isError: query.isError,
    refetch: query.refetch,
  };
};

// Hook for blogs by category
export const useBlogsByCategory = (categorySlug: string) => {
  const query = useQuery({
    queryKey: ["blogs", "category", categorySlug],
    queryFn: async () => {
      try {
        return await getBlogsByCategory(categorySlug);
      } catch (error) {
        console.error(
          `Error fetching blogs for category ${categorySlug}:`,
          error
        );
        throw error;
      }
    },
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    enabled: !!categorySlug && categorySlug !== "all", // Only run if category is provided and not "all"
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  return {
    blogs: query.data || [],
    isLoading: query.isPending,
    error: query.error,
    isError: query.isError,
    refetch: query.refetch,
  };
};

// Hook for featured blogs
export const useFeaturedBlogs = () => {
  const query = useQuery({
    queryKey: ["blogs", "featured"],
    queryFn: async () => {
      try {
        return await getFeaturedBlogs();
      } catch (error) {
        console.error("Error fetching featured blogs:", error);
        throw error;
      }
    },
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  return {
    blogs: query.data || [],
    isLoading: query.isPending,
    error: query.error,
    isError: query.isError,
    refetch: query.refetch,
  };
};

// Hook for a single blog by slug
export const useBlogBySlug = (slug: string) => {
  const query = useQuery({
    queryKey: ["blog", slug],
    queryFn: async () => {
      try {
        if (!slug) {
          throw new Error("Blog slug is required");
        }
        const result = await getBlogBySlug(slug);
        if (!result) {
          throw new Error(`Blog with slug "${slug}" not found`);
        }
        return result;
      } catch (error) {
        console.error(`Error fetching blog with slug ${slug}:`, error);
        throw error;
      }
    },
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    enabled: !!slug,
    retry: (failureCount, error: any) => {
      // Don't retry if it's a 404 error (blog not found)
      if (error?.message?.includes("not found") || error?.status === 404) {
        return false;
      }
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  return {
    blog: query.data,
    isLoading: query.isPending,
    error: query.error,
    isError: query.isError,
    refetch: query.refetch,
  };
};

// Helper function to transform blog data
export const transformBlogData = (blog: BlogData) => {
  if (!blog) return null;

  return {
    id: blog.id || "",
    title: blog.title || "Untitled",
    slug: blog.slug || "",
    description: blog.description || "",
    thumbnail: blog.thumbnail || "/placeholder.svg?height=300&width=400",
    authorName: blog.author?.name || blog.authorName || "Anonymous",
    authorImage:
      blog.author?.image ||
      blog.authorImage ||
      "/placeholder.svg?height=40&width=40",
    authorTitle: blog.authorTitle || "",
    categoryName: blog.category?.name || blog.categoryTitle || "Uncategorized",
    categorySlug: blog.category?.slug || "",
    readingTime: blog.readingTime || 0,
    createdAt: blog.createdAt || new Date(),
    featured: blog.featured || false,
  };
};

// Helper function to transform category data
export const transformCategoryData = (category: BlogCategoryData) => {
  if (!category) return null;

  return {
    id: category.id || "",
    name: category.name || "Unnamed Category",
    slug: category.slug || "",
    blogCount: category._count?.blogs || 0,
  };
};

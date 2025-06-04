"use client";

import {
  BlogCategoryData,
  BlogData,
  getBlogCategories,
  getBlogs,
  getBlogsByCategory,
  getFeaturedBlogs,
} from "@/actions/front-blogs";
import { useQuery } from "@tanstack/react-query";

// Hook for all blog categories
export const useBlogCategories = () => {
  const query = useQuery({
    queryKey: ["blog-categories"],
    queryFn: async () => await getBlogCategories(),
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
  });

  return {
    categories: query.data || [],
    isLoading: query.isPending,
    error: query.error,
    isError: query.isError,
  };
};

// Hook for all blogs
export const useBlogs = () => {
  const query = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => await getBlogs(),
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });

  return {
    blogs: query.data || [],
    isLoading: query.isPending,
    error: query.error,
    isError: query.isError,
  };
};

// Hook for blogs by category
export const useBlogsByCategory = (categorySlug: string) => {
  const query = useQuery({
    queryKey: ["blogs", "category", categorySlug],
    queryFn: async () => await getBlogsByCategory(categorySlug),
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    enabled: !!categorySlug && categorySlug !== "all", // Only run if category is provided and not "all"
  });

  return {
    blogs: query.data || [],
    isLoading: query.isPending,
    error: query.error,
    isError: query.isError,
  };
};

// Hook for featured blogs
export const useFeaturedBlogs = () => {
  const query = useQuery({
    queryKey: ["blogs", "featured"],
    queryFn: async () => await getFeaturedBlogs(),
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });

  return {
    blogs: query.data || [],
    isLoading: query.isPending,
    error: query.error,
    isError: query.isError,
  };
};

// Helper function to transform blog data
export const transformBlogData = (blog: BlogData) => {
  return {
    id: blog.id,
    title: blog.title,
    slug: blog.slug,
    description: blog.description,
    thumbnail: blog.thumbnail || "/placeholder.svg?height=300&width=400",
    authorName: blog.author?.name || blog.authorName,
    authorImage:
      blog.author?.image ||
      blog.authorImage ||
      "/placeholder.svg?height=40&width=40",
    authorTitle: blog.authorTitle,
    categoryName: blog.category?.name || blog.categoryTitle,
    categorySlug: blog.category?.slug,
    readingTime: blog.readingTime,
    createdAt: blog.createdAt,
    featured: blog.featured,
  };
};

// Helper function to transform category data
export const transformCategoryData = (category: BlogCategoryData) => {
  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    blogCount: category._count.blogs,
  };
};

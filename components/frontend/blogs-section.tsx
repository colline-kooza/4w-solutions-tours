"use client"

import { Suspense, useState } from "react"
import { Button } from "../ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import {
  useBlogCategories,
  useBlogs,
  useBlogsByCategory,
  useFeaturedBlogs,
  transformBlogData,
  transformCategoryData,
} from "@/hooks/use-blogs"
import BlogsSkeleton from "../ui/blogs-skeleton"


// Blog Article Component
function BlogArticle({ blog }: { blog: any }) {
  return (
    <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <Link href={`/blogs/${blog.slug}`}>
        <div className="aspect-[4/3] relative">
          <Image
            src={blog.thumbnail || "/placeholder.svg?height=300&width=400"}
            alt={blog.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6">
          <h3 className="font-bold text-lg text-gray-900 mb-4 leading-tight line-clamp-2">{blog.title}</h3>
          {blog.description && <p className="text-gray-600 text-sm mb-4 line-clamp-2">{blog.description}</p>}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
              <Image
                src={"/placeholder.png"}
                alt={blog.authorName}
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-gray-600 text-sm">{blog.authorName}</span>
              {blog.readingTime && <span className="text-gray-400 text-xs block">{blog.readingTime} min read</span>}
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}

// Category Filter Component
function CategoryFilter({ categories, activeCategory, onCategoryChange }: any) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
      <Button
        variant={activeCategory === "all" ? "default" : "outline"}
        className={`whitespace-nowrap ${
          activeCategory === "all"
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "border-gray-300 text-gray-700 hover:bg-gray-50"
        }`}
        onClick={() => onCategoryChange("all")}
      >
        🌍 All articles
      </Button>
      {categories.map((category: any) => (
        <Button
          key={category.id}
          variant={activeCategory === category.slug ? "default" : "outline"}
          className={`whitespace-nowrap ${
            activeCategory === category.slug
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
          onClick={() => onCategoryChange(category.slug)}
        >
          {category.name}
          {category.blogCount > 0 && <span className="ml-1 text-xs">({category.blogCount})</span>}
        </Button>
      ))}
    </div>
  )
}

// Main Blogs Content Component
function BlogsContent() {
  const [activeCategory, setActiveCategory] = useState("all")
  const { categories, isLoading: categoriesLoading, error: categoriesError } = useBlogCategories()
  const { blogs: allBlogs, isLoading: allBlogsLoading, error: allBlogsError } = useBlogs()
  const {
    blogs: categoryBlogs,
    isLoading: categoryBlogsLoading,
    error: categoryBlogsError,
  } = useBlogsByCategory(activeCategory)
  const { blogs: featuredBlogs, isLoading: featuredLoading, error: featuredError } = useFeaturedBlogs()

  if (categoriesLoading || allBlogsLoading || featuredLoading) {
    return <BlogsSkeleton />
  }

  if (categoriesError || allBlogsError || featuredError) {
    // Fallback content
    return (
      <div>
        <section className="py-16">
          <div className="container mx-auto px-6 md:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Explore by destination</h2>
            <div className="text-center text-gray-500">
              <p>Unable to load blog categories. Please try again later.</p>
            </div>
          </div>
        </section>
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-6 md:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Trending now</h2>
            <div className="text-center text-gray-500">
              <p>Unable to load blog articles. Please try again later.</p>
            </div>
          </div>
        </section>
      </div>
    )
  }

  const transformedCategories = categories.map(transformCategoryData)
  const transformedFeaturedBlogs = featuredBlogs.map(transformBlogData)

  // Determine which blogs to show based on active category
  const blogsToShow =
    activeCategory === "all"
      ? transformedFeaturedBlogs.length > 0
        ? transformedFeaturedBlogs
        : allBlogs.map(transformBlogData)
      : categoryBlogs.map(transformBlogData)

  const isLoadingBlogs = activeCategory === "all" ? false : categoryBlogsLoading

  return (
    <div>
      {/* Explore by Destination */}
      <section className="py-16">
        <div className="container mx-auto px-6 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Explore by destination</h2>

          <CategoryFilter
            categories={transformedCategories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>
      </section>

      {/* Trending Now / Category Blogs */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6 md:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {activeCategory === "all"
                ? "Trending now"
                : `${transformedCategories.find((cat) => cat.slug === activeCategory)?.name || "Category"} Articles`}
            </h2>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="rounded-full">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {isLoadingBlogs ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm animate-pulse">
                  <div className="aspect-[4/3] bg-gray-200" />
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded mb-4" />
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full" />
                      <div className="h-4 bg-gray-200 rounded w-24" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : blogsToShow.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {blogsToShow.slice(0, 8).map((blog) => (
                <BlogArticle key={blog.id} blog={blog} />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12">
              <p>No articles found in this category.</p>
              <Button variant="outline" className="mt-4" onClick={() => setActiveCategory("all")}>
                View all articles
              </Button>
            </div>
          )}

          {/* Show more button if there are more blogs */}
          {blogsToShow.length > 8 && (
            <div className="text-center mt-8">
              <Button variant="outline" className="px-8">
                Load more articles
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

// Main Optimized Blogs Container with Suspense
export default function BlogsContainer() {
  return (
    <Suspense fallback={<BlogsSkeleton />}>
      <BlogsContent />
    </Suspense>
  )
}

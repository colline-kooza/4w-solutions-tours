"use client"
import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram, Calendar, Clock, Share2, ArrowLeft } from "lucide-react"
import { FaPinterest } from "react-icons/fa"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useBlogBySlug, useFeaturedBlogs } from "@/hooks/use-front-blogs"
import { BlogSkeleton } from "./blog-skeleton"

interface BlogContentProps {
  blogSlug: string
}

export function BlogContent({ blogSlug }: BlogContentProps) {
  const [mounted, setMounted] = useState(false)
  const { blog, isLoading: blogLoading, isError: blogError } = useBlogBySlug(blogSlug)
  const { blogs: featuredBlogs, isLoading: featuredLoading } = useFeaturedBlogs()

  // Ensure component is mounted before rendering
  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render anything until mounted
  if (!mounted) {
    return <BlogSkeleton />
  }

  if (blogLoading) {
    return <BlogSkeleton />
  }

  if (blogError || !blog) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600">The blog post you're looking for doesn't exist.</p>
          <Link href="/blogs" className="mt-4 inline-block">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </div>
    )
  }

  // Format date with error handling
  const formatDate = (date: Date | string) => {
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date
      if (isNaN(dateObj.getTime())) {
        return 'Invalid Date'
      }
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(dateObj)
    } catch (error) {
      console.error('Date formatting error:', error)
      return 'Date unavailable'
    }
  }

  // Safe content rendering with sanitization
  const renderContent = (content: string | null | undefined) => {
    if (!content) {
      return (
        <div className="text-center py-16">
          <p className="text-gray-600">Blog content is coming soon...</p>
        </div>
      )
    }

    // Basic XSS protection - in production, use a proper sanitization library
    const sanitizedContent = content
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '')

    return (
      <div
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        className="prose prose-lg prose-gray max-w-none
          prose-headings:text-gray-900 prose-headings:font-bold
          prose-p:text-gray-700 prose-p:leading-relaxed
          prose-a:text-[#00c295] prose-a:no-underline hover:prose-a:underline
          prose-strong:text-gray-900
          prose-ul:text-gray-700 prose-ol:text-gray-700
          prose-li:text-gray-700
          prose-blockquote:border-l-[#00c295] prose-blockquote:bg-gray-50 prose-blockquote:p-4
          prose-img:rounded-lg prose-img:shadow-lg
          prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
          prose-pre:bg-gray-900 prose-pre:text-white"
      />
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[400px] lg:h-[500px] overflow-hidden">
        <Image
          src={blog.thumbnail || "/placeholder.svg?height=500&width=1000"}
          alt={blog.title}
          fill
          className="object-cover"
          priority
          onError={(e) => {
            // Fallback to placeholder if image fails to load
            e.currentTarget.src = "/placeholder.svg?height=500&width=1000"
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col justify-center h-full p-6 md:p-10 lg:p-16">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-4">
              <Link href="/blogs" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span className="font-medium">Back to Blog</span>
              </Link>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary" className="bg-[#00c295] text-white">
                {blog.category?.name || blog.categoryTitle || 'Uncategorized'}
              </Badge>
              {blog.featured && (
                <Badge variant="secondary" className="bg-yellow-500 text-white">
                  Featured
                </Badge>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-extrabold text-white leading-tight mb-6">
              {blog.title}
            </h1>

            <div className="flex items-center gap-6 text-white/90 mb-6">
              <div className="flex items-center gap-3">
                <Image
                  src={blog.author?.image || blog.authorImage || "/placeholder.svg?height=40&width=40"}
                  alt={blog.author?.name || blog.authorName || 'Anonymous'}
                  width={48}
                  height={48}
                  className="rounded-full"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg?height=40&width=40"
                  }}
                />
                <div>
                  <p className="font-semibold">{blog.author?.name || blog.authorName || 'Anonymous'}</p>
                  {blog.authorTitle && <p className="text-sm text-white/70">{blog.authorTitle}</p>}
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(blog.createdAt)}</span>
                </div>
                {blog.readingTime && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{blog.readingTime} min read</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button
                size="sm"
                variant="secondary"
                className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: blog.title,
                      url: window.location.href,
                    }).catch(console.error)
                  } else {
                    navigator.clipboard.writeText(window.location.href)
                  }
                }}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <div className="flex gap-2">
                <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                  <Facebook className="w-4 h-4 text-white" />
                </div>
                <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                  <Instagram className="w-4 h-4 text-white" />
                </div>
                <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                  <FaPinterest className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Blog Description */}
          {blog.description && (
            <div className="text-xl text-gray-700 leading-relaxed mb-8 p-6 bg-gray-50 rounded-lg border-l-4 border-[#00c295]">
              {blog.description}
            </div>
          )}

          {/* Blog Content */}
          <div className="prose prose-lg max-w-none">
            {renderContent(blog.content)}
          </div>

          {/* Author Bio */}
          <div className="mt-16 p-6 bg-gray-50 rounded-lg">
            <div className="flex items-start gap-4">
              <Image
                src={blog.author?.image || blog.authorImage || "/placeholder.svg?height=80&width=80"}
                alt={blog.author?.name || blog.authorName || 'Anonymous'}
                width={80}
                height={80}
                className="rounded-full"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg?height=80&width=80"
                }}
              />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {blog.author?.name || blog.authorName || 'Anonymous'}
                </h3>
                {blog.authorTitle && <p className="text-[#00c295] font-medium mb-2">{blog.authorTitle}</p>}
                <p className="text-gray-600">
                  Travel enthusiast and content creator sharing amazing experiences and travel tips.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {!featuredLoading && featuredBlogs && featuredBlogs.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Related Posts</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredBlogs.slice(0, 3).map((relatedBlog) => (
                  <Link key={relatedBlog.id} href={`/blogs/${relatedBlog.slug}`}>
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                      <div className="relative h-48">
                        <Image
                          src={relatedBlog.thumbnail || "/placeholder.svg?height=200&width=400"}
                          alt={relatedBlog.title}
                          fill
                          className="object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.svg?height=200&width=400"
                          }}
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="secondary" className="bg-[#00c295] text-white text-xs">
                            {relatedBlog.category?.name || relatedBlog.categoryTitle || 'Uncategorized'}
                          </Badge>
                          {relatedBlog.readingTime && (
                            <span className="text-xs text-gray-500">{relatedBlog.readingTime} min read</span>
                          )}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{relatedBlog.title}</h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{relatedBlog.description}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>{relatedBlog.author?.name || relatedBlog.authorName || 'Anonymous'}</span>
                          <span>•</span>
                          <span>{formatDate(relatedBlog.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-[#00c295] py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for Your Next Adventure?</h2>
            <p className="text-lg mb-8">Explore our amazing tours and turn your travel dreams into reality.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/tours">
                <Button size="lg" variant="secondary">
                  Browse Tours
                </Button>
              </Link>
              <Link href="/blogs">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-[#00c295]"
                >
                  Read More Blogs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
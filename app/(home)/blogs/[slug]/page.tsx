import { Suspense } from "react"
import { notFound } from "next/navigation"
import { BlogSkeleton } from "@/components/frontend/blog-skeleton"
import { BlogContent } from "@/components/frontend/blog-content"
import { getBlogBySlug } from "@/actions/front-blogs2"

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function BlogPage({ params }: PageProps) {
  const { slug } = await params

  // Fetch blog data on server to check if it exists
  const blog = await getBlogBySlug(slug)

  if (!blog) {
    notFound()
  }

  return (
    <Suspense fallback={<BlogSkeleton />}>
      <BlogContent blogSlug={slug} />
    </Suspense>
  )
}

// Generate metadata
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const blog = await getBlogBySlug(slug)

  if (!blog) {
    return {
      title: "Blog Not Found",
    }
  }

  return {
    title: `${blog.title} | MarkW Tours & Travel Blog`,
    description: blog.description || `Read our latest blog post about ${blog.title}.`,
  }
}

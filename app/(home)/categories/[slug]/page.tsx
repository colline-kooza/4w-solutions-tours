import { Suspense } from "react"
import { notFound } from "next/navigation"
import { getCategoryBySlug } from "@/actions/front-tour-categories"
import { TourCategorySkeleton } from "@/components/frontend/tour-category-skeleton"
import { TourCategoryContent } from "@/components/frontend/tour-category-content"


interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function TourCategoryPage({ params }: PageProps) {
  const { slug } = await params

  // Fetch category data on server to check if it exists
  const category = await getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  return (
    <Suspense fallback={<TourCategorySkeleton />}>
      <TourCategoryContent categorySlug={slug} />
    </Suspense>
  )
}

// Generate metadata
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    return {
      title: "Category Not Found",
    }
  }

  return {
    title: `${category.title} Tours | MarkW Tours & Travel`,
    description:
      category.description ||
      `Discover amazing ${category.title.toLowerCase()} tours and experiences with MarkW Tours & Travel.`,
  }
}

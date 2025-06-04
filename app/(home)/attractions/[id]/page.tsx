import { Suspense } from "react"
import { notFound } from "next/navigation"
import { getAttractionBySlug } from "@/actions/front-attractions"
import { AttractionSkeleton } from "@/components/frontend/attraction-skeleton"
import { AttractionContent } from "@/components/frontend/attraction-content"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function AttractionPage({ params }: PageProps) {
  const { id } = await params

  // Fetch attraction data on server to check if it exists
  const attraction = await getAttractionBySlug(id)

  if (!attraction) {
    notFound()
  }

  return (
    <Suspense fallback={<AttractionSkeleton />}>
      <AttractionContent attractionSlug={id} />
    </Suspense>
  )
}

// Generate metadata
export async function generateMetadata({ params }: PageProps) {
  const { id } = await params
  const attraction = await getAttractionBySlug(id)

  if (!attraction) {
    return {
      title: "Attraction Not Found",
    }
  }

  return {
    title: `${attraction.name} | MarkW Tours & Travel`,
    description:
      attraction.description ||
      `Explore ${attraction.name}, one of our featured attractions with MarkW Tours & Travel.`,
  }
}

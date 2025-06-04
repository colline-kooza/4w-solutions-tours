import { Suspense } from "react"
import { notFound } from "next/navigation"
import { getDestinationBySlug } from "@/actions/front-destinations"
import { DestinationSkeleton } from "@/components/frontend/destination-skeleton"
import { DestinationContent } from "@/components/frontend/destination-content"

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function DestinationPage({ params }: PageProps) {
  const { slug } = await params

  // Fetch destination data on server to check if it exists
  const destination = await getDestinationBySlug(slug)

  if (!destination) {
    notFound()
  }

  return (
    <Suspense fallback={<DestinationSkeleton />}>
      <DestinationContent destinationSlug={slug} />
    </Suspense>
  )
}

// Generate metadata
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const destination = await getDestinationBySlug(slug)

  if (!destination) {
    return {
      title: "Destination Not Found",
    }
  }

  return {
    title: `${destination.name} | MarkW Tours & Travel`,
    description:
      destination.description ||
      `Discover amazing tours and experiences in ${destination.name} with MarkW Tours & Travel.`,
  }
}

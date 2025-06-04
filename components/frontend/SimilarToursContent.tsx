"use client"

import { Suspense } from "react"
import { useSimilarTours, transformTourToCarouselCard } from "@/hooks/use-tours"
import ReusableCarouselSection from "./ReusableCarouselSection"
import TourCarouselSkeleton from "@/components/ui/tour-carousel-skeleton"

interface SimilarToursSectionProps {
  tourId: string
  categoryId: string
}

function SimilarToursContent({ tourId, categoryId}: SimilarToursSectionProps) {
  const { tours, isLoading, error } = useSimilarTours(tourId, categoryId, 6)

  if (isLoading) {
    return <TourCarouselSkeleton />
  }

  if (error || tours.length === 0) {
    return null
  }

  const carouselCards = tours.map(transformTourToCarouselCard)

  return (
    <ReusableCarouselSection
      title={`You May also Like`}
      cards={carouselCards}
      autoScrollInterval={5000}
      showNavigation={true}
    />
  )
}

export default function SimilarToursSection(props: SimilarToursSectionProps) {
  return (
    <Suspense fallback={<TourCarouselSkeleton />}>
      <SimilarToursContent {...props} />
    </Suspense>
  )
}

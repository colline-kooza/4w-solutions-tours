"use client"

import { Suspense } from "react"
import { useMoreTours, transformTourToCarouselCard } from "@/hooks/use-featured-tours"
import TourCarouselSkeleton from "@/components/ui/tour-carousel-skeleton"
import ReusableCarouselSection from "./frontend/ReusableCarouselSection"

function MoreToursContent() {
  const { tours, isLoading, error } = useMoreTours()

  if (isLoading) {
    return <TourCarouselSkeleton />
  }

  if (error) {
    return (
      <div className="mt-16">
        <div className="w-full max-w-7xl mx-auto px-4 py-8">
          <div className="text-center text-red-500">Failed to load more tours. Please try again later.</div>
        </div>
      </div>
    )
  }

  const carouselCards = tours.map(transformTourToCarouselCard)

  if (carouselCards.length === 0) {
    return (
      <div className="mt-16">
        <div className="w-full max-w-7xl mx-auto px-4 py-8">
          <div className="text-center text-gray-500">No more tours available at the moment.</div>
        </div>
      </div>
    )
  }

  return (
    <ReusableCarouselSection
      title="More Tours You Might Like"
      cards={carouselCards}
      autoScrollInterval={5000}
      showNavigation={true}
    />
  )
}

export default function MoreToursCarousel() {
  return (
    <Suspense fallback={<TourCarouselSkeleton />}>
      <MoreToursContent />
    </Suspense>
  )
}

"use client"

import { Suspense } from "react"
import { useFeaturedTours, transformTourToCarouselCard } from "@/hooks/use-featured-tours"
import ReusableCarouselSection from "./ReusableCarouselSection"
import TourCarouselSkeleton from "@/components/ui/tour-carousel-skeleton"

function FeaturedToursContent() {
  const { tours, isLoading, error } = useFeaturedTours()

  if (isLoading) {
    return <TourCarouselSkeleton />
  }

  if (error) {
    return (
      <div className="mt-16">
        <div className="w-full max-w-7xl mx-auto px-4 py-8">
          <div className="text-center text-red-500">Failed to load featured tours. Please try again later.</div>
        </div>
      </div>
    )
  }

  const carouselCards = tours.map(transformTourToCarouselCard)

  if (carouselCards.length === 0) {
    return (
      <div className="mt-16">
        <div className="w-full max-w-7xl mx-auto px-4 py-8">
          <div className="text-center text-gray-500">No featured tours available at the moment.</div>
        </div>
      </div>
    )
  }

  return (
    <ReusableCarouselSection
      title="Featured Tours Around the World"
      cards={carouselCards}
      autoScrollInterval={5000}
      showNavigation={true}
    />
  )
}

export default function FeaturedToursCarousel() {
  return (
    <Suspense fallback={<TourCarouselSkeleton />}>
      <FeaturedToursContent />
    </Suspense>
  )
}

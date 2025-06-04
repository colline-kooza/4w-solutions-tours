"use client"

import { Suspense } from "react"
import { useNonFeaturedTours, transformTourToCarouselCard } from "@/hooks/use-featured-tours"
import ReusableCarouselSection from "./ReusableCarouselSection"
import TourCarouselSkeleton from "@/components/ui/tour-carousel-skeleton"

function InterestBasedToursContent() {
  const { tours, isLoading, error } = useNonFeaturedTours()

  if (isLoading) {
    return <TourCarouselSkeleton />
  }

  if (error) {
    return (
      <div className="mt-16">
        <div className="w-full max-w-7xl mx-auto px-4 py-8">
          <div className="text-center text-red-500">Failed to load tours. Please try again later.</div>
        </div>
      </div>
    )
  }

  const carouselCards = tours.map(transformTourToCarouselCard)

  if (carouselCards.length === 0) {
    return (
      <div className="mt-16">
        <div className="w-full max-w-7xl mx-auto px-4 py-8">
          <div className="text-center text-gray-500">No tours available at the moment.</div>
        </div>
      </div>
    )
  }

  return (
    <ReusableCarouselSection
      title="Based on your interest in Uganda"
      cards={carouselCards}
      autoScrollInterval={5000}
      showNavigation={true}
    />
  )
}

export default function InterestBasedToursCarousel() {
  return (
    <Suspense fallback={<TourCarouselSkeleton />}>
      <InterestBasedToursContent />
    </Suspense>
  )
}

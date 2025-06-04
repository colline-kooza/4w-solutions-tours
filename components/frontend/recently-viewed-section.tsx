"use client"

import { useTourStore } from "@/stores/tour-store"
import ReusableCarouselSection from "./ReusableCarouselSection"

export default function RecentlyViewedSection() {
  const { recentlyViewed } = useTourStore()

  // Don't render if no recently viewed tours
  if (recentlyViewed.length === 0) {
    return null
  }

  return (
    <ReusableCarouselSection
      title="Recently Viewed Tours"
      cards={recentlyViewed}
      autoScrollInterval={0} 
      showNavigation={true}
      className="bg-gray-50"
    />
  )
}

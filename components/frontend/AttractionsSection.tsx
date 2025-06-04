"use client"

import { Suspense } from "react"
import Link from "next/link"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import AttractionsSkeleton from "@/components/ui/attractions-skeleton"
import { transformAttractionData, useFeaturedAttractions } from "@/hooks/useAttractions"

interface OptimizedAttractionsSectionProps {
  title: string
  showSeeAll?: boolean
  className?: string
  location?: string // Optional location filter
}

function AttractionsContent({ title, showSeeAll, className, location }: OptimizedAttractionsSectionProps) {
  // Use location-based hook if location is provided, otherwise use featured attractions
  const featuredQuery = useFeaturedAttractions()

  const { attractions, isLoading, error } = location ? featuredQuery : featuredQuery

  if (isLoading) {
    return <AttractionsSkeleton />
  }

  if (error) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-20">
        <div className="text-center text-red-500">Failed to load attractions. Please try again later.</div>
      </div>
    )
  }

  const transformedAttractions = attractions.map(transformAttractionData)

  if (transformedAttractions.length === 0) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-20">
        <div className="text-center text-gray-500">No attractions available at the moment.</div>
      </div>
    )
  }

  return (
    <div className={`w-full max-w-7xl mx-auto px-4 py-20 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        {showSeeAll && (
          <Link href="/attractions">
            <Button variant="link" className="text-blue-600 hover:text-blue-800 p-0 h-auto font-medium hidden lg:block">
              See all {">"}
            </Button>
          </Link>
        )}
      </div>

      {/* Desktop Grid Layout (Large screens) */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-6">
        {transformedAttractions.map((attraction) => (
          <Link
            key={attraction.id}
            href={`/attractions/${attraction.id}`}
            className="flex items-center space-x-4 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
          >
            <div className="flex-shrink-0">
              <img
                src={attraction.image || "/placeholder.svg?height=80&width=80"}
                alt={attraction.title}
                className="w-20 h-20 object-cover rounded-lg"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold text-gray-900 line-clamp-2 leading-5">{attraction.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{attraction.toursCount} Tours and Activities</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Tablet Grid Layout (Medium screens) */}
      <div className="hidden md:grid md:grid-cols-2 lg:hidden gap-6">
        {transformedAttractions.map((attraction) => (
          <Link
            key={attraction.id}
            href={`/attractions/${attraction.id}`}
            className="flex items-center space-x-4 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
          >
            <div className="flex-shrink-0">
              <img
                src={attraction.image || "/placeholder.svg?height=70&width=70"}
                alt={attraction.title}
                className="w-[70px] h-[70px] object-cover rounded-lg"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-5">{attraction.title}</h3>
              <p className="text-xs text-gray-600 mt-1">{attraction.toursCount} Tours and Activities</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Mobile Scroll Layout */}
      <div className="md:hidden">
        <ScrollArea className="w-full">
          <div className="flex space-x-3 pb-4">
            {transformedAttractions.map((attraction) => (
              <div key={attraction.id} className="flex-shrink-0 w-[260px]">
                <Link
                  href={`/attractions/${attraction.id}`}
                  className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors block"
                >
                  <div className="flex-shrink-0">
                    <img
                      src={attraction.image || "/placeholder.svg?height=60&width=60"}
                      alt={attraction.title}
                      className="w-[60px] h-[60px] object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-4">{attraction.title}</h3>
                    <p className="text-xs text-gray-600 mt-1">{attraction.toursCount} Tours and Activities</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {/* Mobile See All Button */}
        {showSeeAll && (
          <div className="mt-4 text-center">
            <Link href="/#">
              <Button variant="outline" className="w-full">
                See all attractions
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default function AttractionsSection(props: OptimizedAttractionsSectionProps) {
  return (
    <Suspense fallback={<AttractionsSkeleton />}>
      <AttractionsContent {...props} />
    </Suspense>
  )
}

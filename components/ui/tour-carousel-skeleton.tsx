import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function TourCarouselSkeleton() {
  return (
    <div className="mt-16">
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        {/* Header Skeleton */}
        <div className="flex items-center justify-center mb-10">
          <Skeleton className="h-8 w-80" />
        </div>

        {/* Carousel Skeleton */}
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex-shrink-0 w-[85%] sm:w-1/2 lg:w-1/3 xl:w-1/4">
              <Card className="border-0 shadow-none">
                <CardContent className="p-0">
                  <div className="relative">
                    {/* Image Skeleton */}
                    <Skeleton className="w-full h-60 rounded-lg" />

                    {/* Badge Skeleton */}
                    <Skeleton className="absolute top-3 left-3 h-6 w-24 rounded-full" />

                    {/* Heart Icon Skeleton */}
                    <Skeleton className="absolute top-3 right-3 h-8 w-8 rounded-full" />
                  </div>

                  {/* Card Details Skeleton */}
                  <div className="pt-3 space-y-2">
                    {/* Location Skeleton */}
                    <div className="flex items-center">
                      <Skeleton className="w-2 h-2 rounded-full mr-2" />
                      <Skeleton className="h-4 w-32" />
                    </div>

                    {/* Rating Skeleton */}
                    <div className="flex items-center space-x-1">
                      <Skeleton className="h-4 w-4" />
                      <Skeleton className="h-4 w-20" />
                    </div>

                    {/* Title Skeleton */}
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>

                    {/* Price Skeleton */}
                    <div className="pt-1">
                      <Skeleton className="h-6 w-24" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

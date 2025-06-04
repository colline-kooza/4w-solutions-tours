import { Skeleton } from "@/components/ui/skeleton"

export function TourDetailSkeleton() {
  return (
    <div className="w-full bg-white">
      {/* Contact info skeleton */}
      <div className="max-w-7xl mx-auto px-4 flex justify-end gap-6 text-sm py-1">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-4 w-24" />
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto md:px-4 px-1 pb-12">
        {/* Title skeleton */}
        <Skeleton className="h-8 w-3/4 my-4" />

        {/* Ratings and location skeleton */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Skeleton key={star} className="w-5 h-5" />
            ))}
          </div>
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-1" />
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-4 w-1" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-1" />
          <Skeleton className="h-4 w-28" />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left column - Carousel skeleton */}
          <div className="w-full lg:w-2/3">
            <div className="flex gap-3">
              {/* Thumbnails skeleton */}
              <div className="flex flex-col gap-2 w-20">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <Skeleton key={item} className="h-16 w-full rounded-lg" />
                ))}
              </div>
              {/* Main image skeleton */}
              <Skeleton className="flex-1 h-[400px] md:h-[500px] rounded-xl" />
            </div>
          </div>

          {/* Right column - Booking card skeleton */}
          <div className="w-full lg:w-1/3">
            <div className="border rounded-lg p-6">
              <Skeleton className="h-6 w-32 mb-4" />
              <Skeleton className="h-8 w-24 mb-6" />
              <div className="space-y-4">
                <div>
                  <Skeleton className="h-4 w-16 mb-2" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div>
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div>
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Tour info skeleton */}
        <div className="flex flex-wrap items-center gap-6 mt-6 py-4 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <Skeleton className="w-5 h-5" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="w-5 h-5" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="w-5 h-5" />
            <Skeleton className="h-4 w-28" />
          </div>
        </div>

        {/* Tabs skeleton */}
        <div className="mt-8">
          <div className="flex border-b">
            {[1, 2, 3, 4].map((tab) => (
              <Skeleton key={tab} className="h-10 w-24 mr-4" />
            ))}
          </div>
          <div className="mt-6 space-y-4">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function ReviewsSkeleton() {
  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-6 w-48" />
          <div className="flex items-center gap-1">
            <Skeleton className="h-5 w-8" />
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Skeleton key={star} className="w-4 h-4" />
              ))}
            </div>
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2].map((review) => (
          <div key={review} className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Skeleton key={star} className="w-4 h-4" />
                ))}
              </div>
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-1" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

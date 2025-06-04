import { Skeleton } from "@/components/ui/skeleton"

export default function DestinationsSkeleton() {
  return (
    <section className="w-full md:py-16 py-10 px-2">
      <div className="max-w-7xl mx-auto">
        {/* Title Skeleton */}
        <div className="text-center md:mb-8 mb-6">
          <Skeleton className="h-8 w-64 mx-auto" />
        </div>

        {/* Desktop Grid Skeleton - hidden on mobile */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="relative rounded-lg overflow-hidden aspect-[3/2]">
              <Skeleton className="w-full h-full" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Skeleton className="h-6 w-20" />
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Carousel Skeleton */}
        <div className="md:hidden">
          <div className="flex gap-2 overflow-hidden">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex-shrink-0 w-[calc(60%-8px)]">
                <div className="relative rounded-lg overflow-hidden aspect-[3/2]">
                  <Skeleton className="w-full h-full" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Skeleton className="h-6 w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

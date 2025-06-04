import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"

export default function AttractionsSkeleton() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-20">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-6 w-20 hidden lg:block" />
      </div>

      {/* Desktop Grid Layout Skeleton (Large screens) */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, index) => (
          <div key={index} className="flex items-center space-x-4 p-2">
            <Skeleton className="w-20 h-20 rounded-lg flex-shrink-0" />
            <div className="flex-1 min-w-0 space-y-2">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        ))}
      </div>

      {/* Tablet Grid Layout Skeleton (Medium screens) */}
      <div className="hidden md:grid md:grid-cols-2 lg:hidden gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="flex items-center space-x-4 p-2">
            <Skeleton className="w-[70px] h-[70px] rounded-lg flex-shrink-0" />
            <div className="flex-1 min-w-0 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Scroll Layout Skeleton */}
      <div className="md:hidden">
        <ScrollArea className="w-full">
          <div className="flex space-x-3 pb-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex-shrink-0 w-[260px]">
                <div className="flex items-center space-x-3 p-2">
                  <Skeleton className="w-[60px] h-[60px] rounded-lg flex-shrink-0" />
                  <div className="flex-1 min-w-0 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-3 w-2/3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {/* Mobile See All Button Skeleton */}
        <div className="mt-4 text-center">
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  )
}

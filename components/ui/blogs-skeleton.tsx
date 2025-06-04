import { Skeleton } from "@/components/ui/skeleton"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function BlogsSkeleton() {
  return (
    <div>
      {/* Explore by Destination Skeleton */}
      <section className="py-16">
        <div className="container mx-auto px-6 md:px-8">
          <Skeleton className="h-8 w-64 mb-8" />

          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
            {Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={index} className="h-10 w-32 rounded-md flex-shrink-0" />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Now Skeleton */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6 md:px-8">
          <div className="flex items-center justify-between mb-8">
            <Skeleton className="h-8 w-48" />
            <div className="flex gap-2">
              <div className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center">
                <ChevronLeft className="w-4 h-4 text-gray-400" />
              </div>
              <div className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center">
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <article key={index} className="bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="aspect-[4/3] relative">
                  <Skeleton className="w-full h-full" />
                </div>
                <div className="p-6">
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-6 w-3/4 mb-4" />
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

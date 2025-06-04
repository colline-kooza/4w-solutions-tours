"use client"
import { Users } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export default function TeamGallerySkeleton() {
  return (
    <section className="py-16 lg:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-20">
          <div className="inline-flex items-center gap-2 bg-[#22c55e]/10 border border-[#22c55e]/20 rounded-full px-4 py-2 text-[#22c55e] text-sm font-medium mb-6">
            <Users className="w-4 h-4" />
            Meet Our Team
          </div>
          <h2 className="text-3xl md:text-3xl lg:text-4xl font-black text-gray-900 mb-6">
            The People Behind
            <span className="block text-[#22c55e]">Your Adventure</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our passionate team of safari experts and guides are dedicated to creating unforgettable experiences.
          </p>
        </div>

        {/* Team Carousel Skeleton */}
        <div className="relative">
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-1 sm:px-2 lg:px-4"
              >
                <div
                  className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-xl h-full"
                  style={{
                    transform: `rotate(${index % 2 === 0 ? "2deg" : "-2deg"})`,
                    transformOrigin: "center bottom",
                  }}
                >
                  <div className="aspect-[4/5] relative overflow-hidden">
                    <Skeleton className="w-full h-full" />
                  </div>

                  {/* Card content skeleton */}
                  <div className="p-3 sm:p-4 lg:p-6 text-center min-h-[100px] sm:min-h-[120px] flex flex-col justify-center space-y-2">
                    <Skeleton className="h-4 w-3/4 mx-auto" />
                    <Skeleton className="h-3 w-1/2 mx-auto" />
                    <Skeleton className="h-3 w-2/3 mx-auto" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel controls skeleton */}
          <div className="absolute left-1 sm:left-2 lg:left-4 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 sm:p-3 shadow-lg">
            <Skeleton className="w-4 h-4 sm:w-5 sm:h-5 rounded-full" />
          </div>

          <div className="absolute right-1 sm:right-2 lg:right-4 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 sm:p-3 shadow-lg">
            <Skeleton className="w-4 h-4 sm:w-5 sm:h-5 rounded-full" />
          </div>

          {/* Carousel indicators skeleton */}
          <div className="flex justify-center mt-4 sm:mt-6 space-x-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className={`h-2 rounded-full ${index === 0 ? "w-6" : "w-2"}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

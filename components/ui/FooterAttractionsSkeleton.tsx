import { Skeleton } from "@/components/ui/skeleton"

export default function FooterAttractionsSkeleton() {
  return (
    <div className="px-4 py-10 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Title Skeleton */}
        <Skeleton className="mb-6 h-6 w-48" />

        {/* Attractions List Skeleton */}
        <div className="text-sm text-gray-600 leading-relaxed">
          <div className="flex flex-wrap items-center gap-2">
            {Array.from({ length: 15 }).map((_, index) => (
              <div key={index} className="flex items-center">
                <Skeleton className="h-4 w-24" />
                {index < 14 && <span className="mx-2 text-gray-400 font-light">|</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

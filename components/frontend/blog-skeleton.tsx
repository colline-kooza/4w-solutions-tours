import { Skeleton } from "@/components/ui/skeleton"

export function BlogSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section Skeleton */}
      <section className="relative h-[400px] md:h-[400px] lg:h-[500px] overflow-hidden">
        <Skeleton className="w-full h-full" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 flex flex-col justify-center h-full p-6 md:p-10 lg:p-16">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-4">
              <Skeleton className="w-5 h-5 rounded-full" />
              <Skeleton className="w-24 h-5" />
            </div>
            <Skeleton className="w-3/4 h-12 mb-6" />
            <div className="flex items-center gap-4 mb-6">
              <Skeleton className="w-12 h-12 rounded-full" />
              <div>
                <Skeleton className="w-32 h-5 mb-1" />
                <Skeleton className="w-24 h-4" />
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-6">
              <Skeleton className="w-32 h-6" />
              <Skeleton className="w-32 h-6" />
            </div>
          </div>
        </div>
      </section>

      {/* Content Section Skeleton */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="w-full h-8 mb-6" />
          <Skeleton className="w-full h-6 mb-4" />
          <Skeleton className="w-full h-6 mb-4" />
          <Skeleton className="w-full h-6 mb-4" />
          <Skeleton className="w-full h-6 mb-8" />

          <Skeleton className="w-full h-80 mb-8" />

          <Skeleton className="w-full h-6 mb-4" />
          <Skeleton className="w-full h-6 mb-4" />
          <Skeleton className="w-full h-6 mb-4" />
          <Skeleton className="w-full h-6 mb-8" />

          <Skeleton className="w-3/4 h-8 mb-6" />
          <Skeleton className="w-full h-6 mb-4" />
          <Skeleton className="w-full h-6 mb-4" />
          <Skeleton className="w-full h-6 mb-8" />
        </div>
      </div>
    </div>
  )
}

import { Skeleton } from "@/components/ui/skeleton"

export function DestinationSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section Skeleton */}
      <section className="relative h-[400px] md:h-[400px] lg:h-[500px] overflow-hidden">
        <Skeleton className="w-full h-full" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 flex flex-col justify-center h-full p-6 md:p-10 lg:p-16 gap-10">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-4">
              <Skeleton className="w-5 h-5 rounded-full" />
              <Skeleton className="w-24 h-5" />
            </div>
            <Skeleton className="w-3/4 h-12 mb-6" />
            <Skeleton className="w-full h-20 mb-6" />
            <div className="flex flex-wrap items-center gap-6">
              <Skeleton className="w-32 h-6" />
              <Skeleton className="w-32 h-6" />
              <Skeleton className="w-32 h-6" />
            </div>
          </div>

          <div>
            <Skeleton className="w-48 h-5 mb-3" />
            <div className="flex gap-4">
              <Skeleton className="w-12 h-12 rounded-full" />
              <Skeleton className="w-12 h-12 rounded-full" />
              <Skeleton className="w-12 h-12 rounded-full" />
              <Skeleton className="w-12 h-12 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Content Section Skeleton */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <Skeleton className="w-64 h-10 mx-auto mb-4" />
          <Skeleton className="w-96 h-6 mx-auto" />
        </div>

        <div className="flex justify-center mb-8">
          <Skeleton className="w-48 h-10" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="rounded-lg overflow-hidden">
                <Skeleton className="w-full h-60" />
                <div className="p-4 space-y-3">
                  <Skeleton className="w-24 h-4" />
                  <Skeleton className="w-32 h-4" />
                  <Skeleton className="w-full h-5" />
                  <Skeleton className="w-32 h-6" />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function TourCategorySkeleton() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Skeleton */}
      <section className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
        <Skeleton className="absolute inset-0" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 flex flex-col justify-center h-full p-6 md:p-10 lg:p-16 gap-10">
          <div className="max-w-4xl space-y-4">
            <Skeleton className="h-12 md:h-16 lg:h-20 w-3/4 bg-white/20" />
            <Skeleton className="h-6 w-1/2 bg-white/20" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-4 w-24 bg-white/20" />
            <div className="flex gap-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="w-12 h-12 rounded-full bg-white/20" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content Skeleton */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <Skeleton className="h-8 w-64 mx-auto mb-4" />
          <Skeleton className="h-4 w-96 mx-auto" />
        </div>

        {/* Tours Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Card key={i} className="border-0 shadow-none">
              <CardContent className="p-0">
                <div className="space-y-3">
                  <Skeleton className="w-full h-60 rounded-lg" />
                  <div className="px-2 space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

"use client"

import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { transformDestinationData, useFeaturedDestinations } from "@/hooks/useDestinations"
import DestinationsSkeleton from "../ui/DestinationsSkeleton"

function TopDestinationsContent() {
  const { destinations, isLoading, error } = useFeaturedDestinations()

  if (isLoading) {
    return <DestinationsSkeleton />
  }

  if (error) {
    return (
      <section className="w-full md:py-16 py-10 px-2">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-red-500">Failed to load destinations. Please try again later.</div>
        </div>
      </section>
    )
  }

  const transformedDestinations = destinations.map(transformDestinationData)

  if (transformedDestinations.length === 0) {
    return (
      <section className="w-full md:py-16 py-10 px-2">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-gray-500">No destinations available at the moment.</div>
        </div>
      </section>
    )
  }

  return (
    <section className="w-full md:py-16 py-10 px-2">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center md:mb-8 mb-6 text-gray-900">Top Destinations</h2>

        {/* Desktop Grid - hidden on mobile */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-4">
          {transformedDestinations.map((destination) => (
            <Link
              key={destination.id}
              href={`/destinations/${destination.slug}`}
              className="relative group cursor-pointer rounded-lg overflow-hidden aspect-[3/2] transition-all duration-300"
            >
              <Image
                src={destination.image || "/placeholder.svg"}
                alt={destination.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
              />

              {/* Blur overlay for text readability - disappears on hover */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent group-hover:from-transparent transition-all duration-300" />

              {/* Destination name */}
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-lg font-semibold text-center px-2 drop-shadow-lg">{destination.name}</h3>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile Carousel - shows 1.5 items */}
        <div className="md:hidden">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {transformedDestinations.map((destination) => (
                <CarouselItem key={destination.id} className="pl-2 md:pl-4 basis-[calc(60%-8px)]">
                  <Link
                    href={`/destinations/${destination.slug}`}
                    className="relative group cursor-pointer rounded-lg overflow-hidden aspect-[3/2] transition-all duration-300 block"
                  >
                    <Image
                      src={destination.image || "/placeholder.svg"}
                      alt={destination.name}
                      fill
                      className="object-cover"
                      sizes="50vw"
                    />

                    {/* Blur overlay for text readability - disappears on hover */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent group-hover:from-transparent transition-all duration-300" />

                    {/* Destination name */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h3 className="text-white text-lg font-semibold text-center px-2 drop-shadow-lg">
                        {destination.name}
                      </h3>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" /> */}
          </Carousel>
        </div>
      </div>
    </section>
  )
}

export default function TopDestinations() {
  return (
    <Suspense fallback={<DestinationsSkeleton />}>
      <TopDestinationsContent />
    </Suspense>
  )
}

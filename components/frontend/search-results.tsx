"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Clock, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTourSearch } from "@/hooks/use-tour-search"

interface SearchResultsProps {
  query: string
}

export default function SearchResults({ query }: SearchResultsProps) {
  const { results, isLoading, setQuery } = useTourSearch()

  // Set the query when the component mounts
  useEffect(() => {
    setQuery(query)
  }, [query, setQuery])

  if (isLoading) {
    return <SearchResultsSkeleton />
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <Search className="h-12 w-12 mx-auto text-gray-300 mb-4" />
        <h2 className="text-xl font-medium text-gray-700 mb-2">No results found</h2>
        <p className="text-gray-500 mb-6">We couldn't find any tours matching "{query}"</p>
        <Link href="/" passHref>
          <Button>Back to Home</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {results.map((tour) => (
        <div key={tour.id} className="bg-white rounded-lg shadow overflow-hidden">
          <div className="flex flex-col sm:flex-row">
            <div className="sm:w-40 md:w-48 h-48 sm:h-auto relative">
              {tour.images?.[0] ? (
                <Image src={tour.images[0] || "/placeholder.svg"} alt={tour.title} fill className="object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
              )}
            </div>

            <div className="p-4 flex-1">
              <h2 className="text-xl font-bold mb-2">{tour.title}</h2>

              <div className="flex items-center text-sm text-gray-500 mb-3">
                {tour.location && (
                  <div className="flex items-center mr-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{tour.location}</span>
                  </div>
                )}
                {tour.duration && (
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>
                      {tour.duration} {tour.duration === 1 ? "day" : "days"}
                    </span>
                  </div>
                )}
              </div>

              {tour.shortDescription && <p className="text-gray-600 mb-4 line-clamp-2">{tour.shortDescription}</p>}

              <div className="flex items-center justify-between mt-4">
                <div>
                  {tour.discountPrice !== null && tour.discountPrice !== undefined ? (
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold">${tour.discountPrice}</span>
                      <span className="text-sm text-gray-500 line-through">${tour.price}</span>
                    </div>
                  ) : (
                    <span className="text-lg font-bold">${tour.price}</span>
                  )}
                </div>

                <Link href={`/tours/${tour.slug}`} passHref>
                  <Button>View Details</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function SearchResultsSkeleton() {
  return (
    <div className="space-y-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-white rounded-lg shadow p-4 flex gap-4">
          <div className="w-40 h-28 bg-gray-200 rounded-md animate-pulse"></div>
          <div className="flex-1 space-y-2">
            <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
            <div className="h-8 bg-gray-200 rounded w-24 mt-4 animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  )
}

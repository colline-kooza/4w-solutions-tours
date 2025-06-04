"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram, MapPin, Users, Star, Tag } from "lucide-react"
import { FaPinterest } from "react-icons/fa"
import { transformTourToCarouselCard } from "@/hooks/use-tours"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAttractionBySlug, useToursByAttraction } from "@/hooks/use-front-attractions"
import ReusableCarouselSection from "./ReusableCarouselSection"
import { AttractionSkeleton } from "./attraction-skeleton"

interface AttractionContentProps {
  attractionSlug: string
}

export function AttractionContent({ attractionSlug }: AttractionContentProps) {
  const { attraction, isLoading: attractionLoading, isError: attractionError } = useAttractionBySlug(attractionSlug)
  const [viewMode, setViewMode] = useState<"carousel" | "grid">("carousel")

  // Only fetch tours if we have an attraction
  const { tours, isLoading: toursLoading, isError: toursError } = useToursByAttraction(attraction?.id || "")

  if (attractionLoading) {
    return <AttractionSkeleton />
  }

  if (attractionError || !attraction) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Attraction Not Found</h1>
          <p className="text-gray-600">The attraction you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  const carouselCards = tours.map((tour: any) =>
    transformTourToCarouselCard({
      ...tour,
      _count: tour._count ?? { reviews: Array.isArray(tour.reviews) ? tour.reviews.length : 0 }
    })
  )

  // Format attraction type for display
  const formatAttractionType = (type: string) => {
    return type
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase())
  }

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[450px] md:h-[400px] lg:h-[500px] overflow-hidden">
        <Image
          src={attraction.images[0] || "/placeholder.svg?height=500&width=1000"}
          alt={`${attraction.name} attraction`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex flex-col justify-center h-full p-6 md:p-10 lg:p-16 gap-10">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-white/80" />
              <span className="text-white/80 font-medium">{attraction.location}</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-4xl xl:text-4xl font-extrabold text-white leading-tight mb-6">
              {attraction.name}
            </h1>
            <p className="text-base md:text-lg text-white/90 font-medium mb-6 max-w-2xl">{attraction.description}</p>
            <div className="flex flex-wrap items-center md:gap-3 text-white/80">
              <div className="flex items-center gap-2">
                <Tag className="w-5 h-5" />
                <span className="font-medium">Type: {formatAttractionType(attraction.type)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span className="font-medium">{attraction.tourCount} Tours Available</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">Featured Attraction</span>
              </div>
            </div>
          </div>

          <div>
            <p className="text-white/70 font-semibold mb-3 uppercase tracking-wider animate-pulse text-sm">
              Follow Our Adventures
            </p>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                <Facebook className="w-6 h-6 text-white" />
              </div>
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                <Instagram className="w-6 h-6 text-white" />
              </div>
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                </div>
              </div>
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                <FaPinterest className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Attraction Info Section */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">About {attraction.name}</h2>
              <p className="text-gray-700 mb-6">{attraction.description}</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-5 h-5 text-[#00c295]" />
                    <h3 className="font-semibold">Location</h3>
                  </div>
                  <p className="text-gray-600">{attraction.location}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Tag className="w-5 h-5 text-[#00c295]" />
                    <h3 className="font-semibold">Type</h3>
                  </div>
                  <p className="text-gray-600">{formatAttractionType(attraction.type)}</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {attraction.images.slice(0, 4).map((image, index) => (
                <div key={index} className={`rounded-lg overflow-hidden ${index === 0 ? "col-span-2" : ""}`}>
                  <Image
                    src={image || "/placeholder.svg?height=300&width=400"}
                    alt={`${attraction.name} image ${index + 1}`}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tours Section */}
      <div className="container mx-auto px-4 py-16">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Tours Featuring {attraction.name}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover tours that include visits to this amazing attraction
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 rounded-lg p-1 flex">
            <Button
              variant={viewMode === "carousel" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("carousel")}
              className="rounded-md"
            >
              Carousel View
            </Button>
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-md"
            >
              Grid View
            </Button>
          </div>
        </div>

        {/* Tours Display */}
        {toursLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <Card key={i} className="border-0 shadow-lg">
                  <CardContent className="p-0">
                    <div className="relative">
                      <div className="relative overflow-hidden rounded-lg">
                        <div className="w-full h-60 bg-gray-200 animate-pulse" />
                      </div>
                      <div className="p-4 space-y-3">
                        <div className="w-24 h-4 bg-gray-200 animate-pulse" />
                        <div className="w-32 h-4 bg-gray-200 animate-pulse" />
                        <div className="w-full h-5 bg-gray-200 animate-pulse" />
                        <div className="w-32 h-6 bg-gray-200 animate-pulse" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        ) : carouselCards.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Tours Available</h3>
            <p className="text-gray-600">
              We're currently working on adding tours featuring {attraction.name}. Check back soon!
            </p>
          </div>
        ) : viewMode === "carousel" ? (
          <ReusableCarouselSection
            title=""
            cards={carouselCards}
            autoScrollInterval={5000}
            showNavigation={true}
            className="mt-0"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {carouselCards.map((card) => (
              <Link href={`/tours/${card.slug}`} key={card.id}>
                <Card key={card.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-0">
                    <div className="relative">
                      <div className="relative overflow-hidden rounded-lg">
                        <Image
                          src={card.image || "/placeholder.svg?height=300&width=400"}
                          alt={card.title}
                          width={400}
                          height={300}
                          className="w-full h-60 object-cover hover:scale-105 transition-transform duration-300"
                        />
                        {card.isLikelyToSellOut && (
                          <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600 text-white text-xs font-medium px-2 py-1">
                            Recommended
                          </Badge>
                        )}
                      </div>
                      <div className="p-4 space-y-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
                          {card.location}
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-[#00c295] text-[#00c295]" />
                          <span className="text-sm font-medium text-gray-900">
                            {card.rating} ({card.reviewCount.toLocaleString()})
                          </span>
                        </div>
                        <h3 className="text-base font-medium text-gray-900 line-clamp-2 leading-5">{card.title}</h3>
                        <div className="pt-1">
                          <span className="text-sm text-gray-600">from UGX </span>
                          <span className="text-lg font-semibold text-gray-900">{card.price.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* CTA Section */}
      <section className="bg-[#00c295] py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Want to Visit {attraction.name}?</h2>
            <p className="text-lg mb-8">
              Book a tour today and experience this amazing attraction with our expert guides.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary">
                Browse All Tours
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-[#00c295]"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

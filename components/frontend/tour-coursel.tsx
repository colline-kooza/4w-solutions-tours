"use client"

import { useState } from "react"
import { Heart, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface TourCard {
  id: number
  image: string
  location: string
  rating: number
  reviewCount: number
  title: string
  price: number
  isLikelyToSellOut?: boolean
  isLiked?: boolean
}

interface TourCourselProps {
  title?: string
  tours: TourCard[]
  showSeeAll?: boolean
  seeAllLink?: string
  showRecommendationsHeader?: boolean
  recommendationsText?: string
  linkHref?: string
  className?: string
}

export default function TourCoursel({ 
  title = "Recently viewed",
  tours: initialTours,
  showSeeAll = true,
  seeAllLink = "#",
  showRecommendationsHeader = true,
  recommendationsText = "Why you are seeing these recommendations",
  linkHref = "/tours/lisbon",
  className = ""
}: TourCourselProps) {
  const [tours, setTours] = useState<TourCard[]>(initialTours)

  const toggleLike = (id: number) => {
    setTours(tours.map((tour) => (tour.id === id ? { ...tour, isLiked: !tour.isLiked } : tour)))
  }

  return (
    <div className={className}>
      {/* Recommendations Header */}
      {showRecommendationsHeader && (
        <div className="text-center mb-8 flex items-center justify-center md:px-10 gap-4">
          <div className="h-[1px] md:w-full bg-gray-300 w-[90px]" />
          <button className="md:text-sm text-base text-gray-600 hover:text-gray-800 underline-offset-2 md:w-[50%] w-[60%] md:whitespace-nowrap font-semibold">
            {recommendationsText.split(' ').map((word, index, array) => 
              index === array.length - 1 ? (
                <span key={index} className="underline">{word}</span>
              ) : (
                <span key={index}>{word} </span>
              )
            )}
          </button>
          <div className="h-[1px] md:w-full bg-gray-300 w-[90px]" />
        </div>
      )}

      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className={`flex items-center mb-6 ${showSeeAll ? 'justify-between' : 'justify-center'}`}>
          <h2 className={` font-bold text-gray-900 ${showSeeAll ? 'text-xl' : 'text-2xl'}`}>{title}</h2>
          {showSeeAll && (
            <Button variant="link" className="text-blue-600 hover:text-blue-800 p-0 h-auto font-medium">
              <Link href={seeAllLink}>
                See all {">"}
              </Link>
            </Button>
          )}
        </div>

        {/* Carousel */}
        <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {tours.map((tour) => (
              <CarouselItem key={tour.id} className="pl-2 md:pl-4 basis-[85%] md:basis-1/2 lg:basis-1/3">
                <Card className="border-0 shadow-none">
                  <CardContent className="p-0">
                    <Link href={linkHref}>
                      <div className="relative">
                        {/* Tour Image */}
                        <div className="relative overflow-hidden rounded-lg">
                          <img
                            src={tour.image || "/placeholder.svg"}
                            alt={tour.title}
                            className="w-full h-60 object-cover"
                          />

                          {/* Likely to Sell Out Badge */}
                          {tour.isLikelyToSellOut && (
                            <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600 text-white text-xs font-medium px-2 py-1">
                              Likely to Sell Out
                            </Badge>
                          )}

                          {/* Heart Icon */}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-3 right-3 h-8 w-8 bg-white/80 hover:bg-white rounded-full"
                            onClick={(e) => {
                              e.preventDefault()
                              toggleLike(tour.id)
                            }}
                          >
                            <Heart className={`h-4 w-4 ${tour.isLiked ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
                          </Button>
                        </div>

                        {/* Tour Details */}
                        <div className="pt-3 space-y-2">
                          {/* Location */}
                          <div className="flex items-center text-sm text-gray-600">
                            <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
                            {tour.location}
                          </div>

                          {/* Rating */}
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-[#00c295] text-[#00c295]" />
                            <span className="text-sm font-medium text-gray-900">
                              {tour.rating} ({tour.reviewCount.toLocaleString()})
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="text-base font-medium text-gray-900 line-clamp-2 leading-5">{tour.title}</h3>

                          {/* Price */}
                          <div className="pt-1">
                            <span className="text-sm text-gray-600">from </span>
                            <span className="text-lg font-semibold text-gray-900">${tour.price}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Arrows */}
          <CarouselPrevious className="left-0 -translate-x-1/2 bg-white border border-gray-200 hover:bg-gray-50" />
          <CarouselNext className="right-0 translate-x-1/2 bg-white border border-gray-200 hover:bg-gray-50" />
        </Carousel>
      </div>
    </div>
  )
}

export type { TourCard }
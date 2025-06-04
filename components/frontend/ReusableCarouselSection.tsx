"use client"

import { useState, useEffect, useCallback } from "react"
import { Heart, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import Link from "next/link"
import { useTourStore, type CarouselCard } from "@/stores/tour-store"

interface ReusableCarouselSectionProps {
  title: string
  cards: CarouselCard[]
  autoScrollInterval?: number
  showNavigation?: boolean
  className?: string
}

export default function ReusableCarouselSection({
  title,
  cards,
  autoScrollInterval = 3000,
  showNavigation = true,
  className = "",
}: ReusableCarouselSectionProps) {
  const [cardsData, setCardsData] = useState<CarouselCard[]>(cards)
  const [api, setApi] = useState<CarouselApi>()
  const { toggleWishlist, isInWishlist, addToRecentlyViewed } = useTourStore()

  const handleToggleLike = (card: CarouselCard) => {
    const wasInWishlist = isInWishlist(card.id)
    
    toggleWishlist(card)
    
    setCardsData((prevCards) =>
      prevCards.map((c) => (c.id === card.id ? { ...c, isLiked: !wasInWishlist } : c)),
    )

    if (wasInWishlist) {
      toast.success("Removed from wishlist")
    } else {
      toast.success("Added to wishlist")
    }
  }

  const handleTourClick = (card: CarouselCard) => {
    addToRecentlyViewed(card)
  }

  const scrollNext = useCallback(() => {
    if (api) {
      api.scrollNext()
    }
  }, [api])

  // Auto-scroll functionality
  useEffect(() => {
    if (!api || autoScrollInterval <= 0) return

    const interval = setInterval(() => {
      scrollNext()
    }, autoScrollInterval)

    return () => clearInterval(interval)
  }, [api, autoScrollInterval, scrollNext])

  useEffect(() => {
    const updatedCards = cards.map((card) => ({
      ...card,
      isLiked: isInWishlist(card.id),
    }))
    setCardsData(updatedCards)
  }, [cards, isInWishlist])

  return (
    <div className={`mt-16 ${className}`}>
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-center mb-10">
          <h2 className="md:text-3xl font-black text-gray-900 text-2xl text-center">{title}</h2>
        </div>

        {/* Carousel */}
        <Carousel
          className="w-full"
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {cardsData.map((card) => (
              <CarouselItem key={card.id} className="pl-2 md:pl-4 basis-[85%] sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <Card className="border-0 shadow-none">
                  <CardContent className="p-0">
                    <div className="relative">
                      {/* Card Image */}
                      <div className="relative overflow-hidden rounded-lg">
                        <Link href={`/tours/${card.slug}`} onClick={() => handleTourClick(card)}>
                          <img
                            src={card.image || "/placeholder.png"}
                            alt={card.title}
                            className="w-full h-60 object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </Link>

                        {/* Likely to Sell Out Badge */}
                        {card.isLikelyToSellOut && (
                          <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600 text-white text-xs font-medium px-2 py-1">
                            Recommended
                          </Badge>
                        )}

                        {/* Heart Icon */}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-3 right-3 h-8 w-8 bg-white/80 hover:bg-white rounded-full"
                          onClick={(e) => {
                            e.preventDefault()
                            handleToggleLike(card)
                          }}
                        >
                          <Heart
                            className={`h-4 w-4 ${card.isLiked ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                          />
                        </Button>
                      </div>

                      {/* Card Details */}
                      <Link href={`/tours/${card.slug}`} onClick={() => handleTourClick(card)}>
                        <div className="pt-3 space-y-2 px-2">
                          {/* Location */}
                          <div className="flex items-center text-sm text-gray-600">
                            <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
                            {card.location}
                          </div>

                          {/* Rating */}
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-[#00c295] text-[#00c295]" />
                            <span className="text-sm font-medium text-gray-900">
                              {card.rating} ({card.reviewCount.toLocaleString()})
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="text-base font-medium text-gray-900 line-clamp-2 leading-5">{card.title}</h3>

                          {/* Price */}
                          <div className="pt-1">
                            <span className="text-sm text-gray-600">from UGX </span>
                            <span className="text-lg font-semibold text-gray-900">{card.price}</span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Arrows */}
          {showNavigation && (
            <>
              <CarouselPrevious className="left-0 -translate-x-1/2 bg-white border border-gray-200 hover:bg-gray-50" />
              <CarouselNext className="right-0 translate-x-1/2 bg-white border border-gray-200 hover:bg-gray-50" />
            </>
          )}
        </Carousel>
      </div>
    </div>
  )
}
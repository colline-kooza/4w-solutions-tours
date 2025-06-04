"use client"

import { useState } from "react"
import Image from "next/image"
import { Facebook, Instagram, MapPin, Users, Clock, Star } from "lucide-react"
import { FaPinterest } from "react-icons/fa"
import { transformTourToCarouselCard } from "@/hooks/use-tours"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCategoryBySlug, useToursByCategory } from "@/hooks/use-front-tour-categories"
import { TourCategorySkeleton } from "./tour-category-skeleton"
import ReusableCarouselSection from "./ReusableCarouselSection"
import Link from "next/link"

interface TourCategoryContentProps {
  categorySlug: string
}

export function TourCategoryContent({ categorySlug }: TourCategoryContentProps) {
  const { category, isLoading: categoryLoading, isError: categoryError } = useCategoryBySlug(categorySlug)
  const { tours, isLoading: toursLoading, isError: toursError } = useToursByCategory(categorySlug)
  const [viewMode, setViewMode] = useState<"carousel" | "grid">("carousel")

  if (categoryLoading || toursLoading) {
    return <TourCategorySkeleton />
  }

  if (categoryError || toursError || !category) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <p className="text-gray-600">The tour category you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  const carouselCards = tours.map(transformTourToCarouselCard)

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[400px] lg:h-[500px] overflow-hidden">
        <Image
          src={category.imageUrl || "/placeholder.png"}
          alt={`${category.title} tours`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex flex-col justify-center h-full p-6 md:p-10 lg:p-16 gap-10">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-white/80" />
              <span className="text-white/80 font-medium">Tour Category</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-extrabold text-white leading-tight mb-6">
              {category.title} Tours & Experiences
            </h1>
            <p className="text-base md:text-lg text-white/90 font-medium mb-6 max-w-2xl">{category.description}</p>
            <div className="flex flex-wrap items-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span className="font-medium">{tours.length} Tours Available</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">Expert Guided</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span className="font-medium">Flexible Duration</span>
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

      {/* Tours Section */}
      <div className="container mx-auto px-4 py-16">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Explore {category.title} Tours</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover handpicked {category.title.toLowerCase()} experiences that will create unforgettable memories
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
        {tours.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Tours Available</h3>
            <p className="text-gray-600">
              We're currently working on adding amazing {category.title.toLowerCase()} tours. Check back soon!
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
             <Link href={`/tours/${card.slug}`} key={card.id} >
                 <Card key={card.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-0">
                  <div className="relative">
                    <div className="relative overflow-hidden rounded-lg">
                      <Image
                        src={card.image || "/placeholder.svg"}
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
    </div>
  )
}

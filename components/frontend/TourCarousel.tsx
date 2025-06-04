"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Share, Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import { TourData } from "@/actions/tour-detailed"
import { InclusionsSection } from "./InclusionsSection"

export interface TourCarouselProps {
  tour: TourData
}

export function TourCarousel({ tour }: TourCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  const images = tour.images.length > 0 ? tour.images : ["/placeholder.svg?height=500&width=800"]

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  return (
    <div className="flex flex-col md:gap-8 gap-4">
<div className="flex gap-3">
      {/* Thumbnails on the left */}
      <div className="flex flex-col gap-2 w-20">
        {images.slice(0, 5).map((image, index) => (
          <div
            key={index}
            className={cn(
              "cursor-pointer rounded-lg overflow-hidden border-2 transition-all",
              currentIndex === index ? "border-blue-500 shadow-md" : "border-gray-200 hover:border-gray-300",
            )}
            onClick={() => goToSlide(index)}
          >
            <div className="relative h-16 w-full">
              <Image
                src={image || "/placeholder.svg"}
                alt={`${tour.title} - Image ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          </div>
        ))}
        {images.length > 5 && (
          <div className="cursor-pointer rounded-lg overflow-hidden border-2 border-gray-200 hover:border-gray-300">
            <div className="relative h-16 w-full bg-gray-100 flex items-center justify-center">
              <span className="text-xs font-medium text-gray-600">+{images.length - 5}</span>
            </div>
          </div>
        )}
      </div>

      {/* Main carousel */}
      <div
        className="relative flex-1 h-[400px] md:h-[500px] overflow-hidden rounded-xl shadow-lg"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="h-full w-full relative">
          <Image
            src={images[currentIndex] || "/placeholder.svg"}
            alt={`${tour.title} - Main image`}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className={cn(
                "absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-200",
                isHovering ? "opacity-100" : "opacity-0",
              )}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5 text-gray-700" />
            </button>
            <button
              onClick={goToNext}
              className={cn(
                "absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-200",
                isHovering ? "opacity-100" : "opacity-0",
              )}
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5 text-gray-700" />
            </button>
          </>
        )}

        {/* Share and wishlist buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button className="bg-white/90 hover:bg-white rounded-lg px-3 py-2 shadow-lg flex items-center gap-2 text-sm font-medium transition-all">
            <Share className="h-4 w-4" />
            <span>Share</span>
          </button>
          <button className="bg-white/90 hover:bg-white rounded-lg p-2 shadow-lg transition-all">
            <Heart className="h-4 w-4" />
          </button>
        </div>

        {/* Add to Wishlist text */}
        <div className="absolute bottom-4 right-4">
          <button className="bg-white/90 hover:bg-white rounded-lg px-3 py-2 shadow-lg flex items-center gap-2 text-sm font-medium transition-all">
            <Heart className="h-4 w-4" />
            <span>Add to Wishlist</span>
          </button>
        </div>
      </div>
    </div>
     <InclusionsSection includes={tour.includes} excludes={tour.excludes} />
    </div>
    
  )
}

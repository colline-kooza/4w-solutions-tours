"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useTourReviews } from "@/hooks/use-tours"
import { ReviewsSkeleton } from "@/components/ui/tour-detail-skeleton"
import { format } from "date-fns"

interface ReviewsSectionProps {
  tourId: string
}

export function ReviewsSection({ tourId }: ReviewsSectionProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const reviewsPerPage = 4

  const { reviews, totalCount, averageRating, isLoading, isError } = useTourReviews(tourId, currentPage, reviewsPerPage)

  if (isLoading) {
    return <ReviewsSkeleton />
  }

  if (isError || reviews.length === 0) {
    return (
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-6">Reviews</h2>
        <div className="text-center py-8 text-gray-500">
          {isError ? "Failed to load reviews" : "No reviews yet. Be the first to review this tour!"}
        </div>
      </div>
    )
  }

  const totalPages = Math.ceil(totalCount / reviewsPerPage)

  const goToPrevious = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1))
  }

  const goToNext = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn("w-4 h-4 fill-current", star <= rating ? "text-green-500" : "text-gray-300")}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4 md:flex-row flex-col px-2">
          <h2 className="md:text-xl text-sm font-bold">Why travelers loved this</h2>
          <div className="flex items-center gap-1">
            <span className="text-lg font-bold">{averageRating.toFixed(1)}</span>
            {renderStars(Math.round(averageRating))}
            <span className="text-blue-600 underline cursor-pointer ml-2">{totalCount} Reviews</span>
          </div>
        </div>

        {totalPages > 1 && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={goToPrevious}
              disabled={currentPage === 1}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={goToNext}
              disabled={currentPage === totalPages}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              {renderStars(review.rating)}
              <span className="font-medium text-sm">{review.user.name}</span>
              <span className="text-gray-500 text-sm">•</span>
              <span className="text-gray-500 text-sm">{format(new Date(review.createdAt), "MMM yyyy")}</span>
              {review.verified && (
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Verified</span>
              )}
            </div>
            {review.title && <h4 className="font-medium text-gray-900 mb-2">{review.title}</h4>}
            {review.comment && <p className="text-gray-700 text-sm leading-relaxed">{review.comment}</p>}
            {review.helpful > 0 && (
              <div className="mt-3 text-xs text-gray-500">{review.helpful} people found this helpful</div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination dots */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={cn(
                "w-2 h-2 rounded-full transition-colors",
                currentPage === index + 1 ? "bg-blue-600" : "bg-gray-300",
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}

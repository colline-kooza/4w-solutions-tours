"use client"

import type React from "react"
import { useState } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAddReview } from "@/hooks/use-tours"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { User } from "next-auth"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface AddReviewSectionProps {
  tourId: string
  user?: User | null // Make user optional
}

export function AddReviewSection({ tourId, user }: AddReviewSectionProps) {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [title, setTitle] = useState("")
  const [comment, setComment] = useState("")
  const router = useRouter()

  const addReviewMutation = useAddReview()

  // If no user, show login prompt
  if (!user) {
    return (
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Write a Review</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <div className="space-y-4">
            <p className="text-gray-600">
              You need to be signed in to write a review.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                onClick={() => {
                  // Redirect to login with return URL
                  const currentUrl = window.location.pathname
                  router.push(`/login?returnUrl=${encodeURIComponent(currentUrl)}`)
                }}
                className="bg-[#34e0a1] hover:bg-blue-700 "
              >
                Sign In to Review
              </Button>
              <Button 
                variant="outline"
                onClick={() => {
                  const currentUrl = window.location.pathname
                  router.push(`/login?returnUrl=${encodeURIComponent(currentUrl)}`)
                }}
              >
                Create Account
              </Button>
            </div>
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link 
                href={`/login?returnUrl=${encodeURIComponent(window.location.pathname)}`}
                className="text-[#34e0a1] hover:underline"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (rating === 0) {
      toast.error("Please select a rating")
      return
    }

    if (!comment.trim()) {
      toast.error("Please write a review comment")
      return
    }

    try {
      await addReviewMutation.mutateAsync({
        tourId,
        userId: user.id, 
        rating,
        title: title.trim() || undefined,
        comment: comment.trim(),
      })

      // Reset form
      setRating(0)
      setTitle("")
      setComment("")
      toast.success("Review submitted successfully!")
    } catch (error) {
      toast.error("Failed to submit review. Please try again.")
    }
  }

  const renderStars = () => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            className="focus:outline-none"
          >
            <Star
              className={cn(
                "w-6 h-6 transition-colors",
                (hoveredRating || rating) >= star ? "text-yellow-400 fill-current" : "text-gray-300",
              )}
            />
          </button>
        ))}
      </div>
    )
  }

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Write a Review</CardTitle>
        <p className="text-sm text-gray-600">
          Signed in as {user.name || user.email}
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating */}
          <div>
            <Label className="text-base font-medium">Your Rating *</Label>
            <div className="mt-2">
              {renderStars()}
              {rating > 0 && <p className="text-sm text-gray-600 mt-1">You rated this tour {rating} out of 5 stars</p>}
            </div>
          </div>

          {/* Title */}
          <div>
            <Label htmlFor="review-title" className="text-base font-medium">
              Review Title (Optional)
            </Label>
            <Input
              id="review-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your review a title"
              className="mt-2"
              maxLength={100}
            />
          </div>

          {/* Comment */}
          <div>
            <Label htmlFor="review-comment" className="text-base font-medium">
              Your Review *
            </Label>
            <Textarea
              id="review-comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell others about your experience with this tour..."
              className="mt-2 min-h-[120px]"
              maxLength={1000}
              required
            />
            <p className="text-sm text-gray-500 mt-1">{comment.length}/1000 characters</p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={addReviewMutation.isPending || rating === 0 || !comment.trim()}
            className="w-full md:w-auto"
          >
            {addReviewMutation.isPending ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

"use client"

import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTourStore, type CarouselCard } from "@/stores/tour-store"
import { toast } from "sonner"

interface WishlistButtonProps {
  tour: CarouselCard
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export default function WishlistButton({
  tour,
  variant = "ghost",
  size = "icon",
  className = "",
}: WishlistButtonProps) {
  const { toggleWishlist, isInWishlist } = useTourStore()
  const isLiked = isInWishlist(tour.id)

  const handleToggle = () => {
    toggleWishlist(tour)
    if (isLiked) {
      toast.success("Removed from wishlist")
    } else {
      toast.success("Added to wishlist")
    }
  }

  return (
    <Button variant={variant} size={size} onClick={handleToggle} className={className}>
      <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
      {size !== "icon" && <span className="ml-2">{isLiked ? "Remove from Wishlist" : "Add to Wishlist"}</span>}
    </Button>
  )
}

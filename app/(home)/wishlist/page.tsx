"use client"

import { useState } from "react"
import { Heart, Share2, Trash2, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTourStore } from "@/stores/tour-store"
import Link from "next/link"
import { toast } from "sonner"

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist, getWishlistCount } = useTourStore()
  const [isSharing, setIsSharing] = useState(false)

  const handleRemoveFromWishlist = (tourId: string) => {
    removeFromWishlist(tourId)
    toast.success("Tour removed from wishlist")
  }

  const handleClearWishlist = () => {
    if (wishlist.length === 0) return
    clearWishlist()
    toast.success("Wishlist cleared")
  }

  const handleShareWishlist = async () => {
    setIsSharing(true)
    try {
      const wishlistData = {
        tours: wishlist.map((tour) => ({
          title: tour.title,
          location: tour.location,
          price: tour.price,
          slug: tour.slug,
        })),
        totalTours: wishlist.length,
        sharedAt: new Date().toISOString(),
      }

      if (navigator.share) {
        await navigator.share({
          title: "My Tour Wishlist",
          text: `Check out my wishlist of ${wishlist.length} amazing tours!`,
          url: window.location.origin + "/wishlist/shared/" + btoa(JSON.stringify(wishlistData)),
        })
      } else {
        // Fallback: copy to clipboard
        const shareUrl = window.location.origin + "/wishlist/shared/" + btoa(JSON.stringify(wishlistData))
        await navigator.clipboard.writeText(shareUrl)
        toast.success("Wishlist link copied to clipboard!")
      }
    } catch (error) {
      toast.error("Failed to share wishlist")
    } finally {
      setIsSharing(false)
    }
  }

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <Heart className="mx-auto h-16 w-16 text-gray-300 mb-6" />
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Your Wishlist is Empty</h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start exploring our amazing tours and add your favorites to your wishlist!
            </p>
            <Link href="/">
              <Button size="lg" className="bg-[#00c295] hover:bg-[#00a082]">
                Explore Tours
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
            <p className="text-gray-600 mt-2">
              {getWishlistCount()} {getWishlistCount() === 1 ? "tour" : "tours"} saved
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleShareWishlist}
              disabled={isSharing}
              className="flex items-center gap-2"
            >
              <Share2 className="h-4 w-4" />
              {isSharing ? "Sharing..." : "Share Wishlist"}
            </Button>
            <Button
              variant="outline"
              onClick={handleClearWishlist}
              className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
              Clear All
            </Button>
          </div>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((tour) => (
            <Card key={tour.id} className="group hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-0">
                <div className="relative">
                  {/* Tour Image */}
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Link href={`/tours/${tour.slug}`}>
                      <img
                        src={tour.image || "/placeholder.png"}
                        alt={tour.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </Link>

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {tour.isLikelyToSellOut && (
                        <Badge className="bg-red-500 hover:bg-red-600 text-white text-xs font-medium px-2 py-1">
                          Recommended
                        </Badge>
                      )}
                    </div>

                    {/* Remove from wishlist button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-3 right-3 h-8 w-8 bg-white/80 hover:bg-white rounded-full"
                      onClick={() => handleRemoveFromWishlist(tour.id)}
                    >
                      <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                    </Button>
                  </div>

                  {/* Tour Details */}
                  <div className="p-4">
                    <Link href={`/tours/${tour.slug}`}>
                      <div className="space-y-3">
                        {/* Location */}
                        <div className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
                          {tour.location}
                        </div>

                        {/* Title */}
                        <h3 className="text-base font-semibold text-gray-900 line-clamp-2 leading-5 group-hover:text-[#00c295] transition-colors">
                          {tour.title}
                        </h3>

                        {/* Rating */}
                        <div className="flex items-center space-x-1">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= Math.round(tour.rating) ? "text-[#00c295] fill-current" : "text-gray-300"
                                }`}
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            {tour.rating} ({tour.reviewCount.toLocaleString()})
                          </span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-sm text-gray-600">from UGX </span>
                            <span className="text-lg font-bold text-gray-900">{tour.price.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </Link>

                    {/* Action Button */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <Link href={`/tours/${tour.slug}`}>
                        <Button className="w-full bg-[#00c295] hover:bg-[#00a082] text-white">
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Book Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

import type { SimilarTourData } from "@/actions/tour-detailed";

// Helper function to calculate average rating
export function calculateAverageRating(reviews: { rating: number }[]): number {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}

// Helper function to transform tour data for carousel
export function transformTourToCarouselCard(tour: SimilarTourData) {
  const averageRating = calculateAverageRating(tour.reviews);

  return {
    id: tour.id,
    image: tour.images[0] || "/placeholder.png",
    location: tour.location || "Location TBD",
    rating: averageRating,
    reviewCount: tour._count.reviews,
    slug: tour.slug,
    title: tour.title,
    price: tour.discountPrice || tour.price || 0,
    isLiked: false,
    isLikelyToSellOut: tour.featured,
  };
}

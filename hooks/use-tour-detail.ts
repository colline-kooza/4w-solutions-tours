"use client";

import { useEffect } from "react";
import { useTourStore, type CarouselCard } from "@/stores/tour-store";

interface UseTourDetailProps {
  tour: {
    id: string;
    title: string;
    slug: string;
    images: string[];
    location?: string;
    price?: number;
    rating?: number;
    reviewCount?: number;
    isLikelyToSellOut?: boolean;
  };
}

export function useTourDetail({ tour }: UseTourDetailProps) {
  const { addToRecentlyViewed } = useTourStore();

  useEffect(() => {
    // Add tour to recently viewed when component mounts
    const carouselCard: CarouselCard = {
      id: tour.id,
      image: tour.images[0] || "",
      location: tour.location || "",
      rating: tour.rating || 0,
      reviewCount: tour.reviewCount || 0,
      title: tour.title,
      slug: tour.slug,
      price: tour.price || 0,
      isLikelyToSellOut: tour.isLikelyToSellOut || false,
      isLiked: false,
    };

    addToRecentlyViewed(carouselCard);
  }, [tour, addToRecentlyViewed]);
}

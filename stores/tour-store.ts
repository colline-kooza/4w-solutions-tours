import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CarouselCard {
  id: string;
  image: string;
  location: string;
  rating: number;
  reviewCount: number;
  title: string;
  slug: string;
  price: number;
  isLikelyToSellOut?: boolean;
  isLiked?: boolean;
}

interface TourStore {
  // Wishlist state
  wishlist: CarouselCard[];
  addToWishlist: (tour: CarouselCard) => void;
  removeFromWishlist: (tourId: string) => void;
  toggleWishlist: (tour: CarouselCard) => void;
  isInWishlist: (tourId: string) => boolean;
  clearWishlist: () => void;

  // Recently viewed state
  recentlyViewed: CarouselCard[];
  addToRecentlyViewed: (tour: CarouselCard) => void;
  clearRecentlyViewed: () => void;

  // Utility functions
  getWishlistCount: () => number;
  getRecentlyViewedCount: () => number;
}

export const useTourStore = create<TourStore>()(
  persist(
    (set, get) => ({
      // Initial state
      wishlist: [],
      recentlyViewed: [],

      // Wishlist actions
      addToWishlist: (tour: CarouselCard) => {
        const { wishlist } = get();
        if (!wishlist.find((item) => item.id === tour.id)) {
          set({
            wishlist: [...wishlist, { ...tour, isLiked: true }],
          });
        }
      },

      removeFromWishlist: (tourId: string) => {
        const { wishlist } = get();
        set({
          wishlist: wishlist.filter((item) => item.id !== tourId),
        });
      },

      toggleWishlist: (tour: CarouselCard) => {
        const { wishlist, addToWishlist, removeFromWishlist } = get();
        const isInWishlist = wishlist.find((item) => item.id === tour.id);

        if (isInWishlist) {
          removeFromWishlist(tour.id);
        } else {
          addToWishlist(tour);
        }
      },

      isInWishlist: (tourId: string) => {
        const { wishlist } = get();
        return wishlist.some((item) => item.id === tourId);
      },

      clearWishlist: () => {
        set({ wishlist: [] });
      },

      // Recently viewed actions
      addToRecentlyViewed: (tour: CarouselCard) => {
        const { recentlyViewed } = get();

        // Remove if already exists to avoid duplicates
        const filtered = recentlyViewed.filter((item) => item.id !== tour.id);

        // Add to beginning and limit to 5 items
        const updated = [tour, ...filtered].slice(0, 5);

        set({ recentlyViewed: updated });
      },

      clearRecentlyViewed: () => {
        set({ recentlyViewed: [] });
      },

      // Utility functions
      getWishlistCount: () => {
        return get().wishlist.length;
      },

      getRecentlyViewedCount: () => {
        return get().recentlyViewed.length;
      },
    }),
    {
      name: "tour-storage",
      partialize: (state) => ({
        wishlist: state.wishlist,
        recentlyViewed: state.recentlyViewed,
      }),
    }
  )
);

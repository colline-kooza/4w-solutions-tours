// Utility function for transforming destination data (client-side)
export interface DestinationData {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  images: string[];
  bestTimeToVisit: string | null;
  climate: string | null;
  active: boolean;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
  _count?: {
    tours: number;
  };
}

export const transformDestinationData = (destination: DestinationData) => {
  return {
    id: destination.id,
    name: destination.name,
    slug: destination.slug,
    description: destination.description || "",
    images:
      destination.images.length > 0
        ? destination.images
        : ["/placeholder.svg?height=400&width=600"],
    bestTimeToVisit: destination.bestTimeToVisit || "Year-round",
    climate: destination.climate || "TROPICAL",
    tourCount: destination._count?.tours || 0,
  };
};

// Utility function for transforming attraction data (client-side)
export interface AttractionData {
  id: string;
  name: string;
  description: string | null;
  location: string;
  images: string[];
  type: string;
  createdAt: Date;
  updatedAt: Date;
  _count?: {
    tours: number;
  };
}

export const transformAttractionData = (attraction: AttractionData) => {
  return {
    id: attraction.id,
    name: attraction.name,
    description: attraction.description || "",
    location: attraction.location,
    images:
      attraction.images.length > 0
        ? attraction.images
        : ["/placeholder.svg?height=400&width=600"],
    type: attraction.type,
    tourCount: attraction._count?.tours || 0,
    // Create a slug from the name
    slug: attraction.name.toLowerCase().replace(/\s+/g, "-"),
  };
};

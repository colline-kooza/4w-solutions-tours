import {
  Attraction,
  AttractionType,
  Tour,
  TourAttraction,
} from "@prisma/client";

export interface AttractionCreateProps {
  name: string;
  type: AttractionType;
}

export interface AttractionUpdateProps {
  name?: string;
  description?: string;
  location?: string;
  images?: string[];
  type?: AttractionType;
}

export interface BriefAttraction extends Partial<Attraction> {
  type: AttractionType;
}

export interface TourAttractionCreateProps {
  tourId: string;
  attractionId: string;
  visitOrder?: number;
  duration?: number;
}

export interface TourAttractionUpdateProps {
  visitOrder?: number;
  duration?: number;
}
export interface AttractionCreateProps {
  name: string;
  type: AttractionType;
}

export interface AttractionUpdateProps {
  name?: string;
  description?: string;
  location?: string;
  type?: AttractionType;
  images?: string[];
}

export interface BriefAttraction {
  id: string;
  name: string;
  type: AttractionType;
  location: string;
  images: string[];
  createdAt: Date;
}

// Tour-Attraction relationship types
export interface TourAttractionCreateProps {
  tourId: string;
  attractionId: string;
  visitOrder?: number;
  duration?: number;
}

export interface TourAttractionUpdateProps {
  visitOrder?: number;
  duration?: number;
}

export interface AttractionWithTours extends Attraction {
  tours: (TourAttraction & {
    tour: {
      id: string;
      title: string;
      price: number | null;
      images: string[];
    };
  })[];
}

export interface TourOption {
  id: string;
  title: string;
  label: string;
  value: string;
  price: number | null;
  images: string[];
}

export interface TourAttractionFormData {
  tourId: string;
  visitOrder: number;
  duration: number;
}

// types/itinerary.ts

export interface TourItinerary {
  id: string;
  tourId: string;
  day: number;
  title: string;
  description: string;
  activities: string[];
}

export interface TourItineraryCreateProps {
  tourId: string;
  day: number;
  title: string;
  description: string;
  activities: string[];
}

export interface TourItineraryUpdateProps {
  id: string;
  day?: number;
  title?: string;
  description?: string;
  activities?: string[];
}

export interface BriefTourItinerary {
  id: string;
  day: number;
  title: string;
  activities: string[];
}

export interface ItineraryFormData {
  day: number;
  title: string;
  description: string;
  activities: string[];
}

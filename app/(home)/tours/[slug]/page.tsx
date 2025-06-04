import { Suspense } from "react"
import { notFound } from "next/navigation"
import { Clock, Smartphone, Globe2, MapPin, Users, Star } from "lucide-react"

import { TourCarousel } from "@/components/frontend/TourCarousel"
import { BookingCard } from "@/components/frontend/BookingCard"
import { TourDetailSkeleton } from "@/components/ui/tour-detail-skeleton"
import {  getTourBySlug } from "@/actions/tour-detailed"
import { Metadata } from "next"
import { TourTabs } from "@/components/frontend/TourTabs"
import SimilarToursSection from "@/components/frontend/SimilarToursContent"
import { calculateAverageRating } from "@/lib/tour-helpers"
import { getServerSession } from "next-auth"
import { authOptions } from "@/config/auth"

interface TourPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: TourPageProps): Promise<Metadata> {
  // Await the params here
  const resolvedParams = await params
  const tour = await getTourBySlug(resolvedParams.slug)

  if (!tour) {
    return {
      title: "Tour Not Found",
      description: "The requested tour could not be found.",
    }
  }

  return {
    title: `${tour.title} | Adventure Tours`,
    description:
      tour.shortDescription ||
      tour.description?.substring(0, 160) ||
      `Explore ${tour.title} with our guided tour experience.`,
    openGraph: {
      title: tour.title,
      description: tour.shortDescription || "Amazing tour experience awaits you",
      images: tour.images.length > 0 ? [tour.images[0]] : [],
    },
  }
}

async function TourPageContent({ slug }: { slug: string }) {
  const tour = await getTourBySlug(slug)
   const session = await getServerSession(authOptions);
   const user=session?.user
  if (!tour) {
    notFound()
  }

  const averageRating = calculateAverageRating(tour.reviews)
  const recommendationPercentage = Math.round(
    (tour.reviews.filter((r) => r.rating >= 4).length / Math.max(tour.reviews.length, 1)) * 100,
  )

  return (
    <div className="w-full bg-white">
      {/* Contact info */}
      <div className="max-w-7xl mx-auto px-4 flex justify-end md:gap-6 gap-2 text-sm py-1 md:flex-row flex-col md:mt-2 mt-5">
        <div className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-phone"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
          <span className="text-sm">Book online or call: </span>
          <span className="font-semibold text-sm">0740302462</span>
        </div>
        <div className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-message-circle"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
          </svg>
          <span className="font-semibold">Chat now</span>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto md:px-4 px-2 pb-12">
        <h1 className="text-2xl font-bold my-4">{tour.title}</h1>

        {/* Ratings and location */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-5 h-5 ${star <= Math.round(averageRating) ? "text-green-500 fill-current" : "text-gray-300"}`}
              />
            ))}
          </div>
          <span className="font-medium text-sm">{tour._count.reviews} Reviews</span>
          <span className="text-gray-300">|</span>
          <div className="flex items-center gap-1">
            <svg className="w-5 h-5 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            <span className="text-sm">Recommended by {recommendationPercentage}% of travelers</span>
          </div>
          {tour.featured && (
            <>
              <span className="text-gray-300">|</span>
              <div className="flex items-center gap-1">
                <svg className="w-5 h-5 text-amber-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z" />
                </svg>
                <span className="font-medium text-sm">Featured Tour</span>
              </div>
            </>
          )}
          <span className="text-gray-300">|</span>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span className="text-sm">{tour.location || "Location TBD"}</span>
          </div>
          {tour.Destination && (
            <>
              <span className="text-gray-300">|</span>
              <span className="text-sm">{tour.Destination.name}</span>
            </>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left column - Carousel */}
          <div className="w-full lg:w-2/3">
            <TourCarousel tour={tour} />
          </div>

          {/* Right column - Booking card */}
          <div className="w-full lg:w-1/3">
            <BookingCard tour={tour} />
          </div>
        </div>

        {/* Tour info */}
        <div className="flex flex-wrap items-center gap-6 mt-6 py-4 border-t border-gray-200 px-3">
          {tour.duration && (
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-500" />
              <span className="text-sm">
                {tour.duration} {tour.duration === 1 ? "day" : "days"}
              </span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-gray-500" />
            <span className="text-sm">Mobile ticket</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe2 className="w-5 h-5 text-gray-500" />
            <span className="text-sm">Offered in: English</span>
          </div>
          {tour.maxGroupSize && (
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-gray-500" />
              <span className="text-sm">Max {tour.maxGroupSize} people</span>
            </div>
          )}
          {tour.difficulty && (
            <div className="flex items-center gap-2">
              <span className="text-sm">
                Difficulty: <span className="font-medium capitalize">{tour.difficulty.toLowerCase()}</span>
              </span>
            </div>
          )}
        </div>

        {/* Tour Tabs */}
        <TourTabs tour={tour} user={user}/>

        {/* Similar Tours */}
        <div className="mt-12">
          <SimilarToursSection tourId={tour.id} categoryId={tour.category.id}/>
        </div>
      </div>
    </div>
  )
}

export default async function TourPage({ params }: TourPageProps) {
  const resolvedParams = await params
  
  return (
    <Suspense fallback={<TourDetailSkeleton />}>
      <TourPageContent slug={resolvedParams.slug} />
    </Suspense>
  )
}
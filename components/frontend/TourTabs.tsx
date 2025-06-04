"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReviewsSection } from "./ReviewsSection"
import { AddReviewSection } from "./AddReviewSection"
import { OverviewSection } from "./OverviewSection"
import { ItinerarySection } from "./ItinerarySection"
import { TourData } from "@/actions/tour-detailed"
import { User } from "next-auth"

interface TourTabsProps {
  tour: TourData
  user?: User | null 
}

export function TourTabs({ tour , user }: TourTabsProps) {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="mt-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
          {/* <TabsTrigger value="inclusions">Inclusions</TabsTrigger> */}
          <TabsTrigger value="reviews">Reviews ({tour._count.reviews})</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <OverviewSection tour={tour} />
        </TabsContent>

        <TabsContent value="itinerary" className="mt-6">
          <ItinerarySection itinerary={tour.itinerary} attractions={tour.attractions} />
        </TabsContent>
{/* 
        <TabsContent value="inclusions" className="mt-6">
          <InclusionsSection includes={tour.includes} excludes={tour.excludes} />
        </TabsContent> */}

        <TabsContent value="reviews" className="mt-6">
          <div className="space-y-8">
            <ReviewsSection tourId={tour.id} />
            <AddReviewSection tourId={tour.id} user={user}/>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

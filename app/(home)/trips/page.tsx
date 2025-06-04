import FeaturedToursCarousel from '@/components/frontend/FeaturedToursCarousel'
import InterestBasedToursCarousel from '@/components/frontend/InterestBasedToursContent'
import PlacesToVisit from '@/components/frontend/PlacesToVisit'
import TravelGuides from '@/components/frontend/TravelGuides'
import TripsHero from '@/components/frontend/TripsHero'
import React from 'react'

export default function Page() {
  
  return (
    <div className='max-w-6xl mx-auto'>
    <TripsHero/>
    <TravelGuides/>
   {/* Optimized Interest-Based Tours Carousel with React Query */}
   <InterestBasedToursCarousel />
    <PlacesToVisit/>
     {/* Optimized Featured Tours Carousel with React Query */}
    <FeaturedToursCarousel />
    </div>
  )
}

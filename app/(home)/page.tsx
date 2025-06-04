import AttractionsSection from "@/components/frontend/AttractionsSection";
import FeaturedToursCarousel from "@/components/frontend/FeaturedToursCarousel";
import FlexibleSection from "@/components/frontend/flexible-section";
import { HeroCarousel } from "@/components/frontend/HeroCarousel";
import HomeLoginSection from "@/components/frontend/home-login-section";
import InterestBasedToursCarousel from "@/components/frontend/InterestBasedToursContent";
import TopDestinations from "@/components/frontend/OptimizedTopDestinations";
import RecentlyViewedSection from "@/components/frontend/recently-viewed-section";
import TravelersChoiceSection from "@/components/frontend/TravelersChoiceSection";
import TrustpilotReviews from "@/components/frontend/TrustpilotReviews";
import WhyBookWithUs from "@/components/frontend/why-with-us";
import MoreToursCarousel from "@/components/MoreToursCarousel";

export default async function page() {
  
  // const attractionsData = [
  //   {
  //     id: 1,
  //     image:
  //       "https://dynamic-media.tacdn.com/media/attractions-splice-spp-674x446/12/3f/59/f7.jpg",
  //     title: "The White House",
  //     toursCount: 225,
  //   },
  //   {
  //     id: 2,
  //     image:
  //       "https://dynamic-media.tacdn.com/media/attractions-splice-spp-674x446/12/2e/4e/f7.jpg",
  //     title: "Washington Monument",
  //     toursCount: 159,
  //   },
  //   {
  //     id: 3,
  //     image:
  //       "https://dynamic-media.tacdn.com/media/attractions-splice-spp-674x446/12/32/b4/d6.jpg",
  //     title: "Vietnam Veterans Memorial",
  //     toursCount: 163,
  //   },
  //   {
  //     id: 4,
  //     image:
  //       "https://dynamic-media.tacdn.com/media/attractions-splice-spp-674x446/12/3f/5c/b3.jpg",
  //     title: "U.S. Capitol",
  //     toursCount: 218,
  //   },
  //   {
  //     id: 5,
  //     image:
  //       "https://dynamic-media.tacdn.com/media/attractions-splice-spp-674x446/14/9b/5e/bf.jpg",
  //     title: "Lincoln Memorial",
  //     toursCount: 247,
  //   },
  //   {
  //     id: 6,
  //     image:
  //       "https://dynamic-media.tacdn.com/media/attractions-splice-spp-674x446/12/31/fd/97.jpg",
  //     title: "Korean War Veterans Memorial",
  //     toursCount: 164,
  //   },
  //   {
  //     id: 7,
  //     image:
  //       "https://media.tacdn.com/media/attractions-splice-spp-674x446/14/9b/6b/84.jpg",
  //     title: "National Portrait Gallery",
  //     toursCount: 203,
  //   },
  //   {
  //     id: 8,
  //     image:
  //       "https://dynamic-media.tacdn.com/media/attractions-splice-spp-674x446/12/3f/3a/a2.jpg",
  //     title: "Martin Luther King, Jr. Memorial",
  //     toursCount: 155,
  //   },
  //   {
  //     id: 9,
  //     image:
  //       "https://dynamic-media.tacdn.com/media/attractions-splice-spp-674x446/14/9b/5e/bf.jpg",
  //     title: "Thomas Jefferson Memorial",
  //     toursCount: 130,
  //   },
  // ];
  
  return (
    <div>
      <HeroCarousel />
      <WhyBookWithUs />
      <HomeLoginSection />


      {/* <TourCoursel 
        title="Recently Viewed Tours"
        tours={tourData}
        showRecommendationsHeader={false}
        seeAllLink="/tours/uganda"
        linkHref="/tours/uganda"
        showSeeAll={false}
      /> */}


       {/* Optimized Featured Tours Carousel with React Query */}
      <FeaturedToursCarousel />

      
      <FlexibleSection
        titleFirstLine="Keep things"
        titleSecondLine="flexible"
        description="Use Reserve Now & Pay Later to secure the activities you don't want to miss without being locked in."
      />


      {/* <ReusableCarouselSection
        title="Featured Tours Around the World"
        cards={tourData}
        autoScrollInterval={5000}
        showNavigation={true}
      /> */}


        {/* Optimized Featured Tours Carousel with React Query */}
      <FeaturedToursCarousel />

        {/* More Tours Carousel with React Query */}
      <MoreToursCarousel />


      <AttractionsSection
        title="Top attractions In East Africa"
        showSeeAll={true}
      />


      <FlexibleSection
        titleFirstLine="Free cancellation"
        titleSecondLine=""
        description="You'll receive a full refund if you cancel at least 24 hours in advance of most experiences."
      />

      <TrustpilotReviews/>
     
        
       {/* <ReusableCarouselSection
        title="Based on your interest in Uganda"
        cards={tourData}
        autoScrollInterval={5000}
        showNavigation={true}
      /> */}


        {/* Optimized Interest-Based Tours Carousel with React Query */}
      <InterestBasedToursCarousel />
      <RecentlyViewedSection />

      <TopDestinations/>
      <TravelersChoiceSection/>
    </div>
  );
}

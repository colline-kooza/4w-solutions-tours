import AboutValuesSection from '@/components/frontend/AboutValuesSection'
import FAQSection from '@/components/frontend/FAQSection'
import TeamGallery from '@/components/frontend/TeamGallery'
import AboutUsHero from '@/components/frontend/TravelHero'
import React from 'react'

export default function Page() {
  return (
    <div>
      <AboutUsHero/>
      <AboutValuesSection/>
      <FAQSection/>
      <TeamGallery/>
    </div>
  )
}

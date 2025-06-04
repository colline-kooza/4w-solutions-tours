"use client"

import React from "react"

import { Suspense, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Users, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react"
import TeamGallerySkeleton from "@/components/ui/team-gallery-skeleton"
import { transformTeamMember, useTeamMembers } from "@/hooks/useTeam"

// TypeScript interfaces
interface TeamMember {
  id: string | number
  name: string
  nickname: string
  position: string
  image: string
  bio: string
  featured?: boolean
}

interface TeamMemberCardProps {
  member: TeamMember
  onClick: (member: TeamMember) => void
  className?: string
  index: number
  isActive: boolean
}

interface CarouselProps {
  children: React.ReactNode
  className?: string
  itemsPerView?: number
}

interface TeamMemberDetailProps {
  member: TeamMember | null
  isVisible: boolean
  onBack: () => void
}

// Carousel Component
const Carousel: React.FC<CarouselProps> = ({ children, className = "", itemsPerView = 5 }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false)
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true)
  const childrenArray = React.Children.toArray(children)
  const totalItems = childrenArray.length

  // Calculate how many items we can show at once based on screen size
  const getItemsPerView = (): number => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1280) return Math.min(5, totalItems) // xl
      if (window.innerWidth >= 1024) return Math.min(4, totalItems) // lg
      if (window.innerWidth >= 768) return Math.min(3, totalItems) // md
      if (window.innerWidth >= 640) return Math.min(2.5, totalItems)
      return Math.min(1.5, totalItems)
    }
    return itemsPerView
  }

  const [visibleItems, setVisibleItems] = useState<number>(getItemsPerView())

  // Handle window resize
  useState(() => {
    const handleResize = () => {
      const newVisibleItems = getItemsPerView()
      setVisibleItems(newVisibleItems)
      // Reset to first slide if current position is invalid
      if (currentIndex >= totalItems - Math.floor(newVisibleItems)) {
        setCurrentIndex(Math.max(0, totalItems - Math.floor(newVisibleItems)))
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  })

  // Update scroll buttons state
  useState(() => {
    const maxIndex = Math.max(0, totalItems - Math.floor(visibleItems))
    setCanScrollLeft(currentIndex > 0)
    setCanScrollRight(currentIndex < maxIndex)
  })

  const nextSlide = (): void => {
    const maxIndex = Math.max(0, totalItems - Math.floor(visibleItems))
    if (currentIndex < maxIndex) {
      setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
    }
  }

  const prevSlide = (): void => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => Math.max(prev - 1, 0))
    }
  }

  // Calculate the width percentage for each item based on visible items
  const itemWidthPercentage = 100 / visibleItems

  return (
    <div className={`relative ${className}`}>
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${currentIndex * itemWidthPercentage}%)`,
          }}
        >
          {childrenArray.map((child, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-1 sm:px-2 lg:px-4"
              style={{ width: `${itemWidthPercentage}%` }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {totalItems > Math.floor(visibleItems) && (
        <>
          <button
            onClick={prevSlide}
            disabled={!canScrollLeft}
            className={`absolute left-1 sm:left-2 lg:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 sm:p-3 shadow-lg transition-all duration-200 z-10 ${
              !canScrollLeft ? "opacity-50 cursor-not-allowed" : "hover:scale-110"
            }`}
            aria-label="Previous members"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
          </button>

          <button
            onClick={nextSlide}
            disabled={!canScrollRight}
            className={`absolute right-1 sm:right-2 lg:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 sm:p-3 shadow-lg transition-all duration-200 z-10 ${
              !canScrollRight ? "opacity-50 cursor-not-allowed" : "hover:scale-110"
            }`}
            aria-label="Next members"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
          </button>
        </>
      )}

      {/* Carousel indicators - only show if we have multiple pages */}
      {totalItems > Math.floor(visibleItems) && (
        <div className="flex justify-center mt-4 sm:mt-6 space-x-2">
          {Array.from({ length: Math.ceil(totalItems / Math.floor(visibleItems)) }).map((_, index) => {
            const isActive = Math.floor(currentIndex / Math.floor(visibleItems)) === index
            return (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * Math.floor(visibleItems))}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  isActive ? "bg-[#22c55e] w-4 sm:w-6" : "bg-gray-300"
                }`}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

// Team Member Card Component with slanted design
const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member, onClick, className = "", index, isActive }) => {
  // Create alternating slant pattern
  const getCardRotation = (idx: number): number => {
    const rotations = [2, -1, 3, -2, 1, -3, 2, -1] // Alternating rotations
    return rotations[idx % rotations.length]
  }

  const rotation = getCardRotation(index)

  return (
    <motion.div
      className={`relative group cursor-pointer ${className}`}
      onClick={() => onClick(member)}
      whileHover={{
        scale: 1.05,
        rotate: 0,
        zIndex: 10,
        transition: { duration: 0.3 },
      }}
      initial={{
        rotate: rotation,
        y: Math.abs(rotation) * 2,
      }}
      animate={{
        rotate: rotation,
        y: Math.abs(rotation) * 2,
      }}
      style={{
        transformOrigin: "center bottom",
      }}
    >
      {/* Card shadow/background layer for depth */}
      <div
        className="absolute inset-0 bg-gray-900/10 rounded-xl sm:rounded-2xl"
        style={{
          transform: `translate(${rotation > 0 ? "2px" : "-2px"}, 3px)`,
          zIndex: -1,
        }}
      />

      {/* Main card */}
      <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
        <div className="aspect-[4/5] relative overflow-hidden">
          <img
            src={member.image || "/placeholder.svg?height=400&width=300"}
            alt={member.name}
            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Overlay content on hover */}
          <div className="absolute inset-0 flex items-end p-2 sm:p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="text-white">
              <p className="text-xs sm:text-sm font-medium">Click to learn more</p>
            </div>
          </div>
        </div>

        {/* Card content */}
        <div className="p-3 sm:p-4 lg:p-6 text-center min-h-[100px] sm:min-h-[120px] flex flex-col justify-center">
          <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 mb-1 leading-tight">{member.name}</h3>
          <p className="text-[#22c55e] font-semibold text-xs sm:text-sm mb-1 sm:mb-2">{member.nickname}</p>
          <p className="text-gray-600 text-xs lg:text-sm leading-relaxed">{member.position}</p>
        </div>
      </div>
    </motion.div>
  )
}

// Team Member Detail View
const TeamMemberDetail: React.FC<TeamMemberDetailProps> = ({ member, isVisible, onBack }) => {
  if (!member) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute inset-0 bg-white z-20 flex flex-col"
        >
          {/* Header with back button */}
          <div className="flex items-center p-4 lg:p-6 border-b border-gray-100 md:mt-1 mt-10">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-[#22c55e] transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Team</span>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-6xl mx-auto p-4 lg:p-8">
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                {/* Image Section */}
                <div className="lg:w-2/5">
                  <motion.div
                    className="aspect-[4/5] relative overflow-hidden rounded-2xl shadow-2xl"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                  >
                    <img
                      src={member.image || "/placeholder.svg?height=400&width=300"}
                      alt={member.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </motion.div>
                </div>

                {/* Content Section */}
                <motion.div
                  className="lg:w-3/5 flex flex-col justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  <div className="mb-8">
                    <h1 className="text-xl lg:text-4xl font-black text-gray-900 mb-3">{member.name}</h1>
                    <p className="text-[#22c55e] font-bold text-base lg:text-xl mb-4">{member.nickname}</p>
                    <p className="text-base lg:text-2xl text-gray-700 font-semibold mb-8">{member.position}</p>
                  </div>

                  <div className="prose prose-lg lg:prose-xl text-gray-600 leading-relaxed">
                    <p>{member.bio}</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Team Gallery Content Component
function TeamGalleryContent() {
  const { team, isLoading, error } = useTeamMembers()
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [showDetail, setShowDetail] = useState<boolean>(false)

  if (isLoading) {
    return <TeamGallerySkeleton />
  }

  if (error) {
    // Fallback to some default team members if there's an error
    const fallbackTeam = [
      {
        id: 1,
        name: "Jonathan Messika",
        nickname: "The Visionary",
        position: "CEO and Co-Founder",
        image: "/image-3.jpeg",
        bio: "CEO and Co-Founder Jonathan Messika has always been a visionary in both technology and product development. Safari adventures were created through his desire to transform the way travelers engage with wildlife. As an aspiring conservationist and successful business owner, he combines passion with expertise.",
        featured: true,
      },
      {
        id: 2,
        name: "Uri Twig",
        nickname: "King Karma",
        position: "Co-Founder & CTO",
        image: "/image-4.jpeg",
        bio: "Uri is our technical co-founder who combines deep technical expertise with strategic vision. His leadership drives our technological innovation and ensures every safari experience is powered by cutting-edge solutions.",
      },
    ]

    return (
      <TeamGalleryWithMembers
        teamMembers={fallbackTeam}
        selectedMember={selectedMember}
        setSelectedMember={setSelectedMember}
        showDetail={showDetail}
        setShowDetail={setShowDetail}
      />
    )
  }

  const transformedTeam = team.map(transformTeamMember)

  if (transformedTeam.length === 0) {
    return (
      <section className="py-16 lg:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12 lg:mb-20">
            <div className="inline-flex items-center gap-2 bg-[#22c55e]/10 border border-[#22c55e]/20 rounded-full px-4 py-2 text-[#22c55e] text-sm font-medium mb-6">
              <Users className="w-4 h-4" />
              Meet Our Team
            </div>
            <h2 className="text-3xl md:text-3xl lg:text-4xl font-black text-gray-900 mb-6">
              The People Behind
              <span className="block text-[#22c55e]">Your Adventure</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our team information is coming soon. Check back later to meet our safari experts and guides.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <TeamGalleryWithMembers
      teamMembers={transformedTeam}
      selectedMember={selectedMember}
      setSelectedMember={setSelectedMember}
      showDetail={showDetail}
      setShowDetail={setShowDetail}
    />
  )
}

// Team Gallery With Members Component
function TeamGalleryWithMembers({
  teamMembers,
  selectedMember,
  setSelectedMember,
  showDetail,
  setShowDetail,
}: {
  teamMembers: TeamMember[]
  selectedMember: TeamMember | null
  setSelectedMember: (member: TeamMember | null) => void
  showDetail: boolean
  setShowDetail: (show: boolean) => void
}) {
  const handleMemberClick = (member: TeamMember): void => {
    setSelectedMember(member)
    setShowDetail(true)
  }

  const handleBack = (): void => {
    setShowDetail(false)
    setTimeout(() => setSelectedMember(null), 400)
  }

  return (
    <section className="py-16 lg:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          className="text-center mb-12 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: showDetail ? 0 : 1, y: showDetail ? -30 : 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="inline-flex items-center gap-2 bg-[#22c55e]/10 border border-[#22c55e]/20 rounded-full px-4 py-2 text-[#22c55e] text-sm font-medium mb-6">
            <Users className="w-4 h-4" />
            Meet Our Team
          </div>
          <h2 className="text-3xl md:text-3xl lg:text-4xl font-black text-gray-900 mb-6">
            The People Behind
            <span className="block text-[#22c55e]">Your Adventure</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our passionate team of safari experts and guides are dedicated to creating unforgettable experiences.
          </p>
        </motion.div>

        {/* Team Carousel - All screen sizes */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: showDetail ? 0 : 1, y: showDetail ? -50 : 0 }}
          transition={{ duration: 0.4 }}
        >
          <Carousel>
            {teamMembers.map((member, index) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                onClick={handleMemberClick}
                index={index}
                isActive={true}
              />
            ))}
          </Carousel>
        </motion.div>

        {/* Detail View */}
        <TeamMemberDetail member={selectedMember} isVisible={showDetail} onBack={handleBack} />
      </div>
    </section>
  )
}

export default function TeamGallery() {
  return (
    <Suspense fallback={<TeamGallerySkeleton />}>
      <TeamGalleryContent />
    </Suspense>
  )
}

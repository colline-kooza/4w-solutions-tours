"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ArrowRight, Search } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import SearchSuggestions from "./search-suggestions"
import { RiGhost2Fill } from "react-icons/ri"

const slides = [
  {
    id: 1,
    image: "/hero-4.jpg",
    title: "Do more with Markt 4w",
    subtitle: "Plan better with 300,000+ travel experiences.",
    cta: "Read the Markt 4w blogs",
    ctaColor: "bg-white text-gray-900 hover:bg-gray-100",
  },
  {
    id: 4,
    image: "/hero-5.jpg",
    title: "Travel with confidence",
    subtitle: "Book with free cancellation on most activities.",
    cta: "Latest Blogs",
    ctaColor: "bg-[#70b029] text-white hover:bg-blue-700",
  },
  {
    id: 2,
    image: "/bg-2.jpg",
    title: "Explore hidden gems",
    subtitle: "Discover unique experiences off the beaten path.",
    cta: "View top Blogs",
    ctaColor: "bg-[#0c9065] text-white hover:bg-emerald-700",
  },
  {
    id: 3,
    image: "/bg-3.jpg",
    title: "Travel with confidence",
    subtitle: "Book with free cancellation on most activities.",
    cta: "Learn about our Blogs",
    ctaColor: "bg-[#70b029] text-white hover:bg-blue-700",
  },
]

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false)
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  const heroRef = useRef<HTMLDivElement>(null)
  const searchFormRef = useRef<HTMLFormElement>(null)
  const router = useRouter()

  // Auto-advance carousel
  useEffect(() => {
    // Set initial load to false after first render
    const timer = setTimeout(() => {
      setIsInitialLoad(false)
    }, 300)

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 5000)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [])

  // Show/hide search suggestions based on query length and focus
  useEffect(() => {
    if (searchQuery.length >= 2 && isSearchFocused) {
      setShowSearchSuggestions(true)
    } else {
      setShowSearchSuggestions(false)
    }
  }, [searchQuery, isSearchFocused])

  // Handle clicks outside search to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      if (
        searchFormRef.current &&
        !searchFormRef.current.contains(target) &&
        !(target instanceof Element && target.closest("[data-search-suggestions]"))
      ) {
        setShowSearchSuggestions(false)
        setIsSearchFocused(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setShowSearchSuggestions(false)
      setIsSearchFocused(false)
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleSearchFocus = () => {
    setIsSearchFocused(true)
  }

  const handleSuggestionSelect = (value: string) => {
    setSearchQuery(value)
    setShowSearchSuggestions(false)
    setIsSearchFocused(false)
  }

  const handleSuggestionClose = () => {
    setShowSearchSuggestions(false)
  }

  return (
    <div ref={heroRef} className="relative w-full h-[360px] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={slides[currentSlide].image || "/placeholder.svg"}
          alt={slides[currentSlide].title}
          fill
          priority
          className="object-cover transition-opacity duration-700 ease-in-out"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center px-4 md:px-6">
        <div className="text-center mb-8">
          <motion.h1
            // initial={isInitialLoad ? { opacity: 0, y: 20 } : false}
            // animate={isInitialLoad ? { opacity: 1, y: 0 } : {}}
            // transition={isInitialLoad ? { duration: 0.4, delay: 0.1, ease: "easeOut" } : {}}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            {slides[currentSlide].title}
          </motion.h1>
          <motion.p
            // initial={isInitialLoad ? { opacity: 0, y: 20 } : false}
            // animate={isInitialLoad ? { opacity: 1, y: 0 } : {}}
            // transition={isInitialLoad ? { duration: 0.4, delay: 0.2, ease: "easeOut" } : {}}
            className="text-xl text-white"
          >
            {slides[currentSlide].subtitle}
          </motion.p>
        </div>

        {/* Search form - Single input only */}
        <div className="relative w-full max-w-3xl">
          <motion.form
            ref={searchFormRef}
            onSubmit={handleSearch}
            // initial={isInitialLoad ? { opacity: 0, y: 20 } : false}
            // animate={isInitialLoad ? { opacity: 1, y: 0 } : {}}
            // transition={isInitialLoad ? { duration: 0.4, delay: 0.3, ease: "easeOut" } : {}}
            className="w-full bg-white rounded-full overflow-hidden shadow-lg"
          >
            <div className="flex items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  onFocus={handleSearchFocus}
                  placeholder="Where would you like to go? Search destinations, activities..."
                  className="w-full h-16 pl-14 pr-6 text-base placeholder-gray-500 border-0 focus:outline-none focus:ring-0"
                  autoComplete="off"
                />
              </div>
              <div className="p-2">
                <Button
                  type="submit"
                  size="icon"
                  className="h-12 w-12 rounded-full bg-emerald-600 hover:bg-emerald-700 transition-colors duration-200"
                >
                  <Search className="h-5 w-5" />
                  <span className="sr-only">Search</span>
                </Button>
              </div>
            </div>
          </motion.form>

          {/* Search suggestions positioned relative to the search form */}
          <AnimatePresence>
            {showSearchSuggestions && (
              <motion.div
                // initial={{ opacity: 0, y: -10 }}
                // animate={{ opacity: 1, y: 0 }}
                // exit={{ opacity: 0, y: -10 }}
                // transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 mt-2 z-40"
              >
                <SearchSuggestions
                  query={searchQuery}
                  onSelect={handleSuggestionSelect}
                  onClose={handleSuggestionClose}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CTA Button with dynamic colors */}
        <Link href="/blogs">
          <motion.div
            // initial={isInitialLoad ? { opacity: 0, y: 15 } : false}
            // animate={isInitialLoad ? { opacity: 1, y: 0 } : {}}
            // transition={isInitialLoad ? { duration: 0.4, delay: 0.4, ease: "easeOut" } : {}}
            className="absolute md:bottom-8 -bottom-0 right-8"
          >
            <Button className={cn("transition-colors duration-300 text-xs md:text-md", slides[currentSlide].ctaColor)}>
              {slides[currentSlide].cta} <ArrowRight className="inline-block ml-1 h-4 w-4" />
              <span className="sr-only">Go to {slides[currentSlide].cta}</span>
            </Button>
          </motion.div>
        </Link>
      </div>

      {/* Carousel navigation dots */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              currentSlide === index ? "bg-white scale-100" : "bg-white/50 scale-75 hover:scale-90 hover:bg-white/70",
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

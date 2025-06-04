"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, MapPin, Clock } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useTourSearch, type TourSearchResult } from "@/hooks/use-tour-search"

interface SearchSuggestionsProps {
  query: string
  onSelect: (value: string) => void
  onClose: () => void
}

export default function SearchSuggestions({ query, onSelect, onClose }: SearchSuggestionsProps) {
  const router = useRouter()
  const { results, isLoading } = useTourSearch(query)
  const [visible, setVisible] = useState(true)

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest("[data-search-suggestions]")) {
        setVisible(false)
        setTimeout(onClose, 200)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [onClose])

  // Handle selection
  const handleSelect = (tour: TourSearchResult) => {
    onSelect(tour.title)
    router.push(`/tours/${tour.slug}`)
  }

  // Handle view all results
  const handleViewAll = () => {
    router.push(`/search?q=${encodeURIComponent(query)}`)
    onClose()
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          data-search-suggestions
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-h-[400px] overflow-y-auto z-[10000]"
        >
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Suggestions</h3>

            {isLoading ? (
              // Skeleton loading state
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-md animate-pulse"></div>
                    <div className="space-y-2 flex-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-2">
                {results.slice(0, 5).map((tour) => (
                  <button
                    key={tour.id}
                    onClick={() => handleSelect(tour)}
                    className="flex items-center gap-3 w-full p-2 hover:bg-gray-50 rounded-md transition-colors text-left"
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                      {tour.images?.[0] ? (
                        <img
                          src={tour.images[0] || "/placeholder.svg"}
                          alt={tour.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                          <Search className="h-5 w-5 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{tour.title}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        {tour.location && (
                          <>
                            <MapPin className="h-3 w-3" />
                            <span>{tour.location}</span>
                          </>
                        )}
                        {tour.duration && (
                          <>
                            <span className="mx-1">•</span>
                            <Clock className="h-3 w-3" />
                            <span>
                              {tour.duration} {tour.duration === 1 ? "day" : "days"}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </button>
                ))}

                <div className="pt-2 mt-2 border-t">
                  <button
                    onClick={handleViewAll}
                    className="text-emerald-600 hover:text-emerald-700 text-sm font-medium flex items-center gap-1"
                  >
                    <Search className="h-3 w-3" />
                    View all results for "{query}"
                  </button>
                </div>
              </div>
            ) : query.length >= 2 ? (
              <div className="py-3 text-center text-gray-500">No results found for "{query}"</div>
            ) : (
              <div className="py-3 text-center text-gray-500">Type at least 2 characters to search</div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

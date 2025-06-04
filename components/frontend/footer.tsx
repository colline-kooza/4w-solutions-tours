"use client"

import { Suspense } from "react"
import Link from "next/link"
import { Facebook, Twitter, Youtube } from "lucide-react"
import FooterAttractionsSkeleton from "../ui/FooterAttractionsSkeleton"
import { transformAttractionForFooter, useFeaturedAttractionsForFooter } from "@/hooks/useAttractions"


function PopularAttractionsContent() {
  const { attractions, isLoading, error } = useFeaturedAttractionsForFooter()

  if (isLoading) {
    return <FooterAttractionsSkeleton />
  }

  if (error) {
    // Fallback to some default attractions if there's an error
    const fallbackAttractions = [
      "Bwindi Impenetrable Forest",
      "Murchison Falls National Park",
      "Queen Elizabeth National Park",
      "Lake Mburo National Park",
      "Kibale Forest National Park",
    ]

    return (
      <div className="px-4 py-10 md:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-6 text-xl font-bold text-gray-900">Popular Attractions</h2>
          <div className="text-sm text-gray-600 leading-relaxed">
            {fallbackAttractions.map((attraction, index) => (
              <span key={attraction}>
                <Link
                  href="/attractions"
                  className="hover:text-blue-600 hover:underline transition-all duration-200 font-medium"
                >
                  {attraction}
                </Link>
                {index < fallbackAttractions.length - 1 && <span className="mx-2 text-gray-400 font-light">|</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const transformedAttractions = attractions.map(transformAttractionForFooter)

  if (transformedAttractions.length === 0) {
    return (
      <div className="px-4 py-10 md:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-6 text-xl font-bold text-gray-900">Popular Attractions</h2>
          <div className="text-sm text-gray-600 leading-relaxed">
            <span>Discover amazing attractions coming soon...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 py-10 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-6 text-xl font-bold text-gray-900">Popular Attractions</h2>
        <div className="text-sm text-gray-600 leading-relaxed">
          {transformedAttractions.map((attraction, index) => (
            <span key={attraction.id}>
              <Link
                href={`/attractions/${attraction.slug}`}
                className="hover:text-blue-600 hover:underline transition-all duration-200 font-medium"
              >
                {attraction.name}
              </Link>
              {index < transformedAttractions.length - 1 && <span className="mx-2 text-gray-400 font-light">|</span>}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function OptimizedFooter() {
  return (
    <footer className="w-full">
      {/* Popular Attractions Section with React Query */}
      <Suspense fallback={<FooterAttractionsSkeleton />}>
        <PopularAttractionsContent />
      </Suspense>

      {/* Main Footer Section */}
      <div className="bg-black text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:px-8">
          {/* Social Media Icons */}
          <div className="flex justify-center space-x-4 mb-10">
            <Link
              href="#"
              className="group text-white hover:text-blue-400 transition-all duration-300 transform hover:scale-110"
            >
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-all duration-300">
                <Facebook size={20} />
              </div>
              <span className="sr-only">Facebook</span>
            </Link>
            <Link
              href="#"
              className="group text-white hover:text-blue-400 transition-all duration-300 transform hover:scale-110"
            >
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-blue-400 transition-all duration-300">
                <Twitter size={20} />
              </div>
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href="#"
              className="group text-white hover:text-pink-400 transition-all duration-300 transform hover:scale-110"
            >
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-gradient-to-tr group-hover:from-yellow-400 group-hover:via-red-500 group-hover:to-purple-500 transition-all duration-300">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
              <span className="sr-only">Instagram</span>
            </Link>
            <Link
              href="#"
              className="group text-white hover:text-red-400 transition-all duration-300 transform hover:scale-110"
            >
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-red-600 transition-all duration-300">
                <Youtube size={20} />
              </div>
              <span className="sr-only">YouTube</span>
            </Link>
            <Link
              href="#"
              className="group text-white hover:text-pink-400 transition-all duration-300 transform hover:scale-110"
            >
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-pink-600 transition-all duration-300">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </div>
              <span className="sr-only">TikTok</span>
            </Link>
          </div>

          {/* Trustpilot Rating */}
          <div className="flex md:justify-center mb-12">
            <div className="flex md:flex-row flex-col gap-4 md:gap-0 items-start md:items-center space-x-4 text-white px-6 py-3 rounded-lg shadow-lg">
              <div className="flex space-x-1 ">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-5 h-5 bg-green-500 rounded-sm flex items-center justify-center shadow-sm ">
                    <svg viewBox="0 0 24 24" fill="white" className="w-3 h-3">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-100">4.4 rating | 262,015 reviews</span>
              <div className="flex items-center space-x-1">
                <svg viewBox="0 0 24 24" fill="#00B67A" className="w-4 h-4">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span className="text-sm font-bold text-green-600">MarkW-Tours-And-Travel</span>
              </div>
            </div>
          </div>

          {/* Footer Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4">
              <Link
                href="/help"
                className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium"
              >
                Help Center
              </Link>
              <Link
                href="/privacy"
                className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium"
              >
                Privacy and Cookies Statement
              </Link>
              <Link
                href="/about"
                className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium"
              >
                About MarkW-Tours-And-Travel
              </Link>
            </div>
            <div className="space-y-4">
              <Link
                href="/careers"
                className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium"
              >
                Careers
              </Link>
              <Link
                href="/sitemap"
                className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium"
              >
                Sitemap
              </Link>
              <Link
                href="/supplier-signup"
                className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium"
              >
                Supplier Sign Up
              </Link>
            </div>
            <div className="space-y-4">
              <Link
                href="/travel-agents"
                className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium"
              >
                Travel Agents
              </Link>
              <Link
                href="/affiliate"
                className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium"
              >
                Become an Affiliate
              </Link>
              <Link
                href="/news"
                className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium"
              >
                News
              </Link>
            </div>
            <div className="space-y-4">
              <Link
                href="/blog"
                className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium"
              >
                MarkW-Tours-And-Travel blog
              </Link>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col lg:flex-row justify-between items-center pt-8 border-t border-gray-800">
            {/* App Store Buttons */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mb-6 lg:mb-0">
              <Link href="#" className="block transform hover:scale-105 transition-transform duration-200">
                <img
                  src="https://cache.vtrcdn.com/orion/images/buttons/google-play-store/en/get-on-google-play.svg"
                  alt="Get it on Google Play"
                  className="h-12 w-auto rounded-lg shadow-lg"
                />
              </Link>
              <Link href="#" className="block transform hover:scale-105 transition-transform duration-200">
                <img
                  src="https://cache.vtrcdn.com/orion/images/buttons/apple-app-store/en/download-on-app-store.svg"
                  alt="Download on the App Store"
                  className="h-11 w-auto rounded-lg shadow-lg"
                />
              </Link>
            </div>

            {/* Copyright and Legal Links */}
            <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-6 text-sm text-gray-400">
              <span className="font-medium">© 1997-2025 MarkW-Tours-And-Travel, Inc.</span>
              <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2">
                <Link href="/terms" className="hover:text-white transition-colors duration-200 font-medium">
                  Terms & Conditions
                </Link>
                <Link href="/how-it-works" className="hover:text-white transition-colors duration-200 font-medium">
                  How MarkW-Tours-And-Travel works
                </Link>
                <Link href="/cookies" className="hover:text-white transition-colors duration-200 font-medium">
                  Cookie Consent
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

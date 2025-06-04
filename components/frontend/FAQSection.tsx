"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronDown, HelpCircle, Clock, Play, Pause, MapPin, Users, Shield, Calendar, Phone, Star } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface FAQ {
  id: number
  question: string
  answer: string
  image: string
  category: string
  icon: any
}

const faqs: FAQ[] = [
  {
    id: 1,
    question: "How do I book a tour with Marktk Tours?",
    answer:
      "Booking with us is simple! Visit our website, call our 24/7 hotline, or visit our office. Our travel experts will help you choose the perfect package and handle all paperwork.",
    image:
      "https://media.istockphoto.com/id/494856046/photo/lion-in-high-grass.jpg?s=612x612&w=0&k=20&c=fQSSpAUsTJ0Zq0xiMRviJz0C0KxExnvI2ecDeQNjSwI=",
    category: "Booking",
    icon: Calendar,
  },
  {
    id: 2,
    question: "What's included in your tour packages?",
    answer:
      "Our packages include accommodation, transportation, guided tours, entrance fees, selected meals, and travel insurance. We provide detailed itineraries with everything clearly marked.",
    image:
      "https://media.istockphoto.com/id/177418652/photo/elephants-touching-each-other-gently.jpg?s=612x612&w=0&k=20&c=O4ttRuDzM3F3Ix3nXOKNP4KClFt3fdsbrJ3Xdp9AQ6g=",
    category: "Packages",
    icon: MapPin,
  },
  {
    id: 3,
    question: "Can you customize tours according to my preferences?",
    answer:
      "We specialize in personalized travel experiences. Add destinations, change accommodations, include activities, or modify duration to match your interests.",
    image:
      "https://media.istockphoto.com/id/153499239/photo/lioness-displaing-dangerous-teeth.jpg?s=612x612&w=0&k=20&c=y-FDGTeFYKw3-CzXIrW-KL-EBkeSGgSWYR5iBJGSFKA=",
    category: "Customization",
    icon: Users,
  },
  {
    id: 4,
    question: "What is your cancellation and refund policy?",
    answer:
      "Flexible cancellation: 30+ days = 90% refund, 15-30 days = 75%, 7-14 days = 50%. Emergency cases handled individually. Trip protection insurance available.",
    image:
      "https://media.istockphoto.com/id/1341341634/photo/cute-baby-chimpanzee-portrait.jpg?s=612x612&w=0&k=20&c=UK7b8hsMQL30ma_6XEL7MN6khgUyDXKRxTpkY_JaSek=",
    category: "Policy",
    icon: Shield,
  },
  {
    id: 5,
    question: "Do you provide travel insurance?",
    answer:
      "Yes! Basic insurance included covering medical emergencies, delays, and lost luggage. Premium options available for comprehensive coverage and adventure activities.",
    image:
      "https://media.istockphoto.com/id/471846571/photo/kingfisher-alcedo-atthis.jpg?s=612x612&w=0&k=20&c=hALzIDcQjPiiumLHgJfYdqe9uiUieqB6yqmM7QDcZgE=",
    category: "Insurance",
    icon: Shield,
  },
  {
    id: 6,
    question: "How experienced are your tour guides?",
    answer:
      "Our certified guides have years of experience with deep local knowledge. They speak multiple languages, are first-aid trained, and passionate about sharing culture.",
    image:
      "https://media.istockphoto.com/id/2072383284/photo/a-red-fox-kit-nuzzles-its-mom-close-to-sunset.jpg?s=612x612&w=0&k=20&c=7u4p7hXGlWbVRxOOBmp08AKUJKWahgUqV-z0nZcOGdo=",
    category: "Guides",
    icon: Star,
  },
]

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true)

  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % faqs.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlay])

  const handleQuestionClick = (index: number) => {
    setActiveIndex(index)
    setIsAutoPlay(false)
    setTimeout(() => setIsAutoPlay(true), 10000)
  }

  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay)
  }

  return (
    <section className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(34,197,94,0.05),transparent_50%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 bg-[#22c55e]/10 border border-[#22c55e]/20 rounded-full px-3 sm:px-4 py-2 text-[#22c55e] text-xs sm:text-sm font-medium mb-4">
            <HelpCircle className="w-3 h-3 sm:w-4 sm:h-4" />
            Frequently Asked Questions
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 mb-3 sm:mb-4">
            Got Questions?
            <span className="block text-[#22c55e]">We Have Answers</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
            Find answers to the most common questions about Marktk Tours. Still need help? Our support team is available
            24/7.
          </p>
        </div>

        {/* Mobile-First Layout */}
        <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-12 lg:gap-8 xl:gap-12">
          {/* Questions Section */}
          <div className="lg:col-span-7 xl:col-span-7">
            {/* Auto-play Control */}
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-bold text-gray-900">Common Questions</h3>
              <button
                onClick={toggleAutoPlay}
                className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600 hover:text-[#22c55e] transition-colors px-2 py-1 rounded-lg hover:bg-gray-100"
              >
                {isAutoPlay ? (
                  <>
                    <Pause className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden xs:inline">Auto-play On</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden xs:inline">Auto-play Off</span>
                  </>
                )}
              </button>
            </div>

            {/* FAQ Items */}
            <div className="space-y-2 sm:space-y-3">
              {faqs.map((faq, index) => {
                const IconComponent = faq.icon
                return (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`bg-white rounded-lg sm:rounded-xl shadow-sm border transition-all duration-300 overflow-hidden ${
                      activeIndex === index ? "border-[#22c55e] shadow-md" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {/* Question Header */}
                    <button
                      onClick={() => handleQuestionClick(index)}
                      className="w-full p-3 sm:p-4 lg:p-5 text-left flex items-start sm:items-center gap-3 hover:bg-gray-50 transition-colors"
                    >
                      <div
                        className={`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center mt-0.5 sm:mt-0 ${
                          activeIndex === index ? "bg-[#22c55e]/10 text-[#22c55e]" : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        <IconComponent className="w-3 h-3 sm:w-4 sm:h-4" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span
                            className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${
                              activeIndex === index ? "bg-[#22c55e]/10 text-[#22c55e]" : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {faq.category}
                          </span>
                          {activeIndex === index && isAutoPlay && (
                            <div className="flex items-center gap-1 text-xs text-[#22c55e]">
                              <Clock className="w-3 h-3" />
                              <span className="hidden sm:inline">Auto</span>
                            </div>
                          )}
                        </div>
                        <h4 className="font-semibold text-gray-900 text-sm sm:text-base leading-tight pr-2">
                          {faq.question}
                        </h4>
                      </div>

                      <motion.div
                        animate={{ rotate: activeIndex === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex-shrink-0 ${activeIndex === index ? "text-[#22c55e]" : "text-gray-400"}`}
                      >
                        <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                      </motion.div>
                    </button>

                    {/* Answer Content */}
                    <AnimatePresence>
                      {activeIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-3 sm:px-4 lg:px-5 pb-3 sm:pb-4 lg:pb-5 pt-1 sm:pt-2">
                            <div className="w-full h-px bg-gradient-to-r from-[#22c55e]/20 via-[#22c55e]/50 to-[#22c55e]/20 mb-3" />
                            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{faq.answer}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Progress Bar for Active Item */}
                    {activeIndex === index && isAutoPlay && (
                      <div className="h-1 bg-gray-200">
                        <motion.div
                          className="h-full bg-[#22c55e]"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 5, ease: "linear" }}
                          key={`progress-${index}`}
                        />
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Image Section */}
          <div className="lg:col-span-5 xl:col-span-5">
            <div className="lg:sticky lg:top-6 xl:top-8">
              <motion.div
                layout
                className="relative bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl lg:rounded-3xl p-3 sm:p-4 lg:p-6 shadow-xl border border-gray-200/50"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.05, y: -20 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="relative overflow-hidden rounded-lg sm:rounded-xl lg:rounded-2xl"
                  >
                    <div className="aspect-[4/3] relative">
                      <Image
                        src={faqs[activeIndex].image || "/placeholder.svg"}
                        alt={`${faqs[activeIndex].category} - ${faqs[activeIndex].question}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                        priority={activeIndex === 0}
                      />

                      {/* Image overlay with question info */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-2 sm:bottom-3 lg:bottom-4 left-2 sm:left-3 lg:left-4 right-2 sm:right-3 lg:right-4 text-white">
                        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 sm:p-3">
                          <div className="flex items-center gap-2 mb-1">
                            {(() => {
                              const IconComponent = faqs[activeIndex].icon
                              return <IconComponent className="w-3 h-3 sm:w-4 sm:h-4" />
                            })()}
                            <h4 className="font-semibold text-xs sm:text-sm">{faqs[activeIndex].category}</h4>
                          </div>
                          <p className="text-xs opacity-90 line-clamp-2 leading-tight">{faqs[activeIndex].question}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Floating Counter */}
                <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 bg-[#22c55e] text-white w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center font-bold shadow-lg text-xs sm:text-sm lg:text-base">
                  {activeIndex + 1}/{faqs.length}
                </div>

                {/* Navigation Dots */}
                <div className="flex justify-center mt-3 sm:mt-4 lg:mt-6 gap-1.5 sm:gap-2">
                  {faqs.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuestionClick(index)}
                      className={`w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 rounded-full transition-all duration-300 ${
                        activeIndex === index ? "bg-[#22c55e] scale-125" : "bg-gray-300 hover:bg-gray-400"
                      }`}
                    />
                  ))}
                </div>

                {/* Contact CTA */}
                <div className="mt-3 sm:mt-4 lg:mt-6 p-2.5 sm:p-3 lg:p-4 bg-gradient-to-r from-[#22c55e]/10 to-[#22c55e]/5 rounded-lg sm:rounded-xl border border-[#22c55e]/20">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#22c55e]/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-[#22c55e]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-gray-900">Still have questions?</p>
                      <p className="text-xs text-gray-600">Call us 24/7 for instant help</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements - Responsive */}
      <div className="absolute top-16 right-4 sm:top-20 sm:right-10 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-[#22c55e]/10 rounded-full blur-xl" />
      <div className="absolute bottom-16 left-4 sm:bottom-20 sm:left-10 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-[#22c55e]/5 rounded-full blur-2xl" />
      <div className="absolute top-1/2 left-1/4 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#22c55e] rounded-full animate-pulse" />
      <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-[#22c55e] rounded-full animate-pulse delay-1000" />
    </section>
  )
}

"use client"

import { MessageCircle, Plus } from "lucide-react"
import { useState } from "react"

interface WhatsAppCTAProps {
  phoneNumber: string
  message?: string
}

export default function WhatsAppCTA({
  phoneNumber,
  message = "Hi! I'm interested in your tours. Can you help me?",
}: WhatsAppCTAProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <>
      {/* Main WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleWhatsAppClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="group relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-[#2f9e7e] hover:bg-[#16a34a] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95"
          aria-label="Contact us on WhatsApp"
        >
          {/* Ripple Effect */}
          <div className="absolute inset-0 rounded-full bg-[#22c55e] animate-ping opacity-20"></div>

          {/* Plus Effect Background */}
          <div
            className={`absolute inset-0 rounded-full bg-[#2f9e7e] transition-transform duration-300 ${
              isHovered ? "scale-150 opacity-0" : "scale-100 opacity-100"
            }`}
          ></div>

          {/* Icon */}
          <MessageCircle
            className={`relative z-10 w-6 h-6 md:w-7 md:h-7 transition-transform duration-300 ${
              isHovered ? "rotate-12" : "rotate-0"
            }`}
          />

          {/* Plus Icon Overlay */}
          <Plus
            className={`absolute z-20 w-4 h-4 md:w-5 md:h-5 transition-all duration-300 ${
              isHovered ? "opacity-100 scale-100 rotate-90" : "opacity-0 scale-50 rotate-0"
            }`}
          />
        </button>

        {/* Tooltip */}
        <div
          className={`absolute bottom-full right-0 mb-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap transition-all duration-300 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
          }`}
        >
          Need help with tours?
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      </div>

      {/* Floating Particles Effect */}
      <div className="fixed bottom-6 right-6 z-40 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-[#2f9e7e] rounded-full transition-all duration-1000 ${
              isHovered ? `opacity-60 animate-bounce` : "opacity-0"
            }`}
            style={{
              animationDelay: `${i * 200}ms`,
              transform: `translate(${-20 - i * 10}px, ${-20 - i * 10}px)`,
            }}
          ></div>
        ))}
      </div>
    </>
  )
}

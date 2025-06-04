import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Users, Heart, Globe, Shield } from "lucide-react"

export default function AboutUsHero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(34,197,94,0.05),transparent_50%)]" />

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 pt-20 md:pt-16 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-[#22c55e]/10 border border-[#22c55e]/20 rounded-full px-4 py-2 text-[#22c55e] text-sm font-medium">
                <Users className="w-4 h-4" />
                About Matrik Tours & Travels
              </div>

              <h1 className="text-4xl md:text-5xl  font-black text-gray-900 leading-tight">
                Your Trusted Travel
                <span className="block text-[#22c55e] text-4xl">Partners Since 2024</span>
              </h1>

              <p className="text-lg md:text-lg text-gray-600 leading-relaxed max-w-lg">
                Founded with passion for exploration, Matrik Tours has been crafting memorable journeys for travelers
                worldwide. We believe every destination tells a story worth experiencing.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-[#22c55e] hover:bg-[#16a34a] text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Meet Our Team
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-3 rounded-full transition-all duration-300"
              >
                Our Story
              </Button>
            </div>

            {/* Stats */}
            {/* <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-black text-[#22c55e]">9+</div>
                <div className="text-sm text-gray-500">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-black text-[#22c55e]">25K+</div>
                <div className="text-sm text-gray-500">Satisfied Clients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#22c55e]">4.8</div>
                <div className="text-sm text-gray-500">Customer Rating</div>
              </div>
            </div> */}

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#22c55e]/10 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-[#22c55e]" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Passionate Service</div>
                  <div className="text-sm text-gray-500">Travel with purpose</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#22c55e]/10 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[#22c55e]" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Trusted & Secure</div>
                  <div className="text-sm text-gray-500">Your safety first</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - GIF Display */}
          <div className="relative">
            {/* Main About Us Image */}
            <div className="relative z-10">
              <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-3xl p-6 shadow-2xl border border-gray-200/50 backdrop-blur-sm">
                <Image
                  src="/about-us.gif"
                  alt="Matrik Tours & Travels - About Us Team"
                  width={700}
                  height={500}
                  className="w-full h-auto object-contain rounded-2xl"
                  priority
                  unoptimized
                />
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-[#22c55e] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                🌟 Est. 2015
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white border border-gray-200 px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-500 fill-current" />
                <span className="text-gray-900">Trusted by 25K+</span>
              </div>
            </div>

            {/* Background Decorative Cards */}
            <div className="absolute top-8 -right-8 w-32 h-20 bg-gradient-to-r from-[#22c55e]/20 to-[#22c55e]/10 rounded-2xl rotate-12 blur-sm" />
            <div className="absolute bottom-8 -left-8 w-28 h-16 bg-gradient-to-r from-gray-200 to-gray-100 rounded-2xl -rotate-12 blur-sm" />
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-20 h-20 bg-[#22c55e]/10 rounded-full blur-xl" />
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-[#22c55e]/5 rounded-full blur-2xl" />
      <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-[#22c55e] rounded-full animate-pulse" />
      <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-[#22c55e] rounded-full animate-pulse delay-1000" />

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(90deg,#000_1px,transparent_1px),linear-gradient(180deg,#000_1px,transparent_1px)] bg-[size:50px_50px]" />
    </section>
  )
}
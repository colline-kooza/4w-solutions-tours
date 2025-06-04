import Image from "next/image"
import { Target, Compass, Sparkles, Clock, CheckCircle, Star } from "lucide-react"

export default function AboutValuesSection() {
  return (
    <section className="relative md:py-14 py-10 bg-gradient-to-br from-white via-gray-50 to-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(34,197,94,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(34,197,94,0.05),transparent_50%)]" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#22c55e]/10 border border-[#22c55e]/20 rounded-full px-4 py-2 text-[#22c55e] text-sm font-medium mb-6">
            <Target className="w-4 h-4" />
            Our Mission & Values
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 mb-3 sm:mb-4 ">
            What Drives Us
            <span className="block text-[#22c55e]">Forward Every Day</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            At Matrik Tours, we're more than just travel planners. We're dream weavers, experience curators, 
            and memory makers dedicated to transforming your wanderlust into reality.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content - Values & Mission */}
          <div className="space-y-8">
            {/* Mission Card */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-xl border border-gray-200/50">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-[#22c55e]/10 rounded-2xl flex items-center justify-center">
                  <Compass className="w-7 h-7 text-[#22c55e]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
                  <div className="w-12 h-1 bg-[#22c55e] rounded-full mt-2" />
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                To create extraordinary travel experiences that connect people with cultures, 
                destinations, and memories they'll treasure forever. We believe travel changes lives.
              </p>
            </div>

            {/* Core Values */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Core Values That Guide Us</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/50 border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 bg-[#22c55e]/10 rounded-full flex items-center justify-center mt-1">
                    <CheckCircle className="w-5 h-5 text-[#22c55e]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Authenticity First</h4>
                    <p className="text-sm text-gray-600">We showcase genuine local experiences and cultures</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/50 border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 bg-[#22c55e]/10 rounded-full flex items-center justify-center mt-1">
                    <Clock className="w-5 h-5 text-[#22c55e]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Reliability Always</h4>
                    <p className="text-sm text-gray-600">Your trust is our foundation, we deliver on promises</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/50 border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 bg-[#22c55e]/10 rounded-full flex items-center justify-center mt-1">
                    <Sparkles className="w-5 h-5 text-[#22c55e]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Excellence Driven</h4>
                    <p className="text-sm text-gray-600">Every detail matters in creating perfect journeys</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Team Image & Stats */}
          <div className="relative">
            {/* Main Team Image */}
            <div className="relative z-10">
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-6 shadow-2xl border border-gray-200/50">
                <div className="relative overflow-hidden rounded-2xl">
                  <Image
                    src="https://img.freepik.com/free-photo/amazing-bengal-tiger-nature_475641-1283.jpg?ga=GA1.1.1036439435.1744115746&semt=ais_hybrid&w=740"
                    alt="Matrik Tours Team - Working Together"
                    width={700} 
                    height={500}
                    className="w-full h-auto object-cover"
                    priority
                    unoptimized
                  />
                  {/* Overlay with company info */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <h4 className="text-lg font-bold">Marktk Tours And Travel</h4>
                    <p className="text-sm opacity-90">Passionate Travel Experts</p>
                  </div>
                </div>

                {/* Achievement Cards */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-[#22c55e]/5 rounded-xl p-4 text-center">
                    <div className="text-2xl font-black text-[#22c55e] mb-1">25K+</div>
                    <div className="text-sm text-gray-600">Happy Travelers</div>
                  </div>
                  <div className="bg-[#22c55e]/5 rounded-xl p-4 text-center">
                    <div className="text-2xl font-black text-[#22c55e] mb-1">9+</div>
                    <div className="text-sm text-gray-600">Years Strong</div>
                  </div>
                </div>
              </div>

              {/* Floating Awards */}
              <div className="absolute -top-6 -right-6 bg-[#22c55e] text-white px-6 py-3 rounded-full shadow-lg">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="font-semibold">Top Rated</span>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white border border-gray-200 px-6 py-3 rounded-full shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="font-semibold text-gray-900">Always Available</span>
                </div>
              </div>
            </div>

            {/* Background Decorative Elements */}
            <div className="absolute top-12 -right-12 w-24 h-24 bg-gradient-to-r from-[#22c55e]/10 to-[#22c55e]/5 rounded-full blur-xl" />
            <div className="absolute bottom-12 -left-12 w-32 h-32 bg-gradient-to-r from-gray-100 to-gray-50 rounded-full blur-2xl" />
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-32 left-16 w-16 h-16 bg-[#22c55e]/5 rounded-full blur-xl" />
      <div className="absolute bottom-32 right-16 w-20 h-20 bg-[#22c55e]/8 rounded-full blur-2xl" />
      <div className="absolute top-2/3 left-1/3 w-2 h-2 bg-[#22c55e] rounded-full animate-pulse delay-500" />
      <div className="absolute top-1/4 right-1/4 w-1 h-1 bg-[#22c55e] rounded-full animate-pulse delay-1500" />

      {/* Subtle Pattern */}
      <div className="absolute inset-0 opacity-[0.015] bg-[linear-gradient(45deg,#000_1px,transparent_1px),linear-gradient(-45deg,#000_1px,transparent_1px)] bg-[size:60px_60px]" />
    </section>
  )
}
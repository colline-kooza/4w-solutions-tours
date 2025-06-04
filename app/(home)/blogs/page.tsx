import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Facebook, Instagram } from "lucide-react"
import { FaPinterest } from "react-icons/fa"
import BlogsContainer from "@/components/frontend/blogs-section"

export default function Page() {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] lg:h-[500px] overflow-hidden">
        <Image
          src="/blog-hero.jpg"
          alt="Desert landscape with red rock formations"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 flex flex-col justify-center h-full p-6 md:p-10 lg:p-16 gap-10">
          <div className="max-w-4xl">
            <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-white leading-tight mb-4">
              Travel Stories, Guides & Ideas from MarkW-Tours-And-Travel
            </h1>
            <p className="text-base md:text-lg text-white/90 font-medium">
              Discover destinations, tips, and real experiences to fuel your next adventure.
            </p>
          </div>

          <div>
            <p className="text-white/70 font-semibold mb-3 uppercase tracking-wider animate-pulse text-sm">Follow us</p>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                <Facebook className="w-6 h-6 text-white" />
              </div>
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                <Instagram className="w-6 h-6 text-white" />
              </div>
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                </div>
              </div>
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                <FaPinterest className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <BlogsContainer />

      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-cyan-50 to-blue-50 py-16 md:py-20">
        <div className="container mx-auto px-6 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900">Do more with MarkW-Tours-And-Travel</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                One site, 300,000+ travel experiences you'll remember—direct to your inbox.
              </p>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 text-lg font-semibold rounded-md">
                Stay in the know
              </Button>
            </div>

            <div className="w-full h-full ">
              <Image
                src="https://cache.vtrcdn.com/orion/images/signup-banner-image.webp"
                alt="Travel destination"
                width={628}
                height={628}
                className="w-full h-full object-cover "
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

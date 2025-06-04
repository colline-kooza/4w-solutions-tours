import { Heart, Map, Users, Sparkles } from "lucide-react"
import Link from "next/link"

export default function TripsHero() {
  return (
    <section className="w-full py-8 md:py-10 lg:py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        {/* Main heading */}
       <div className="text-center mb-6 md:mb-8">
  <h1 className="text-4xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-6 md:mb-8">
    Plan unforgettable journeys<br />
    with Martk4 Trips
  </h1>
  <p className="text-base md:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
    At Martk4, you can plan your next getaway your way—explore curated trips or customize every detail. 
    Discover hidden gems and must-see spots, guided by real traveler insights and trusted reviews.
  </p>
</div>


        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
  {/* Feature 1 */}
  <div className="text-center">
    <div className="mb-4 flex justify-center">
      <div className="w-12 h-12 flex items-center justify-center">
        <Sparkles className="w-7 h-7 text-gray-700" strokeWidth={1.5} />
      </div>
    </div>
    <h3 className="text-base md:text-base font-semibold text-gray-900 mb-2">
      Tailored trip plans just for you
    </h3>
  </div>

  {/* Feature 2 */}
  <div className="text-center">
    <div className="mb-4 flex justify-center">
      <div className="w-12 h-12 flex items-center justify-center">
        <Heart className="w-7 h-7 text-gray-700" strokeWidth={1.5} />
      </div>
    </div>
    <h3 className="text-base md:text-base font-semibold text-gray-900 mb-2">
      Save favorite spots and experiences
    </h3>
  </div>

  {/* Feature 3 */}
  <div className="text-center">
    <div className="mb-4 flex justify-center">
      <div className="w-12 h-12 flex items-center justify-center">
        <Map className="w-7 h-7 text-gray-700" strokeWidth={1.5} />
      </div>
    </div>
    <h3 className="text-base md:text-base font-semibold text-gray-900 mb-2">
      Visualize your journey on a live map
    </h3>
  </div>

  {/* Feature 4 */}
  <div className="text-center">
    <div className="mb-4 flex justify-center">
      <div className="w-12 h-12 flex items-center justify-center">
        <Users className="w-7 h-7 text-gray-700" strokeWidth={1.5} />
      </div>
    </div>
    <h3 className="text-base md:text-base font-semibold text-gray-900 mb-2">
      Collaborate and plan with your crew
    </h3>
  </div>
</div>


        {/* Call to action */}
        <div className="text-center">
          <p className="text-base md:text-base text-gray-700">
            Already started?{" "}
            <Link
              href="/login"
              className="text-gray-900 font-semibold underline hover:no-underline transition-all duration-200"
            >
              Log in
            </Link>{" "}
            to see your saved trips.
          </p>
        </div>
      </div>
    </section>
  )
}

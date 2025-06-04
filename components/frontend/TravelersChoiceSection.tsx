import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function TravelersChoiceSection() {
  return (
    <section className="relative w-full min-h-[480px]  bg-[#fff7e1] overflow-hidden mb-8">
      <div className="relative z-10  px-4 py-8 md:py-12 lg:py-16 max-w-6xl mx-auto">
        <div className="flex justify-center gap-3 md:flex-row flex-col items-center">
          {/* Left content */}
          <div className="space-y-6  md:w-[50%] w-full">
            <div className="w-16 h-16 bg-[#ffa500] rounded-2xl flex items-center justify-center">
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                <div className="text-[#ffa500] text-xl font-bold">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Main heading */}
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-black leading-tight">
                Travelers' Choice
                <br />
                Awards Best of
                <br />
                the Best
              </h1>
            </div>

            {/* Description */}
            <p className="text-gray-700 text-base md:text-lg max-w-md leading-relaxed">
              Among our top 1% of places, stays, eats, and experiences—decided
              by you.
            </p>

            {/* CTA Button */}
            <Button className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-full text-sm md:text-base font-medium transition-colors duration-200">
              Book Favorite Tour
            </Button>
          </div>

          {/* Right content - Image */}
          <div className="md:w-[50%] w-full md:h-[550px] h-[400px] bg-[url('https://static.tacdn.com/img2/brand/feed/tc_cards_2025.png')] bg-contain md:bg-cover bg-center bg-no-repeat" />

        </div>
      </div>
    </section>
  );
}

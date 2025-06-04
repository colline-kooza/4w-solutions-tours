import Image from "next/image"
import { Badge } from "@/components/ui/badge"

interface GuideCard {
  id: number
  title: string
  image: string
  isSponsored?: boolean
}

const guides: GuideCard[] = [
  {
    id: 1,
    title: "New ways to discover yourself—and your world—through travel",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/30/83/1a/caption.jpg?w=2000&h=-1&s=1&cx=960&cy=540&chk=v1_a9e6192f0b49707a6b23",
    isSponsored: true,
  },
  {
    id: 2,
    title: "Your guide to Lunar New Year desserts",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/88/16/cb/caption.jpg?w=2400&h=-1&s=1&cx=1920&cy=1080&chk=v1_2e49e8950f1bb9f0fe89",
  },
  {
    id: 3,
    title: "Eat your way around Macao",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/50/c2/85/caption.jpg?w=2000&h=-1&s=1&cx=960&cy=539&chk=v1_b87aa2048566062a2b0e",
  },
  {
    id: 4,
    title: "How to eat really well in Florence—beyond the tourist spots.",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/ee/3c/5f/caption.jpg?w=2400&h=-1&s=1&cx=1920&cy=1080&chk=v1_ee7d5901f387049f4dfc",
  },
]

export default function TravelGuides() {
  return (
    <section className="w-full py-8 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-5 gap-3">
          {guides.map((guide) => (
            <div
              key={guide.id}
              className="group bg-white rounded-lg transition-all duration-300 "
            >
              <div className="flex h-28">
                {/* Image Section */}
                <div className="relative w-28 flex-shrink-0">
                  {guide.isSponsored && (
                    <Badge
                      variant="secondary"
                      className="absolute top-1.5 left-1.5 z-10 bg-[#2f9e7e] text-white text-[10px] font-medium px-1.5 py-0.5 rounded-sm"
                    >
                      SPONSORED
                    </Badge>
                  )}
                  <div className="relative w-full h-full">
                    <Image
                      src={guide.image || "/placeholder.svg"}
                      alt={guide.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300 rounded-l-lg"
                    />
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 p-3 flex items-start">
                  <h3 className="text-base font-medium text-gray-900 leading-tight group-hover:text-[#2f9e7e] transition-colors duration-200 line-clamp-3">
                    {guide.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
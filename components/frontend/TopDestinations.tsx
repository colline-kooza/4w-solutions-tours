"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const destinations = [
  {
    name: "Kampala",
    image: "/d4.webp",
  },
  {
    name: "Entebbe",
    image: "/d3.webp",
  },
  {
    name: "Jinja",
    image: "/d5.webp",
  },
  {
    name: "Kabale",
    image: "/d6.webp",
  },
  {
    name: "Entebbe",
    image: "/d2.jpg",
  },
  {
    name: "Northern Uganda",
    image: "/d4.webp",
  },
  {
    name: "Kitugumu",
    image: "/d1.jpg",
  },
  {
    name: "Masindi",
    image: "/d1.jpg",
  },
  {
    name: "Bwendi",
    image: "/d2.jpg",
  },
  {
    name: "Kampala",
    image: "/d1.jpg",
  },
];

export default function TopDestinations() {
  return (
    <section className="w-full md:py-16 py-10 px-2">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center md:mb-8 mb-6 text-gray-900">
          Top Destinations
        </h2>

        {/* Desktop Grid - hidden on mobile */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-4">
          {destinations.map((destination, index) => (
            <div
              key={index}
              className="relative group cursor-pointer rounded-lg overflow-hidden aspect-[3/2] transition-all duration-300"
            >
              <Image
                src={destination.image || "/placeholder.svg"}
                alt={destination.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
              />

              {/* Blur overlay for text readability - disappears on hover */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent group-hover:from-transparent transition-all duration-300" />

              {/* Destination name */}
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-lg font-semibold text-center px-2 drop-shadow-lg">
                  {destination.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Carousel - shows 1.5 items */}
        <div className="md:hidden">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {destinations.map((destination, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 md:pl-4 basis-[calc(60%-8px)]"
                >
                  {" "}
                  <div className="relative group cursor-pointer rounded-lg overflow-hidden aspect-[3/2] transition-all duration-300">
                    <Image
                      src={destination.image || "/placeholder.svg"}
                      alt={destination.name}
                      fill
                      className="object-cover"
                      sizes="50vw"
                    />

                    {/* Blur overlay for text readability - disappears on hover */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent group-hover:from-transparent transition-all duration-300" />

                    {/* Destination name */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h3 className="text-white text-lg font-semibold text-center px-2 drop-shadow-lg">
                        {destination.name}
                      </h3>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" /> */}
          </Carousel>
        </div>
      </div>
    </section>
  );
}

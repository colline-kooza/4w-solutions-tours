"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const carouselItems = [
  {
    image: "https://media.istockphoto.com/id/1324485884/photo/cute-lion-family.jpg?s=612x612&w=0&k=20&c=QqRN63XYju8cNbmIoQZaLVoPxGg6g2d7vFfq4ylBY5E=",
    title: "Effortless Inventory Tracking,",
    subtitle: "Real-time Stock Updates at Your Fingertips",
  },
  {
    image: "https://media.istockphoto.com/id/1964108383/photo/photographer-at-safari.jpg?s=612x612&w=0&k=20&c=5mP5D3XijJqmIPfwOtRLHAlZXsA8ygOLsitdSRFqCjE=",
    title: "Smart Reordering,",
    subtitle: "Never Run Out of Essential Items Again",
  },
  {
    image: "https://media.istockphoto.com/id/1255754954/video/school-of-fish-sharks-swim-in-a-circle.jpg?s=640x640&k=20&c=TW7xOAOrYhiRBNadIvEe-gAiIbvg9zXBNlJVx7KS4DI=",
    title: "Powerful Analytics,",
    subtitle: "Make Data-Driven Inventory Decisions",
  },
];

export default function CustomCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselItems.length) % carouselItems.length
    );
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-screen bg-purple-900 overflow-hidden">
      <div className="absolute inset-0">
        {carouselItems.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={item.image}
              alt={`Slide ${index + 1}`}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-purple-900/50" />
          </div>
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-0 top-0 flex flex-col items-center justify-end p-6 text-white">
        <h2 className="text-3xl font-bold mb-2">
          {carouselItems[currentSlide].title}
        </h2>
        <p className="text-xl mb-8">{carouselItems[currentSlide].subtitle}</p>
        <div className="flex space-x-2 mb-4">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide ? "bg-white w-4" : "bg-white/50"
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/75 hover:text-white transition-colors "
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/75 hover:text-white transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-8 h-8" />
      </button>
    </div>
  );
}

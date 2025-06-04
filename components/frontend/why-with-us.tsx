"use client"
import React, { useState } from 'react';

interface FeatureData {
  title: string;
  description: string;
  image: string;
}

interface FeatureProps extends FeatureData {
  isActive: boolean;
  onHover: (index: number) => void;
  onLeave: () => void;
  index: number;
}

const Feature: React.FC<FeatureProps> = ({ 
  title, 
  description, 
  image, 
  isActive, 
  onHover, 
  onLeave, 
  index 
}) => {
  return (
    <div 
      className={`relative flex flex-col items-center text-center p-6 md:p-8 transition-all duration-500 rounded-2xl cursor-pointer overflow-hidden group ${
        isActive ? 'h-auto min-h-[25rem]' : 'h-80'
      } ${isActive ? 'shadow-2xl' : 'shadow-lg hover:shadow-xl'}`}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={onLeave}
      style={{
        backgroundColor: isActive ? '#17936f' : '#ffffff',
        transform: isActive ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
        border: isActive ? 'none' : '2px solid #f1f5f9'
      }}
    >
      {/* Subtle overlay for depth */}
      <div 
        className={`absolute inset-0 opacity-0 transition-opacity duration-500 ${
          isActive ? 'opacity-10' : 'group-hover:opacity-5'
        }`}
        style={{
          backgroundColor: isActive ? '#ffffff' : '#17936f'
        }}
      />
      
      {/* Image container */}
      <div 
        className={`relative mb-6 p-4 rounded-full transition-all duration-500 ${
          isActive 
            ? 'bg-white bg-opacity-20 backdrop-blur-sm' 
            : 'group-hover:bg-opacity-90'
        }`}
        style={{
          backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : '#17936f',
          transform: isActive ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
          boxShadow: isActive 
            ? '0 10px 30px rgba(255,255,255,0.3)' 
            : '0 8px 25px rgba(23, 147, 111, 0.25)'
        }}
      >
        <img 
          src={image} 
          alt={title}
          className="w-9 h-9 transition-all duration-500 group-hover:scale-110"
        //   style={{
        //     filter: isActive ? 'brightness(0) invert(1)' : 'brightness(0) invert(1)'
        //   }}
        />
      </div>

      {/* Title */}
      <h3 
        className={`text-lg md:text-lg font-bold mb-4 transition-all duration-500 ${
          isActive ? 'text-white' : 'text-gray-800 group-hover:text-gray-900'
        }`}
        style={{
          transform: isActive ? 'translateY(-5px)' : 'translateY(0)',
        }}
      >
        {title}
      </h3>

      {/* Description */}
      <p 
        className={`text-sm leading-relaxed mb-6 transition-all duration-500 px-2 ${
          isActive ? 'text-white text-opacity-90' : 'text-gray-600 group-hover:text-gray-700'
        } ${isActive ? 'line-clamp-none' : 'line-clamp-3'}`}
        style={{
          transform: isActive ? 'translateY(-5px)' : 'translateY(0)',
        }}
      >
        {description}
      </p>

      {/* CTA Button - only visible when active */}
      {isActive && (
        <button
          className="w-full bg-white text-[#17936f] font-bold py-3 px-6 rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 mt-auto"
          style={{
            animation: 'fadeInUp 0.6s ease-out 0.3s both'
          }}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            console.log(`Book tour for: ${title}`);
          }}
        >
          Book Tour Now
        </button>
      )}

      {/* Decorative elements */}
      <div 
        className={`absolute top-4 right-4 w-2 h-2 rounded-full transition-all duration-500`}
        style={{
          backgroundColor: isActive ? 'rgba(255,255,255,0.6)' : 'rgba(23, 147, 111, 0.4)',
          transform: isActive ? 'scale(1.5)' : 'scale(1)',
        }}
      />
      <div 
        className={`absolute bottom-4 left-4 w-1 h-1 rounded-full transition-all duration-500`}
        style={{
          backgroundColor: isActive ? 'rgba(255,255,255,0.4)' : 'rgba(23, 147, 111, 0.3)',
          transform: isActive ? 'scale(2)' : 'scale(1)',
        }}
      />
    </div>
  );
};

const WhyBookWithUs: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  const features: FeatureData[] = [
    {
      title: "24/7 Customer Support",
      description: "No matter the time zone, we're here to help. Our dedicated support team is available around the clock to assist you with any questions, concerns, or travel emergencies that may arise during your journey.",
      image: "/icon4.svg",
    },
    {
      title: "Millions of Reviews",
      description: "Plan and book with confidence using reviews from fellow travelers. Our platform features authentic reviews from millions of travelers who have experienced our tours and services firsthand. Every review is verified and helps you make informed decisions.",
      image: "/icon2.svg",
    },
    {
      title: "Plan Your Way",
      description: "Stay flexible with free cancellation and the option to reserve now and pay later at no additional cost. We understand that travel plans can change, so we've made our booking process as flexible as possible.",
      image: "/icon3.svg",
    },
  ];

  const handleHover = (index: number): void => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
    setActiveIndex(index);
  };

  const handleLeave = (): void => {
    const timeout = setTimeout(() => {
      setActiveIndex(1); // Return to middle card
    }, 200);
    setHoverTimeout(timeout);
  };

  return (
    <div className="min-h-screen py-12 md:py-24 px-0">
      <div className="md:container mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 
            className="text-2xl md:text-3xl lg:text-3xl font-bold mb-4  text-gray-900"
            style={{
              animation: 'fadeInUp 0.8s ease-out'
            }}
          >
            Why Choose Martk Tours & Travel?
          </h2>
          <p 
            className="text-base md:text-lg lg:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed md:px-4"
            style={{
              animation: 'fadeInUp 0.8s ease-out 0.2s both'
            }}
          >
            Experience the difference with our premium travel services designed around your needs
          </p>
        </div>
        
        {/* Features Grid */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          style={{
            animation: 'fadeInUp 0.8s ease-out 0.4s both'
          }}
        >
          {features.map((feature, index) => (
            <Feature
              key={index}
              title={feature.title}
              description={feature.description}
              image={feature.image}
              isActive={activeIndex === index}
              onHover={handleHover}
              onLeave={handleLeave}
              index={index}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-none {
          display: block;
          -webkit-line-clamp: unset;
          -webkit-box-orient: unset;
          overflow: visible;
        }
      `}</style>
    </div>
  );
};

export default WhyBookWithUs;
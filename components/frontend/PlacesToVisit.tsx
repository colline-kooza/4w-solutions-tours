import React from 'react';

interface PlaceCard {
  id: number;
  title: string;
  image: string;
  className?: string;
}

const PlacesToVisit: React.FC = () => {
  const places: PlaceCard[] = [
    {
      id: 1,
      title: "12 Island getaways we love",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop&crop=center",
      className: "row-span-2"
    },
    {
      id: 2,
      title: "The perfect 3 days in Tokyo",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=200&fit=crop&crop=center"
    },
    {
      id: 3,
      title: "10 of the world's most epic views",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop&crop=center"
    },
    {
      id: 4,
      title: "12 cities we'd visit just for the museums",
      image: "https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=400&h=300&fit=crop&crop=center",
      className: "row-span-2"
    },
    {
      id: 5,
      title: "Where to travel to this summer",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=200&fit=crop&crop=center"
    },
    {
      id: 6,
      title: "3 perfect days in Oahu",
      image: "https://images.unsplash.com/photo-1598135753163-6167c1a1ad65?w=400&h=200&fit=crop&crop=center"
    },
    {
      id: 7,
      title: "A traveler's guide to running the 7 World Marathon Majors",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=200&fit=crop&crop=center",
      className: "col-span-2"
    },
    {
      id: 8,
      title: "A traveler's guide to running the 7 World Marathon Majors",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=200&fit=crop&crop=center",
      className: "col-span-2"
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 bg-white">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
          Places to Visit
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          The most exciting destinations, experiences, hidden gems, and traveler faves to check out now.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px]">
        {places.map((place) => (
          <div
            key={place.id}
            className={`
              relative overflow-hidden rounded-2xl  group transition-all duration-300 hover:scale-[1.02] hover:shadow-xl
              ${place.className || ''}
            `}
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
              style={{ backgroundImage: `url(${place.image})` }}
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            
            {/* Content */}
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <h3 className="text-white font-bold text-lg md:text-xl leading-tight hover:underline">
                {place.title}
              </h3>
            </div>

            {/* Hover Effect */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PlacesToVisit;
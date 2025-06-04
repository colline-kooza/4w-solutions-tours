import React from 'react';

interface Review {
  rating: number;
  timeAgo: string;
  title: string;
  description: string;
  author: string;
}

const TrustpilotReviews: React.FC = () => {
  const reviews: Review[] = [
    {
      rating: 5,
      timeAgo: "39 minutes ago",
      title: "Highly recommended!",
      description: "Very convenient for driver pick up from/to hotel and able to make travel buddies along the way. Tour...",
      author: "Christina S"
    },
    {
      rating: 5,
      timeAgo: "46 minutes ago", 
      title: "The operator was good at her job",
      description: "The operator was good at her job",
      author: "Joe LoCastro"
    },
    {
      rating: 5,
      timeAgo: "49 minutes ago",
      title: "I booked a adventure tour",
      description: "I booked a adventure tour, I need to cancel because of illness. It was quick with no hassle and full refund.",
      author: "Rosanna Ng"
    }
  ];

  const renderStars = (rating: number, color: string = "#00B67A") => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg 
            key={star}
            viewBox="0 0 24 24" 
            fill={star <= rating ? color : "#e5e5e5"} 
            className="w-4 h-4"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 mb-8">
        {/* Left side - Trustpilot branding */}
        <div className="flex flex-col items-start">
          <div className="text-3xl font-bold text-gray-900 mb-2">Excellent</div>
          <div className="flex mb-2">
            {renderStars(4, "#00B67A")}
          </div>
          <div className="text-sm text-gray-600 mb-3">Based on 261,797 reviews</div>
          <div className="flex items-center">
            <svg viewBox="0 0 24 24" fill="#FCD34D" className="w-5 h-5 mr-2">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="text-lg font-semibold text-gray-900">Trustpilot</span>
          </div>
        </div>
        {/* Reviews Grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white rounded-lg p-4 ">
              {/* Stars and time */}
              <div className="flex items-center justify-between mb-3">
                {renderStars(review.rating, "#00B67A")}
                <span className="text-sm text-gray-500">{review.timeAgo}</span>
              </div>
              
              {/* Title */}
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                {review.title}
              </h3>
              
              {/* Description */}
              <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                {review.description}
              </p>
              
              {/* Author */}
              <p className="text-sm text-gray-600 font-medium">
                {review.author}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Footer */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-sm text-gray-600 border-t border-gray-100 pt-4">
        <span>Showing our latest 4 and 5 star reviews</span>
        <span className="mt-2 sm:mt-0">Martk 4w assist does not perform checks on Trustpilot reviews.</span>
      </div>
    </div>
  );
};

export default TrustpilotReviews;
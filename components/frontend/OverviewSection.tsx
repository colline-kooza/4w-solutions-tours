import { TourData } from "@/actions/tour-detailed"

interface OverviewSectionProps {
  tour: TourData
}

export function OverviewSection({ tour }: OverviewSectionProps) {
  return (
    <div className="md:px-0 px-3">
      <div className="prose max-w-none">
        {tour.description ? (
          <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: tour.description }} />
        ) : (
          <p className="text-gray-700 leading-relaxed">{tour.shortDescription || "Tour description coming soon..."}</p>
        )}

        {tour.location && (
          <div className="mt-6">
            <h3 className="font-semibold text-gray-900 mb-3">Location:</h3>
            <p className="text-gray-700">{tour.location}</p>
          </div>
        )}

        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Tour Details:</h3>
            <ul className="space-y-2 text-gray-700">
              {tour.duration && (
                <li className="flex justify-between">
                  <span>Duration:</span>
                  <span className="font-medium">
                    {tour.duration} {tour.duration === 1 ? "day" : "days"}
                  </span>
                </li>
              )}
              {tour.maxGroupSize && (
                <li className="flex justify-between">
                  <span>Max Group Size:</span>
                  <span className="font-medium">{tour.maxGroupSize} people</span>
                </li>
              )}
              {tour.difficulty && (
                <li className="flex justify-between">
                  <span>Difficulty:</span>
                  <span className="font-medium capitalize">{tour.difficulty.toLowerCase()}</span>
                </li>
              )}
              <li className="flex justify-between">
                <span>Category:</span>
                <span className="font-medium">{tour.category.title}</span>
              </li>
              {tour.Destination && (
                <li className="flex justify-between">
                  <span>Destination:</span>
                  <span className="font-medium">{tour.Destination.name}</span>
                </li>
              )}
            </ul>
          </div>

          {tour.attractions.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Key Attractions:</h3>
              <ul className="space-y-1 text-gray-700">
                {tour.attractions.slice(0, 5).map((attraction) => (
                  <li key={attraction.id} className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>{attraction.attraction.name}</span>
                  </li>
                ))}
                {tour.attractions.length > 5 && (
                  <li className="text-sm text-gray-500 italic">
                    And {tour.attractions.length - 5} more attractions...
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

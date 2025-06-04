import { TourData } from "@/actions/tour-detailed"
import { MapPin, Clock } from "lucide-react"

interface ItinerarySectionProps {
  itinerary: TourData["itinerary"]
  attractions: TourData["attractions"]
}

export function ItinerarySection({ itinerary, attractions }: ItinerarySectionProps) {
  if (itinerary.length === 0) {
    return (
      <div className="md:px-0 px-3">
        <div className="text-center py-8">
          <p className="text-gray-500">Detailed itinerary coming soon...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="md:px-0 px-3">
      <div className="space-y-6">
        {itinerary.map((day, index) => (
          <div key={day.id} className="border rounded-lg p-6 bg-white shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm">
                {day.day}
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{day.title}</h3>
            </div>

            <div className="text-gray-700 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: day.description }} />

            {day.activities.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Activities:</h4>
                <ul className="space-y-1">
                  {day.activities.map((activity, actIndex) => (
                    <li key={actIndex} className="flex items-start gap-2 text-gray-700">
                      <span className="text-green-500 mt-1">•</span>
                      <span>{activity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}

        {attractions.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Attractions You'll Visit</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {attractions.map((tourAttraction) => (
                <div key={tourAttraction.id} className="border rounded-lg p-4 bg-white shadow-sm">
                  <div className="flex items-start gap-3">
                    {tourAttraction.attraction.images[0] && (
                      <img
                        src={tourAttraction.attraction.images[0] || "/placeholder.svg"}
                        alt={tourAttraction.attraction.name}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                      />
                    )}
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">{tourAttraction.attraction.name}</h4>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <MapPin className="w-4 h-4" />
                        <span>{tourAttraction.attraction.location}</span>
                        {tourAttraction.duration && (
                          <>
                            <span>•</span>
                            <Clock className="w-4 h-4" />
                            <span>{tourAttraction.duration} min</span>
                          </>
                        )}
                      </div>
                      {tourAttraction.attraction.description && (
                        <p className="text-sm text-gray-600 line-clamp-2">{tourAttraction.attraction.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

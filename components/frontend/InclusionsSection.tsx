import { Check, X } from "lucide-react"

interface InclusionsSectionProps {
  includes: string[]
  excludes: string[]
}

export function InclusionsSection({ includes, excludes }: InclusionsSectionProps) {
  return (
    <div className="md:px-0 px-3">
      <div className="grid md:grid-cols-2 gap-8">
        {/* What's Included */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Check className="w-5 h-5 text-green-500" />
            What's Included
          </h3>
          {includes.length > 0 ? (
            <ul className="space-y-2">
              {includes.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-700">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">Inclusions will be updated soon...</p>
          )}
        </div>

        {/* What's Not Included */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <X className="w-5 h-5 text-red-500" />
            What's Not Included
          </h3>
          {excludes.length > 0 ? (
            <ul className="space-y-2">
              {excludes.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-700">
                  <X className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">Exclusions will be updated soon...</p>
          )}
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">Important Information</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Please arrive 15 minutes before the scheduled departure time</li>
          <li>• Comfortable walking shoes are recommended</li>
          <li>• Weather-appropriate clothing is advised</li>
          <li>• Cancellation policy applies - check terms and conditions</li>
        </ul>
      </div>
    </div>
  )
}

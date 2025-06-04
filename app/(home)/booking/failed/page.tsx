import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import Link from "next/link"


export default async function BookingFailedPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; tourId?: string }>
}) {
  const resolvedSearchParams = await searchParams
  const errorMessage = resolvedSearchParams.error || "Something went wrong with your booking."
  const tourId = resolvedSearchParams.tourId

  return (
    <div className="container max-w-4xl py-8">
      <Card className="border-none shadow-none">
        <CardHeader className="bg-red-50 border-b border-red-100">
          <div className="flex items-center justify-center text-red-600 mb-4">
            <AlertCircle className="h-16 w-16" />
          </div>
          <CardTitle className="text-center text-2xl text-red-800">Booking Failed</CardTitle>
          <CardDescription className="text-center text-red-700 text-base">
            We couldn't process your booking at this time.
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="bg-red-50 p-4 rounded-lg border border-red-100 mb-6">
            <p className="text-red-800">{errorMessage}</p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">What you can do:</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm">
              <li>Check your internet connection and try again</li>
              <li>Verify your payment information if applicable</li>
              <li>Contact our support team if the problem persists</li>
            </ul>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row gap-4 pt-2 pb-6">
          {tourId ? (
            <Button asChild className="w-full sm:w-auto">
              <Link href={`/tours/${tourId}`}>Try Again</Link>
            </Button>
          ) : (
            <Button asChild className="w-full sm:w-auto">
              <Link href="/tours">Browse Tours</Link>
            </Button>
          )}
          <Button asChild variant="outline" className="w-full sm:w-auto">
            <Link href="/contact">Contact Support</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

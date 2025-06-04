import { getBookingById } from "@/actions/bookings"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Calendar, MapPin, Users, Clock } from "lucide-react"
import { getServerSession } from "next-auth/next"
import Image from "next/image"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { format } from "date-fns"
import { authOptions } from "@/config/auth"


export default async function BookingSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string; order?: string }>
}) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect("/login?callbackUrl=/dashboard/bookings")
  }
  

   const resolvedSearchParams = await searchParams
  const bookingId = resolvedSearchParams.id
  const orderNumber = resolvedSearchParams.order

  if (!bookingId) {
    notFound()
  }

  const booking = await getBookingById(bookingId, session.user.id)

  if (!booking) {
    notFound()
  }

  return (
    <div className="container max-w-4xl py-5">
      <Card className="border-none shadow-none">
        <CardHeader >
          <div className="flex items-center justify-center text-green-600 mb-4">
            <CheckCircle className="h-16 w-16" />
          </div>
          <CardTitle className="text-center text-2xl text-green-800">Booking Confirmed!</CardTitle>
          <CardDescription className="text-center text-green-700 text-base">
            Thank you for your booking. Your order #{orderNumber} has been confirmed.
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6 space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3 relative h-48 rounded-lg overflow-hidden">
              <Image
                src={booking.tour.images[0] || "/placeholder.svg?height=300&width=400"}
                alt={booking.tour.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="md:w-2/3 space-y-4">
              <h2 className="text-lg font-bold">{booking.tour.title}</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-gray-700">
                  <Calendar className="h-5 w-5 text-green-600" />
                  <span>{format(new Date(booking.tourDate), "EEEE, MMMM d, yyyy")}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-700">
                  <Clock className="h-5 w-5 text-green-600" />
                  <span>{booking.tourDate.toString().split("T")[1]?.substring(0, 5) || "As scheduled"}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-700">
                  <MapPin className="h-5 w-5 text-green-600" />
                  <span>{booking.tour.location || "Various Locations"}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-700">
                  <Users className="h-5 w-5 text-green-600" />
                  <span>
                    {booking.numberOfPeople} {booking.numberOfPeople === 1 ? "person" : "people"}
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <div className="text-sm text-gray-500">Total Amount</div>
                <div className="text-2xl font-bold text-green-700">UGX {booking.totalAmount.toLocaleString()}</div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
            <p className="text-amber-800">
              A confirmation email has been sent to your email address. Please check your inbox for details.
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row gap-4 pt-2 pb-6">
          <Button asChild className="w-full sm:w-auto bg-green-600 hover:bg-green-700">
            <Link href={`/dashboard/bookings/${booking.id}`}>View Order Details</Link>
          </Button>
          <Button asChild variant="outline" className="w-full sm:w-auto">
            <Link href="/tours">Explore More Tours</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

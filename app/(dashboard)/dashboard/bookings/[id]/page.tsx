import { getBookingById } from "@/actions/bookings";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  ArrowLeft,
  FileText,
} from "lucide-react";
import { getServerSession } from "next-auth/next";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { format } from "date-fns";
import { authOptions } from "@/config/auth";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { PaymentStatusBadge } from "@/components/dashboard/payment-status-badge";
import { CancelBookingButton } from "@/components/dashboard/cancel-booking-button";
import { BookingStatusUpdate } from "@/components/BookingStatusUpdate";

export default async function BookingDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!session?.user) {
    redirect(`/login?callbackUrl=/dashboard/bookings/${id}`);
  }

  const booking = await getBookingById(id, session.user.id);

  if (!booking) {
    notFound();
  }

  // Check if booking can be cancelled (24 hours before tour date)
  const tourDate = new Date(booking.tourDate);
  const now = new Date();
  const hoursUntilTour =
    (tourDate.getTime() - now.getTime()) / (1000 * 60 * 60);
  const canCancel = hoursUntilTour > 24 && booking.status !== "CANCELLED";

  return (
    <div className="mx-auto py-3">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="sm" asChild className="h-8 w-8 p-0">
          <Link href="/dashboard/bookings">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Booking Details</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">Tour Information</CardTitle>
                  <CardDescription>
                    Details about your booked tour
                  </CardDescription>
                </div>
                <StatusBadge status={booking.status} />
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-1/3 relative h-48 rounded-lg overflow-hidden">
                  <Image
                    src={
                      booking.tour.images[0] ||
                      "/placeholder.svg?height=300&width=400"
                    }
                    alt={booking.tour.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="md:w-2/3">
                  <h2 className="text-xl font-bold mb-2">
                    {booking.tour.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {booking.tour.description ||
                      "Experience an amazing tour with us!"}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Calendar className="h-4 w-4 text-green-600" />
                      <span>
                        {format(
                          new Date(booking.tourDate),
                          "EEEE, MMMM d, yyyy"
                        )}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-700">
                      <Clock className="h-4 w-4 text-green-600" />
                      <span>
                        {booking.tourDate
                          .toString()
                          .split("T")[1]
                          ?.substring(0, 5) || "As scheduled"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-700">
                      <MapPin className="h-4 w-4 text-green-600" />
                      <span>
                        {booking.tour.location || "Various Locations"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-700">
                      <Users className="h-4 w-4 text-green-600" />
                      <span>
                        {booking.numberOfPeople}{" "}
                        {booking.numberOfPeople === 1 ? "person" : "people"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {booking.specialRequests && (
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <div className="flex items-start gap-2">
                    <FileText className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-sm mb-1">
                        Special Requests
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {booking.specialRequests}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Tour Price (per person)</span>
                  <span>
                    UGX{" "}
                    {(
                      booking.totalAmount / booking.numberOfPeople
                    ).toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Number of People</span>
                  <span>× {booking.numberOfPeople}</span>
                </div>

                <div className="flex justify-between py-2 font-medium text-lg">
                  <span>Total Amount</span>
                  <span className="text-green-600">
                    UGX {booking.totalAmount.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Payment Status</span>
                  <PaymentStatusBadge status={booking.paymentStatus} />
                </div>

                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Update Booking Status</span>
                  <BookingStatusUpdate
                    bookingId={booking.id}
                    currentStatus={booking.status}
                    // onStatusChange={() => {}}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between py-1">
                <span className="text-gray-600">Booking ID</span>
                <span className="font-mono text-sm">
                  {booking.id.substring(0, 8)}
                </span>{" "}
                {/* Fixed the missing closing parenthesis */}
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-600">Tour Date</span>
                <span>
                  {format(new Date(booking.tourDate), "EEEE, MMMM d, yyyy")}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-600">Tour Time</span>
                <span>
                  {booking.tourDate.toString().split("T")[1]?.substring(0, 5) ||
                    "As scheduled"}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-600">Number of People</span>
                <span>{booking.numberOfPeople}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-600">Total Amount</span>
                <span>UGX {booking.totalAmount.toLocaleString()}</span>
              </div>
            </CardContent>
            <CardFooter>
              {canCancel && <CancelBookingButton bookingId={booking.id} />}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

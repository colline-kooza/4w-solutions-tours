import { getUserBookings } from "@/actions/bookings";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, MapPin, Users, Clock, ChevronRight } from "lucide-react";
import { getServerSession } from "next-auth/next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { authOptions } from "@/config/auth";

export default async function UserBookingsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login?callbackUrl=/dashboard/bookings");
  }

  const bookings = await getUserBookings(session.user.id);

  return (
    <div className="mx-auto py-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Bookings</h1>
          <p className="text-muted-foreground mt-1 text-base">
            View and manage your tour bookings
          </p>
        </div>
        <Button asChild>
          <Link href="/">Browse More Tours</Link>
        </Button>
      </div>

      {bookings.length === 0 ? (
        <Card className="border-dashed border-2">
          <CardHeader className="text-center">
            <CardTitle>No Bookings Found</CardTitle>
            <CardDescription>
              You haven't made any tour bookings yet.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center pb-6">
            <Button asChild>
              <Link href="/">Explore Tours</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {bookings.map((booking) => (
            <Card
              key={booking.id}
              className="overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row">
                {/* Image Section - Reduced height */}
                <div className="md:w-1/5 relative h-24 md:h-32">
                  <Image
                    src={booking.tour.images[0] || "/placeholder.png"}
                    alt={booking.tour.title}
                    fill
                    className="object-cover rounded-l-lg"
                  />
                </div>

                {/* Content Section */}
                <div className="flex-1 p-4">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3">
                    {/* Left side - Main info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-lg leading-tight truncate">
                            {booking.tour.title}
                          </h3>
                          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                            <MapPin className="h-3 w-3" />
                            {booking.tour.location}
                          </p>
                        </div>
                        <StatusBadge status={booking.status} />
                      </div>

                      {/* Compact details grid */}
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3 w-3 text-green-600" />
                          <span>
                            {format(new Date(booking.tourDate), "MMM d, yyyy")}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Users className="h-3 w-3 text-green-600" />
                          <span>
                            {booking.numberOfPeople}{" "}
                            {booking.numberOfPeople === 1 ? "person" : "people"}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3 w-3 text-green-600" />
                          <span>
                            {booking.tourDate
                              .toString()
                              .split("T")[1]
                              ?.substring(0, 5) || "As scheduled"}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Booked: {format(new Date(booking.createdAt), "MMM d")}
                        </div>
                      </div>
                    </div>

                    {/* Right side - Price and action */}
                    <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-3 pt-2 md:pt-0">
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">
                          Total
                        </div>
                        <div className="text-lg font-bold">
                          UGX {booking.totalAmount.toLocaleString()}
                        </div>
                      </div>
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="shrink-0"
                      >
                        <Link
                          href={`/dashboard/bookings/${booking.id}`}
                          className="flex items-center gap-1"
                        >
                          Details
                          <ChevronRight className="h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case "CONFIRMED":
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
          Confirmed
        </Badge>
      );
    case "PENDING":
      return (
        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">
          Pending
        </Badge>
      );
    case "CANCELLED":
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
          Cancelled
        </Badge>
      );
    case "COMPLETED":
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
          Completed
        </Badge>
      );
    default:
      return (
        <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">
          {status}
        </Badge>
      );
  }
}

"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/prisma/db";
import { getServerSession } from "next-auth/next";
import { Resend } from "resend";
import { authOptions } from "@/config/auth";
import { OrderConfirmationEmail } from "@/components/emails/order-confirmation-email";
import { AdminNotificationEmail } from "@/components/emails/admin-notification-email";

const resend = new Resend(process.env.RESEND_API_KEY);

// Generate a unique order number
function generateOrderNumber() {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return `RW-${timestamp}-${random}`;
}

export interface BookingFormData {
  tourId: string;
  tourDate: Date;
  numberOfPeople: number;
  totalAmount: number;
  specialRequests?: string;
  contactPhone: string;
  contactEmail: string;
  time?: string;
}

export async function createBooking(data: BookingFormData) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return {
        success: false,
        error: "You must be logged in to book a tour",
        redirectToLogin: true,
      };
    }

    const user = session.user;

    // Get tour details to calculate final price
    const tour = await db.tour.findUnique({
      where: { id: data.tourId },
      select: {
        id: true,
        title: true,
        price: true,
        discountPrice: true,
        images: true,
        duration: true,
        location: true,
      },
    });

    if (!tour) {
      return { success: false, error: "Tour not found" };
    }

    // Calculate total amount (could be based on number of people, discounts, etc.)
    const pricePerPerson = tour.discountPrice || tour.price || 0;
    const totalAmount = pricePerPerson * data.numberOfPeople;

    // Generate unique order number
    const orderNumber = generateOrderNumber();

    // Create booking in database
    const booking = await db.booking.create({
      data: {
        userId: user.id,
        tourId: data.tourId,
        tourDate: data.tourDate,
        numberOfPeople: data.numberOfPeople,
        totalAmount,
        specialRequests: data.specialRequests,
        contactPhone: data.contactPhone,
        contactEmail: data.contactEmail,
        status: "PENDING",
        paymentStatus: "PENDING",
      },
      include: {
        tour: {
          select: {
            title: true,
            images: true,
            location: true,
            duration: true,
          },
        },
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    // Prepare data for email
    const orderData = {
      id: booking.id,
      orderNumber,
      customerName: user.name || "Valued Customer",
      customerEmail: user.email || data.contactEmail,
      tourName: tour.title,
      tourImage: tour.images[0] || "/placeholder.svg?height=300&width=400",
      tourLocation: tour.location || "Various Locations",
      tourDate: data.tourDate,
      tourTime: data.time || "As scheduled",
      numberOfPeople: data.numberOfPeople,
      duration: tour.duration || 1,
      totalAmount,
      bookingDate: new Date(),
      specialRequests: data.specialRequests,
    };

    await resend.emails.send({
      from: "Orders <orders@rwoma.com>",
      to: [data.contactEmail],
      subject: `Order Confirmation #${orderNumber}`,
      react: await OrderConfirmationEmail({ order: orderData }),
    });

    await resend.emails.send({
      from: "Bookings <orders@rwoma.com>",
      to: ["koozacollinz1@gmail.com"],
      subject: `New Booking #${orderNumber}`,
      react: await AdminNotificationEmail({ order: orderData }),
    });

    // Revalidate relevant paths
    revalidatePath("/dashboard/bookings");
    revalidatePath(`/tours/${data.tourId}`);

    return {
      success: true,
      bookingId: booking.id,
      orderNumber,
    };
  } catch (error) {
    console.error("Booking creation error:", error);
    return {
      success: false,
      error: "Failed to create booking. Please try again.",
    };
  }
}

export async function getUserBookings(userId?: string) {
  try {
    if (!userId) {
      return [];
    }

    const bookings = await db.booking.findMany({
      where: { userId },
      include: {
        tour: {
          select: {
            id: true,
            title: true,
            images: true,
            location: true,
            duration: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return bookings;
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    return [];
  }
}

export async function getBookingById(id: string, userId?: string) {
  try {
    if (!userId) {
      return null;
    }

    const booking = await db.booking.findUnique({
      where: {
        id,
        userId, // Ensure user can only see their own bookings
      },
      include: {
        tour: {
          select: {
            id: true,
            title: true,
            images: true,
            location: true,
            duration: true,
            description: true,
          },
        },
        user: {
          select: {
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    return booking;
  } catch (error) {
    console.error("Error fetching booking details:", error);
    return null;
  }
}

export async function cancelBooking(id: string) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return {
        success: false,
        error: "You must be logged in to cancel a booking",
      };
    }

    // Check if booking exists and belongs to user
    const booking = await db.booking.findUnique({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!booking) {
      return { success: false, error: "Booking not found" };
    }

    // Check if booking can be cancelled (e.g., not too close to tour date)
    const tourDate = new Date(booking.tourDate);
    const now = new Date();
    const hoursUntilTour =
      (tourDate.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (hoursUntilTour < 24) {
      return {
        success: false,
        error:
          "Bookings can only be cancelled at least 24 hours before the tour",
      };
    }

    // Update booking status
    await db.booking.update({
      where: { id },
      data: {
        status: "CANCELLED",
        // If payment was made, you might set paymentStatus to REFUNDED
      },
    });

    // Revalidate paths
    revalidatePath("/dashboard/bookings");
    revalidatePath(`/dashboard/bookings/${id}`);

    return { success: true };
  } catch (error) {
    console.error("Error cancelling booking:", error);
    return { success: false, error: "Failed to cancel booking" };
  }
}

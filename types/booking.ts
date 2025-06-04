import type { BookingStatus, PaymentStatus } from "@prisma/client";

export interface BookingData {
  id: string;
  user: {
    id: string;
    name: string;
    email: string;
    phone?: string;
  };
  tour: {
    id: string;
    title: string;
    images: string[];
    location?: string;
    duration?: number;
  };
  bookingDate: Date;
  tourDate: Date;
  numberOfPeople: number;
  totalAmount: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  paymentId?: string;
  specialRequests?: string;
  contactPhone: string;
  contactEmail: string;
  createdAt: Date;
  updatedAt: Date;
}

export { BookingStatus, PaymentStatus } from "@prisma/client";

export interface BookingFilters {
  status?: BookingStatus | "all";
  paymentStatus?: PaymentStatus | "all";
  dateRange?: "today" | "weekly" | "monthly" | "last-month" | "yearly" | "all";
  search?: string;
  page?: number;
  limit?: number;
}

export interface BookingResponse {
  bookings: BookingData[];
  total: number;
  totalPages: number;
  currentPage: number;
}

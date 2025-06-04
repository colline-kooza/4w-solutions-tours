"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useAdminBookings } from "@/hooks/use-admin-bookings"

import { Eye, Calendar, Users, DollarSign } from "lucide-react"
import { format } from "date-fns"
import Image from "next/image"
import { BookingTableSkeleton } from "@/components/booking-skeleton"
import { BookingStatsCards } from "@/components/booking-stats-cards"
import { BookingFilters } from "@/components/booking-filters"
import { BookingStatusUpdate } from "@/components/BookingStatusUpdate"
import { PaymentStatusUpdate } from "@/components/PaymentStatusUpdate"
import { useRequireAdmin } from "@/utils/adminRoleCheck"


export default function AdminBookingsPage() {
  const router = useRouter()
    const { isAdmin } = useRequireAdmin();
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    paymentStatus: "all",
    dateRange: "all",
    page: 1,
    limit: 10,
  })

  const { bookings, total, totalPages, currentPage, isLoading, isError } = useAdminBookings(filters as any)

  const handleFiltersChange = (newFilters: any) => {
    setFilters({ ...newFilters, page: 1 })
  }

  const handleClearFilters = () => {
    setFilters({
      search: "",
      status: "all",
      paymentStatus: "all",
      dateRange: "all",
      page: 1,
      limit: 10,
    })
  }

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, page })
  }

  if (isLoading) {
    return <BookingTableSkeleton />
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-lg font-semibold text-destructive">Error loading bookings</p>
          <p className="text-muted-foreground">Please try refreshing the page</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bookings Management</h1>
          <p className="text-muted-foreground">Manage and track all tour bookings</p>
        </div>
      </div>

      {/* Stats Cards */}
      <BookingStatsCards />

      {/* Filters */}
      <BookingFilters filters={filters} onFiltersChange={handleFiltersChange} onClearFilters={handleClearFilters} />

      {/* Bookings Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Bookings</CardTitle>
            <p className="text-sm text-muted-foreground">
              {total} total booking{total !== 1 ? "s" : ""}
            </p>
          </div>
        </CardHeader>
        <CardContent>
          {bookings.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No bookings found</h3>
              <p className="text-muted-foreground">
                {filters.search ||
                filters.status !== "all" ||
                filters.paymentStatus !== "all" ||
                filters.dateRange !== "all"
                  ? "Try adjusting your filters"
                  : "No bookings have been made yet"}
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Tour</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Guests</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={`https://avatar.vercel.sh/${booking.user.email}`} />
                              <AvatarFallback>{booking.user.name?.charAt(0) || "U"}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{booking.user.name}</p>
                              <p className="text-sm text-muted-foreground">{booking.user.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="relative h-10 w-16 rounded overflow-hidden">
                              <Image
                                src={booking.tour.images[0] || "/placeholder.svg?height=40&width=64"}
                                alt={booking.tour.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium line-clamp-1">{booking.tour.title}</p>
                              <p className="text-sm text-muted-foreground">{booking.tour.location}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{format(new Date(booking.tourDate), "MMM dd, yyyy")}</p>
                            <p className="text-sm text-muted-foreground">
                              Booked {format(new Date(booking.createdAt), "MMM dd")}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                            {booking.numberOfPeople}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
                            {booking.totalAmount.toLocaleString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <BookingStatusUpdate
                            bookingId={booking.id}
                            currentStatus={booking.status}
                            onStatusChange={() => {
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <PaymentStatusUpdate
                            bookingId={booking.id}
                            currentStatus={booking.paymentStatus}
                            onStatusChange={() => {
                              // Optionally refetch data or handle optimistic updates
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => router.push(`/dashboard/bookings/${booking.id}`)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-4">
                {bookings.map((booking) => (
                  <Card
                    key={booking.id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => router.push(`/dashboard/bookings/${booking.id}`)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={`https://avatar.vercel.sh/${booking.user.email}`} />
                            <AvatarFallback>{booking.user.name?.charAt(0) || "U"}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{booking.user.name}</p>
                            <p className="text-sm text-muted-foreground">{booking.user.email}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <BookingStatusUpdate bookingId={booking.id} currentStatus={booking.status} />
                          <PaymentStatusUpdate bookingId={booking.id} currentStatus={booking.paymentStatus} />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <div className="relative h-8 w-12 rounded overflow-hidden">
                            <Image
                              src={booking.tour.images[0] || "/placeholder.svg?height=32&width=48"}
                              alt={booking.tour.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <p className="font-medium text-sm line-clamp-1">{booking.tour.title}</p>
                        </div>

                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>{format(new Date(booking.tourDate), "MMM dd, yyyy")}</span>
                          <span>{booking.numberOfPeople} guests</span>
                          <span>${booking.totalAmount.toLocaleString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-6">
                  <p className="text-sm text-muted-foreground">
                    Showing {(currentPage - 1) * filters.limit + 1} to {Math.min(currentPage * filters.limit, total)} of{" "}
                    {total} results
                  </p>

                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>

                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const page = i + 1
                        return (
                          <PaginationItem key={page}>
                            <PaginationLink
                              onClick={() => handlePageChange(page)}
                              isActive={currentPage === page}
                              className="cursor-pointer"
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        )
                      })}

                      {totalPages > 5 && (
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                      )}

                      <PaginationItem>
                        <PaginationNext
                          onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                          className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

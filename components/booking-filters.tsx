"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, X } from "lucide-react"
import { BookingStatus, PaymentStatus } from "@/types/booking"

interface BookingFiltersProps {
  filters: {
    search: string
    status: string
    paymentStatus: string
    dateRange: string
  }
  onFiltersChange: (filters: any) => void
  onClearFilters: () => void
}

export function BookingFilters({ filters, onFiltersChange, onClearFilters }: BookingFiltersProps) {
  const hasActiveFilters = Object.values(filters).some((value) => value !== "")

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by customer name, email, tour, or phone..."
            value={filters.search}
            onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
            className="pl-10"
          />
        </div>

        {/* Status Filter */}
        <Select value={filters.status} onValueChange={(value) => onFiltersChange({ ...filters, status: value })}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Booking Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value={BookingStatus.PENDING}>Pending</SelectItem>
            <SelectItem value={BookingStatus.CONFIRMED}>Confirmed</SelectItem>
            <SelectItem value={BookingStatus.COMPLETED}>Completed</SelectItem>
            <SelectItem value={BookingStatus.CANCELLED}>Cancelled</SelectItem>
          </SelectContent>
        </Select>

        {/* Payment Status Filter */}
        <Select
          value={filters.paymentStatus}
          onValueChange={(value) => onFiltersChange({ ...filters, paymentStatus: value })}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Payment Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Payments</SelectItem>
            <SelectItem value={PaymentStatus.PENDING}>Pending</SelectItem>
            <SelectItem value={PaymentStatus.PAID}>Paid</SelectItem>
            <SelectItem value={PaymentStatus.FAILED}>Failed</SelectItem>
            <SelectItem value={PaymentStatus.REFUNDED}>Refunded</SelectItem>
          </SelectContent>
        </Select>

        {/* Date Range Filter */}
        <Select value={filters.dateRange} onValueChange={(value) => onFiltersChange({ ...filters, dateRange: value })}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Date Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="weekly">This Week</SelectItem>
            <SelectItem value="monthly">This Month</SelectItem>
            <SelectItem value="last-month">Last Month</SelectItem>
            <SelectItem value="yearly">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onClearFilters} className="h-8 px-2 lg:px-3">
            <X className="h-4 w-4 mr-1" />
            Clear Filters
          </Button>
          <span className="text-sm text-muted-foreground">
            {Object.values(filters).filter(Boolean).length} filter(s) applied
          </span>
        </div>
      )}
    </div>
  )
}

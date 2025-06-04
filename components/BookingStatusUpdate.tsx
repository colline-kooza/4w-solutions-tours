"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useUpdateBookingStatus, useUpdatePaymentStatus } from "@/hooks/use-admin-bookings"
import { BookingStatus, PaymentStatus } from "@prisma/client"
import { Loader2 } from 'lucide-react'

interface BookingStatusUpdateProps {
  bookingId: string
  currentStatus: BookingStatus
  onStatusChange?: () => void
}

interface PaymentStatusUpdateProps {
  bookingId: string
  currentStatus: PaymentStatus
  onStatusChange?: () => void
}

export function BookingStatusUpdate({ bookingId, currentStatus, onStatusChange }: BookingStatusUpdateProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<BookingStatus>(currentStatus)
  const updateBookingStatus = useUpdateBookingStatus()

  const handleStatusChange = (newStatus: BookingStatus) => {
    if (newStatus === currentStatus) return
    setSelectedStatus(newStatus)
    setIsDialogOpen(true)
  }

  const confirmStatusUpdate = async () => {
    try {
      await updateBookingStatus.mutateAsync({ id: bookingId, status: selectedStatus })
      setIsDialogOpen(false)
      onStatusChange?.()
    } catch (error) {
      // Error handled by mutation
    }
  }

  const getStatusLabel = (status: BookingStatus) => {
    switch (status) {
      case BookingStatus.PENDING:
        return "Pending"
      case BookingStatus.CONFIRMED:
        return "Confirmed"
      case BookingStatus.COMPLETED:
        return "Completed"
      case BookingStatus.CANCELLED:
        return "Cancelled"
      default:
        return status
    }
  }

  return (
    <>
      <Select value={currentStatus} onValueChange={handleStatusChange} disabled={updateBookingStatus.isPending}>
        <SelectTrigger className="w-[130px] h-8">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={BookingStatus.PENDING}>Pending</SelectItem>
          <SelectItem value={BookingStatus.CONFIRMED}>Confirmed</SelectItem>
          <SelectItem value={BookingStatus.COMPLETED}>Completed</SelectItem>
          <SelectItem value={BookingStatus.CANCELLED}>Cancelled</SelectItem>
        </SelectContent>
      </Select>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Booking Status</DialogTitle>
            <DialogDescription>
              Are you sure you want to change the booking status from "{getStatusLabel(currentStatus)}" to "
              {getStatusLabel(selectedStatus)}"?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={updateBookingStatus.isPending}>
              Cancel
            </Button>
            <Button onClick={confirmStatusUpdate} disabled={updateBookingStatus.isPending}>
              {updateBookingStatus.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Update Status
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export function PaymentStatusUpdate({ bookingId, currentStatus, onStatusChange }: PaymentStatusUpdateProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<PaymentStatus>(currentStatus)
  const updatePaymentStatus = useUpdatePaymentStatus()

  const handleStatusChange = (newStatus: PaymentStatus) => {
    if (newStatus === currentStatus) return
    setSelectedStatus(newStatus)
    setIsDialogOpen(true)
  }

  const confirmStatusUpdate = async () => {
    try {
      await updatePaymentStatus.mutateAsync({ id: bookingId, paymentStatus: selectedStatus })
      setIsDialogOpen(false)
      onStatusChange?.()
    } catch (error) {
      // Error handled by mutation
    }
  }

  const getStatusLabel = (status: PaymentStatus) => {
    switch (status) {
      case PaymentStatus.PENDING:
        return "Pending"
      case PaymentStatus.PAID:
        return "Paid"
      case PaymentStatus.FAILED:
        return "Failed"
      case PaymentStatus.REFUNDED:
        return "Refunded"
      default:
        return status
    }
  }

  return (
    <>
      <Select value={currentStatus} onValueChange={handleStatusChange} disabled={updatePaymentStatus.isPending}>
        <SelectTrigger className="w-[120px] h-8">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={PaymentStatus.PENDING}>Pending</SelectItem>
          <SelectItem value={PaymentStatus.PAID}>Paid</SelectItem>
          <SelectItem value={PaymentStatus.FAILED}>Failed</SelectItem>
          <SelectItem value={PaymentStatus.REFUNDED}>Refunded</SelectItem>
        </SelectContent>
      </Select>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Payment Status</DialogTitle>
            <DialogDescription>
              Are you sure you want to change the payment status from "{getStatusLabel(currentStatus)}" to "
              {getStatusLabel(selectedStatus)}"?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={updatePaymentStatus.isPending}>
              Cancel
            </Button>
            <Button onClick={confirmStatusUpdate} disabled={updatePaymentStatus.isPending}>
              {updatePaymentStatus.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Update Status
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
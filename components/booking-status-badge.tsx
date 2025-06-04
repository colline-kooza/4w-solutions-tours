import { Badge } from "@/components/ui/badge"
import { BookingStatus, PaymentStatus } from "@/types/booking"

interface BookingStatusBadgeProps {
  status: BookingStatus
}

interface PaymentStatusBadgeProps {
  status: PaymentStatus
}

export function BookingStatusBadge({ status }: BookingStatusBadgeProps) {
  const variants = {
    [BookingStatus.PENDING]: { variant: "secondary" as const, label: "Pending" },
    [BookingStatus.CONFIRMED]: { variant: "default" as const, label: "Confirmed" },
    [BookingStatus.COMPLETED]: { variant: "default" as const, label: "Completed" },
    [BookingStatus.CANCELLED]: { variant: "destructive" as const, label: "Cancelled" },
  }

  const config = variants[status]

  return (
    <Badge
      variant={config.variant}
      className={
        status === BookingStatus.COMPLETED
          ? "bg-green-100 text-green-800 hover:bg-green-100"
          : status === BookingStatus.CONFIRMED
            ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
            : ""
      }
    >
      {config.label}
    </Badge>
  )
}

export function PaymentStatusBadge({ status }: PaymentStatusBadgeProps) {
  const variants = {
    [PaymentStatus.PENDING]: { variant: "secondary" as const, label: "Pending" },
    [PaymentStatus.PAID]: { variant: "default" as const, label: "Paid" },
    [PaymentStatus.FAILED]: { variant: "destructive" as const, label: "Failed" },
    [PaymentStatus.REFUNDED]: { variant: "outline" as const, label: "Refunded" },
  }

  const config = variants[status]

  return (
    <Badge
      variant={config.variant}
      className={status === PaymentStatus.PAID ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
    >
      {config.label}
    </Badge>
  )
}

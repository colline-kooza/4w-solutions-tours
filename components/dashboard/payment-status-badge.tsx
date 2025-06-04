import { Badge } from "@/components/ui/badge"

interface PaymentStatusBadgeProps {
  status: string
}

export function PaymentStatusBadge({ status }: PaymentStatusBadgeProps) {
  switch (status) {
    case "PAID":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Paid</Badge>
    case "PENDING":
      return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Pending</Badge>
    case "FAILED":
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Failed</Badge>
    case "REFUNDED":
      return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Refunded</Badge>
    default:
      return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">{status}</Badge>
  }
}

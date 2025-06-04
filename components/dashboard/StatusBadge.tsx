import { Badge } from "@/components/ui/badge"

interface StatusBadgeProps {
  status: string
}

export function StatusBadge({ status }: StatusBadgeProps) {
  switch (status) {
    case "CONFIRMED":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Confirmed</Badge>
    case "PENDING":
      return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Pending</Badge>
    case "CANCELLED":
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Cancelled</Badge>
    case "COMPLETED":
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Completed</Badge>
    default:
      return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">{status}</Badge>
  }
}

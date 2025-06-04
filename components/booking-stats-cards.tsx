"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useBookingStats } from "@/hooks/use-admin-bookings"
import { Calendar, Clock, CheckCircle, DollarSign } from "lucide-react"

export function BookingStatsCards() {
  const { stats, isLoading, isError } = useBookingStats()

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 w-[100px] bg-muted animate-pulse rounded" />
              <div className="h-4 w-4 bg-muted animate-pulse rounded" />
            </CardHeader>
            <CardContent>
              <div className="h-8 w-[60px] bg-muted animate-pulse rounded mb-2" />
              <div className="h-3 w-[120px] bg-muted animate-pulse rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (isError || !stats) {
    return null
  }

  const cards = [
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      description: "All time bookings",
      icon: Calendar,
      color: "text-blue-600",
    },
    {
      title: "Pending",
      value: stats.pendingBookings,
      description: "Awaiting confirmation",
      icon: Clock,
      color: "text-yellow-600",
    },
    {
      title: "Confirmed",
      value: stats.confirmedBookings,
      description: "Ready to go",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      description: "Paid bookings",
      icon: DollarSign,
      color: "text-emerald-600",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => {
        const Icon = card.icon
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <Icon className={`h-4 w-4 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">{card.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

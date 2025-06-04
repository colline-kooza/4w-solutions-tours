"use client"

import { useState } from "react"
import { useUserDashboard } from "@/hooks/use-dashboard"
import { DashboardSkeleton } from "./dashboard-skeleton"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Pie, PieChart, Cell, ResponsiveContainer } from "recharts"
import { Calendar, MapPin, CreditCard, Star, Clock, CheckCircle, ArrowRight } from "lucide-react"
import { formatCurrency } from "@/utils/currency"

export function UserDashboard() {
  const [period, setPeriod] = useState("weekly")
  const { data, isLoading, error } = useUserDashboard(period)

  if (isLoading) return <DashboardSkeleton />
  if (error) return <div>Error loading dashboard</div>
  if (!data) return null

  const { overview, bookingsByStatus, recentBookings } = data

  // Card data configuration
  const cardData = [
    {
      title: "Total Bookings",
      value: overview.totalBookings,
      icon: Calendar,
      trend: "up"
    },
    {
      title: "Completed Tours",
      value: overview.completedTours,
      icon: CheckCircle,
      trend: "up"
    },
    {
      title: "Total Spent",
      value: formatCurrency(overview.totalSpent),
      icon: CreditCard,
      trend: "up"
    },
    {
      title: "Reviews Given",
      value: overview.totalReviews,
      icon: Star,
      trend: "up"
    }
  ]

  // Prepare chart data
  const statusChartData = [
    { name: "Pending", value: bookingsByStatus.pending, fill: "#fbbf24" },
    { name: "Confirmed", value: bookingsByStatus.confirmed, fill: "#3b82f6" },
    { name: "Completed", value: bookingsByStatus.completed, fill: "#10b981" },
    { name: "Cancelled", value: bookingsByStatus.cancelled, fill: "#ef4444" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Dashboard</h1>
          <p className="text-muted-foreground text-sm">Track your tours and travel experiences</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="weekly">Last 7 days</SelectItem>
              <SelectItem value="monthly">Last 30 days</SelectItem>
              <SelectItem value="yearly">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cardData.map((card, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <card.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <div
                className={`flex items-center text-sm ${card.trend === "up" ? "text-green-600" : "text-red-600"}`}
              >
                View details
                <ArrowRight className="ml-1 h-4 w-4" />
              </div>
            </CardContent>
            <div className="absolute right-0 bottom-0 opacity-5">
              <card.icon className="h-24 w-24 text-primary" />
            </div>
          </Card>
        ))}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Booking Status Chart */}
        <Card>
          <CardHeader>
            <CardTitle>My Booking Status</CardTitle>
            <CardDescription>Distribution of your bookings</CardDescription>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="h-[300px] w-full">
              <ChartContainer
                config={{
                  pending: { label: "Pending", color: "#fbbf24" },
                  confirmed: { label: "Confirmed", color: "#3b82f6" },
                  completed: { label: "Completed", color: "#10b981" },
                  cancelled: { label: "Cancelled", color: "#ef4444" },
                }}
                className="h-full w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {statusChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Bookings */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>Your latest tour bookings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={booking.tour.images[0] || "/placeholder.png"} />
                    <AvatarFallback>
                      <MapPin className="h-6 w-6" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="font-medium">{booking.tour.title}</div>
                    <div className="text-sm text-muted-foreground flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {booking.tour.location}
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {new Date(booking.tourDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <Badge
                      variant={
                        booking.status === "COMPLETED"
                          ? "default"
                          : booking.status === "CONFIRMED"
                            ? "secondary"
                            : booking.status === "PENDING"
                              ? "outline"
                              : "destructive"
                      }
                    >
                      {booking.status}
                    </Badge>
                    <div className="text-sm font-medium">{formatCurrency(booking.totalAmount)}</div>
                  </div>
                </div>
              ))}
              {recentBookings.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No bookings found. Start exploring our tours!
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common actions you might want to take</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg text-center hover:bg-muted/50 cursor-pointer transition-colors">
              <MapPin className="h-8 w-8 mx-auto mb-2 text-blue-500" />
              <div className="font-medium">Browse Tours</div>
              <div className="text-sm text-muted-foreground">Discover new destinations</div>
            </div>
            <div className="p-4 border rounded-lg text-center hover:bg-muted/50 cursor-pointer transition-colors">
              <Calendar className="h-8 w-8 mx-auto mb-2 text-green-500" />
              <div className="font-medium">My Bookings</div>
              <div className="text-sm text-muted-foreground">View all bookings</div>
            </div>
            <div className="p-4 border rounded-lg text-center hover:bg-muted/50 cursor-pointer transition-colors">
              <Star className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
              <div className="font-medium">Write Review</div>
              <div className="text-sm text-muted-foreground">Share your experience</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
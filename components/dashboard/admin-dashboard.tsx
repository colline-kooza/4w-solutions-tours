"use client"

import { useState } from "react"
import { useAdminDashboard } from "@/hooks/use-dashboard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"
import { Calendar, Users, MapPin, CreditCard, Download, ArrowRight } from "lucide-react"
import { DashboardSkeleton } from "./dashboard-skeleton"
import { formatCurrency } from "@/utils/currency"

const ADMIN_THEME_COLOR = "#34e0a1"

export function AdminDashboard() {
  const [period, setPeriod] = useState("weekly")
  const { data, isLoading, error } = useAdminDashboard(period)

  if (isLoading) return <DashboardSkeleton />
  if (error) return <div>Error loading dashboard</div>
  if (!data) return null

  const { overview, bookingsByStatus, revenueByMonth, topTours, recentBookings } = data

  // Card data configuration
  const cardData = [
    {
      title: "Total Revenue",
      value: formatCurrency(overview.totalRevenue),
      icon: CreditCard,
      trend: overview.revenueChange >= 0 ? "up" : "down"
    },
    {
      title: "Total Bookings", 
      value: overview.totalBookings.toLocaleString(),
      icon: Calendar,
      trend: overview.bookingChange >= 0 ? "up" : "down"
    },
    {
      title: "Active Tours",
      value: overview.totalTours,
      icon: MapPin,
      trend: "up"
    },
    {
      title: "Total Users",
      value: overview.totalUsers.toLocaleString(),
      icon: Users,
      trend: overview.userChange >= 0 ? "up" : "down"
    }
  ]

  // Prepare chart data
  const statusChartData = [
    { name: "Pending", value: bookingsByStatus.pending, fill: "#fbbf24" },
    { name: "Confirmed", value: bookingsByStatus.confirmed, fill: ADMIN_THEME_COLOR },
    { name: "Completed", value: bookingsByStatus.completed, fill: "#10b981" },
    { name: "Cancelled", value: bookingsByStatus.cancelled, fill: "#ef4444" },
  ]

  const revenueChartData = revenueByMonth.map((item, index) => ({
    month: new Date(item.createdAt).toLocaleDateString("en-US", { month: "short" }),
    revenue: item._sum.totalAmount || 0,
    bookings: item._count,
  }))

  const tourPerformanceData = topTours.map((tour) => ({
    name: tour.title.substring(0, 20) + "...",
    bookings: tour._count.bookings,
    revenue: tour.bookings.reduce((sum, booking) => sum + booking.totalAmount, 0),
  }))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground text-sm">Comprehensive overview of your tours business</p>
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
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
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

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Booking Status Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Booking Status Distribution</CardTitle>
            <CardDescription>Current booking status breakdown</CardDescription>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="h-[300px] w-full">
              <ChartContainer
                config={{
                  pending: { label: "Pending", color: "#fbbf24" },
                  confirmed: { label: "Confirmed", color: ADMIN_THEME_COLOR },
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

        {/* Revenue Trend Line Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Monthly revenue over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="h-[300px] w-full">
              <ChartContainer
                config={{
                  revenue: { label: "Revenue", color: ADMIN_THEME_COLOR },
                }}
                className="h-full w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke={ADMIN_THEME_COLOR}
                      strokeWidth={3}
                      dot={{ fill: ADMIN_THEME_COLOR, strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tour Performance Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Tours</CardTitle>
          <CardDescription>Tours with the most bookings</CardDescription>
        </CardHeader>
        <CardContent className="pb-4">
          <div className="h-[300px] w-full">
            <ChartContainer
              config={{
                bookings: { label: "Bookings", color: ADMIN_THEME_COLOR },
              }}
              className="h-full w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tourPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="bookings" fill={ADMIN_THEME_COLOR} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent Bookings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
          <CardDescription>Latest customer bookings</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Tour</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={booking.user.image || ""} />
                        <AvatarFallback>{booking.user.name?.charAt(0) || "U"}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{booking.user.name}</div>
                        <div className="text-sm text-muted-foreground">{booking.user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{booking.tour.title}</div>
                  </TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell>{formatCurrency(booking.totalAmount)}</TableCell>
                  <TableCell>{new Date(booking.createdAt).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
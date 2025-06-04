"use client"

import type React from "react"

import { useState } from "react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon, Check, Clock, Users, Phone, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { createBooking } from "@/actions/bookings"
import { useSession } from "next-auth/react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { TourCarouselProps } from "./TourCarousel"
import { toast } from "sonner"


export function BookingCard({ tour }: TourCarouselProps) {
  const { data: session } = useSession()
  const router = useRouter()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [singleDate, setSingleDate] = useState<Date | undefined>(new Date())
  const [people, setPeople] = useState("2")
  const [time, setTime] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState(session?.user?.email || "")
  const [specialRequests, setSpecialRequests] = useState("")

  const price = tour.discountPrice || tour.price || 0
  const totalPrice = price * Number.parseInt(people || "1")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!session) {
      toast.error( "Please log in to book a tour")
      router.push(`/login?callbackUrl=/tours/${tour.id}`)
      return
    }

    if (!singleDate) {
      toast.error( "Please select a date for your tour")
      return
    }

    if (!time) {
      toast.error("Please select a time for your tour")
      return
    }

    if (!phone) {
      toast.error("Please provide a contact phone number")
      return
    }

    setIsSubmitting(true)

    try {
      const result = await createBooking({
        tourId: tour.id,
        tourDate: singleDate,
        numberOfPeople: Number.parseInt(people),
        totalAmount: totalPrice,
        specialRequests,
        contactPhone: phone,
        contactEmail: email || session.user.email || "",
        time,
      })

      if (result.success) {
        router.push(`/booking/success?id=${result.bookingId}&order=${result.orderNumber}`)
        toast.success("Tour booked successfully! Redirecting Please wait...")
      } else {
        if (result.redirectToLogin) {
          router.push(`/login?callbackUrl=/tours/${tour.id}`)
        } else {
          toast.error("Something went wrong. Please try again.")
        }
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 shadow-xl md:p-6 p-3">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="text-base font-medium text-gray-600">
            From <span className="md:text-xl font-bold text-gray-900 text-lg">UGX {price.toLocaleString()}</span>
          </div>
          <div className="text-sm text-gray-500">per person</div>
        </div>
        <div className="flex items-center text-green-600 text-sm font-medium">
          <Check className="w-4 h-4 mr-1" />
          <span className="">Lowest Price Guarantee</span>
        </div>
      </div>

      <div className="space-y-4">
        {!session && (
          <Alert className="bg-amber-50 border-amber-200">
            <AlertTitle className="text-amber-800">Login Required</AlertTitle>
            <AlertDescription className="text-amber-700">
              You need to be logged in to book a tour. Please{" "}
              <Button
                variant="link"
                className="p-0 text-amber-800 font-semibold underline h-auto"
                onClick={() => router.push(`/login?callbackUrl=/tours/${tour.id}`)}
              >
                login
              </Button>{" "}
              first.
            </AlertDescription>
          </Alert>
        )}

        {/* Date picker */}
        <div>
          <Label htmlFor="date" className="text-sm font-medium text-gray-700 mb-2 block">
            Select date
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal h-12 shadow-sm">
                <CalendarIcon className="mr-3 h-4 w-4 text-gray-500" />
                <span className="text-gray-900">
                  {singleDate ? format(singleDate, "EEEE, MMM dd, yyyy") : "Select date"}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={singleDate}
                onSelect={setSingleDate}
                initialFocus
                disabled={(date) => date < new Date()}
                className="rounded-md border"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* People selector */}
        <div>
          <Label htmlFor="people" className="text-sm font-medium text-gray-700 mb-2 block">
            Number of travelers
          </Label>
          <Select value={people} onValueChange={setPeople}>
            <SelectTrigger className="w-full h-12 shadow-sm">
              <div className="flex items-center">
                <Users className="mr-3 h-4 w-4 text-gray-500" />
                <SelectValue placeholder="Number of people" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} {num === 1 ? "person" : "people"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Time selector */}
        <div>
          <Label htmlFor="time" className="text-sm font-medium text-gray-700 mb-2 block">
            Select time
          </Label>
          <Select value={time} onValueChange={setTime}>
            <SelectTrigger className="w-full h-12 shadow-sm">
              <div className="flex items-center">
                <Clock className="mr-3 h-4 w-4 text-gray-500" />
                <SelectValue placeholder="Select time" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="9:00">9:00 AM</SelectItem>
              <SelectItem value="10:00">10:00 AM</SelectItem>
              <SelectItem value="11:00">11:00 AM</SelectItem>
              <SelectItem value="13:00">1:00 PM</SelectItem>
              <SelectItem value="14:00">2:00 PM</SelectItem>
              <SelectItem value="15:00">3:00 PM</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Phone input */}
        <div>
          <Label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-2 block">
            Phone number
          </Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="pl-10 h-12 shadow-sm"
            />
          </div>
        </div>

      

        {/* Total price */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
          <div className="flex justify-between items-center">
            <span className="font-medium">Total price:</span>
            <span className="font-bold text-lg text-green-600">UGX {totalPrice.toLocaleString()}</span>
          </div>
        </div>

        {/* Book now button */}
        <Button
          type="submit"
          className="w-full h-12 text-base font-semibold bg-green-600 hover:bg-green-700 shadow-lg"
          disabled={isSubmitting || !session}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Book Tour Now"
          )}
        </Button>

        {/* Free cancellation */}
        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
          <div className="flex items-start gap-3">
            <div className="bg-green-100 p-1 rounded-full">
              <Check className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <div className="font-semibold text-green-800 text-sm">Free cancellation</div>
              <div className="text-xs text-green-700 ">up to 24 hours before the experience starts (local time)</div>
            </div>
          </div>
        </div>

        {/* Reserve now */}
        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
          <div className="flex items-start gap-3">
            <div className="bg-green-100 p-1 rounded-full">
              <Check className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <div className="font-semibold text-green-800 text-sm">Reserve Now and Pay Later</div>
              <div className="text-xs text-green-700">Secure your spot while staying flexible</div>
            </div>
          </div>
        </div>

        {/* Book ahead */}
        <div className="flex items-center gap-3 p-4 border border-amber-200 rounded-lg bg-amber-50">
          <div className="bg-amber-100 p-2 rounded-full">
            <Clock className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <div className="font-semibold text-amber-800 text-sm">Book ahead!</div>
            <div className="text-xs text-amber-700">On average, this is booked 15 days then Later Cancelled.</div>
          </div>
        </div>
      </div>
    </form>
  )
}

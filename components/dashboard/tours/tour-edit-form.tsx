"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import TextInput from "@/components/FormInputs/TextInput"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { Loader2, MapPin, Clock, Users, DollarSign, Calendar } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useUpdateTour } from "@/hooks/useTours"
import VEditor from "../blogs/editor"
import type { Tour, TourDifficulty } from "@prisma/client"
import MultipleImageInput from "@/components/FormInputs/MultipleImageInput"
import TourItineraryManagement from "@/components/TourItineraryManagement"
import FormSelectInput from "@/components/FormInputs/FormSelectInput"
import { useFetchDestinationsForSelect } from "@/hooks/useDestinations"

// Enhanced types for itinerary integration
export type TourItinerary = {
  id: string
  tourId: string
  day: number
  title: string
  description: string
  activities: string[]
  createdAt: Date
  updatedAt: Date
}

export type ItineraryFormData = {
  day: number
  title: string
  description: string
  activities: string[]
}

// Extended Tour type to include itineraries
export type TourWithItinerary = Tour & {
  itineraries?: TourItinerary[]
}
export type TourDestination = TourWithItinerary & {
  Destination?: {
    name: string;
  } | null;
}


// Types based on your Prisma model
export type TourUpdateProps = {
  title?: string
  description?: string
  shortDescription?: string
  images?: string[]
  price?: number | null
  discountPrice?: number | undefined
  duration?: number
  maxGroupSize?: number
  difficulty?: TourDifficulty
  categoryId?: string
  destinationId?: string
  location?: string
  coordinates?: any
  includes?: string[]
  excludes?: string[]
  featured?: boolean
  active?: boolean
}

export type TourCategory = {
  id: string
  title: string
  label: string
  value: string
}

type BasicInfoProps = {
  title: string
  description: string
  location: string
  categoryId: string
  destinationId: string
}

type PricingDetailsProps = {
  price: number
  discountPrice: number
  duration: number
  maxGroupSize: number
  difficulty: TourDifficulty
}

interface TourEditFormProps {
  initialData: TourDestination | null | undefined
  editingId: string
  categories: TourCategory[]
}

export default function TourEditForm({ initialData, editingId, categories }: TourEditFormProps) {
  const [activeTab, setActiveTab] = useState("basic-info")
  const updateTourMutation = useUpdateTour()
  const { destinations: destinationOptions, isLoading: destinationsLoading } = useFetchDestinationsForSelect()

  const initialContent = initialData?.description ?? "<p>Write your tour description here...</p>"
  const [description, setDescription] = useState(initialContent)

  // Form for basic info
  const basicInfoForm = useForm<BasicInfoProps>({
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.shortDescription || "",
      location: initialData?.location || "",
      categoryId: initialData?.categoryId || "",
      destinationId: initialData?.destinationId || "",
    },
  })

  // Form for pricing details
  const pricingForm = useForm<PricingDetailsProps>({
    defaultValues: {
      price: initialData?.price || 0,
      discountPrice: initialData?.discountPrice || 0,
      duration: initialData?.duration || 1,
      maxGroupSize: initialData?.maxGroupSize || 1,
      difficulty: initialData?.difficulty || "EASY",
    },
  })

  const [imageUrls, setImageUrls] = useState<string[]>(
    Array.isArray(initialData?.images) ? initialData.images : ["/placeholder.png"],
  )

  // Selected options for FormSelectInput
  const [selectedCategory, setSelectedCategory] = useState(
    categories.find((cat) => cat.id === initialData?.categoryId) || categories[0],
  )

  const [selectedDestination, setSelectedDestination] = useState(
    destinationOptions.find((dest) => dest.value === initialData?.destinationId) || null,
  )

  // Loading states
  const [loadingStates, setLoadingStates] = useState({
    basicInfo: false,
    pricing: false,
    content: false,
    media: false,
  })

  // Update functions for each step
  const updateBasicInfo = async (data: BasicInfoProps) => {
    setLoadingStates((prev) => ({ ...prev, basicInfo: true }))
    try {
      await updateTourMutation.mutateAsync({
        id: editingId,
        data: {
          title: data.title,
          shortDescription: data.description,
          location: data.location,
          categoryId: selectedCategory.id,
          destinationId: selectedDestination?.value || null,
        },
      })
      basicInfoForm.reset(data)
      toast.success("Basic info updated successfully!")
    } catch (error) {
      console.error(error)
      toast.error("Failed to update basic info")
    } finally {
      setLoadingStates((prev) => ({ ...prev, basicInfo: false }))
    }
  }

  const updatePricingDetails = async (data: PricingDetailsProps) => {
    setLoadingStates((prev) => ({ ...prev, pricing: true }))
    try {
      await updateTourMutation.mutateAsync({
        id: editingId,
        data: {
          price: data.price,
          discountPrice: data.discountPrice,
          duration: data.duration,
          maxGroupSize: data.maxGroupSize,
          difficulty: data.difficulty,
        },
      })
      pricingForm.reset(data)
      toast.success("Pricing details updated successfully!")
    } catch (error) {
      console.error(error)
      toast.error("Failed to update pricing details")
    } finally {
      setLoadingStates((prev) => ({ ...prev, pricing: false }))
    }
  }

  const updateDescription = async () => {
    setLoadingStates((prev) => ({ ...prev, content: true }))
    try {
      await updateTourMutation.mutateAsync({
        id: editingId,
        data: {
          description,
        },
      })
      toast.success("Description updated successfully!")
    } catch (error) {
      console.error(error)
      toast.error("Failed to update description")
    } finally {
      setLoadingStates((prev) => ({ ...prev, content: false }))
    }
  }

  const updateMedia = async () => {
    setLoadingStates((prev) => ({ ...prev, media: true }))
    try {
      await updateTourMutation.mutateAsync({
        id: editingId,
        data: {
          images: imageUrls,
        },
      })
      toast.success("Media updated successfully!")
    } catch (error) {
      console.error(error)
      toast.error("Failed to update media")
    } finally {
      setLoadingStates((prev) => ({ ...prev, media: false }))
    }
  }

  const tabVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  }

  // Updated tabs array to include itinerary
  const tabs = [
    { value: "basic-info", label: "Basic Info", icon: MapPin },
    { value: "pricing", label: "Pricing & Details", icon: DollarSign },
    { value: "content", label: "Full Description", icon: Clock },
    { value: "itinerary", label: "Itinerary", icon: Calendar },
    { value: "media", label: "Media", icon: Users },
  ]

  if (destinationsLoading) {
    return <div>Loading destinations...</div>
  }

  return (
    <div className="md:p-3 p-2">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0 mb-4"
      >
        Edit Tour: {initialData?.title}
      </motion.h2>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="inline-flex h-auto w-full justify-start gap-4 rounded-none border-b bg-transparent p-0 flex-wrap">
          {tabs.map((tab) => {
            const IconComponent = tab.icon
            return (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="inline-flex items-center gap-2 border-b-2 border-transparent px-8 pb-3 pt-2 data-[state=active]:border-[#1a7051] capitalize text-[#1a7051] data-[state=active]:text-[#1a7051]"
              >
                <IconComponent className="h-4 w-4" />
                {tab.label}
              </TabsTrigger>
            )
          })}
        </TabsList>

        <TabsContent value="basic-info" className="space-y-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={`basic-info-${activeTab}`}
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Basic Information
                  </CardTitle>
                  <CardDescription>Update the basic details of your tour</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={basicInfoForm.handleSubmit(updateBasicInfo)} className="  gap-3">
                    <div className=" gap-5 grid grid-cols-1 md:grid-cols-2 ">
                      <TextInput
                        register={basicInfoForm.register}
                        errors={basicInfoForm.formState.errors}
                        label="Tour Title"
                        name="title"
                      />

                      <TextInput
                        register={basicInfoForm.register}
                        errors={basicInfoForm.formState.errors}
                        label="Short Description"
                        name="description"
                      />

                      <TextInput
                        register={basicInfoForm.register}
                        errors={basicInfoForm.formState.errors}
                        label="Location"
                        name="location"
                      />

                      <FormSelectInput
                        label="Tour Category"
                        options={categories}
                        option={selectedCategory}
                        setOption={setSelectedCategory}
                      />
                
                      <div>
                        <h2 className="mt-3 mb-1 flex gap-2">
                          <span className="font-bold">Tour Destination :</span>
                          {initialData?.Destination?.name || "No destination"}</h2>
                        <FormSelectInput
                        label="Destination"
                        options={[{ label: "No destination", value: "" }, ...destinationOptions]}
                        option={selectedDestination || { label: "No destination", value: "" }}
                        setOption={setSelectedDestination}
                      />
                      </div>
                    </div>

                    <Button className="mt-4" type="submit" disabled={loadingStates.basicInfo}>
                      {loadingStates.basicInfo ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        "Update Basic Info"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={`pricing-${activeTab}`}
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Pricing & Details
                  </CardTitle>
                  <CardDescription>Set the pricing and tour details</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={pricingForm.handleSubmit(updatePricingDetails)} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      <TextInput
                        register={pricingForm.register}
                        errors={pricingForm.formState.errors}
                        label="Price (UGX)"
                        name="price"
                        type="number"
                      />

                      <TextInput
                        register={pricingForm.register}
                        errors={pricingForm.formState.errors}
                        label="Discount Price (UGX)"
                        name="discountPrice"
                        type="number"
                      />

                      <TextInput
                        register={pricingForm.register}
                        errors={pricingForm.formState.errors}
                        label="Duration (days)"
                        name="duration"
                        type="number"
                      />

                      <TextInput
                        register={pricingForm.register}
                        errors={pricingForm.formState.errors}
                        label="Max Group Size"
                        name="maxGroupSize"
                        type="number"
                      />

                      <div className="grid gap-3">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Tour Level
                        </label>
                        <select
                          {...pricingForm.register("difficulty", { required: "Difficulty is required" })}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="EASY">Easy</option>
                          <option value="MODERATE">Moderate</option>
                          <option value="DIFFICULT">Difficult</option>
                        </select>
                        {pricingForm.formState.errors.difficulty && (
                          <p className="text-sm text-red-500">{pricingForm.formState.errors.difficulty.message}</p>
                        )}
                      </div>
                    </div>

                    <Button type="submit" disabled={loadingStates.pricing}>
                      {loadingStates.pricing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        "Update Pricing & Details"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </TabsContent>

        <TabsContent value="content" className="space-y-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${activeTab}`}
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Full Description
                  </CardTitle>
                  <CardDescription>Write a detailed description of your tour</CardDescription>
                </CardHeader>
                <CardContent>
                  <VEditor variant="default" content={description} setContent={setDescription} isEditable={true} />
                  <div className="mt-6">
                    <Button onClick={updateDescription} disabled={loadingStates.content}>
                      {loadingStates.content ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        "Update Description"
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </TabsContent>

        {/* New Itinerary Tab */}
        <TabsContent value="itinerary" className="space-y-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={`itinerary-${activeTab}`}
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <TourItineraryManagement tourId={editingId} />
            </motion.div>
          </AnimatePresence>
        </TabsContent>

        <TabsContent value="media" className="space-y-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={`media-${activeTab}`}
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Media & Images
                  </CardTitle>
                  <CardDescription>Upload and manage tour images</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <MultipleImageInput
                      title="Tour Main Image"
                      imageUrls={imageUrls}
                      setImageUrls={setImageUrls}
                      endpoint="tourImages"
                    />

                    <Button onClick={updateMedia} disabled={loadingStates.media}>
                      {loadingStates.media ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        "Update Media"
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </TabsContent>
      </Tabs>
    </div>
  )
}

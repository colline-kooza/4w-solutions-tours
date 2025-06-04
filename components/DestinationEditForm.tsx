"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import TextInput from "@/components/FormInputs/TextInput"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { Loader2, MapPin, ImageIcon, Info, Settings } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useUpdateDestination } from "@/hooks/useDestinations"
import type { Destination, DestinationClimate } from "@prisma/client"
import MultipleImageInput from "@/components/FormInputs/MultipleImageInput"
import FormSelectInput from "@/components/FormInputs/FormSelectInput"
import VEditor from "./dashboard/blogs/editor"

const climateOptions = [
  { label: "Tropical", value: "TROPICAL" },
  { label: "Temperate", value: "TEMPERATE" },
  { label: "Arid", value: "ARID" },
  { label: "Continental", value: "CONTINENTAL" },
  { label: "Polar", value: "POLAR" },
  { label: "Mediterranean", value: "MEDITERRANEAN" },
  { label: "Subtropical", value: "SUBTROPICAL" },
  { label: "Monsoon", value: "MONSOON" },
]

type BasicInfoProps = {
  name: string
  bestTimeToVisit: string
  climate: DestinationClimate
}

type SettingsProps = {
  active: boolean
  verified: boolean
}

interface DestinationEditFormProps {
  initialData: Destination | null | undefined
  editingId: string
}

export default function DestinationEditForm({ initialData, editingId }: DestinationEditFormProps) {
  const [activeTab, setActiveTab] = useState("basic-info")
  const updateDestinationMutation = useUpdateDestination()

  const initialContent = initialData?.description ?? "<p>Write your destination description here...</p>"
  const [description, setDescription] = useState(initialContent)

  // Form for basic info
  const basicInfoForm = useForm<BasicInfoProps>({
    defaultValues: {
      name: initialData?.name || "",
      bestTimeToVisit: initialData?.bestTimeToVisit || "",
      climate: initialData?.climate || "TROPICAL",
    },
  })

  // Form for settings
  const settingsForm = useForm<SettingsProps>({
    defaultValues: {
      active: initialData?.active || true,
      verified: initialData?.verified || false,
    },
  })

  const [imageUrls, setImageUrls] = useState<string[]>(
    Array.isArray(initialData?.images) ? initialData.images : ["/placeholder.png"],
  )

  // Loading states
  const [loadingStates, setLoadingStates] = useState({
    basicInfo: false,
    content: false,
    media: false,
    settings: false,
  })

  // Update functions for each step
  const updateBasicInfo = async (data: BasicInfoProps) => {
    setLoadingStates((prev) => ({ ...prev, basicInfo: true }))
    try {
      await updateDestinationMutation.mutateAsync({
        id: editingId,
        data: {
          name: data.name,
          bestTimeToVisit: data.bestTimeToVisit,
          climate: data.climate,
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

  const updateDescription = async () => {
    setLoadingStates((prev) => ({ ...prev, content: true }))
    try {
      await updateDestinationMutation.mutateAsync({
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
      await updateDestinationMutation.mutateAsync({
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

  const updateSettings = async (data: SettingsProps) => {
    setLoadingStates((prev) => ({ ...prev, settings: true }))
    try {
      await updateDestinationMutation.mutateAsync({
        id: editingId,
        data: {
          active: data.active,
          verified: data.verified,
        },
      })
      settingsForm.reset(data)
      toast.success("Settings updated successfully!")
    } catch (error) {
      console.error(error)
      toast.error("Failed to update settings")
    } finally {
      setLoadingStates((prev) => ({ ...prev, settings: false }))
    }
  }

  const tabVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  }

  const tabs = [
    { value: "basic-info", label: "Basic Info", icon: MapPin },
    { value: "content", label: "Description", icon: Info },
    { value: "media", label: "Media", icon: ImageIcon },
    { value: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="md:p-3 p-2">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0 mb-4"
      >
        Edit Destination: {initialData?.name}
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
                  <CardDescription>Update the basic details of your destination</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={basicInfoForm.handleSubmit(updateBasicInfo)} className="space-y-6">
                    <div className="grid gap-6">
                      <TextInput
                        register={basicInfoForm.register}
                        errors={basicInfoForm.formState.errors}
                        label="Destination Name"
                        name="name"
                      />

                      <TextInput
                        register={basicInfoForm.register}
                        errors={basicInfoForm.formState.errors}
                        label="Best Time to Visit"
                        name="bestTimeToVisit"
                        placeholder="e.g., March to May, September to November"
                      />

                      <div className="grid gap-3">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Climate Type
                        </label>
                        <FormSelectInput
                          label=""
                          options={climateOptions}
                          option={
                            climateOptions.find((opt) => opt.value === basicInfoForm.watch("climate")) ||
                            climateOptions[0]
                          }
                          setOption={(option:any) => basicInfoForm.setValue("climate", option.value as DestinationClimate)}
                        />
                      </div>
                    </div>

                    <Button type="submit" disabled={loadingStates.basicInfo}>
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
                    <Info className="h-5 w-5" />
                    Destination Description
                  </CardTitle>
                  <CardDescription>Write a detailed description of your destination</CardDescription>
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
                    <ImageIcon className="h-5 w-5" />
                    Media & Images
                  </CardTitle>
                  <CardDescription>Upload and manage destination images</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <MultipleImageInput
                      title="Destination Images"
                      imageUrls={imageUrls}
                      setImageUrls={setImageUrls}
                      endpoint="destinationImages"
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

        <TabsContent value="settings" className="space-y-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={`settings-${activeTab}`}
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Destination Settings
                  </CardTitle>
                  <CardDescription>Manage destination visibility and verification status</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={settingsForm.handleSubmit(updateSettings)} className="space-y-6">
                    <div className="grid gap-6">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="active"
                          {...settingsForm.register("active")}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                        <label htmlFor="active" className="text-sm font-medium">
                          Active (visible to users)
                        </label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="verified"
                          {...settingsForm.register("verified")}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                        <label htmlFor="verified" className="text-sm font-medium">
                          Verified destination
                        </label>
                      </div>
                    </div>

                    <Button type="submit" disabled={loadingStates.settings}>
                      {loadingStates.settings ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        "Update Settings"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </TabsContent>
      </Tabs>
    </div>
  )
}

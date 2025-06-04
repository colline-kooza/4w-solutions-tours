"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import TextInput from "@/components/FormInputs/TextInput"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { Loader2, MapPin, ImageIcon, Route } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useUpdateAttraction } from "@/hooks/useAttractions"
import MultipleImageInput from "@/components/FormInputs/MultipleImageInput"
import { type Attraction, AttractionType } from "@prisma/client"
import FormSelectInput from "@/components/FormInputs/FormSelectInput"
import VEditor from "../blogs/editor"
import AttractionTourManagement from "./AttractionTourManagement"

type BasicInfoProps = {
  name: string
  description: string
  location: string
  type: AttractionType
}

interface AttractionEditFormProps {
  initialData: Attraction | null | undefined
  editingId: string
  attractionTypes: { label: string; value: AttractionType }[]
}

export default function AttractionEditForm({ initialData, editingId, attractionTypes }: AttractionEditFormProps) {
  const [activeTab, setActiveTab] = useState("basic-info")
  const updateAttractionMutation = useUpdateAttraction()

  const initialContent = initialData?.description ?? "<p>Write your attraction description here...</p>"
  const [description, setDescription] = useState(initialContent)
  const [imageUrls, setImageUrls] = useState<string[]>(
    Array.isArray(initialData?.images) ? initialData.images : ["/placeholder.png"],
  )
  const [type, setType] = useState(attractionTypes.find((t) => t.value === initialData?.type) || attractionTypes[0])

  const basicInfoForm = useForm<BasicInfoProps>({
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      location: initialData?.location || "",
      type: initialData?.type || AttractionType.HISTORICAL,
    },
  })

  const [loadingStates, setLoadingStates] = useState({
    basicInfo: false,
    content: false,
    media: false,
  })

  const updateBasicInfo = async (data: BasicInfoProps) => {
    setLoadingStates((prev) => ({ ...prev, basicInfo: true }))
    try {
      await updateAttractionMutation.mutateAsync({
        id: editingId,
        data: {
          name: data.name,
          location: data.location,
          type: data.type,
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
      await updateAttractionMutation.mutateAsync({
        id: editingId,
        data: { description },
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
      await updateAttractionMutation.mutateAsync({
        id: editingId,
        data: { images: imageUrls },
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

  const tabs = [
    { value: "basic-info", label: "Basic Info", icon: MapPin },
    { value: "content", label: "Description", icon: MapPin },
    { value: "tours", label: "Tours", icon: Route },
    { value: "media", label: "Media", icon: ImageIcon },
  ]

  return (
    <div className="md:p-3 p-2">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0 mb-4"
      >
        Edit Attraction: {initialData?.name}
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
                  <CardDescription>Update the basic details of your attraction</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={basicInfoForm.handleSubmit(updateBasicInfo)} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <TextInput
                        register={basicInfoForm.register}
                        errors={basicInfoForm.formState.errors}
                        label="Attraction Name"
                        name="name"
                      />
                      <TextInput
                        register={basicInfoForm.register}
                        errors={basicInfoForm.formState.errors}
                        label="Location"
                        name="location"
                      />
                      <div className="md:col-span-2">
                        <FormSelectInput
                          label="Attraction Type"
                          options={attractionTypes}
                          option={type}
                          setOption={(option: any) => {
                            setType(option)
                            basicInfoForm.setValue("type", option.value as AttractionType)
                          }}
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
                    <MapPin className="h-5 w-5" />
                    Description
                  </CardTitle>
                  <CardDescription>Write a detailed description of your attraction</CardDescription>
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

        <TabsContent value="tours" className="space-y-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={`tours-${activeTab}`}
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <AttractionTourManagement attractionId={editingId} />
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
                  <CardDescription>Upload and manage attraction images</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <MultipleImageInput
                      title="Attraction Images"
                      imageUrls={imageUrls}
                      setImageUrls={setImageUrls}
                      endpoint="attractionImages"
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

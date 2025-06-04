"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import toast from "react-hot-toast"
import { Loader2, User, ImageIcon, FileText } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { BriefTeamMember } from "@/types/team"
import { useUpdateTeamMember } from "@/hooks/useTeam"
import ImageUploadButton from "./FormInputs/ImageUploadButton"

const basicInfoSchema = z.object({
  name: z.string().min(1, "Name is required"),
  nickname: z.string().optional(),
  position: z.string().min(1, "Position is required"),
  status: z.boolean().default(true),
})

type BasicInfoProps = z.infer<typeof basicInfoSchema>

interface TeamUpdateFormProps {
  initialData: BriefTeamMember | null | undefined
  editingId: string
}

export function TeamUpdateForm({ initialData, editingId }: TeamUpdateFormProps) {
  const [activeTab, setActiveTab] = useState("basic-info")
  const updateTeamMemberMutation = useUpdateTeamMember()

  const [imageUrl, setImageUrl] = useState(initialData?.image || "/placeholder.png")
  const [bio, setBio] = useState(initialData?.bio || "")

  const basicInfoForm = useForm<BasicInfoProps>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      name: initialData?.name || "",
      nickname: initialData?.nickname || "",
      position: initialData?.position || "",
      status: initialData?.status ?? true,
    },
  })

  const [loadingStates, setLoadingStates] = useState({
    basicInfo: false,
    bio: false,
    image: false,
  })

  const updateBasicInfo = async (data: BasicInfoProps) => {
    setLoadingStates((prev) => ({ ...prev, basicInfo: true }))
    try {
      await updateTeamMemberMutation.mutateAsync({
        id: editingId,
        data: {
          name: data.name,
          nickname: data.nickname,
          position: data.position,
          status: data.status,
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

  const updateBio = async () => {
    setLoadingStates((prev) => ({ ...prev, bio: true }))
    try {
      await updateTeamMemberMutation.mutateAsync({
        id: editingId,
        data: { bio },
      })
      toast.success("Bio updated successfully!")
    } catch (error) {
      console.error(error)
      toast.error("Failed to update bio")
    } finally {
      setLoadingStates((prev) => ({ ...prev, bio: false }))
    }
  }

  const updateImage = async () => {
    setLoadingStates((prev) => ({ ...prev, image: true }))
    try {
      await updateTeamMemberMutation.mutateAsync({
        id: editingId,
        data: { image: imageUrl },
      })
      toast.success("Image updated successfully!")
    } catch (error) {
      console.error(error)
      toast.error("Failed to update image")
    } finally {
      setLoadingStates((prev) => ({ ...prev, image: false }))
    }
  }

  const tabVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  }

  const tabs = [
    { value: "basic-info", label: "Basic Info", icon: User },
    { value: "bio", label: "Bio", icon: FileText },
    { value: "image", label: "Image", icon: ImageIcon },
  ]

  return (
    <div className="space-y-6">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0"
      >
        Edit Team Member: {initialData?.name}
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
                    <User className="h-5 w-5" />
                    Basic Information
                  </CardTitle>
                  <CardDescription>Update the basic details of the team member</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...basicInfoForm}>
                    <form onSubmit={basicInfoForm.handleSubmit(updateBasicInfo)} className="space-y-6">
                      <div className="grid gap-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={basicInfoForm.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name *</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter full name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={basicInfoForm.control}
                            name="nickname"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nickname</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter nickname" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={basicInfoForm.control}
                          name="position"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Position *</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter position/role" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={basicInfoForm.control}
                          name="status"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                              <div className="space-y-0.5">
                                <FormLabel>Active Status</FormLabel>
                                <div className="text-sm text-muted-foreground">
                                  Show this team member on the website
                                </div>
                              </div>
                              <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
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
                  </Form>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </TabsContent>

        <TabsContent value="bio" className="space-y-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={`bio-${activeTab}`}
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Biography
                  </CardTitle>
                  <CardDescription>Write a detailed bio for the team member</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Write a brief bio about the team member..."
                      className="min-h-[200px]"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    />
                    <Button onClick={updateBio} disabled={loadingStates.bio}>
                      {loadingStates.bio ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        "Update Bio"
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </TabsContent>

        <TabsContent value="image" className="space-y-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={`image-${activeTab}`}
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
                    Profile Image
                  </CardTitle>
                  <CardDescription>Upload and manage the team member's profile image</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <ImageUploadButton
                      title="Profile Image"
                      imageUrl={imageUrl}
                      setImageUrl={setImageUrl}
                      endpoint="teamImages"
                      size="lg"
                    />
                    <Button onClick={updateImage} disabled={loadingStates.image}>
                      {loadingStates.image ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        "Update Image"
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

"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Edit } from "lucide-react"
import { BriefTeamMember } from "@/types/team"
import { useUpdateTeamMember } from "@/hooks/useTeam"
import ImageUploadButton from "./FormInputs/ImageUploadButton"


const teamSchema = z.object({
  name: z.string().min(1, "Name is required"),
  nickname: z.string().optional(),
  position: z.string().min(1, "Position is required"),
  image: z.string().optional(),
  bio: z.string().optional(),
  status: z.boolean().default(true),
})

type TeamFormData = z.infer<typeof teamSchema>

interface TeamEditFormProps {
  teamMember: BriefTeamMember
}

export function TeamEditForm({ teamMember }: TeamEditFormProps) {
  const [open, setOpen] = useState(false)
  const [imageUrl, setImageUrl] = useState(teamMember.image || "/placeholder.png")
  const updateTeamMemberMutation = useUpdateTeamMember()

  const form = useForm<TeamFormData>({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      name: teamMember.name,
      nickname: teamMember.nickname || "",
      position: teamMember.position,
      image: teamMember.image || "/placeholder.png",
      bio: teamMember.bio || "",
      status: teamMember.status,
    },
  })

  useEffect(() => {
    if (open) {
      form.reset({
        name: teamMember.name,
        nickname: teamMember.nickname || "",
        position: teamMember.position,
        image: teamMember.image || "/placeholder.png",
        bio: teamMember.bio || "",
        status: teamMember.status,
      })
      setImageUrl(teamMember.image || "/placeholder.png")
    }
  }, [open, teamMember, form])

  const onSubmit = async (data: TeamFormData) => {
    try {
      await updateTeamMemberMutation.mutateAsync({
        id: teamMember.id,
        data: {
          ...data,
          image: imageUrl,
        },
      })
      setOpen(false)
    } catch (error) {
      console.error("Error updating team member:", error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Team Member</DialogTitle>
          <DialogDescription>Update the information for {teamMember.name}.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
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
                control={form.control}
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
              control={form.control}
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

            <div className="space-y-2">
              <FormLabel>Profile Image</FormLabel>
              <ImageUploadButton
                title="Profile Image"
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                endpoint="teamImages"
                size="lg"
              />
            </div>

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write a brief bio about the team member..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Active Status</FormLabel>
                    <div className="text-sm text-muted-foreground">Show this team member on the website</div>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#1a7051] hover:bg-[#1a7051]/90"
                disabled={updateTeamMemberMutation.isPending}
              >
                {updateTeamMemberMutation.isPending ? "Updating..." : "Update Team Member"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal, Trash2 } from "lucide-react"

import { format } from "date-fns"
import { BriefTeamMember } from "@/types/team"
import { useDeleteTeamMember } from "@/hooks/useTeam"
import { TeamEditForm } from "@/components/TeamEditForm"
import { DeleteConfirmationModal } from "@/components/DeleteConfirmationModal"

export const columns: ColumnDef<BriefTeamMember>[] = [
  {
    accessorKey: "image",
    header: "Photo",
    cell: ({ row }) => {
      const member = row.original
      return (
        <Avatar className="h-10 w-10">
          <AvatarImage src={member.image || "/placeholder.png"} alt={member.name} />
          <AvatarFallback>
            {member.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>
      )
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const member = row.original
      return (
        <div className="space-y-1">
          <div className="font-medium">{member.name}</div>
          {member.nickname && <div className="text-sm text-muted-foreground">"{member.nickname}"</div>}
        </div>
      )
    },
  },
  {
    accessorKey: "position",
    header: "Position",
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("position")}</div>
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as boolean
      return <Badge variant={status ? "default" : "secondary"}>{status ? "Active" : "Inactive"}</Badge>
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date
      return <div className="text-sm">{format(new Date(date), "MMM dd, yyyy")}</div>
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const member = row.original
      const deleteTeamMemberMutation = useDeleteTeamMember()

      const handleDelete = async () => {
        await deleteTeamMemberMutation.mutateAsync(member.id)
      }

      return (
        <div className="flex items-center gap-2">
          <TeamEditForm teamMember={member} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem className="cursor-pointer" onClick={() => navigator.clipboard.writeText(member.id)}>
                Copy member ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DeleteConfirmationModal
                title="Delete Team Member"
                description={`Are you sure you want to remove ${member.name} from the team? This action cannot be undone and will permanently delete their profile and associated data.`}
                itemName={member.name}
                onDelete={handleDelete}
                isDeleting={deleteTeamMemberMutation.isPending}
                trigger={
                  <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()}
                    className="text-red-600 focus:text-red-600 cursor-pointer"
                    disabled={deleteTeamMemberMutation.isPending}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    {deleteTeamMemberMutation.isPending ? "Deleting..." : "Delete"}
                  </DropdownMenuItem>
                }
              />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]
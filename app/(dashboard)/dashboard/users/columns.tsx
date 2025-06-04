"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Eye, Mail, Phone } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import SortableColumn from "@/components/DataTableColumns/SortableColumn"
import ActionColumn from "@/components/DataTableColumns/ActionColumn"
import type { BriefUser } from "@/types/users"

export const columns: ColumnDef<BriefUser>[] = [
  {
    accessorKey: "image",
    header: "Avatar",
    cell: ({ row }) => (
      <Avatar className="h-10 w-10">
        <AvatarImage src={row.original.image || ""} alt={row.original.name} />
        <AvatarFallback>
          {row.original.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()}
        </AvatarFallback>
      </Avatar>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => <SortableColumn column={column} title="Name" />,
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.original.name}</span>
        {row.original.firstName && row.original.lastName && (
          <span className="text-sm text-muted-foreground">
            {row.original.firstName} {row.original.lastName}
          </span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => <SortableColumn column={column} title="Email" />,
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <Mail className="h-4 w-4 text-muted-foreground" />
        <span>{row.original.email}</span>
        {row.original.emailVerified && (
          <Badge variant="secondary" className="text-xs">
            Verified
          </Badge>
        )}
      </div>
    ),
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <Phone className="h-4 w-4 text-muted-foreground" />
        <span>{row.original.phone || "N/A"}</span>
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <Badge variant={row.original.role === "ADMIN" ? "default" : "secondary"}>{row.original.role}</Badge>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.original.status ? "default" : "destructive"}>
        {row.original.status ? "Active" : "Inactive"}
      </Badge>
    ),
  },
  {
    accessorKey: "isVerified",
    header: "Verified",
    cell: ({ row }) => (
      <Badge variant={row.original.isVerified ? "default" : "outline"}>
        {row.original.isVerified ? "Verified" : "Unverified"}
      </Badge>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <SortableColumn column={column} title="Created" />,
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">{new Date(row.original.createdAt).toLocaleDateString()}</span>
    ),
  },
  {
    accessorKey: "view",
    header: "View User",
    cell: ({ row }) => (
      <Link className="flex items-center justify-center space-x-2" target="_blank" href={`/users/${row.original.id}`}>
        <Eye className="text-[#1a7051]" />
      </Link>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <ActionColumn row={row} model="user" editEndpoint={`users/update/${row.original.id}`} id={row.original.id} />
    ),
  },
]

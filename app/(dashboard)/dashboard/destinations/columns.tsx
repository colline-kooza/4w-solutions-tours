"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Eye, MapPin } from "lucide-react"
import Link from "next/link"
import type { BriefDestination } from "@/actions/destinations"
import ImageColumn from "@/components/DataTableColumns/ImageColumn"
import SortableColumn from "@/components/DataTableColumns/SortableColumn"
import ActionColumn from "@/components/DataTableColumns/ActionColumn"
import { Badge } from "@/components/ui/badge"

export const columns: ColumnDef<BriefDestination>[] = [
  {
    accessorKey: "images",
    header: "Images",
    cell: ({ row }) => <ImageColumn row={row} accessorKey="images" isArray={true} />,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <SortableColumn column={column} title="Destination Name" />,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <MapPin className="h-4 w-4 text-[#1a7051]" />
        <span className="font-medium">{row.original.name}</span>
      </div>
    ),
  },
  {
    accessorKey: "climate",
    header: "Climate",
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize">
        {row.original.climate?.toLowerCase().replace("_", " ")}
      </Badge>
    ),
  },
  {
    accessorKey: "_count.tours",
    header: "Tours",
    cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original._count?.tours || 0} tours</span>,
  },
  {
    accessorKey: "active",
    header: "Status",
    cell: ({ row }) => (
      <div className="flex gap-1">
        <Badge variant={row.original.active ? "default" : "secondary"}>
          {row.original.active ? "Active" : "Inactive"}
        </Badge>
        {row.original.verified && (
          <Badge variant="outline" className="text-green-600">
            Verified
          </Badge>
        )}
      </div>
    ),
  },
  {
    accessorKey: "view",
    header: "View",
    cell: ({ row }) => (
      <Link
        className="flex items-center justify-center space-x-2"
        target="_blank"
        href={`/destinations/${row.original.slug}`}
      >
        <Eye className="text-[#1a7051]" />
      </Link>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <ActionColumn
        row={row}
        model="destination"
        editEndpoint={`destinations/update/${row.original.id}`}
        id={row.original.id}
      />
    ),
  },
]

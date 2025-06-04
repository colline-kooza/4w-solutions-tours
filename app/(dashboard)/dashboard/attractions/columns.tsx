"use client";

import { ColumnDef } from "@tanstack/react-table"; 
import { Eye } from "lucide-react";
import Link from "next/link";
import ImageColumn from "@/components/DataTableColumns/ImageColumn";
import SortableColumn from "@/components/DataTableColumns/SortableColumn";
import ActionColumn from "@/components/DataTableColumns/ActionColumn";
import { useDeleteAttraction } from "@/hooks/useAttractions";
import { BriefAttraction } from "@/types/attractions";

export const columns: ColumnDef<BriefAttraction>[] = [
  {
    accessorKey: "images",
    header: "Attraction Images",
    cell: ({ row }) => (
      <ImageColumn row={row} accessorKey="images" isArray={true} />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => <SortableColumn column={column} title="Attraction Name" />,
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => <span>{row.original.type}</span>,
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => <span>{row.original.location}</span>,
  },
  {
    accessorKey: "view",
    header: "View Attraction",
    cell: ({ row }) => (
      <Link
        className="flex items-center justify-center space-x-2"
        target="_blank"
        href={`/attractions/${row.original.id}`}
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
        model="attraction"
        editEndpoint={`attractions/update/${row.original.id}`}
        id={row.original.id}
      />
    ),
  },
];
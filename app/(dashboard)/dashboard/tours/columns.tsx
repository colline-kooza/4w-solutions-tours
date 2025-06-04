"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import Link from "next/link";
import { BriefTour } from "@/actions/tours";
import ImageColumn from "@/components/DataTableColumns/ImageColumn";
import SortableColumn from "@/components/DataTableColumns/SortableColumn";
import ActionColumn from "@/components/DataTableColumns/ActionColumn";

export const columns: ColumnDef<BriefTour>[] = [
  {
    accessorKey: "images",
    header: "Tour Images",
    cell: ({ row }) => (
      <ImageColumn row={row} accessorKey="images" isArray={true} />
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => <SortableColumn column={column} title="Tour Title" />,
  },
  {
    accessorKey: "categoryTitle",
    header: "Tour Category",
    cell: ({ row }) => <h2>{row.original.categoryTitle}</h2>,
  },
  {
    accessorKey: "destinationTitle",
    header: "Tour Destination",
    cell: ({ row }) => <h2>{row.original.destinationTitle || "null"}</h2>,
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <span>UGX {row.original.price}</span>,
  },
  {
    accessorKey: "view",
    header: "View Tour",
    cell: ({ row }) => (
      <Link
        className="flex items-center justify-center space-x-2"
        target="_blank"
        href={`/tours/${row.original.slug}`}
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
        model="tour"
        editEndpoint={`tours/update/${row.original.id}`}
        id={row.original.id}
       
      />
    ),
  },
];
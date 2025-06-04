"use client"
import DataTable from "@/components/DataTableComponents/DataTable"
import { DestinationCreateForm } from "@/components/DestinationCreateForm"

import FormSkeleton from "@/components/form-skeleton"
import { useFetchDestinations } from "@/hooks/useDestinations"
import { columns } from "./columns"
import { useRequireAdmin } from "@/utils/adminRoleCheck"

export default function DestinationsPage() {
  const { destinations, isLoading } = useFetchDestinations()
    const { isAdmin } = useRequireAdmin();

  if (isLoading) {
    return <FormSkeleton />
  }

  return (
    <div className="md:p-3 p-2">
      <div className="space-y-8">
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-600 py-3">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Destinations ({destinations.length})</h2>
          <div className="ml-auto flex items-center gap-2">
            <DestinationCreateForm />
          </div>
        </div>
        <div className="md:py-5 py-2">
          <DataTable data={destinations} columns={columns} />
        </div>
      </div>
    </div>
  )
}

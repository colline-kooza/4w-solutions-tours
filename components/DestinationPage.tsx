"use client"
import { useFetchDestination } from "@/hooks/useDestinations"
import DestinationEditForm from "./DestinationEditForm"


interface updateParams {
  id: string
}

export default function DestinationUpdatePage({ id }: updateParams) {
  const { destination, isLoading } = useFetchDestination(id)

  if (isLoading) {
    return <FormSkeleton />
  }

  return (
    <div>
      <DestinationEditForm initialData={destination} editingId={id} />
    </div>
  )
}

const FormSkeleton = () => (
  <div className="space-y-6 animate-pulse">
    <div className="h-8 bg-gray-200 rounded w-1/3"></div>
    <div className="space-y-4">
      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      <div className="h-10 bg-gray-200 rounded"></div>
    </div>
    <div className="space-y-4">
      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      <div className="h-32 bg-gray-200 rounded"></div>
    </div>
  </div>
)

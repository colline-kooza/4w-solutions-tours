"use client"

import FormSkeleton from "@/components/form-skeleton"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useFetchTeamMember } from "@/hooks/useTeam"
import { TeamUpdateForm } from "./TeamUpdateForm"

interface TeamUpdatePageProps {
  id: string
}

export default function TeamUpdatePage({ id }: TeamUpdatePageProps) {
  const { teamMember, isLoading } = useFetchTeamMember(id)

  if (isLoading) {
    return <FormSkeleton />
  }

  if (!teamMember) {
    return (
      <div className="md:p-3 p-2">
        <div className="text-center py-8">
          <h2 className="text-2xl font-semibold">Team member not found</h2>
          <p className="text-muted-foreground mt-2">The team member you're looking for doesn't exist.</p>
          <Link href="/dashboard/our-team">
            <Button className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Team
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="md:p-3 p-2">
      <div className="mb-6">
        <Link href="/dashboard/team">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Team
          </Button>
        </Link>
      </div>
      <TeamUpdateForm initialData={teamMember} editingId={id} />
    </div>
  )
}

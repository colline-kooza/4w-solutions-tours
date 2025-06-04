"use client"

import DataTable from "@/components/DataTableComponents/DataTable"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FormSkeleton from "@/components/form-skeleton"
import { Users } from "lucide-react"
import { useFetchTeamMembers } from "@/hooks/useTeam"
import { columns } from "@/app/(dashboard)/dashboard/our-team/columns"
import { TeamCreateForm } from "@/components/TeamCreateForm"
import { useRequireAdmin } from "@/utils/adminRoleCheck"

export default function Page() {
  const { teamMembers, isLoading: teamLoading } = useFetchTeamMembers()
    const { isAdmin } = useRequireAdmin();

  if (teamLoading) {
    return <FormSkeleton />
  }

  return (
    <div className="md:p-3 p-2">
      <Tabs defaultValue="team" className="space-y-8">
        <TabsList className="inline-flex h-auto w-full justify-start gap-4 rounded-none border-b bg-transparent p-0 flex-wrap">
          <TabsTrigger
            value="team"
            className="inline-flex items-center gap-2 border-b-2 border-transparent px-8 pb-3 pt-2 data-[state=active]:border-[#1a7051] capitalize text-[#1a7051] data-[state=active]:text-[#1a7051]"
          >
            <Users className="h-4 w-4" />
            Team Members
          </TabsTrigger>
        </TabsList>
        <TabsContent value="team" className="space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200 dark:border-gray-600 py-3 gap-4">
            <div>
              <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Team Members ({teamMembers.length})</h2>
              <p className="text-sm text-muted-foreground mt-1">Manage your team members and their information</p>
            </div>
            <div className="flex items-center gap-2">
              <TeamCreateForm />
            </div>
          </div>
          <div className="md:py-2 py-2">
            <DataTable data={teamMembers} columns={columns} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

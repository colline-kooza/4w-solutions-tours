"use client"
import { columns } from "./columns"
import DataTable from "@/components/DataTableComponents/DataTable"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useFetchUsers } from "@/hooks/useUsers"
import FormSkeleton from "@/components/form-skeleton"
import { UserCreateForm } from "@/components/dashboard/UserCreateForm"
import { useRequireAdmin } from "@/utils/adminRoleCheck"

export default function UsersPage() {
  const { users, isLoading: usersLoading } = useFetchUsers()
    const { isAdmin } = useRequireAdmin();

  if (usersLoading) {
    return <FormSkeleton />
  }

  return (
    <div className="md:p-3 p-2">
      <Tabs defaultValue="users" className="space-y-8">
        <TabsList className="inline-flex h-auto w-full justify-start gap-4 rounded-none border-b bg-transparent p-0 flex-wrap">
          <TabsTrigger
            value="users"
            className="inline-flex items-center gap-2 border-b-2 border-transparent px-8 pb-3 pt-2 data-[state=active]:border-[#1a7051] capitalize text-[#1a7051] data-[state=active]:text-[#1a7051]"
          >
            Users
          </TabsTrigger>
        </TabsList>
        <TabsContent value="users" className="space-y-8">
          <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-600 py-3">
            <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Users ({users.length})</h2>
            <div className="ml-auto flex items-center gap-2">
              <UserCreateForm />
            </div>
          </div>
          <div className="md:py-2 py-2">
            <DataTable data={users} columns={columns} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

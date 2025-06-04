import { getServerSession } from "next-auth/next"
import { authOptions } from "@/config/auth"
import { AdminDashboard } from "@/components/dashboard/admin-dashboard"
import { UserDashboard } from "@/components/dashboard/user-dashboard"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect("/login?callbackUrl=/dashboard")
  }

  const isAdmin = session.user.role === "ADMIN"

  return <main className="mx-auto px-1  py-6">{isAdmin ? <AdminDashboard /> : <UserDashboard />}</main>
}

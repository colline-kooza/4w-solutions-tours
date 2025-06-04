import TeamUpdatePage from "@/components/TeamUpdatePage"

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id
  return (
    <div>
      <TeamUpdatePage id={id} />
    </div>
  )
}

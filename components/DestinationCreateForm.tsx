"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Loader2, PlusCircle } from "lucide-react"
import type { DestinationClimate } from "@prisma/client"
import FormSelectInput from "@/components/FormInputs/FormSelectInput"
import { useCreateDestination } from "@/hooks/useDestinations"

const climateOptions = [
  { label: "Tropical", value: "TROPICAL" },
  { label: "Temperate", value: "TEMPERATE" },
  { label: "Arid", value: "ARID" },
  { label: "Continental", value: "CONTINENTAL" },
  { label: "Polar", value: "POLAR" },
  { label: "Mediterranean", value: "MEDITERRANEAN" },
  { label: "Subtropical", value: "SUBTROPICAL" },
  { label: "Monsoon", value: "MONSOON" },
]

export function DestinationCreateForm() {
  const [name, setName] = useState("")
  const [err, setErr] = useState("")
  const [selectedClimate, setSelectedClimate] = useState(climateOptions[0])
  const router = useRouter()
  const { mutate: createDestination, isPending: loading } = useCreateDestination()

  const handleCreateDestination = async () => {
    if (!name.trim()) {
      setErr("Destination name is required")
      return
    }

    const data = {
      name,
      climate: selectedClimate.value as DestinationClimate,
    }

    createDestination(data, {
      onSuccess: (res) => {
        if (res?.id) {
          router.push(`/dashboard/destinations/update/${res.id}`)
        }
      },
      onError: (error) => {
        setErr("Failed to create destination")
        console.error(error)
      },
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="h-8 gap-1 bg-[#1a7051] hover:bg-[#145c3f]">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Destination</span>
          <span className="md:sr-only">Add</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Create New Destination</DialogTitle>
        </DialogHeader>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Create New Destination</CardTitle>
          </CardHeader>
          <CardFooter className="flex flex-col gap-4">
            <div className="flex flex-col w-full gap-2">
              <Input
                type="text"
                placeholder="Destination name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleCreateDestination()}
              />
              {err && <p className="text-red-500 -mt-1">{err}</p>}
              <FormSelectInput
                label="Climate Type"
                options={climateOptions}
                option={selectedClimate}
                setOption={setSelectedClimate}
              />
              {loading ? (
                <Button disabled className="bg-[#1a7051]">
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  Please wait...
                </Button>
              ) : (
                <Button onClick={handleCreateDestination} className="bg-[#1a7051] hover:bg-[#145c3f]">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  )
}

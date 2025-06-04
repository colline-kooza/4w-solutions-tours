// components/dashboard/attractions/attraction-form.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Loader2, PlusCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useCreateAttraction } from "@/hooks/useAttractions";
import { AttractionType } from "@prisma/client";
import FormSelectInput from "@/components/FormInputs/FormSelectInput";

export function AttractionCreateForm() {
  const [name, setName] = useState("");
  const [type, setType] = useState({ label: "Historical", value: AttractionType.HISTORICAL });
  const [err, setErr] = useState("");
  const router = useRouter();
  const { mutate: createAttraction, isPending: loading } = useCreateAttraction();

  const attractionTypes = Object.values(AttractionType).map((type) => ({
    label: type.charAt(0).toUpperCase() + type.slice(1).toLowerCase(),
    value: type,
  }));

  const handleCreateAttraction = async () => {
    if (!name.trim()) {
      setErr("Name is required");
      return;
    }

    const data = {
      name,
      type: type.value as AttractionType,
    };

    createAttraction(data, {
      onSuccess: (res) => {
        if (res?.id) {
          router.push(`/dashboard/attractions/update/${res.id}`);
        }
      },
      onError: (error) => {
        setErr("Failed to create attraction");
        console.error(error);
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="h-8 gap-1 bg-[#1a7051] hover:bg-[#145c3f]">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Attraction</span>
          <span className="md:sr-only">Add</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Create New Attraction</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col w-full gap-2">
          <Input
            type="text"
            placeholder="Attraction name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleCreateAttraction()}
          />
          <FormSelectInput
            label="Attraction Type"
            options={attractionTypes}
            option={type}
            setOption={setType}
          />
          {err && <p className="text-red-500 -mt-1">{err}</p>}
          {loading ? (
            <Button disabled className="bg-[#1a7051]">
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
              Please wait...
            </Button>
          ) : (
            <Button
              onClick={handleCreateAttraction}
              className="bg-[#1a7051] hover:bg-[#145c3f]"
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Add
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
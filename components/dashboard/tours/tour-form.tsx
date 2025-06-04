"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Loader2, PlusCircle } from "lucide-react";
import { useCreateTour } from "@/hooks/useTours";
import { generateSlug } from "@/lib/generateSlug";
import FormSelectInput from "@/components/FormInputs/FormSelectInput";

interface TourCreateFormProps {
  categories: { label: string; value: string }[];
}

export function TourCreateForm({ categories }: TourCreateFormProps) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [err, setErr] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const router = useRouter();
  const { mutate: createTour, isPending: loading } = useCreateTour();

  const handleCreateTour = async () => {
    if (!title.trim()) {
      setErr("Title is required");
      return;
    }
    if (!price.trim() || isNaN(Number(price)) || Number(price) <= 0) {
      setErr("A valid price is required");
      return;
    }

    const data = {
      title,
      price: Number(price),
      slug: generateSlug(title),
      categoryId: selectedCategory.value,
    };

    createTour(data, {
      onSuccess: (res) => {
        if (res?.id) {
          router.push(`/dashboard/tours/update/${res.id}`);
        }
      },
      onError: (error) => {
        setErr("Failed to create tour");
        console.error(error);
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="h-8 gap-1 bg-[#1a7051] hover:bg-[#145c3f]">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Tour
          </span>
          <span className="md:sr-only">Add</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Create New Tour</DialogTitle>
        </DialogHeader>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Create New Tour</CardTitle>
          </CardHeader>
          <CardFooter className="flex flex-col gap-4">
            <div className="flex flex-col w-full gap-2">
              <Input
                type="text"
                placeholder="New Tour title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleCreateTour()}
              />
              <Input
                type="number"
                placeholder="Tour price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleCreateTour()}
                min="0"
                step="0.01"
              />
              {err && <p className="text-red-500 -mt-1">{err}</p>}
              <FormSelectInput
                label="Tour Categories"
                options={categories}
                option={selectedCategory}
                setOption={setSelectedCategory}
              />
              {loading ? (
                <Button disabled className="bg-[#1a7051]">
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  Please wait...
                </Button>
              ) : (
                <Button
                  onClick={handleCreateTour}
                  className="bg-[#1a7051] hover:bg-[#145c3f]"
                >
                  <PlusCircle className="mr-2 h-4 w-4" /> Add
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
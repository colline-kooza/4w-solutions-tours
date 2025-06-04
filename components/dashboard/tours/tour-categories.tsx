"use client";

import { useState } from "react";
import { Loader2, Plus } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { generateSlug } from "@/lib/generateSlug";
import { useCreateTourCategory } from "@/hooks/useTours";
import { Category } from "@prisma/client";

interface TourCategoryListProps {
  fetchedCategories: Category[];
}

export default function TourCategoryList({ fetchedCategories }: TourCategoryListProps) {
  const [newCategory, setNewCategory] = useState("");
  const [description, setDescription] = useState("");
  const { mutate: createCategory, isPending: loading } = useCreateTourCategory();

  const handleAddCategory = async () => {
    if (!newCategory.trim() || !description.trim()) {
      return;
    }

    const data = {
      title: newCategory,
      description,
      slug: generateSlug(newCategory),
    };

    createCategory(data, {
      onSuccess: () => {
        setNewCategory("");
        setDescription("");
      },
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Tour Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {fetchedCategories.map((category) => (
            <Badge key={category.id} variant="secondary" className="bg-[#1a7051] text-white">
              {category.title}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <div className="flex w-full gap-2 flex-col sm:flex-row">
          <Input
            type="text"
            placeholder="New category title"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddCategory()}
          />
          <Input
            type="text"
            placeholder="Category description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddCategory()}
          />
          <Button
            onClick={handleAddCategory}
            disabled={loading}
            className="bg-[#1a7051] hover:bg-[#145c3f]"
          >
            {loading ? (
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
            ) : (
              <Plus className="mr-2 h-4 w-4" />
            )}
            Add
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
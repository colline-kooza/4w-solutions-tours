"use client"
import React from "react";
import { columns } from "./columns";
import DataTable from "@/components/DataTableComponents/DataTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TourCreateForm } from "@/components/dashboard/tours/tour-form";
import { useFetchTours, useFetchTourCategories } from "@/hooks/useTours";
import TourCategoryList from "@/components/dashboard/tours/tour-categories";
import FormSkeleton from "@/components/form-skeleton";
import { useRequireAdmin } from "@/utils/adminRoleCheck";

export default function ToursPage() {
  const { tours, isLoading: toursLoading } = useFetchTours();
  const { categories, isLoading: categoriesLoading } = useFetchTourCategories();
      const { isAdmin } = useRequireAdmin();
  

  if (toursLoading || categoriesLoading) {
    return <FormSkeleton />;
  }

  return (
    <div className="md:p-3 p-2">
      <Tabs defaultValue="tours" className="space-y-8">
        <TabsList className="inline-flex h-auto w-full justify-start gap-4 rounded-none border-b bg-transparent p-0 flex-wrap">
          {["tours", "tour-categories"].map((feature) => (
            <TabsTrigger
              key={feature}
              value={feature}
              className="inline-flex items-center gap-2 border-b-2 border-transparent px-8 pb-3 pt-2 data-[state=active]:border-[#1a7051] capitalize text-[#1a7051] data-[state=active]:text-[#1a7051]"
            >
              {feature.split("-").join(" ")}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="tours" className="space-y-8">
          <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-600 py-3">
            <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Tours ({tours.length})
            </h2>
            <div className="ml-auto flex items-center gap-2">
              <TourCreateForm
                categories={categories.map((item) => ({
                  label: item.title,
                  value: item.id,
                }))}
              />
            </div>
          </div>
          <div className="md:py-5 py-2">
            <DataTable data={tours} columns={columns} />
          </div>
        </TabsContent>
        <TabsContent value="tour-categories" className="space-y-8">
          <div className="max-w-2xl py-6">
            <TourCategoryList fetchedCategories={categories} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}


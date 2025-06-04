"use client"
import React from "react";
import { useFetchTour, useFetchTourCategories } from "@/hooks/useTours";
import TourEditForm from "@/components/dashboard/tours/tour-edit-form";

interface updateParams{
    id:string
}

export default function TourUpdatePage({id}:updateParams) {
  const { tour, isLoading: tourLoading } = useFetchTour(id);
  const { categories, isLoading: categoriesLoading } = useFetchTourCategories();

  if (tourLoading || categoriesLoading) {
    return <FormSkeleton />;
  }

const tourCategories = categories?.map((item) => ({
    id: item.id,
    title: item.title, 
    label: item.title,
    value: item.id,
  })) || [];

  return (
    <div>
      <TourEditForm initialData={tour} editingId={id} categories={tourCategories} />
    </div>
  );
}

const FormSkeleton = () => (
  <div className="space-y-6 animate-pulse">
    <div className="h-8 bg-gray-200 rounded w-1/3"></div>
    <div className="space-y-4">
      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      <div className="h-10 bg-gray-200 rounded"></div>
    </div>
    <div className="space-y-4">
      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      <div className="h-32 bg-gray-200 rounded"></div>
    </div>
  </div>
);
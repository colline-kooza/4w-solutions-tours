"use client";

import React from "react";
import { useFetchAttraction } from "@/hooks/useAttractions";
import { AttractionType } from "@prisma/client";
import FormSkeleton from "@/components/form-skeleton";
import AttractionEditForm from "./attraction-edit-form";

export default function AttractionUpdatePage({ id }: { id: string }) {
  const { attraction, isLoading: attractionLoading } = useFetchAttraction(id);

  if (attractionLoading) {
    return <FormSkeleton />;
  }

  const attractionTypes = Object.values(AttractionType).map((type) => ({
    label: type.charAt(0).toUpperCase() + type.slice(1).toLowerCase(),
    value: type,
  }));

  return (
    <div>
      <AttractionEditForm initialData={attraction} editingId={id} attractionTypes={attractionTypes} />
    </div>
  );
}
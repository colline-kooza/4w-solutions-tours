import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Plus, X, GripVertical } from "lucide-react";
import { TourItinerary, ItineraryFormData } from "@/types/itinerary";

interface TourItineraryFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ItineraryFormData) => void;
  isLoading: boolean;
  initialData?: TourItinerary | null;
  existingDays: number[];
  mode: "create" | "edit";
}

export default function TourItineraryForm({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  initialData,
  existingDays = [],
  mode,
}: TourItineraryFormProps) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<ItineraryFormData>({
    defaultValues: {
      day: initialData?.day || 1,
      title: initialData?.title || "",
      description: initialData?.description || "",
      activities: initialData?.activities || [""],
    },
  });

  const { fields, append, remove } = useFieldArray<any, "activities">({
    control,
    name: "activities",
  });

  const watchedDay = watch("day");

  // Reset form when modal opens/closes or initial data changes
  useEffect(() => {
    if (isOpen) {
      reset({
        day: initialData?.day || Math.max(...existingDays, 0) + 1,
        title: initialData?.title || "",
        description: initialData?.description || "",
        activities: initialData?.activities?.length ? initialData.activities : [""],
      });
    }
  }, [isOpen, initialData, reset, existingDays]);

  // Check if the selected day conflicts with existing days
  const isDayConflict = mode === "create" && existingDays.includes(watchedDay);

  const handleFormSubmit = (data: ItineraryFormData) => {
    // Filter out empty activities
    const filteredActivities = data.activities.filter(activity => activity.trim() !== "");
    onSubmit({
      ...data,
      activities: filteredActivities,
    });
  };

  const addActivity = () => {
    append("");
  };

  const removeActivity = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {mode === "create" ? "Add New Day" : "Edit Day"} to Itinerary
          </DialogTitle>
          <DialogDescription>
            {mode === "create" 
              ? "Create a new day in your tour itinerary with activities and details."
              : "Update the details for this day in your tour itinerary."
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Day Number */}
          <div className="space-y-2">
            <Label htmlFor="day" className="text-sm font-medium">
              Day Number
            </Label>
            <Input
              id="day"
              type="number"
              min="1"
              {...register("day", { 
                required: "Day number is required",
                min: { value: 1, message: "Day must be at least 1" },
                valueAsNumber: true,
              })}
              className={isDayConflict ? "border-red-500 focus:border-red-500" : ""}
            />
            {errors.day && (
              <p className="text-sm text-red-500">{errors.day.message}</p>
            )}
            {isDayConflict && (
              <p className="text-sm text-amber-600">
                ⚠️ Day {watchedDay} already exists. Please choose a different day.
              </p>
            )}
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              Day Title
            </Label>
            <Input
              id="title"
              placeholder="e.g., Arrival in Kampala"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Describe what happens on this day..."
              rows={4}
              {...register("description", { required: "Description is required" })}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description.message}</p>
            )}
          </div>

          {/* Activities */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Activities</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addActivity}
                className="flex items-center gap-1"
              >
                <Plus className="h-4 w-4" />
                Add Activity
              </Button>
            </div>

            <div className="space-y-3">
              {fields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-2">
                  <div className="flex-shrink-0">
                    <GripVertical className="h-4 w-4 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <Input
                      placeholder={`Activity ${index + 1}`}
                      {...register(`activities.${index}` as const)}
                    />
                  </div>
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeActivity(index)}
                      className="flex-shrink-0 h-8 w-8 p-0 text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <DialogFooter className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit(handleFormSubmit)}
              disabled={isLoading || isDayConflict}
              className="bg-[#1a7051] hover:bg-[#155a41]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {mode === "create" ? "Creating..." : "Updating..."}
                </>
              ) : (
                mode === "create" ? "Create Day" : "Update Day"
              )}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
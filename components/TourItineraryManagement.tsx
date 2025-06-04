"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  Plus,
  Edit,
  Trash2,
  GripVertical,
  MapPin,
  Loader2,
  Activity,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useFetchTourItineraries,
  useCreateTourItinerary,
  useUpdateTourItinerary,
  useDeleteTourItinerary,
  useReorderTourItineraries,
} from "@/hooks/useItinerary";
import { TourItinerary, ItineraryFormData } from "@/types/itinerary";
import TourItineraryForm from "./TourItineraryForm";

interface TourItineraryManagementProps {
  tourId: string;
}

export default function TourItineraryManagement({ tourId }: TourItineraryManagementProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItinerary, setEditingItinerary] = useState<TourItinerary | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");

  // React Query hooks
  const { itineraries, isLoading, refetch } = useFetchTourItineraries(tourId);
  const createMutation = useCreateTourItinerary();
  const updateMutation = useUpdateTourItinerary();
  const deleteMutation = useDeleteTourItinerary();
  const reorderMutation = useReorderTourItineraries();

  // Extract existing day numbers
  const existingDays = itineraries.map(item => item.day);

  const handleCreateNew = () => {
    setFormMode("create");
    setEditingItinerary(null);
    setIsFormOpen(true);
  };

  const handleEdit = (itinerary: TourItinerary) => {
    setFormMode("edit");
    setEditingItinerary(itinerary);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setDeletingId(id);
  };

  const confirmDelete = async () => {
    if (deletingId) {
      await deleteMutation.mutateAsync(deletingId);
      setDeletingId(null);
    }
  };

  const handleFormSubmit = async (data: ItineraryFormData) => {
    try {
      if (formMode === "create") {
        await createMutation.mutateAsync({
          tourId,
          ...data,
        });
      } else if (editingItinerary) {
        await updateMutation.mutateAsync({
          id: editingItinerary.id,
          ...data,
        });
      }
      setIsFormOpen(false);
      setEditingItinerary(null);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingItinerary(null);
  };

  const getDifficultyColor = (activities: string[]) => {
    if (activities.length <= 2) return "bg-green-100 text-green-800";
    if (activities.length <= 4) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-[#1a7051]" />
            <span className="ml-2 text-sm text-gray-500">Loading itinerary...</span>
          </div>
        </CardHeader>
      </Card>
    );
  }

  return (
    <>
      <Card className="overflow-hidden border-0 shadow-sm bg-gradient-to-br from-white to-gray-50/50">
        <CardHeader className="bg-gradient-to-r from-[#1a7051]/5 to-[#1a7051]/10 border-b border-[#1a7051]/10">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-[#1a7051]/10 rounded-lg">
                  <Calendar className="h-5 w-5 text-[#1a7051]" />
                </div>
                Tour Itinerary
                <Badge variant="outline" className="ml-2">
                  {itineraries.length} {itineraries.length === 1 ? 'Day' : 'Days'}
                </Badge>
              </CardTitle>
              <CardDescription className="mt-1">
                Manage your tour's day-by-day itinerary and activities
              </CardDescription>
            </div>
            <Button
              onClick={handleCreateNew}
              className="bg-[#1a7051] hover:bg-[#155a41] shadow-lg hover:shadow-xl transition-all duration-200"
              disabled={createMutation.isPending}
            >
              {createMutation.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Plus className="mr-2 h-4 w-4" />
              )}
              Add Day
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {itineraries.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#1a7051]/10 to-transparent rounded-full blur-3xl"></div>
                <Calendar className="relative mx-auto h-16 w-16 text-[#1a7051]/60 mb-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No itinerary days yet
              </h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Start building your tour itinerary by adding the first day. Each day can include multiple activities and detailed descriptions.
              </p>
              <Button
                onClick={handleCreateNew}
                className="bg-[#1a7051] hover:bg-[#155a41] shadow-lg hover:shadow-xl transition-all duration-200"
                size="lg"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add First Day
              </Button>
            </motion.div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{itineraries.length} day tour</span>
                  <ChevronRight className="h-3 w-3" />
                  <span>{itineraries.reduce((acc, item) => acc + item.activities.length, 0)} total activities</span>
                </div>
              </div>

              <AnimatePresence>
                {itineraries.map((itinerary, index) => (
                  <motion.div
                    key={itinerary.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    layout
                  >
                    <Card className="relative group hover:shadow-lg transition-all duration-300 border border-gray-200/60 hover:border-[#1a7051]/20 bg-white/80 backdrop-blur-sm">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3">
                              <div className="p-3 bg-gradient-to-br from-[#1a7051] to-[#155a41] rounded-xl text-white font-bold text-lg shadow-lg">
                                {itinerary.day}
                              </div>
                              <div>
                                <h3 className="font-semibold text-lg text-gray-900 group-hover:text-[#1a7051] transition-colors">
                                  {itinerary.title}
                                </h3>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge 
                                    variant="secondary" 
                                    className={`text-xs ${getDifficultyColor(itinerary.activities)}`}
                                  >
                                    {itinerary.activities.length} Activities
                                  </Badge>
                                  <span className="text-xs text-gray-500">
                                    Day {itinerary.day}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(itinerary)}
                              className="h-8 w-8 p-0 hover:bg-[#1a7051]/10 hover:text-[#1a7051]"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(itinerary.id)}
                              className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="pt-0">
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {itinerary.description}
                        </p>
                        
                        {itinerary.activities.length > 0 && (
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                              <Activity className="h-4 w-4 text-[#1a7051]" />
                              Activities
                            </div>
                            <div className="grid gap-2">
                              {itinerary.activities.map((activity, actIndex) => (
                                <motion.div
                                  key={actIndex}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: actIndex * 0.1 }}
                                  className="flex items-center gap-3 p-3 bg-gray-50/80 rounded-lg border border-gray-100 hover:bg-[#1a7051]/5 hover:border-[#1a7051]/20 transition-all duration-200"
                                >
                                  <div className="w-2 h-2 rounded-full bg-[#1a7051] flex-shrink-0"></div>
                                  <span className="text-sm text-gray-700 font-medium">
                                    {activity}
                                  </span>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Form Modal */}
      <TourItineraryForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleFormSubmit}
        isLoading={createMutation.isPending || updateMutation.isPending}
        initialData={editingItinerary}
        existingDays={existingDays}
        mode={formMode}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Trash2 className="h-5 w-5 text-red-500" />
              Delete Itinerary Day
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this day from the itinerary? This action cannot be undone and will remove all associated activities.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Day
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
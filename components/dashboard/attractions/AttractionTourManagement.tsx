"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2, Plus, MapPin, Clock, DollarSign, Edit2, Save, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import toast from "react-hot-toast"

import FormSelectInput from "@/components/FormInputs/FormSelectInput"
import type { TourAttractionFormData } from "@/types/attractions"
import { useAddTourToAttraction, useFetchAttractionWithTours, useFetchAvailableToursForAttraction, useRemoveTourFromAttraction, useUpdateAttractionTour } from "@/hooks/useAttractionTours"

interface AttractionTourManagementProps {
  attractionId: string
}

export default function AttractionTourManagement({ attractionId }: AttractionTourManagementProps) {
  const [isAddingTour, setIsAddingTour] = useState(false)
  const [editingTourId, setEditingTourId] = useState<string | null>(null)
  const [newTourData, setNewTourData] = useState<TourAttractionFormData>({
    tourId: "",
    visitOrder: 1,
    duration: 60,
  })

  const { data: attraction, isLoading } = useFetchAttractionWithTours(attractionId)
  const { data: availableTours = [] } = useFetchAvailableToursForAttraction(attractionId)
  const addTourMutation = useAddTourToAttraction()
  const removeTourMutation = useRemoveTourFromAttraction()
  const updateTourMutation = useUpdateAttractionTour()

  const [selectedTour, setSelectedTour] = useState(availableTours[0] || null)
  const [editData, setEditData] = useState<{ [key: string]: { visitOrder: number; duration: number } }>({})

  const handleAddTour = async () => {
    if (!selectedTour) {
      toast.error("Please select a tour")
      return
    }

    try {
      await addTourMutation.mutateAsync({
        tourId: selectedTour.value,
        attractionId,
        visitOrder: newTourData.visitOrder,
        duration: newTourData.duration,
      })

      toast.success("Tour added successfully!")
      setIsAddingTour(false)
      setNewTourData({ tourId: "", visitOrder: 1, duration: 60 })
    //   setSelectedTour()
    } catch (error) {
      toast.error("Failed to add tour")
    }
  }

  const handleRemoveTour = async (tourAttractionId: string) => {
    try {
      await removeTourMutation.mutateAsync({ tourAttractionId, attractionId })
      toast.success("Tour removed successfully!")
    } catch (error) {
      toast.error("Failed to remove tour")
    }
  }

  const handleUpdateTour = async (tourAttractionId: string) => {
    const data = editData[tourAttractionId]
    if (!data) return

    try {
      await updateTourMutation.mutateAsync({
        id: tourAttractionId,
        data: {
          visitOrder: data.visitOrder,
          duration: data.duration,
        },
        attractionId,
      })

      toast.success("Tour updated successfully!")
      setEditingTourId(null)
      setEditData((prev) => {
        const newData = { ...prev }
        delete newData[tourAttractionId]
        return newData
      })
    } catch (error) {
      toast.error("Failed to update tour")
    }
  }

  const startEditing = (tourAttractionId: string, currentOrder: number, currentDuration: number) => {
    setEditingTourId(tourAttractionId)
    setEditData((prev) => ({
      ...prev,
      [tourAttractionId]: {
        visitOrder: currentOrder || 1,
        duration: currentDuration || 60,
      },
    }))
  }

  const cancelEditing = (tourAttractionId: string) => {
    setEditingTourId(null)
    setEditData((prev) => {
      const newData = { ...prev }
      delete newData[tourAttractionId]
      return newData
    })
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Tours Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Tours Management
        </CardTitle>
        <CardDescription>
          Manage tours that include this attraction. Set visit order and duration for each tour.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add New Tour Section */}
        <div className="border rounded-lg p-4 bg-gray-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Add Tour to Attraction</h3>
            <Button onClick={() => setIsAddingTour(!isAddingTour)} variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              {isAddingTour ? "Cancel" : "Add Tour"}
            </Button>
          </div>

          <AnimatePresence>
            {isAddingTour && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <FormSelectInput
                      label="Select Tour"
                      options={availableTours}
                      option={selectedTour}
                      setOption={setSelectedTour}
                    />
                  </div>

                  <div>
                    <Label htmlFor="visitOrder">Visit Order</Label>
                    <Input
                      id="visitOrder"
                      type="number"
                      min="1"
                      value={newTourData.visitOrder}
                      onChange={(e) =>
                        setNewTourData((prev) => ({
                          ...prev,
                          visitOrder: Number.parseInt(e.target.value) || 1,
                        }))
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Input
                      id="duration"
                      type="number"
                      min="1"
                      value={newTourData.duration}
                      onChange={(e) =>
                        setNewTourData((prev) => ({
                          ...prev,
                          duration: Number.parseInt(e.target.value) || 60,
                        }))
                      }
                    />
                  </div>
                </div>

                <Button
                  onClick={handleAddTour}
                  disabled={!selectedTour || addTourMutation.isPending}
                  className="w-full md:w-auto"
                >
                  {addTourMutation.isPending ? "Adding..." : "Add Tour"}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Current Tours List */}
        <div className="space-y-4">
          <h3 className="font-semibold">Current Tours ({attraction?.tours?.length || 0})</h3>

          {!attraction?.tours?.length ? (
            <div className="text-center py-8 text-gray-500">
              <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No tours associated with this attraction yet.</p>
              <p className="text-sm">Add tours to show which tours include this attraction.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {attraction.tours.map((tourAttraction:any) => (
                <motion.div
                  key={tourAttraction.id}
                  layout
                  className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-lg">{tourAttraction.tour.title}</h4>
                        <Badge variant="secondary">Order: {tourAttraction.visitOrder || "Not set"}</Badge>
                        <Badge variant="outline">
                          <Clock className="h-3 w-3 mr-1" />
                          {tourAttraction.duration || 60}min
                        </Badge>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          {tourAttraction.tour.price
                            ? `UGX ${tourAttraction.tour.price.toLocaleString()}`
                            : "Price TBD"}
                        </span>
                      </div>

                      {/* Edit Form */}
                      {editingTourId === tourAttraction.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-4 p-4 bg-gray-50 rounded-lg"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor={`editOrder-${tourAttraction.id}`}>Visit Order</Label>
                              <Input
                                id={`editOrder-${tourAttraction.id}`}
                                type="number"
                                min="1"
                                value={editData[tourAttraction.id]?.visitOrder || 1}
                                onChange={(e) =>
                                  setEditData((prev) => ({
                                    ...prev,
                                    [tourAttraction.id]: {
                                      ...prev[tourAttraction.id],
                                      visitOrder: Number.parseInt(e.target.value) || 1,
                                    },
                                  }))
                                }
                              />
                            </div>

                            <div>
                              <Label htmlFor={`editDuration-${tourAttraction.id}`}>Duration (minutes)</Label>
                              <Input
                                id={`editDuration-${tourAttraction.id}`}
                                type="number"
                                min="1"
                                value={editData[tourAttraction.id]?.duration || 60}
                                onChange={(e) =>
                                  setEditData((prev) => ({
                                    ...prev,
                                    [tourAttraction.id]: {
                                      ...prev[tourAttraction.id],
                                      duration: Number.parseInt(e.target.value) || 60,
                                    },
                                  }))
                                }
                              />
                            </div>
                          </div>

                          <div className="flex gap-2 mt-4">
                            <Button
                              size="sm"
                              onClick={() => handleUpdateTour(tourAttraction.id)}
                              disabled={updateTourMutation.isPending}
                            >
                              <Save className="h-4 w-4 mr-2" />
                              Save
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => cancelEditing(tourAttraction.id)}>
                              <X className="h-4 w-4 mr-2" />
                              Cancel
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          startEditing(tourAttraction.id, tourAttraction.visitOrder || 1, tourAttraction.duration || 60)
                        }
                        disabled={editingTourId === tourAttraction.id}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleRemoveTour(tourAttraction.id)}
                        disabled={removeTourMutation.isPending}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

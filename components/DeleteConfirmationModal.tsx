"use client"
import React, { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Loader2, Trash2, AlertTriangle } from "lucide-react"
import { useRouter } from "next/navigation"

interface DeleteConfirmationModalProps {
  title?: string
  description?: string
  itemName: string
  onDelete: () => Promise<void>
  isDeleting?: boolean
  trigger: React.ReactNode
  destructive?: boolean
}

export function DeleteConfirmationModal({
  title = "Delete Item",
  description,
  itemName,
  onDelete,
  isDeleting = false,
  trigger,
  destructive = true,
}: DeleteConfirmationModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
const router = useRouter()
  const handleDelete = async () => {
    try {
      setIsProcessing(true)
      await onDelete()
      setIsOpen(false)
    //   router.refresh()
      window.location.reload()
    } catch (error) {
      console.error("Delete failed:", error)
      // You can add toast notifications here
    } finally {
      setIsProcessing(false)
    }
  }

  const defaultDescription = `Are you sure you want to delete "${itemName}"? This action cannot be undone.`

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        {trigger}
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <div className="flex items-center gap-3">
            {destructive && (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
            )}
            <div className="flex-1">
              <AlertDialogTitle className="text-left">
                {title}
              </AlertDialogTitle>
            </div>
          </div>
          <AlertDialogDescription className="text-left">
            {description || defaultDescription}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
          <AlertDialogCancel 
            disabled={isProcessing || isDeleting}
            className="mt-2 sm:mt-0"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isProcessing || isDeleting}
            className={destructive 
              ? "bg-red-600 hover:bg-red-700 focus:ring-red-600" 
              : ""
            }
          >
            {(isProcessing || isDeleting) ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
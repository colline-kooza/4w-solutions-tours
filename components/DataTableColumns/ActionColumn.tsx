"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
} from "@/components/ui/alert-dialog";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
// import { deleteUser } from "@/actions/users";

import { useDeleteTour } from "@/hooks/useTours";
import { useDeleteAttraction } from "@/hooks/useAttractions";
import { deleteUserById } from "@/actions/users";

type ActionColumnProps = {
  row: any;
  model: any;
  editEndpoint: string;
  id: string | undefined;
  deleteAction?: () => Promise<void>; 
};

export default function ActionColumn({
  row,
  model,
  editEndpoint,
  id = "",
}: ActionColumnProps) {
  const isActive = row.isActive;
    const deleteTour = useDeleteTour();
    const attractionTour = useDeleteAttraction();

  async function handleDelete() {
    try {
        if (model === "tour") {
        await deleteTour.mutateAsync(id);
         window.location.reload();
        return;
      }
        if (model === "attraction") {
        await attractionTour.mutateAsync(id);
         window.location.reload();
        return;
      }

       else if (model === "user") {
        const res = await deleteUserById(id);
          window.location.reload();
          toast.success(`${model} Deleted Successfully`);
        
      }  else if (model === "category") {
        // const res = await deleteCategory(id);
        // if (res.status === 200) {
        //   toast.success(`${model} Deleted Successfully`);
        //   window.location.reload();
        // } else {
        //   toast.error(`${model} Couldn't be deleted`);
        // }
      }
    } catch (error) {
      console.log(error);
      toast.error(`${model} Couldn't be deleted`);
    }
  }

  return (
    <div className="flex items-center">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant={"ghost"}
            size={"icon"}
            className="text-red-600 hover:text-red-700 transition-all duration-500 cursor-pointer "
          >
            <Trash className="w-4 h-4  mr-2 flex-shrink-0" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this{" "}
              {model}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button variant={"destructive"} onClick={() => handleDelete()}>
              Permanently Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {editEndpoint && (
        <Button
          variant={"ghost"}
          size={"icon"}
          asChild
          className="text-green-600 hover:text-green-700 transition-all duration-500 cursor-pointer "
        >
          <Link href={editEndpoint}>
            <Pencil className="w-4 h-4 " />
          </Link>
        </Button>
      )}
    </div>
  );
}
import Image from "next/image";
import React from "react";

export default function ImageColumn({
  row,
  accessorKey,
  isArray = false,
}: {
  row: any;
  accessorKey: any;
  isArray?: boolean;
}) {
  const imageData = row.getValue(`${accessorKey}`);
  
  // Handle array case - get first image
  let imageUrl: string | null = null;
  console.log(imageUrl ,"kdkd")
  if (isArray && Array.isArray(imageData) && imageData.length > 0) {
    // If it's an array, get the first image
    imageUrl = imageData[0];
  } else if (!isArray) {
    // If it's not an array, use the value directly
    imageUrl = imageData;
  }

  return (
    <div className="shrink-0">
      <Image
        alt={`${accessorKey}`}
        className="aspect-square rounded-md object-cover"
        height="50"
        src={imageUrl ?? "/placeholder.png"}
        width="50"
      />
    </div>
  );
}
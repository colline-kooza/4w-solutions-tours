import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  categoryImage: f({ image: { maxFileSize: "1MB" } }).onUploadComplete(
    async ({ metadata, file }) => {
      console.log("file url", file.url);
      return { uploadedBy: "Collinz" };
    }
  ),
  teamImages: f({ image: { maxFileSize: "1MB" } }).onUploadComplete(
    async ({ metadata, file }) => {
      console.log("file url", file.url);
      return { uploadedBy: "Collinz" };
    }
  ),
  tourImages: f({
    image: { maxFileSize: "8MB", maxFileCount: 6 },
  }).onUploadComplete(async ({ metadata, file }) => {
    console.log("file url", file.url);
    return { uploadedBy: "COLLINZ" };
  }),
  destinationImages: f({
    image: { maxFileSize: "8MB", maxFileCount: 6 },
  }).onUploadComplete(async ({ metadata, file }) => {
    console.log("file url", file.url);
    return { uploadedBy: "COLLINZ" };
  }),
  attractionImages: f({
    image: { maxFileSize: "8MB", maxFileCount: 6 },
  }).onUploadComplete(async ({ metadata, file }) => {
    console.log("file url", file.url);
    return { uploadedBy: "COLLINZ" };
  }),
  itemImage: f({ image: { maxFileSize: "1MB" } }).onUploadComplete(
    async ({ metadata, file }) => {
      console.log("file url", file.url);
      return { uploadedBy: "Collinz" };
    }
  ),
  itemImages: f({
    image: { maxFileSize: "2MB", maxFileCount: 4 },
  }).onUploadComplete(async ({ metadata, file }) => {
    console.log("file url", file.url);
    return { uploadedBy: "Collinz" };
  }),
  blogImage: f({ image: { maxFileSize: "1MB" } }).onUploadComplete(
    async ({ metadata, file }) => {
      console.log("file url", file.url);
      return { uploadedBy: "Collinz" };
    }
  ),
  fileUploads: f({
    image: { maxFileSize: "1MB", maxFileCount: 4 },
    pdf: { maxFileSize: "1MB", maxFileCount: 4 },
    "application/msword": { maxFileSize: "1MB", maxFileCount: 4 }, // .doc
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
      maxFileSize: "1MB",
      maxFileCount: 4,
    }, // .docx
    "application/vnd.ms-excel": { maxFileSize: "1MB", maxFileCount: 4 }, // .xls
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
      maxFileSize: "1MB",
      maxFileCount: 4,
    }, // .xlsx
    "application/vnd.ms-powerpoint": { maxFileSize: "1MB", maxFileCount: 4 }, // .ppt
    "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      { maxFileSize: "1MB", maxFileCount: 4 }, // .pptx
    "text/plain": { maxFileSize: "1MB", maxFileCount: 4 }, // .txt

    // Archive types
    "application/gzip": { maxFileSize: "1MB", maxFileCount: 4 },
    "application/zip": { maxFileSize: "1MB", maxFileCount: 4 },
  }).onUploadComplete(async ({ metadata, file }) => {
    console.log("file url", file.url);
    return { uploadedBy: "Collinz" };
  }),
  mailAttachments: f({
    image: { maxFileSize: "1MB", maxFileCount: 4 },
    pdf: { maxFileSize: "1MB", maxFileCount: 4 },
    "application/msword": { maxFileSize: "1MB", maxFileCount: 4 }, // .doc
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
      maxFileSize: "1MB",
      maxFileCount: 4,
    }, // .docx
    "application/vnd.ms-excel": { maxFileSize: "1MB", maxFileCount: 4 }, // .xls
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
      maxFileSize: "1MB",
      maxFileCount: 4,
    }, // .xlsx
    "application/vnd.ms-powerpoint": { maxFileSize: "1MB", maxFileCount: 4 }, // .ppt
    "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      { maxFileSize: "1MB", maxFileCount: 4 }, // .pptx
    "text/plain": { maxFileSize: "1MB", maxFileCount: 4 }, // .txt

    // Archive types
    "application/gzip": { maxFileSize: "1MB", maxFileCount: 4 },
    "application/zip": { maxFileSize: "1MB", maxFileCount: 4 },
  }).onUploadComplete(async ({ metadata, file }) => {
    console.log("file url", file.url);
    return { uploadedBy: "Collinz" };
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

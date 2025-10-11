import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.config.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "uploads/media",
    format: async (req, file) => "png",
    public_id: (req, file) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      return file.fieldname + "-" + uniqueSuffix;
    },
  },
});

const filefilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "video/mp4",
    "video/mkv",
    "video/avi",
    "video/mov",
    "audio/mpeg",
    "audio/mp3",
    "audio/wav",
    "file/pdf",
    "file/doc",
    "file/docx",
    "file/ppt",
    "file/pptx",
    "file/xls",
    "file/xlsx",
    "file/txt",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only images, videos, audio, and documents are allowed."), false);
  }
};

export const uploadMedia = multer({ storage, filefilter });
// lib/cloudinary.ts
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function uploadResumeToCloudinary(file: File) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return new Promise<{
    secure_url: string;
    public_id: string;
    original_filename?: string;
  }>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "resume-analyzer",
          resource_type: "raw",
          use_filename: true,
          unique_filename: true,
        },
        (error, result) => {
          if (error || !result) reject(error);
          else resolve(result);
        },
      )
      .end(buffer);
  });
}

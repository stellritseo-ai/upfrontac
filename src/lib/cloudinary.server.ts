import { v2 as cloudinary } from "cloudinary";

let configured = false;

function ensureConfigured() {
  if (configured) return;
  const cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
  const api_key = process.env.CLOUDINARY_API_KEY;
  const api_secret = process.env.CLOUDINARY_API_SECRET;

  if (!cloud_name || !api_key || !api_secret) {
    throw new Error("Missing Cloudinary environment configuration variables!");
  }

  cloudinary.config({
    cloud_name,
    api_key,
    api_secret,
    secure: true
  });
  configured = true;
}

export async function uploadToCloudinary(fileStr: string, folder = "upfrontac") {
  ensureConfigured();
  const result = await cloudinary.uploader.upload(fileStr, {
    folder,
    resource_type: "auto"
  });
  return result.secure_url;
}

export async function deleteFromCloudinary(url: string) {
  ensureConfigured();
  try {
    // Cloudinary URL format: https://res.cloudinary.com/<cloud_name>/image/upload/v<version>/<folder>/<filename>.<ext>
    const match = url.match(/\/upload\/(?:v\d+\/)?(.+)\.[a-zA-Z0-9]+$/);
    if (match && match[1]) {
      await cloudinary.uploader.destroy(match[1]);
      return;
    }
    const parts = url.split("/");
    const fileName = parts[parts.length - 1];
    const publicId = fileName.split(".")[0];
    await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    console.warn("Cloudinary destroy error:", err);
  }
}


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

export async function listCloudinaryPhotos(folderPrefix = "upfrontac") {
  ensureConfigured();
  try {
    const res = await cloudinary.api.resources({
      type: "upload",
      prefix: folderPrefix,
      max_results: 500
    });
    if (res && Array.isArray(res.resources)) {
      return res.resources.map((r: any) => {
        const folderParts = (r.public_id || "").split("/");
        const category = folderParts.length > 2 ? folderParts[1] : (folderParts[0] === "upfrontac" && folderParts[1] ? folderParts[1] : "residential");
        return {
          id: "photo-" + r.public_id.replace(/[^a-zA-Z0-9]/g, "-"),
          url: r.secure_url,
          category: category || "residential",
          title: "HVAC Project",
          uploadedAt: r.created_at || new Date().toISOString()
        };
      });
    }
    return [];
  } catch (err) {
    console.warn("Cloudinary list error:", err);
    return [];
  }
}

export async function deleteFromCloudinary(url: string) {
  ensureConfigured();
  try {
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



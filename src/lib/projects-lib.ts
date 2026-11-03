import { PHOTO_META, type PhotoCategory } from "@/data/photo-meta";

/** Raw gallery record as stored by the dashboard (MongoDB `gallery_photos` / Cloudinary). */
export interface RawGalleryPhoto {
  id: string;
  url: string;
  category?: string;
  title?: string;
  uploadedAt?: string;
}

export interface ProjectPhoto {
  id: string;
  /** Original Cloudinary URL. */
  url: string;
  /** Optimised (WebP/AVIF via f_auto) thumbnail for the grid. */
  thumb: string;
  /** Larger rendition for the lightbox. */
  large: string;
  alt: string;
  category: PhotoCategory;
  uploadedAt?: string;
}

const CLOUDINARY_UPLOAD = "/image/upload/";

/** Insert Cloudinary delivery transforms (auto format/quality + width) into an upload URL. */
export function cloudinaryResize(url: string, width: number): string {
  if (!url.includes("res.cloudinary.com") || !url.includes(CLOUDINARY_UPLOAD)) return url;
  if (url.includes(`${CLOUDINARY_UPLOAD}f_auto`)) return url;
  return url.replace(CLOUDINARY_UPLOAD, `${CLOUDINARY_UPLOAD}f_auto,q_auto,c_limit,w_${width}/`);
}

export const publicIdFromUrl = (url: string): string | null => {
  const m = url.match(/\/upload\/(?:[^/]+\/)*?(?:v\d+\/)?(upfrontac\/.+?)\.[a-zA-Z0-9]+$/);
  return m ? m[1] : null;
};

const LEGACY_CATEGORY: Record<string, PhotoCategory> = {
  residential: "residential",
  commercial: "commercial",
  install: "install",
  installation: "install",
  heating: "repair",
  repair: "repair",
  repairs: "repair",
};

const FALLBACK_ALT = "Upfront AC & Heating HVAC project photo";

/**
 * Turn raw dashboard photos into SEO-ready gallery items. Alt text priority:
 *   1. curated description (src/data/photo-meta.ts) — only states what is visible
 *   2. a meaningful title entered in the dashboard (anything other than the placeholder "HVAC Project")
 *   3. a generic but honest fallback
 */
export function toProjectPhotos(raw: RawGalleryPhoto[]): ProjectPhoto[] {
  return raw
    .filter((p) => typeof p?.url === "string" && p.url.trim().length > 0)
    .map((p, i) => {
      const pid = publicIdFromUrl(p.url);
      const meta = pid ? PHOTO_META[pid] : undefined;
      const customTitle =
        p.title && p.title.trim() && p.title.trim().toLowerCase() !== "hvac project"
          ? p.title.trim()
          : undefined;
      const category =
        meta?.category ?? LEGACY_CATEGORY[(p.category ?? "").toLowerCase()] ?? "residential";
      return {
        id: p.id || `photo-${i}`,
        url: p.url,
        thumb: cloudinaryResize(p.url, 640),
        large: cloudinaryResize(p.url, 1600),
        alt: meta?.alt ?? customTitle ?? FALLBACK_ALT,
        category,
        uploadedAt: p.uploadedAt,
      };
    });
}

export const PHOTO_FILTERS: { id: "all" | PhotoCategory; label: string }[] = [
  { id: "all", label: "All Projects" },
  { id: "residential", label: "Residential" },
  { id: "commercial", label: "Commercial" },
  { id: "install", label: "Installations" },
  { id: "repair", label: "Repairs & Service" },
];

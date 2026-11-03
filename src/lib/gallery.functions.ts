import { createServerFn } from "@tanstack/react-start";
import type { RawGalleryPhoto } from "./projects-lib";

/**
 * Server-side gallery loader so project photos are in the server-rendered HTML that Google and
 * AI crawlers fetch (previously photos were fetched in the browser after hydration, so crawlers
 * saw an empty "loading" gallery — the "zero projects" symptom).
 *
 * Re-uses the exact data sources of the dashboard upload feature (MongoDB, then Cloudinary).
 * Results are memoised for 5 minutes to avoid hitting the database on every crawl.
 */
let cache: { at: number; photos: RawGalleryPhoto[] } | null = null;
const TTL_MS = 5 * 60 * 1000;

export const loadGalleryPhotos = createServerFn({ method: "GET" }).handler(
  async (): Promise<RawGalleryPhoto[]> => {
    if (cache && Date.now() - cache.at < TTL_MS) return cache.photos;

    const { dbGetGalleryPhotos } = await import("./db.server");
    const { listCloudinaryPhotos } = await import("./cloudinary.server");

    let photos: RawGalleryPhoto[] = [];
    try {
      photos = (await dbGetGalleryPhotos([])) ?? [];
    } catch (err) {
      console.warn("[gallery] MongoDB read failed, falling back to Cloudinary:", err);
    }
    if (!photos.length) {
      try {
        photos = (await listCloudinaryPhotos("upfrontac")) ?? [];
      } catch (err) {
        console.warn("[gallery] Cloudinary list failed:", err);
      }
    }
    // Keep only what the page needs (smaller HTML payload).
    const slim = photos.map((p) => ({
      id: p.id,
      url: p.url,
      category: p.category,
      title: p.title,
      uploadedAt: p.uploadedAt,
    }));
    if (slim.length) cache = { at: Date.now(), photos: slim };
    return slim;
  },
);

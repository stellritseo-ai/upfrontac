import { useState, useEffect, useCallback, useMemo } from "react";
import { ArrowRight, X, ZoomIn, Sparkles, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/hooks/useLanguage";
import { Link } from "@tanstack/react-router";
import { getGalleryPhotos } from "@/lib/leads-store";

// Dynamically import all images from assets/gallery
const galleryModules = import.meta.glob<{ default: string }>("@/assets/gallery/*.webp", {
  eager: true,
  import: "default",
});
const localGalleryImages = Object.values(galleryModules) as string[];

export function Projects({ isLanding = false }: { isLanding?: boolean }) {
  const { t } = useLanguage();
  const [dbPhotos, setDbPhotos] = useState<any[]>([]);

  useEffect(() => {
    getGalleryPhotos()
      .then((photos) => {
        if (Array.isArray(photos) && photos.length > 0) {
          setDbPhotos(photos);
        }
      })
      .catch((err) => {
        console.warn("Failed to load database gallery photos, using local assets:", err);
      });
  }, []);

  // Prioritize newly uploaded Cloudinary photos from database, followed by local gallery assets
  const allImages = useMemo(() => {
    const validDbUrls = dbPhotos
      .map((photo) => photo.url)
      .filter((url) => url && !url.includes("unsplash.com") && !url.includes("localhost"));

    // Deduplicate and place newest Cloudinary uploads first
    return Array.from(new Set([...[...validDbUrls].reverse(), ...localGalleryImages]));
  }, [dbPhotos]);

  const [showAll, setShowAll] = useState(false);
  const displayImages = showAll ? allImages : allImages.slice(0, 15);

  // Lightbox state
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  const openLightbox = useCallback((imgUrl: string) => {
    setLightboxImg(imgUrl);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxImg(null);
    document.body.style.overflow = "";
  }, []);

  // ESC key to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeLightbox]);

  // Cleanup on unmount
  useEffect(() => () => {
    document.body.style.overflow = "";
  }, []);

  return (
    <section id="projects" className="bg-[#F8FAFC] py-16 lg:py-20 border-b border-slate-100 select-none overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="max-w-2xl text-left">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 bg-white border border-[#005CE6]/20 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#005CE6] mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#005CE6]" />
              <span>{t("Project Gallery", "Galería de Proyectos")}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
              {t("Our recent ", "Nuestros recientes ")}
              <span className="text-[#005CE6]">
                {t("HVAC work", "trabajos de HVAC")}
              </span>
            </h2>
            <p className="text-slate-600 font-medium text-sm sm:text-base leading-relaxed">
              {t(
                "A showcase of recent air conditioning installations, repairs, and ductwork projects across Tomball, Cypress & Greater Houston.",
                "Una muestra de instalaciones, reparaciones y proyectos de conductos de aire acondicionado recientes en Tomball, Cypress y Greater Houston."
              )}
            </p>
          </div>

          {/* CTA */}
          <Link
            to="/request-free-estimate"
            className="inline-flex items-center justify-center gap-2 bg-[#005CE6] hover:bg-[#0047B3] text-white text-xs font-bold uppercase tracking-wider rounded-xl px-6 py-3.5 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] shrink-0 self-start lg:self-auto"
          >
            <span>{t("Get Free Estimate", "Obtener Presupuesto Gratis")}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Clean Image Grid (No Text Overlays on Images) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-5">
          {displayImages.map((imgUrl, idx) => (
            <div
              key={idx}
              onClick={() => openLightbox(imgUrl)}
              className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-100 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              {/* Clean Image without Text */}
              <img
                src={imgUrl}
                alt={`HVAC Project ${idx + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                loading={idx < 10 ? "eager" : "lazy"}
              />

              {/* Hover Overlay with subtle Zoom Icon only */}
              <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-[#005CE6] flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                  <ZoomIn className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show More / Show Less Toggle Button */}
        {allImages.length > 15 && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white hover:bg-slate-50 px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-700 shadow-sm hover:shadow transition-all duration-300 cursor-pointer"
            >
              <ImageIcon className="w-4 h-4 text-[#005CE6]" />
              <span>
                {showAll
                  ? t("Show Less Photos", "Mostrar Menos Fotos")
                  : t(`View All Photos (${allImages.length})`, `Ver Todas las Fotos (${allImages.length})`)}
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-8"
          onClick={closeLightbox}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" />

          {/* Modal Content */}
          <div
            className="relative z-10 w-full max-w-5xl max-h-[90vh] flex flex-col rounded-3xl overflow-hidden shadow-2xl animate-zoom-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-950/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-slate-900 transition cursor-pointer"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Full resolution image */}
            <div className="relative flex-1 overflow-hidden bg-slate-950 flex items-center justify-center p-2 sm:p-4">
              <img
                src={lightboxImg}
                alt="HVAC Project Preview"
                className="w-full h-full object-contain max-h-[80vh] rounded-2xl"
              />
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes zoom-in {
          from { opacity: 0; transform: scale(0.92); }
          to   { opacity: 1; transform: scale(1); }
        }
        .animate-zoom-in {
          animation: zoom-in 0.25s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>
    </section>
  );
}

import { useState, useEffect, useCallback, useMemo } from "react";
import { ArrowRight, X, ZoomIn, Sparkles, Image as ImageIcon } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { Link } from "@tanstack/react-router";
import { getGalleryPhotos } from "@/lib/leads-store";
import {
  toProjectPhotos,
  type RawGalleryPhoto,
  type ProjectPhoto,
} from "@/lib/projects-lib";

const CATEGORY_LABELS: Record<string, { label: string; serviceTo: string; serviceLabel: string }> = {
  residential: {
    label: "Residential HVAC",
    serviceTo: "/services/residential-hvac",
    serviceLabel: "Residential HVAC Services",
  },
  commercial: {
    label: "Commercial HVAC",
    serviceTo: "/services/commercial-hvac",
    serviceLabel: "Commercial HVAC Services",
  },
  install: {
    label: "System Installation",
    serviceTo: "/services/hvac-install",
    serviceLabel: "HVAC Installation",
  },
  repair: {
    label: "Diagnostic & Repair",
    serviceTo: "/services/hvac-repairs",
    serviceLabel: "HVAC Repairs",
  },
};

export function Projects({
  isLanding = false,
  initialPhotos = [],
}: {
  isLanding?: boolean;
  initialPhotos?: RawGalleryPhoto[];
}) {
  const { t } = useLanguage();
  const [dbPhotos, setDbPhotos] = useState<RawGalleryPhoto[]>(initialPhotos);
  const [loading, setLoading] = useState(initialPhotos.length === 0);

  useEffect(() => {
    if (initialPhotos.length > 0) {
      setDbPhotos(initialPhotos);
      setLoading(false);
    }
  }, [initialPhotos]);

  const loadPhotos = useCallback(() => {
    getGalleryPhotos()
      .then((photos) => {
        if (Array.isArray(photos) && photos.length > 0) {
          setDbPhotos(photos);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (initialPhotos.length === 0) {
      loadPhotos();
    }

    const handleUpdate = () => loadPhotos();
    window.addEventListener("upfront-gallery-updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("upfront-gallery-updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [initialPhotos.length, loadPhotos]);

  const allPhotos: ProjectPhoto[] = useMemo(() => toProjectPhotos(dbPhotos), [dbPhotos]);

  const [showAll, setShowAll] = useState(false);
  const initialCount = isLanding ? 10 : 15;
  const displayPhotos = showAll ? allPhotos : allPhotos.slice(0, initialCount);

  const [lightboxPhoto, setLightboxPhoto] = useState<ProjectPhoto | null>(null);

  const openLightbox = useCallback((photo: ProjectPhoto) => {
    setLightboxPhoto(photo);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxPhoto(null);
    document.body.style.overflow = "";
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeLightbox]);

  useEffect(
    () => () => {
      document.body.style.overflow = "";
    },
    []
  );

  return (
    <section
      id="projects"
      className="bg-[#F8FAFC] py-16 lg:py-20 border-b border-slate-100 select-none overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 bg-white border border-[#005CE6]/20 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#005CE6] mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#005CE6]" />
              <span>{t("Field Portfolio", "Galería de Proyectos")}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
              {t("Real ", "Trabajos reales de ")}
              <span className="text-[#005CE6]">
                {t("HVAC Field Work & Installations", "instalación y servicio HVAC")}
              </span>
            </h2>
            <p className="text-slate-600 font-medium text-sm sm:text-base leading-relaxed">
              {t(
                "Original photographs from residential AC installations, commercial rooftop units, coil cleanings, and diagnostic repairs performed by our team across Tomball, Cypress, and Greater Houston.",
                "Fotografías originales de instalaciones residenciales, unidades comerciales, limpieza de serpentines y reparaciones diagnósticas realizadas por nuestro equipo en Tomball, Cypress y Greater Houston."
              )}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0 self-start lg:self-auto">
            <Link
              to="/projects"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 text-xs font-bold uppercase tracking-wider rounded-xl px-5 py-3.5 transition-all duration-300 shadow-xs"
            >
              <span>{t("Explore Full Portfolio", "Ver Portafolio Completo")}</span>
              <ArrowRight className="h-4 w-4 text-[#005CE6]" />
            </Link>
            <Link
              to="/request-free-estimate"
              className="inline-flex items-center justify-center gap-2 bg-[#005CE6] hover:bg-[#0047B3] text-white text-xs font-bold uppercase tracking-wider rounded-xl px-6 py-3.5 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <span>{t("Get Free Estimate", "Obtener Presupuesto Gratis")}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {loading && displayPhotos.length === 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[4/3] w-full rounded-2xl bg-slate-200/60 animate-pulse"
              />
            ))}
          </div>
        ) : displayPhotos.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs max-w-xl mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#005CE6] flex items-center justify-center mx-auto mb-3">
              <ImageIcon className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900 mb-1">
              {t("Project Photos Updating", "Actualizando Fotos de Proyectos")}
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              {t(
                "New field photos from our technicians are being synced to the gallery.",
                "Se están sincronizando nuevas fotos de campo en la galería."
              )}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-5">
            {displayPhotos.map((photo) => {
              const catInfo = CATEGORY_LABELS[photo.category] ?? CATEGORY_LABELS.residential;
              return (
                <figure
                  key={photo.id}
                  onClick={() => openLightbox(photo)}
                  className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-100 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  <img
                    src={photo.thumb}
                    alt={photo.alt}
                    width={640}
                    height={480}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                    decoding="async"
                  />

                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 via-slate-950/45 to-transparent p-3 text-left opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider text-cyan-300">
                      {catInfo.label}
                    </span>
                    <p className="text-[11px] font-semibold text-white line-clamp-2 leading-snug mt-0.5">
                      {photo.alt}
                    </p>
                  </figcaption>

                  <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md text-[#005CE6] flex items-center justify-center shadow-md">
                      <ZoomIn className="w-4 h-4" />
                    </div>
                  </div>
                </figure>
              );
            })}
          </div>
        )}

        {allPhotos.length > initialCount && (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white hover:bg-slate-50 px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-700 shadow-sm hover:shadow transition-all duration-300 cursor-pointer"
            >
              <ImageIcon className="w-4 h-4 text-[#005CE6]" />
              <span>
                {showAll
                  ? t("Show Fewer Photos", "Mostrar Menos Fotos")
                  : t(
                      `Quick-Expand All ${allPhotos.length} Photos`,
                      `Ver las ${allPhotos.length} Fotos`
                    )}
              </span>
            </button>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 hover:bg-slate-800 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all duration-300"
            >
              <span>{t("Filter by Category on Projects Page", "Filtrar por Categoría")}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>

      {lightboxPhoto && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-8"
          onClick={closeLightbox}
        >
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" />

          <div
            className="relative z-10 w-full max-w-5xl max-h-[90vh] flex flex-col rounded-3xl overflow-hidden shadow-2xl bg-slate-950 border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-950/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-slate-900 transition cursor-pointer"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative flex-1 overflow-hidden bg-slate-950 flex items-center justify-center p-2 sm:p-4">
              <img
                src={lightboxPhoto.large}
                alt={lightboxPhoto.alt}
                className="w-full h-full object-contain max-h-[72vh] rounded-2xl"
              />
            </div>

            <div className="p-4 sm:p-6 bg-slate-900/95 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
              <div>
                <span className="text-[11px] font-black uppercase tracking-widest text-cyan-400 block">
                  {(CATEGORY_LABELS[lightboxPhoto.category] ?? CATEGORY_LABELS.residential).label}
                </span>
                <p className="text-sm sm:text-base font-bold text-white mt-0.5">
                  {lightboxPhoto.alt}
                </p>
              </div>
              <Link
                to={
                  (CATEGORY_LABELS[lightboxPhoto.category] ?? CATEGORY_LABELS.residential)
                    .serviceTo
                }
                onClick={closeLightbox}
                className="inline-flex items-center gap-2 rounded-xl bg-[#005CE6] hover:bg-[#0047B3] text-white text-xs font-extrabold px-4 py-2.5 shrink-0"
              >
                <span>
                  {
                    (CATEGORY_LABELS[lightboxPhoto.category] ?? CATEGORY_LABELS.residential)
                      .serviceLabel
                  }
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

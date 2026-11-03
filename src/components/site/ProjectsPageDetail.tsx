import { useState, useEffect, useCallback, useMemo } from "react";
import {
  Sparkles,
  ZoomIn,
  X,
  PhoneCall,
  ArrowRight,
  Snowflake,
  MapPin,
  Calendar,
  Wrench,
  CheckCircle2,
  Layers,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useLanguage } from "@/hooks/useLanguage";
import { PageHeader } from "@/components/site/PageHeader";
import { getGalleryPhotos } from "@/lib/leads-store";
import {
  toProjectPhotos,
  PHOTO_FILTERS,
  type RawGalleryPhoto,
  type ProjectPhoto,
} from "@/lib/projects-lib";
import { PROJECT_CASES } from "@/data/projects";
import type { PhotoCategory } from "@/data/photo-meta";

const CATEGORY_META: Record<
  PhotoCategory,
  { label: string; serviceTo: string; serviceLabel: string }
> = {
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
    label: "New Installations",
    serviceTo: "/services/hvac-install",
    serviceLabel: "HVAC Installation",
  },
  repair: {
    label: "Repairs & Service",
    serviceTo: "/services/hvac-repairs",
    serviceLabel: "HVAC Repairs",
  },
};

export function ProjectsPageDetail({
  initialPhotos = [],
}: {
  initialPhotos?: RawGalleryPhoto[];
}) {
  const { t } = useLanguage();
  const [dbPhotos, setDbPhotos] = useState<RawGalleryPhoto[]>(initialPhotos);
  const [loading, setLoading] = useState(initialPhotos.length === 0);
  const [activeFilter, setActiveFilter] = useState<"all" | PhotoCategory>("all");
  const [lightboxPhoto, setLightboxPhoto] = useState<ProjectPhoto | null>(null);

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

  const allPhotos = useMemo(() => toProjectPhotos(dbPhotos), [dbPhotos]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: allPhotos.length };
    for (const p of allPhotos) {
      counts[p.category] = (counts[p.category] || 0) + 1;
    }
    return counts;
  }, [allPhotos]);

  const filteredPhotos = useMemo(() => {
    if (activeFilter === "all") return allPhotos;
    return allPhotos.filter((p) => p.category === activeFilter);
  }, [allPhotos, activeFilter]);

  const filteredCases = useMemo(() => {
    if (activeFilter === "all") return PROJECT_CASES;
    return PROJECT_CASES.filter((c) => c.category === activeFilter);
  }, [activeFilter]);

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

  const stats = [
    { num: "15+", label: "Years Trade Experience", sub: "Founder & Lead HVAC Tech" },
    { num: "2 Yrs", label: "In Business", sub: "BBB-Accredited Family Co." },
    { num: "TACLA133609C", label: "TDLR Licensed", sub: "State of Texas Regulated" },
    { num: "5.0 ★", label: "Customer Rating", sub: "50+ Google Reviews" },
  ];

  const qualityPillars = [
    {
      title: "EPA Section 608 Certified",
      desc: "Every installation and repair follows federal and state refrigerant recovery, brazing, and evacuation practices.",
    },
    {
      title: "Airflow & Static Pressure Checks",
      desc: "We measure static pressure, temperature splits, and superheat/subcooling before calling a job complete.",
    },
    {
      title: "Matched SEER2 Systems",
      desc: "Sized using load calculations for Texas heat and humidity to support comfort and runtime efficiency.",
    },
    {
      title: "Upfront Flat-Rate Pricing",
      desc: "Itemized quotes provided before work begins — no surprise fees or post-repair markups.",
    },
  ];

  return (
    <div className="w-full bg-[#F8FAFC] text-slate-900 overflow-hidden select-none font-sans">
      <PageHeader
        eyebrow="Our Portfolio · Upfront AC & Heating"
        title="HVAC Projects & Field Work Gallery"
        subtitle="Inspect original field photographs and documented project portfolios from our residential AC installations, commercial rooftop units, refrigerant line-set repairs, custom sheet-metal plenums, and coil deep-cleanings across Tomball, Cypress, and Greater Houston."
      />

      {/* ── STATS METRICS BAR ──────────────────────────────── */}
      <section className="py-12 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80"
              >
                <span className="text-2xl sm:text-3xl font-extrabold text-[#005CE6] block break-all">
                  {s.num}
                </span>
                <span className="text-sm font-black text-slate-900 block mt-1">
                  {s.label}
                </span>
                <span className="text-xs text-slate-500 font-medium block mt-0.5">
                  {s.sub}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DOCUMENTED PROJECT PORTFOLIOS ─────────────────── */}
      <section className="py-16 lg:py-20 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-3xl">
              <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
                DOCUMENTED FIELD PORTFOLIOS ({filteredCases.length})
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
                Featured HVAC Work Breakdowns
              </h2>
              <p className="text-sm text-slate-600 mt-2 font-medium leading-relaxed">
                Each portfolio below documents real field work photographed by our technicians — including the equipment type, technical problem addressed, work completed, and relevant HVAC services.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredCases.map((proj) => {
              const catMeta = CATEGORY_META[proj.category] ?? CATEGORY_META.residential;
              const cover = proj.images[0];
              return (
                <article
                  key={proj.slug}
                  className="rounded-3xl bg-[#F8FAFC] border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    {cover && (
                      <div className="relative aspect-[16/9] w-full bg-slate-900 overflow-hidden">
                        <img
                          src={cover.thumb}
                          alt={cover.alt}
                          width={720}
                          height={405}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-[#005CE6] text-white px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider shadow">
                            {catMeta.label}
                          </span>
                          <span className="rounded-full bg-slate-950/80 text-white px-3 py-1 text-[11px] font-bold backdrop-blur-sm">
                            {proj.images.length} Field Photos
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="p-6 sm:p-8 space-y-4">
                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-semibold">
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#005CE6]" />
                          {proj.location}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#005CE6]" />
                          Photo Archive: {proj.projectDate}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                        <Link
                          to="/projects/$slug"
                          params={{ slug: proj.slug }}
                          className="hover:text-[#005CE6] transition-colors"
                        >
                          {proj.title}
                        </Link>
                      </h3>

                      <div className="rounded-2xl bg-white border border-slate-200/80 p-4 text-xs">
                        <span className="font-black uppercase tracking-wider text-slate-500 block mb-1">
                          HVAC Equipment Type
                        </span>
                        <span className="font-bold text-slate-900 text-sm">
                          {proj.equipmentType}
                        </span>
                      </div>

                      <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                        <div>
                          <span className="font-extrabold text-slate-900">Problem / Scope: </span>
                          {proj.customerProblem}
                        </div>
                        <div>
                          <span className="font-extrabold text-slate-900 block mb-1">
                            Work Completed:
                          </span>
                          <ul className="space-y-1.5 pl-1">
                            {proj.workCompleted.map((step, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-[#005CE6] shrink-0 mt-0.5" />
                                <span>{step}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <span className="font-extrabold text-emerald-700">Outcome: </span>
                          {proj.result}
                        </div>
                      </div>

                      {/* Thumbnail strip */}
                      {proj.images.length > 1 && (
                        <div className="grid grid-cols-5 gap-2 pt-2">
                          {proj.images.slice(0, 5).map((im, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() =>
                                openLightbox({
                                  id: `${proj.slug}-${i}`,
                                  url: im.url,
                                  thumb: im.thumb,
                                  large: im.large,
                                  alt: im.alt,
                                  category: proj.category,
                                  uploadedAt: proj.projectDate,
                                })
                              }
                              className="aspect-[4/3] rounded-xl overflow-hidden border border-slate-200 hover:border-[#005CE6] transition cursor-pointer"
                            >
                              <img
                                src={im.thumb}
                                alt={im.alt}
                                width={160}
                                height={120}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover"
                              />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="px-6 sm:px-8 py-4 bg-white border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      {proj.serviceLinks.map((s) => (
                        <Link
                          key={s.to}
                          to={s.to}
                          className="inline-flex items-center gap-1 rounded-full bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-[#005CE6] px-3 py-1 text-[11px] font-bold transition"
                        >
                          <Wrench className="w-3 h-3" />
                          <span>{s.label}</span>
                        </Link>
                      ))}
                    </div>

                    <Link
                      to="/projects/$slug"
                      params={{ slug: proj.slug }}
                      className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#005CE6] hover:underline"
                    >
                      <span>View Project Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FILTERABLE GALLERY SECTION ──────────────────────── */}
      <section className="py-16 lg:py-24 bg-[#F8FAFC] border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
                COMPLETE PHOTO GALLERY ({allPhotos.length} ORIGINAL FIELD PHOTOS)
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
                All Field Installations & Service Photos
              </h2>
              <p className="text-sm text-slate-600 mt-2 font-medium">
                Filter by category or click any photograph to inspect full-resolution equipment details and workmanship. Connected to our live field-upload gallery.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {PHOTO_FILTERS.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                    activeFilter === cat.id
                      ? "bg-[#005CE6] text-white shadow-md shadow-[#005CE6]/30"
                      : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {cat.label} ({categoryCounts[cat.id] ?? 0})
                </button>
              ))}
            </div>
          </div>

          {loading && filteredPhotos.length === 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-[4/3] w-full rounded-2xl bg-slate-200/60 animate-pulse"
                />
              ))}
            </div>
          ) : filteredPhotos.length === 0 ? (
            <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 shadow-xs max-w-xl mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#005CE6] flex items-center justify-center mx-auto mb-4">
                <Snowflake className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 mb-2">
                No Photos in This Filter Yet
              </h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Select "All Projects" above to view all {allPhotos.length} field photographs.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredPhotos.map((photo) => {
                const catMeta =
                  CATEGORY_META[photo.category] ?? CATEGORY_META.residential;
                return (
                  <figure
                    key={photo.id}
                    onClick={() => openLightbox(photo)}
                    className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
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

                    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent p-3 text-left opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-300 block">
                        {catMeta.label}
                      </span>
                      <p className="text-[11px] font-semibold text-white line-clamp-2 leading-snug mt-0.5">
                        {photo.alt}
                      </p>
                    </figcaption>

                    <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md text-[#005CE6] flex items-center justify-center shadow-lg">
                        <ZoomIn className="w-4 h-4" />
                      </div>
                    </div>
                  </figure>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── QUALITY STANDARDS SECTION ───────────────────────── */}
      <section className="py-20 lg:py-24 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
              OUR CRAFTSMANSHIP COMMITMENT
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              Standards Behind Every Installation & Repair
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {qualityPillars.map((p, idx) => (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-[#F8FAFC] border border-slate-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#005CE6]/10 text-[#005CE6] flex items-center justify-center font-black text-xs mb-4">
                    0{idx + 1}
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900 mb-2">
                    {p.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIRECT CTA BANNER & MAP ──────────────────────────── */}
      <section className="py-20 lg:py-24 bg-[#050b1a] text-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-3xl mx-auto space-y-6 mb-12">
            <span className="inline-flex items-center gap-2 rounded-full bg-cyan-500/20 border border-cyan-500/40 px-4 py-1 text-xs font-black uppercase tracking-widest text-cyan-300">
              <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
              <span>Ready for Your Free Project Quote?</span>
            </span>

            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Get a Free Estimate on Your Next HVAC Project
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed font-medium">
              Call us today or submit an estimate request. We provide upfront itemized quotes with zero hidden fees.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:+17138197908"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-full bg-[#005CE6] hover:bg-[#0047B3] text-white font-extrabold px-8 py-4 text-sm shadow-xl shadow-[#005CE6]/40 transition-all hover:scale-105 active:scale-95"
              >
                <PhoneCall className="w-5 h-5 fill-white" />
                <span>Call (713) 819-7908</span>
              </a>

              <Link
                to="/request-free-estimate"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 font-bold px-7 py-4 text-sm transition-all"
              >
                <span>Request Free Estimate</span>
                <ArrowRight className="w-4 h-4 text-cyan-300" />
              </Link>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden border border-slate-800 shadow-2xl h-[380px] relative max-w-5xl mx-auto">
            <iframe
              title="Upfront AC Service Area Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d109865.258814717!2d-95.6984218!3d30.0888293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640cd1a97d74db1%3A0xb30d32f5fb3f9f!2sTomball%2C%20TX%2077377!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full grayscale invert opacity-80"
            />
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
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
              aria-label="Close"
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-950/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-slate-900 transition cursor-pointer"
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
                  {(CATEGORY_META[lightboxPhoto.category] ?? CATEGORY_META.residential).label}
                </span>
                <p className="text-sm sm:text-base font-bold text-white mt-0.5">
                  {lightboxPhoto.alt}
                </p>
              </div>
              <Link
                to={
                  (CATEGORY_META[lightboxPhoto.category] ?? CATEGORY_META.residential)
                    .serviceTo
                }
                onClick={closeLightbox}
                className="inline-flex items-center gap-2 rounded-xl bg-[#005CE6] hover:bg-[#0047B3] text-white text-xs font-extrabold px-4 py-2.5 shrink-0"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>
                  {
                    (CATEGORY_META[lightboxPhoto.category] ?? CATEGORY_META.residential)
                      .serviceLabel
                  }
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

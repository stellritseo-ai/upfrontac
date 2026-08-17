import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ZoomIn,
  X,
  PhoneCall,
  ArrowRight,
  ShieldCheck,
  Award,
  Star,
  CheckCircle2,
  MapPin,
  Clock,
  Wrench,
  Snowflake,
  Building2,
  Flame,
  ChevronRight,
  Filter
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useLanguage } from "@/hooks/useLanguage";
import { PageHeader } from "@/components/site/PageHeader";
import { getGalleryPhotos } from "@/lib/leads-store";
import acCypressImg from "@/assets/service-ac-cypress.png";
import acTomballImg from "@/assets/service-ac-tomball.png";

export function ProjectsPageDetail() {
  const { t } = useLanguage();
  const [dbPhotos, setDbPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  useEffect(() => {
    getGalleryPhotos()
      .then((photos) => {
        if (Array.isArray(photos)) {
          setDbPhotos(photos);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.warn("Failed to load database gallery photos:", err);
        setLoading(false);
      });
  }, []);

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "residential", label: "Residential AC" },
    { id: "commercial", label: "Commercial HVAC" },
    { id: "install", label: "New Installations" },
    { id: "heating", label: "Heating & Repairs" },
  ];

  // Filter dynamic photos by category
  const filteredPhotos = useMemo(() => {
    const valid = dbPhotos.filter(
      (photo) => photo.url && !photo.url.includes("localhost")
    );
    if (activeFilter === "all") return valid;
    return valid.filter((p) => {
      const cat = (p.category || "").toLowerCase();
      if (activeFilter === "residential") return cat.includes("res") || cat.includes("ac");
      if (activeFilter === "commercial") return cat.includes("com");
      if (activeFilter === "install") return cat.includes("inst");
      if (activeFilter === "heating") return cat.includes("heat") || cat.includes("repair");
      return cat === activeFilter;
    });
  }, [dbPhotos, activeFilter]);

  const openLightbox = useCallback((imgUrl: string) => {
    setLightboxImg(imgUrl);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxImg(null);
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
    { num: "12,000+", label: "Projects Completed", sub: "Since 2013 in Houston" },
    { num: "10+", label: "Years Experience", sub: "Local Family Business" },
    { num: "100%", label: "In-House Techs", sub: "Never Subcontracted" },
    { num: "5.0 ★", label: "Customer Rating", sub: "50+ Verified Reviews" },
  ];

  const qualityPillars = [
    {
      title: "EPA Section 608 Certified",
      desc: "Every installation adheres to rigorous federal & state environmental refrigerant handling protocols."
    },
    {
      title: "21-Point Commissioning Checklist",
      desc: "We measure static pressure, temperature splits, and airflow velocity before declaring any job finished."
    },
    {
      title: "Matched SEER2 Efficiency Systems",
      desc: "Sized precisely for Texas heat loads to maximize comfort while minimizing monthly electricity consumption."
    },
    {
      title: "Upfront Transparent Pricing",
      desc: "Itemized quotes provided before work begins — no surprise fees or post-installation markups."
    }
  ];

  return (
    <div className="w-full bg-[#F8FAFC] text-slate-900 overflow-hidden select-none font-sans">
      
      {/* ── PAGE HEADER ────────────────────────────────────── */}
      <PageHeader
        eyebrow="Our Portfolio · Upfront AC"
        title="Recent HVAC Projects & Showcase"
        subtitle="Explore our real-world portfolio of residential AC replacements, commercial HVAC system installs, emergency diagnostic repairs, and high-efficiency ductwork upgrades across Tomball, Cypress, Katy & Greater Houston."
      />

      {/* ── STATS METRICS BAR ──────────────────────────────── */}
      <section className="py-12 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#005CE6] block">{s.num}</span>
                <span className="text-sm font-black text-slate-900 block mt-1">{s.label}</span>
                <span className="text-xs text-slate-500 font-medium block mt-0.5">{s.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FILTERABLE GALLERY SECTION ──────────────────────── */}
      <section className="py-20 lg:py-24 bg-[#F8FAFC] border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <span className="text-xs font-black uppercase tracking-widest text-[#005CE6]">
                PROJECT SHOWCASE ({dbPhotos.length} TOTAL)
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
                Real Installations & Field Work
              </h2>
              <p className="text-sm text-slate-600 mt-2 font-medium">
                Click any image to expand and inspect our workmanship, clean ducting, and precision system setups.
              </p>
            </div>

            {/* Filter Category Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                    activeFilter === cat.id
                      ? "bg-[#005CE6] text-white shadow-md shadow-[#005CE6]/30"
                      : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Image Grid */}
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="aspect-[4/3] w-full rounded-2xl bg-slate-200/60 animate-pulse" />
              ))}
            </div>
          ) : filteredPhotos.length === 0 ? (
            <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 shadow-xs max-w-xl mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#005CE6] flex items-center justify-center mx-auto mb-4">
                <Snowflake className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-extrabold text-slate-900 mb-2">
                No Photos in this Category Yet
              </h4>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Photos uploaded via the admin dashboard will automatically appear here in high definition.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredPhotos.map((photo, idx) => (
                <motion.div
                  key={photo.id || idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: (idx % 10) * 0.04 }}
                  onClick={() => openLightbox(photo.url)}
                  className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  <img
                    src={photo.url}
                    alt={photo.title || `Upfront AC Project Installation ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading={idx < 10 ? "eager" : "lazy"}
                  />

                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-[#005CE6] flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <ZoomIn className="w-5 h-5" />
                    </div>
                  </div>
                </motion.div>
              ))}
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
              Why Our Installations Outlast the Competition
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {qualityPillars.map((p, idx) => (
              <div key={idx} className="p-7 rounded-3xl bg-[#F8FAFC] border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#005CE6]/10 text-[#005CE6] flex items-center justify-center font-black text-xs mb-4">
                    0{idx + 1}
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900 mb-2">{p.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">{p.desc}</p>
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

          {/* Map Embed */}
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
      {lightboxImg && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-8"
          onClick={closeLightbox}
        >
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" />
          <div
            className="relative z-10 w-full max-w-5xl max-h-[90vh] flex flex-col rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-950/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-slate-900 transition cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="relative flex-1 overflow-hidden bg-slate-950 flex items-center justify-center p-2 sm:p-4">
              <img
                src={lightboxImg}
                alt="HVAC Installation Project Full Preview"
                className="w-full h-full object-contain max-h-[80vh] rounded-2xl"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

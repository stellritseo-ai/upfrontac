import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Sparkles, Navigation, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useLanguage } from "@/hooks/useLanguage";

const serviceAreas = [
  {
    name: "Tomball, TX",
    zip: "(77375, 77377)",
    desc: "Residential neighborhoods along FM 2920, SH 249 and surrounding subdivisions.",
    x: "48%",
    y: "32%",
    primary: true,
  },
  {
    name: "Cypress, TX",
    zip: "(77433, 77429)",
    desc: "Bridgeland, Towne Lake, Fairfield, Copper Lakes and Cy-Fair communities.",
    x: "36%",
    y: "42%",
  },
  {
    name: "Houston, TX",
    zip: "Central & Metro",
    desc: "North Houston, West Houston, Energy Corridor and surrounding metro areas.",
    x: "56%",
    y: "58%",
    primary: true,
  },
  {
    name: "Katy, TX",
    zip: "Western Suburbs",
    desc: "Rapidly growing western suburbs with high residential and commercial HVAC demand.",
    x: "30%",
    y: "60%",
  },
  {
    name: "The Woodlands, TX",
    zip: "North Metro",
    desc: "Master-planned communities with diverse residential and commercial system types.",
    x: "58%",
    y: "24%",
  },
  {
    name: "Spring, TX",
    zip: "(77373, 77379, 77386)",
    desc: "Established neighborhoods with varied system ages and maintenance needs.",
    x: "62%",
    y: "30%",
  },
  {
    name: "Magnolia, TX",
    zip: "Northwest Metro",
    desc: "Rural residential, custom homes and acreage properties.",
    x: "40%",
    y: "22%",
  },
  {
    name: "Sugar Land, TX",
    zip: "Southwest Suburbs",
    desc: "Southwest Houston suburbs — residential and commercial.",
    x: "42%",
    y: "76%",
  },
  {
    name: "Greater Houston Metro",
    zip: "Harris & Montgomery",
    desc: "Same-day commercial HVAC service across the metro.",
    x: "52%",
    y: "46%",
  },
];

export function ServiceArea() {
  const { t } = useLanguage();
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);

  return (
    <section id="service-area" className="relative py-16 lg:py-20 bg-white border-b border-slate-100 overflow-hidden select-none">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header Title */}
        <div className="text-left max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#005CE6]/10 border border-[#005CE6]/20 px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-[#005CE6] shadow-sm mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#005CE6]" />
            <span>{t("Local Coverage", "Cobertura Local")}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
            {t("HVAC maintenance across ", "Mantenimiento HVAC en ")}
            <span className="text-[#005CE6]">
              {t("Tomball, Cypress & Greater Houston", "Tomball, Cypress y Greater Houston")}
            </span>
          </h2>

          <p className="text-slate-600 font-medium text-sm sm:text-base leading-relaxed">
            {t(
              "Daily service across Northwest Houston with Harris and Montgomery County coverage — Fort Bend on request.",
              "Servicio diario en el noroeste de Houston con cobertura en los condados de Harris y Montgomery — Fort Bend a pedido."
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Left Column: Interactive Cards Grid (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {serviceAreas.map((area) => {
              const isActive = hoveredArea === area.name;
              return (
                <motion.div
                  key={area.name}
                  onMouseEnter={() => setHoveredArea(area.name)}
                  onMouseLeave={() => setHoveredArea(null)}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className={`rounded-2xl p-5 border text-left transition-all duration-300 cursor-pointer ${isActive
                      ? "bg-[#005CE6]/5 border-[#005CE6] shadow-md shadow-[#005CE6]/10"
                      : "bg-slate-50/80 border-slate-200/80 hover:bg-white hover:border-[#005CE6]/40 hover:shadow-sm"
                    }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${isActive ? "bg-[#005CE6] text-white" : "bg-[#005CE6]/10 text-[#005CE6]"}`}>
                        <MapPin className="w-4 h-4" />
                      </div>
                      <h3 className="text-base font-extrabold text-slate-900 leading-tight">
                        {area.name}
                      </h3>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#005CE6] bg-[#005CE6]/10 px-2.5 py-0.5 rounded-full">
                      {area.zip}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-medium mt-1">
                    {area.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Sleek Interactive Dispatch Map (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 relative w-full max-w-full aspect-[4/3] sm:aspect-[4/3] min-h-[420px] rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl sticky top-24 box-border"
          >
            {/* Embedded Google Map Background (Centered on Houston & Tomball, TX) */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d443088.0518776822!2d-95.66699313271798!3d29.98061482811463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640b8b4488d8501%3A0xca0d02def365053b!2sHouston%2C%20TX!5e0!3m2!1sen!2s!4v1782259191322!5m2!1sen!2s"
              className="absolute inset-0 w-full h-full opacity-75 grayscale invert contrast-[1.25] brightness-[0.8] pointer-events-none"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Radar Sweep Line SVG */}
            <svg
              viewBox="0 0 600 450"
              className="absolute inset-0 h-full w-full pointer-events-none"
              aria-hidden
            >
              <defs>
                <radialGradient id="houstonGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#005CE6" stopOpacity="0.3" />
                  <stop offset="70%" stopColor="#005CE6" stopOpacity="0.05" />
                  <stop offset="100%" stopColor="#005CE6" stopOpacity="0" />
                </radialGradient>
              </defs>

              <circle cx="300" cy="225" r="210" fill="url(#houstonGlow)" />

              {/* Radar Sweep Line */}
              <line
                x1="300"
                y1="225"
                x2="300"
                y2="15"
                stroke="rgba(0, 92, 230, 0.5)"
                strokeWidth="2"
                className="radar-sweep-line"
              />
            </svg>

            {/* Pins on Map */}
            {serviceAreas.map((pin) => (
              <Pin
                key={pin.name}
                x={pin.x}
                y={pin.y}
                label={pin.name}
                primary={pin.primary}
                active={hoveredArea === pin.name}
                onMouseEnter={() => setHoveredArea(pin.name)}
                onMouseLeave={() => setHoveredArea(null)}
              />
            ))}

            {/* Bottom Floating Telemetry Badge */}
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 bg-slate-950/90 border border-slate-700/80 backdrop-blur-md text-white rounded-2xl p-3 sm:p-3.5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 select-none z-20 shadow-xl box-border">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-[#005CE6] text-white flex items-center justify-center shrink-0 shadow-md">
                  <Navigation className="w-4 h-4" />
                </div>
                <div className="text-left leading-tight min-w-0">
                  <span className="block text-[10px] uppercase tracking-widest text-cyan-300 font-black truncate">
                    {t("Daily Dispatch Active", "Despacho Diario Activo")}
                  </span>
                  <span className="block text-xs font-extrabold text-white mt-0.5 truncate">
                    Tomball, Cypress & Greater Houston
                  </span>
                </div>
              </div>

              <Link
                to="/service-areas"
                className="w-full sm:w-auto flex justify-center items-center gap-1.5 text-xs font-extrabold text-[#005CE6] bg-white hover:bg-cyan-50 px-3.5 py-2.5 sm:py-2 rounded-xl shadow-md transition-all shrink-0 box-border"
              >
                <span>{t("Check Coverage", "Ver Cobertura")}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </motion.div>

        </div>
      </div>

      <style>{`
        @keyframes radar-sweep {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .radar-sweep-line {
          transform-origin: 300px 225px;
          animation: radar-sweep 12s linear infinite;
        }
      `}</style>
    </section>
  );
}

function Pin({
  x,
  y,
  label,
  primary = false,
  active = false,
  onMouseEnter,
  onMouseLeave,
}: {
  x: string;
  y: string;
  label: string;
  primary?: boolean;
  active?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-full group cursor-pointer z-20 transition-all duration-300"
      style={{ left: x, top: y }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex flex-col items-center gap-1">
        {/* Glowing hotspot */}
        <div className="relative flex h-7 w-7 items-center justify-center">
          <span className={`animate-ping absolute inline-flex h-5 w-5 rounded-full opacity-75 transition-all duration-300 ${active
              ? "bg-cyan-400 scale-125"
              : primary
                ? "bg-[#005CE6]"
                : "bg-blue-400"
            }`}></span>
          <span className={`relative inline-flex rounded-full h-4 w-4 items-center justify-center text-white shadow-md transition-all duration-300 ${active
              ? "bg-cyan-400 scale-110 shadow-[0_0_12px_rgba(34,211,238,0.8)]"
              : primary
                ? "bg-[#005CE6]"
                : "bg-[#005CE6]"
            }`}>
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
          </span>
        </div>

        {/* Label frame */}
        <span className={`px-2 py-0.5 rounded-md backdrop-blur-sm border transition-all duration-300 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap shadow-sm ${primary || active ? "inline-block" : "hidden sm:inline-block"
          } ${active
            ? "bg-[#005CE6] border-cyan-400 text-white scale-105 shadow-md"
            : "bg-slate-950/85 border-slate-800 text-white group-hover:bg-[#005CE6] group-hover:text-white"
          }`}>
          {label}
        </span>
      </div>
    </div>
  );
}

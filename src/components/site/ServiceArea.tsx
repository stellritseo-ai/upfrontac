import { useState } from "react";
import { MapPin, Sparkles, Navigation, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useLanguage } from "@/hooks/useLanguage";

const serviceAreas = [
  {
    name: "Tomball, TX",
    zip: "77375, 77377",
    desc: "Headquartered in Northpointe — serving Old Town Tomball, Rose Hill, Creekside Park, and the FM 2920 & SH 249 corridors.",
    to: "/services/ac-repair-tomball",
    x: "48%",
    y: "32%",
    primary: true,
  },
  {
    name: "Cypress, TX",
    zip: "77429, 77433",
    desc: "Bridgeland, Towne Lake, Fairfield, Coles Crossing, Blackhorse Ranch, and surrounding Cy-Fair neighborhoods.",
    to: "/services/ac-repair-cypress",
    x: "36%",
    y: "42%",
    primary: true,
  },
  {
    name: "Houston, TX",
    zip: "NW & Metro",
    desc: "Northwest Houston, Willowbrook, Champions, Jersey Village, Heights, Energy Corridor, and surrounding metro areas.",
    to: "/service-areas",
    x: "56%",
    y: "58%",
    primary: true,
  },
  {
    name: "Katy, TX",
    zip: "77449, 77450, 77493, 77494",
    desc: "Cinco Ranch, Elyson, Cane Island, Katy Proper, and west I-10 & Grand Parkway (SH 99) communities.",
    to: "/service-areas",
    x: "30%",
    y: "60%",
  },
  {
    name: "Spring, TX",
    zip: "77373, 77379, 77388, 77389",
    desc: "Klein, Champion Forest, Gleannloch Farms, Spring Trails, and Louetta / Kuykendahl neighborhoods.",
    to: "/service-areas",
    x: "62%",
    y: "30%",
  },
  {
    name: "Magnolia, TX",
    zip: "77354, 77355",
    desc: "High Meadow Ranch, Mostyn Manor, Woodforest border, FM 1488, and custom acreage properties.",
    to: "/service-areas",
    x: "40%",
    y: "22%",
  },
  {
    name: "The Woodlands, TX",
    zip: "77380, 77381, 77382, 77389",
    desc: "Alden Bridge, Sterling Ridge, Creekside Park, Cochran's Crossing, and Research Forest commercial properties.",
    to: "/service-areas",
    x: "58%",
    y: "24%",
  },
  {
    name: "Sugar Land, TX",
    zip: "77478, 77479",
    desc: "First Colony, Telfair, New Territory, Greatwood, and Fort Bend County residential and light commercial sites.",
    to: "/service-areas",
    x: "42%",
    y: "76%",
  },
];

export function ServiceArea() {
  const { t } = useLanguage();
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);

  return (
    <section
      id="service-area"
      className="relative py-16 lg:py-20 bg-white border-b border-slate-100 overflow-hidden select-none"
      style={{ contentVisibility: "auto", containIntrinsicSize: "1px 650px" }}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 text-left">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#005CE6]/10 border border-[#005CE6]/20 px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-[#005CE6] shadow-sm mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#005CE6]" />
              <span>{t("Service Areas", "Áreas de Servicio")}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
              {t("HVAC Repair & Installation Across ", "Reparación e Instalación HVAC en ")}
              <span className="text-[#005CE6]">
                {t("Tomball, Cypress & Greater Houston", "Tomball, Cypress y Greater Houston")}
              </span>
            </h2>

            <p className="text-slate-600 font-medium text-sm sm:text-base leading-relaxed">
              {t(
                "Dispatched from Northpointe in Tomball, TX 77377, our technicians serve homeowners and businesses across Harris, Montgomery, and Fort Bend counties.",
                "Con base en Northpointe, Tomball, TX 77377, nuestros técnicos atienden hogares y negocios en los condados de Harris, Montgomery y Fort Bend."
              )}
            </p>
          </div>

          <Link
            to="/service-areas"
            className="inline-flex items-center gap-2 rounded-xl bg-[#005CE6] hover:bg-[#0047B3] text-white text-xs font-extrabold uppercase tracking-wider px-5 py-3.5 shadow-sm shrink-0 self-start lg:self-auto"
          >
            <span>{t("Explore All 8 Service Areas", "Ver las 8 Áreas de Servicio")}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {serviceAreas.map((area) => {
              const isActive = hoveredArea === area.name;
              return (
                <Link
                  key={area.name}
                  to={area.to}
                  onMouseEnter={() => setHoveredArea(area.name)}
                  onMouseLeave={() => setHoveredArea(null)}
                  className={`rounded-2xl p-5 border text-left transition-all duration-300 block ${
                    isActive
                      ? "bg-[#005CE6]/5 border-[#005CE6] shadow-md shadow-[#005CE6]/10"
                      : "bg-slate-50/80 border-slate-200/80 hover:bg-white hover:border-[#005CE6]/40 hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                          isActive
                            ? "bg-[#005CE6] text-white"
                            : "bg-[#005CE6]/10 text-[#005CE6]"
                        }`}
                      >
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
                </Link>
              );
            })}
          </div>

          <div className="lg:col-span-5 relative w-full max-w-full aspect-[4/3] min-h-[420px] rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl sticky top-24 box-border">
            <iframe
              title="Upfront AC & Heating Greater Houston Service Area Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d443088.0518776822!2d-95.66699313271798!3d29.98061482811463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640b8b4488d8501%3A0xca0d02def365053b!2sHouston%2C%20TX!5e0!3m2!1sen!2s!4v1782259191322!5m2!1sen!2s"
              className="absolute inset-0 w-full h-full opacity-75 grayscale invert contrast-[1.25] brightness-[0.8] pointer-events-none"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

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

            <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 bg-slate-950/90 border border-slate-700/80 backdrop-blur-md text-white rounded-2xl p-3 sm:p-3.5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 select-none z-20 shadow-xl box-border">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-[#005CE6] text-white flex items-center justify-center shrink-0 shadow-md">
                  <Navigation className="w-4 h-4" />
                </div>
                <div className="text-left leading-tight min-w-0">
                  <span className="block text-[10px] uppercase tracking-widest text-cyan-300 font-black truncate">
                    {t("Northpointe Hub · 77377", "Base en Northpointe · 77377")}
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
          </div>
        </div>
      </div>
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
        <div className="relative flex h-7 w-7 items-center justify-center">
          <span
            className={`animate-ping absolute inline-flex h-5 w-5 rounded-full opacity-75 transition-all duration-300 ${
              active
                ? "bg-cyan-400 scale-125"
                : primary
                  ? "bg-[#005CE6]"
                  : "bg-blue-400"
            }`}
          />
          <span
            className={`relative inline-flex rounded-full h-4 w-4 items-center justify-center text-white shadow-md transition-all duration-300 ${
              active
                ? "bg-cyan-400 scale-110 shadow-[0_0_12px_rgba(34,211,238,0.8)]"
                : "bg-[#005CE6]"
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
          </span>
        </div>

        <span
          className={`px-2 py-0.5 rounded-md backdrop-blur-sm border transition-all duration-300 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap shadow-sm ${
            primary || active ? "inline-block" : "hidden sm:inline-block"
          } ${
            active
              ? "bg-[#005CE6] border-cyan-400 text-white scale-105 shadow-md"
              : "bg-slate-950/85 border-slate-800 text-white group-hover:bg-[#005CE6] group-hover:text-white"
          }`}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

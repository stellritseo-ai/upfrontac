import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  Building2,
  CheckCircle2,
  Flame,
  Home,
  MapPin,
  ShieldCheck,
  Snowflake,
  Sparkles,
  Wrench,
  Zap,
  PhoneCall,
  ChevronRight,
  Clock,
  Award,
} from "lucide-react";
import hvacInstallImg from "@/assets/service-hvac-install.png";
import acImg from "@/assets/service-air-conditioning.png";
import hvacRepairsImg from "@/assets/service-hvac-repairs.png";
import acCypressImg from "@/assets/service-ac-cypress.png";
import acTomballImg from "@/assets/service-ac-tomball.png";
import heatingImg from "@/assets/service-heating.png";
import hvacMaintenanceImg from "@/assets/service-hvac-maintenance.png";
import iaqImg from "@/assets/service-indoor-air-quality.png";
import commercialHvacImg from "@/assets/service-commercial-hvac.png";
import residentialHvacImg from "@/assets/service-residential-hvac.png";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";

interface ServiceItem {
  id: string;
  num: string;
  icon: any;
  title: string;
  subtitle: string;
  badge: string;
  desc: string;
  image: string;
  to: string;
  specs: string[];
}

export function Services() {
  const { t } = useLanguage();

  const services: ServiceItem[] = [
    {
      id: "hvac-install",
      num: "01",
      icon: Wrench,
      title: t("HVAC INSTALLATION", "INSTALACIÓN HVAC"),
      subtitle: t("Custom Heating & Cooling Systems", "Sistemas de Calefacción y AC Personalizados"),
      badge: t("Most Requested", "Más Solicitado"),
      desc: t(
        "Complete custom design and professional installation of high-efficiency heating and air conditioning systems for residential replacements and new construction projects.",
        "Diseño personalizado completo e instalación profesional de sistemas de aire acondicionado y calefacción de alta eficiencia para reemplazos residenciales y nuevas construcciones."
      ),
      image: hvacInstallImg,
      to: "/services/hvac-install",
      specs: [t("Energy Star Qualified", "Calificación Energy Star"), t("Custom Duct Design", "Diseño de Ductos a Medida"), t("Free In-Home Quote", "Cotización Gratis en Casa")],
    },
    {
      id: "air-conditioning",
      num: "02",
      icon: Snowflake,
      title: t("AIR CONDITIONING", "AIRE ACONDICIONADO"),
      subtitle: t("High-Efficiency Cooling Solutions", "Soluciones de Enfriamiento Eficientes"),
      badge: t("Cooling", "Enfriamiento"),
      desc: t(
        "Energy-efficient central air conditioner installation, SEER2 upgrades, compressor replacements, and smart climate control integration.",
        "Instalación de aire acondicionado central de alta eficiencia, actualizaciones SEER2, reemplazo de compresores e integración de control climático inteligente."
      ),
      image: acImg,
      to: "/services/air-conditioning",
      specs: [t("SEER2 High Efficiency", "Alta Eficiencia SEER2"), t("24/7 Emergency Cooling", "Enfriamiento de Emergencia 24/7"), t("Quiet Operation", "Operación Silenciosa")],
    },
    {
      id: "hvac-repairs",
      num: "03",
      icon: Activity,
      title: t("HVAC REPAIRS", "REPARACIONES HVAC"),
      subtitle: t("24/7 Rapid Emergency Dispatch", "Despacho de Emergencia Rápido 24/7"),
      badge: t("Emergency 24/7", "Emergencia 24/7"),
      desc: t(
        "Fast diagnostic and repair services for frozen coils, refrigerant leaks, electrical failures, faulty capacitors, and complete system breakdowns.",
        "Servicio rápido de diagnóstico y reparación para serpentines congelados, fugas de freón, fallas eléctricas, capacitores y averías completas."
      ),
      image: hvacRepairsImg,
      to: "/services/hvac-repairs",
      specs: [t("Same-Day Dispatch", "Despacho el Mismo Día"), t("All Brands Serviced", "Todas las Marcas Atendidas"), t("Transparent Pricing", "Precios Transparentes")],
    },
    {
      id: "ac-cypress",
      num: "04",
      icon: MapPin,
      title: t("AC REPAIR CYPRESS", "REPARACIÓN AC CYPRESS"),
      subtitle: t("Local Cypress, TX AC Specialists", "Especialistas Locales de AC en Cypress, TX"),
      badge: "Cypress, TX",
      desc: t(
        "Dedicated local HVAC service technicians providing fast, reliable AC repair, tune-ups, and emergency cooling response throughout Cypress, TX.",
        "Técnicos de servicio HVAC locales dedicados que brindan reparación rápida de AC, puestas a punto y respuesta de emergencia en Cypress, TX."
      ),
      image: acCypressImg,
      to: "/services/ac-repair-cypress",
      specs: [t("Fast Cypress Arrival", "Llegada Rápida en Cypress"), t("Local Technicians", "Técnicos Locales"), t("No Travel Charges", "Sin Cargos de Viaje")],
    },
    {
      id: "ac-tomball",
      num: "05",
      icon: MapPin,
      title: t("AC REPAIR TOMBALL", "REPARACIÓN AC TOMBALL"),
      subtitle: t("Tomball's Trusted HVAC Experts", "Expertos HVAC de Confianza en Tomball"),
      badge: "Tomball, TX",
      desc: t(
        "Top-rated air conditioning repair, freon recharges, fan motor replacements, and system maintenance for homeowners in Tomball, TX.",
        "Reparación de aire acondicionado altamente calificada, recarga de freón, reemplazo de motores y mantenimiento para propietarios en Tomball, TX."
      ),
      image: acTomballImg,
      to: "/services/ac-repair-tomball",
      specs: [t("Tomball Headquarters", "Sede en Tomball"), t("Freon Leak Check", "Revisión Fugas de Freón"), t("Satisfaction Guaranteed", "Garantía de Satisfacción")],
    },
    {
      id: "heating",
      num: "06",
      icon: Flame,
      title: t("HEATING SERVICES", "SERVICIOS CALEFACCIÓN"),
      subtitle: t("Gas Furnaces & Heat Pumps", "Hornos de Gas y Bombas de Calor"),
      badge: t("Heating", "Calefacción"),
      desc: t(
        "Comprehensive heating services including gas furnace repair, heat pump maintenance, heat exchanger inspections, and emergency heating fixes.",
        "Servicios integrales de calefacción que incluyen reparación de hornos de gas, mantenimiento de bombas de calor e inspección de intercambiadores."
      ),
      image: heatingImg,
      to: "/services/heating",
      specs: [t("Gas & Electric Furnaces", "Hornos Eléctricos y de Gas"), t("Heat Pump Tuning", "Ajuste de Bombas de Calor"), t("Carbon Monoxide Safety", "Seguridad Monóxido")],
    },
    {
      id: "hvac-maintenance",
      num: "07",
      icon: CheckCircle2,
      title: t("HVAC MAINTENANCE", "MANTENIMIENTO HVAC"),
      subtitle: t("Preventative Care & Tune-Ups", "Cuidado Preventivo y Puestas a Punto"),
      badge: t("Preventative", "Preventivo"),
      desc: t(
        "Preventative maintenance plans featuring 21-point system tune-ups, coil cleaning, filter replacements, and seasonal efficiency checks.",
        "Planes de mantenimiento preventivo con puestas a punto de 21 puntos, limpieza de serpentín, cambio de filtros y controles de eficiencia."
      ),
      image: hvacMaintenanceImg,
      to: "/services/hvac-maintenance",
      specs: [t("21-Point System Inspection", "Inspección de 21 Puntos"), t("Extends System Lifespan", "Extiende Vida Útil"), t("Lowers Monthly Utility Bills", "Reduce Facturas de Luz")],
    },
    {
      id: "indoor-air-quality",
      num: "08",
      icon: Sparkles,
      title: t("INDOOR AIR QUALITY", "CALIDAD DE AIRE INTERIOR"),
      subtitle: t("Clean Air & Purification", "Aire Limpio y Purificación"),
      badge: t("Clean Air", "Aire Limpio"),
      desc: t(
        "Breathe clean air with whole-home UV germicidal light purifiers, high-MERV HEPA air filters, dehumidifiers, and air duct sanitation.",
        "Respire aire limpio con purificadores germicidas UV para todo el hogar, filtros HEPA de alto MERV, deshumidificadores y desinfección de ductos."
      ),
      image: iaqImg,
      to: "/services/indoor-air-quality",
      specs: [t("Whole-Home UV Purifiers", "Purificadores UV Todo el Hogar"), t("HEPA Filtration Systems", "Sistemas Filtración HEPA"), t("Humidity Control", "Control de Humedad")],
    },
    {
      id: "commercial-hvac",
      num: "09",
      icon: Building2,
      title: t("COMMERCIAL HVAC", "HVAC COMERCIAL"),
      subtitle: t("Building Climate Solutions", "Soluciones de Clima para Edificios"),
      badge: t("Commercial", "Comercial"),
      desc: t(
        "Heavy-duty commercial HVAC solutions for office buildings, retail centers, and industrial facilities. Rooftop units, chillers, and VRF systems.",
        "Soluciones HVAC comerciales de servicio pesado para edificios de oficinas, centros comerciales e instalaciones industriales. Unidades de techo y enfriadores."
      ),
      image: commercialHvacImg,
      to: "/services/commercial-hvac",
      specs: [t("Rooftop Package Units", "Unidades Paquete Techo"), t("Commercial Maintenance Plans", "Planes Mantenimiento Comercial"), t("VRF & Chiller Support", "Soporte VRF y Enfriadores")],
    },
    {
      id: "residential-hvac",
      num: "10",
      icon: Home,
      title: t("RESIDENTIAL HVAC", "HVAC RESIDENCIAL"),
      subtitle: t("Complete Home Climate Care", "Cuidado del Clima del Hogar"),
      badge: t("Residential", "Residencial"),
      desc: t(
        "Tailored residential heating & cooling systems designed for Texas heat. Smart Nest/Honeywell thermostat installation and zoning optimization.",
        "Sistemas de calefacción y aire acondicionado residenciales diseñados para el calor de Texas. Termostatos inteligentes y optimización por zonas."
      ),
      image: residentialHvacImg,
      to: "/services/residential-hvac",
      specs: [t("Smart Thermostat Setup", "Configuración Termostato Smart"), t("Custom Home Zoning", "Zonificación Personalizada"), t("Quiet Efficient Comfort", "Confort Silencioso y Eficiente")],
    },
  ];

  const [activeServiceId, setActiveServiceId] = useState<string>("hvac-install");
  const activeService = services.find((s) => s.id === activeServiceId) || services[0];

  return (
    <section id="services" className="bg-[#F8FAFC] py-20 overflow-hidden border-y border-slate-200/80 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">

        {/* ── Top Header ────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="flex flex-col items-start text-left max-w-2xl">
            
            {/* Tagline Pill */}
            <div className="inline-flex items-center gap-2 rounded-full bg-[#005CE6]/10 border border-[#005CE6]/20 px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-[#005CE6] shadow-sm mb-4">
              <Zap className="h-3.5 w-3.5 text-[#005CE6] fill-[#005CE6]" />
              <span>{t("Our Specialized HVAC Services", "Nuestros Servicios HVAC Especializados")}</span>
            </div>

            {/* Title */}
            <h2 className="font-display text-2xl sm:text-3xl lg:text-[37px] font-extrabold text-slate-900 leading-[1.2] tracking-tight">
              {t("Explore Our ", "Explore Nuestros ")}
              <span className="text-[#005CE6]">
                {t("HVAC Capabilities", "Capacidades de HVAC")}
              </span>
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3">
              {t(
                "Click on any service category on the left to inspect detailed specifications, features, and immediate dispatch availability.",
                "Haga clic en cualquier categoría de servicio a la izquierda para inspeccionar especificaciones detalladas, características y disponibilidad de despacho inmediato."
              )}
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest bg-white border border-slate-200 px-3.5 py-1.5 rounded-full shadow-sm">
              TACLA133609C
            </span>
          </div>
        </div>

        {/* ── Interactive Split Stage ────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Interactive List Menu (5 cols on desktop) */}
          <div className="lg:col-span-5 flex flex-col gap-2.5 max-h-[580px] overflow-y-auto pr-2 custom-scrollbar">
            {services.map((s) => {
              const Icon = s.icon;
              const isActive = activeService.id === s.id;

              return (
                <button
                  key={s.id}
                  onClick={() => setActiveServiceId(s.id)}
                  className={`group relative w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between ${
                    isActive
                      ? "bg-gradient-to-r from-[#005CE6] to-[#0047B3] border-[#005CE6] text-white shadow-lg shadow-[#005CE6]/25 translate-x-1"
                      : "bg-white hover:bg-slate-100/80 border-slate-200/90 text-slate-800 hover:text-[#005CE6] shadow-sm"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    {/* Index Number */}
                    <span className={`text-xs font-black tracking-widest ${isActive ? "text-cyan-200" : "text-slate-400"}`}>
                      {s.num}
                    </span>

                    {/* Icon Box */}
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600 group-hover:text-[#005CE6] group-hover:bg-[#005CE6]/10"
                    }`}>
                      <Icon className="w-4.5 h-4.5" />
                    </div>

                    {/* Title & Subtitle */}
                    <div className="flex flex-col text-left">
                      <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wide leading-tight">
                        {s.title}
                      </span>
                      <span className={`text-[11px] font-medium mt-0.5 ${isActive ? "text-slate-100" : "text-slate-500"}`}>
                        {s.subtitle}
                      </span>
                    </div>
                  </div>

                  <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? "text-white translate-x-1" : "text-slate-400 group-hover:text-[#005CE6]"}`} />
                </button>
              );
            })}
          </div>

          {/* Right Column: Dynamic Spotlight Stage (7 cols on desktop) */}
          <div className="lg:col-span-7 relative w-full rounded-3xl bg-slate-900 border border-slate-200/80 shadow-[0_20px_50px_rgba(15,23,42,0.12)] overflow-hidden min-h-[580px] flex flex-col justify-end">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 w-full h-full flex flex-col justify-end"
              >
                {/* Full Stage Image */}
                <img
                  src={activeService.image}
                  alt={activeService.title}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />

                {/* Gradient Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/20" />

                {/* Top Badge Overlay */}
                <div className="absolute top-5 left-5 z-20 flex items-center gap-2">
                  <span className="rounded-full bg-[#005CE6] px-3.5 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-md border border-white/20">
                    {activeService.badge}
                  </span>
                  <span className="rounded-full bg-white/90 backdrop-blur-md px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-800 border border-white/60 shadow-sm">
                    Licensed TACLA133609C
                  </span>
                </div>

                {/* Stage Content */}
                <div className="relative z-20 p-6 sm:p-8 text-left">
                  
                  {/* Category Subtitle */}
                  <span className="text-xs font-black uppercase tracking-widest text-cyan-400">
                    {activeService.subtitle}
                  </span>

                  {/* Service Title */}
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight mt-1">
                    {activeService.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mt-3 max-w-xl">
                    {activeService.desc}
                  </p>

                  {/* Specification Bullets */}
                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {activeService.specs.map((spec, i) => (
                      <div key={i} className="flex items-center gap-2 rounded-xl bg-white/15 backdrop-blur-md px-3 py-2 border border-white/20 text-[11px] font-bold text-white shadow-sm">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>

                  {/* Dual Action CTA Buttons */}
                  <div className="mt-7 flex flex-wrap items-center gap-4">
                    <Button asChild size="lg" className="rounded-full font-extrabold px-7 bg-[#005CE6] hover:bg-[#0047B3] text-white shadow-lg shadow-[#005CE6]/40">
                      <a href="#get-in-touch" className="flex items-center gap-2">
                        <span>{t("Schedule Service Now", "Programar Servicio Ahora")}</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </Button>

                    <a
                      href="tel:7138197908"
                      className="inline-flex items-center gap-2 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md px-6 py-3 text-xs font-extrabold text-white border border-white/30 transition-all shadow-sm"
                    >
                      <PhoneCall className="w-4 h-4 text-cyan-400" />
                      <span>{t("Call (713) 819-7908", "Llamar (713) 819-7908")}</span>
                    </a>
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>

          </div>

        </div>

        {/* ── Bottom Guarantee Highlights ───────────────────── */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 rounded-2xl bg-white border border-slate-200/90 p-6 text-left shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#005CE6]/10 text-[#005CE6] flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-xs font-extrabold text-slate-900">{t("24/7 Response", "Respuesta 24/7")}</span>
              <span className="text-[11px] text-slate-500 font-medium">{t("Same-Day Dispatch", "Despacho Mismo Día")}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#005CE6]/10 text-[#005CE6] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-xs font-extrabold text-slate-900">{t("Licensed & Insured", "Con Licencia y Seguro")}</span>
              <span className="text-[11px] text-slate-500 font-medium">TACLA133609C</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#005CE6]/20 text-[#005CE6] flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-xs font-extrabold text-slate-900">{t("BBB Accredited", "Acreditado por BBB")}</span>
              <span className="text-[11px] text-slate-500 font-medium">{t("A+ Rated Contractor", "Calificación A+")}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#005CE6]/10 text-[#005CE6] flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-xs font-extrabold text-slate-900">{t("Free Estimates", "Presupuestos Gratis")}</span>
              <span className="text-[11px] text-slate-500 font-medium">{t("No Upfront Costs", "Sin Costos Ocultos")}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

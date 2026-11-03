import { Link } from "@tanstack/react-router";
import { useLanguage } from "@/hooks/useLanguage";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import {
  CheckCircle2,
  ShieldCheck,
  Clock,
  Award,
  PhoneCall,
  Sparkles,
  FileSpreadsheet,
} from "lucide-react";
import { AutoPlayVideo } from "@/components/ui/AutoPlayVideo";

const WHY_CHOOSE_VIDEO_URL =
  "https://res.cloudinary.com/swvkivle/video/upload/f_auto,q_auto/v1787599054/videowhychooseus.mp4";

export function WhyChooseUs() {
  const { t } = useLanguage();
  const { settings, phoneTel } = useSiteSettings();

  const features = [
    {
      icon: FileSpreadsheet,
      title: t("Published Flat-Rate Repair Menu", "Menú Público de Precios Fijos"),
      desc: t(
        "Review real diagnostic, capacitor, contactor, motor, and leak-check prices on our website before you ever book a call.",
        "Consulte precios reales de diagnóstico, capacitores, contactores y motores en nuestro sitio antes de agendar."
      ),
    },
    {
      icon: Award,
      title: t("EPA-Certified In-House Technicians", "Técnicos Internos Certificados por EPA"),
      desc: t(
        "Trained employees led by founder Allen Swindell (15+ years HVAC trade experience) — never unvetted subcontractors.",
        "Empleados capacitados dirigidos por Allen Swindell (15+ años de experiencia) — nunca subcontratistas."
      ),
    },
    {
      icon: CheckCircle2,
      title: t("Repair-First Philosophy", "Filosofía de Reparar Primero"),
      desc: t(
        "When a system can be safely and cost-effectively repaired, we fix the faulty component instead of pushing a premature replacement.",
        "Cuando un sistema puede repararse de forma segura y rentable, reparamos el componente en lugar de presionar un reemplazo."
      ),
    },
    {
      icon: ShieldCheck,
      title: t("Texas TDLR License TACLA133609C", "Licencia TDLR de Texas TACLA133609C"),
      desc: t(
        "State-licensed and insured for residential and commercial heating, cooling, and refrigerant work across Texas.",
        "Con licencia estatal y seguro para trabajos residenciales y comerciales de calefacción y refrigeración en Texas."
      ),
    },
    {
      icon: Clock,
      title: t("Manual J Load Sizing on Replacements", "Cálculo de Carga Manual J en Reemplazos"),
      desc: t(
        "When a replacement is needed, we size SEER2 equipment and inspect ductwork static pressure for Texas heat and humidity.",
        "Cuando se requiere reemplazo, dimensionamos equipos SEER2 y revisamos la presión estática de los conductos."
      ),
    },
    {
      icon: Sparkles,
      title: t("Written Part & Labor Warranties", "Garantías por Escrito"),
      desc: t(
        "Every repair and installation includes clear written warranty coverage listed item-by-item on your invoice.",
        "Cada reparación e instalación incluye cobertura de garantía clara por escrito en su factura."
      ),
    },
  ];

  return (
    <section
      id="why-choose-us"
      className="py-20 bg-white border-b border-slate-100 overflow-hidden"
      style={{ contentVisibility: "auto", containIntrinsicSize: "1px 700px" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16 items-center">
          <div className="flex flex-col justify-center h-full w-full order-2 lg:order-1">
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#005CE6]/20 bg-[#005CE6]/5 text-[#005CE6] text-[11px] font-black uppercase tracking-widest mb-5 shadow-sm select-none">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#005CE6] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#005CE6]"></span>
                </span>
                <span>{t("Why Choose Upfront AC", "Por Qué Elegir Upfront AC")}</span>
              </div>

              <h2 className="leading-[1.2] text-[#0F172A] tracking-tight font-extrabold text-2xl sm:text-3xl lg:text-4xl mb-6">
                {t("Why Homeowners & Businesses ", "Por qué propietarios y empresas ")}
                <span className="bg-gradient-to-r from-[#005CE6] via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  {t("Trust Upfront AC & Heating", "confían en Upfront AC & Heating")}
                </span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 w-full text-left">
                {features.map((f) => {
                  const Icon = f.icon;
                  return (
                    <div
                      key={f.title}
                      className="group/item flex items-start gap-3.5 bg-slate-50/70 hover:bg-[#005CE6]/5 border border-slate-100 hover:border-[#005CE6]/20 p-4 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                      <div className="w-9 h-9 rounded-xl bg-[#005CE6]/10 text-[#005CE6] flex items-center justify-center shrink-0 group-hover/item:bg-[#005CE6] group-hover/item:text-white transition-all duration-300">
                        <Icon className="w-4 h-4" />
                      </div>

                      <div>
                        <h3 className="font-extrabold text-[#0F172A] text-sm group-hover/item:text-[#005CE6] transition-colors">
                          {f.title}
                        </h3>
                        <p className="text-xs text-slate-600 font-medium leading-relaxed mt-1">
                          {f.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <Link
                  to="/upfront-pricing"
                  className="inline-flex items-center justify-center gap-2 bg-[#0F172A] hover:bg-[#1e293b] text-white text-xs font-extrabold uppercase tracking-widest rounded-full px-7 py-3.5 transition-all duration-300 shadow-lg shadow-slate-900/10"
                >
                  {t("See Flat-Rate Pricing", "Ver Precios Fijos")}
                </Link>

                <a
                  href={`tel:${phoneTel}`}
                  className="inline-flex items-center justify-center gap-2 bg-[#005CE6] hover:bg-[#0047B3] text-white text-xs font-extrabold uppercase tracking-widest rounded-full px-7 py-3.5 transition-all duration-300 shadow-lg shadow-[#005CE6]/30"
                >
                  <PhoneCall className="w-4 h-4 text-cyan-300" />
                  <span>{settings.officePhone || "(713) 819-7908"}</span>
                </a>
              </div>
            </div>
          </div>

          <div className="relative w-full order-1 lg:order-2">
            <div className="relative group rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 h-[420px] sm:h-[520px] lg:h-[600px] w-full bg-slate-950">
              <AutoPlayVideo
                src={WHY_CHOOSE_VIDEO_URL}
                className="w-full h-full object-cover pointer-events-none"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 bg-slate-900/85 backdrop-blur-xl border border-white/20 rounded-2xl p-4 sm:p-5 shadow-2xl flex items-center justify-between select-none">
                <div className="text-left">
                  <p className="text-[10px] text-cyan-400 font-black uppercase tracking-widest">
                    {t("Texas TDLR Licensed", "Licencia TDLR en Texas")}
                  </p>
                  <p className="text-xs sm:text-sm font-extrabold text-white mt-0.5">
                    {t(
                      "License TACLA133609C · EPA Section 608 Certified",
                      "Licencia TACLA133609C · Certificación EPA 608"
                    )}
                  </p>
                </div>

                <span className="inline-flex items-center gap-1.5 text-[10px] font-black text-cyan-300 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full uppercase tracking-wider whitespace-nowrap shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {t("BBB Accredited", "Acreditado por BBB")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

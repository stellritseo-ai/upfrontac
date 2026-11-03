import { ArrowRight, CheckCircle2, Sparkles, Award, Home, Building2, UserCheck } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import { AutoPlayVideo } from "@/components/ui/AutoPlayVideo";

const WELCOME_VIDEO_URL =
  "https://res.cloudinary.com/swvkivle/video/upload/f_auto,q_auto/v1787599055/hvacwelcome.mp4";

export function Welcome() {
  const { t } = useLanguage();

  const focusPoints = [
    t("Texas TDLR Licensed (TACLA133609C)", "Licencia TDLR de Texas (TACLA133609C)"),
    t("Published Flat-Rate Repair Pricing", "Precios fijos de reparación publicados"),
    t("Repair-First Diagnostics — No Pressure", "Diagnóstico enfocado en reparar — sin presión"),
    t("EPA Section 608 Certified In-House Techs", "Técnicos internos certificados por EPA 608"),
  ];

  return (
    <section
      id="welcome"
      className="relative bg-gradient-to-b from-white via-slate-50/40 to-white overflow-hidden py-16 sm:py-20 border-b border-slate-100"
      style={{ contentVisibility: "auto", containIntrinsicSize: "1px 750px" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14 items-center">
          {/* Left Column: Company Introduction + Residential & Commercial Overview */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#005CE6]/10 border border-[#005CE6]/20 px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-[#005CE6] shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-[#005CE6] shrink-0" />
              <span>{t("About Upfront AC & Heating", "Acerca de Upfront AC & Heating")}</span>
            </div>

            <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-[40px] leading-[1.2] font-extrabold text-slate-900 tracking-tight">
              {t(
                "Service Before Sales: ",
                "Servicio Antes que Ventas: "
              )}
              <span className="bg-gradient-to-r from-[#005CE6] via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                {t(
                  "Honest HVAC Care in Tomball, Cypress & Houston",
                  "Cuidado Honesto de HVAC en Tomball, Cypress y Houston"
                )}
              </span>
            </h2>

            <div className="mt-5 space-y-4 font-medium text-slate-600 text-sm sm:text-base leading-relaxed">
              <p>
                {t(
                  "Upfront AC & Heating (Texas TDLR License TACLA133609C) is a family-owned, Christian-operated, BBB-accredited HVAC company headquartered in Northpointe, Tomball, TX 77377. Now in our 2nd year as an independent company, our team is led by founder Allen Swindell, who brings over 15 years of hands-on HVAC trade and oilfield mechanical experience to every job.",
                  "Upfront AC & Heating (Licencia TDLR de Texas TACLA133609C) es una empresa familiar acreditada por el BBB con sede en Northpointe, Tomball, TX 77377. En nuestro segundo año como empresa independiente, nuestro equipo está dirigido por Allen Swindell, quien aporta más de 15 años de experiencia práctica en HVAC."
                )}
              </p>
              <p>
                {t(
                  "Instead of sending commission-driven salespeople, we send trained in-house technicians who test your system, show you photographs and gauge readings of what is actually wrong, and quote repairs from our published flat-rate price sheet before any work starts.",
                  "En lugar de enviar vendedores por comisión, enviamos técnicos internos capacitados que prueban su sistema, le muestran fotos y lecturas reales, y cotizan reparaciones con precios fijos por adelantado."
                )}
              </p>
            </div>

            {/* Residential & Commercial Solutions Cards */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              <Link
                to="/services/residential-hvac"
                className="group rounded-2xl bg-slate-50 hover:bg-white border border-slate-200/90 hover:border-[#005CE6] p-4 transition-all shadow-2xs hover:shadow-md"
              >
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div className="w-8 h-8 rounded-xl bg-[#005CE6]/10 text-[#005CE6] flex items-center justify-center shrink-0">
                    <Home className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-[#005CE6]">
                    {t("Residential HVAC Solutions", "Soluciones HVAC Residenciales")}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  {t(
                    "Central AC repair, SEER2 split-system replacements, gas furnace and heat pump service, attic ductwork, and whole-home dehumidification.",
                    "Reparación de AC central, reemplazo de sistemas SEER2, calefacción, conductos y deshumidificación."
                  )}
                </p>
              </Link>

              <Link
                to="/services/commercial-hvac"
                className="group rounded-2xl bg-slate-50 hover:bg-white border border-slate-200/90 hover:border-[#005CE6] p-4 transition-all shadow-2xs hover:shadow-md"
              >
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div className="w-8 h-8 rounded-xl bg-[#005CE6]/10 text-[#005CE6] flex items-center justify-center shrink-0">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-[#005CE6]">
                    {t("Commercial HVAC Solutions", "Soluciones HVAC Comerciales")}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  {t(
                    "Packaged rooftop units (RTUs), crane-assisted replacements, multi-zone controls, and scheduled maintenance for offices, retail, and light industrial sites.",
                    "Unidades de techo (RTU), reemplazos con grúa, controles multizona y mantenimiento comercial."
                  )}
                </p>
              </Link>
            </div>

            {/* Key Credentials */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full">
              {focusPoints.map((point) => (
                <div
                  key={point}
                  className="flex items-center gap-2.5 rounded-xl bg-white border border-slate-200/80 px-3.5 py-2.5 shadow-2xs"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#005CE6] shrink-0" />
                  <span className="text-xs font-bold text-slate-800 leading-tight">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-7 flex flex-wrap items-center gap-3.5">
              <Button
                asChild
                variant="hero"
                size="lg"
                className="font-extrabold rounded-full px-7 py-3.5 bg-[#005CE6] hover:bg-[#0047B3] shadow-md transition-all duration-300"
              >
                <Link to="/about" className="flex items-center gap-2">
                  <span>{t("About Upfront AC", "Conozca Nuestra Empresa")}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Link
                to="/about-owner"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white hover:bg-slate-50 px-6 py-3 text-xs font-extrabold text-slate-800 transition"
              >
                <UserCheck className="w-4 h-4 text-[#005CE6]" />
                <span>{t("Meet Founder Allen Swindell", "Conozca al Fundador Allen Swindell")}</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Video Showcase Frame */}
          <div className="lg:col-span-5 relative group w-full flex justify-center items-center">
            <div className="relative w-full rounded-[32px] bg-slate-900/90 p-2 sm:p-3 border border-slate-200/80 shadow-[0_30px_70px_-15px_rgba(15,23,42,0.25)]">
              <div className="relative w-full aspect-[4/5] min-h-[440px] sm:min-h-[520px] rounded-[24px] overflow-hidden bg-slate-950">
                <AutoPlayVideo
                  src={WELCOME_VIDEO_URL}
                  className="w-full h-full object-cover pointer-events-none"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/20 pointer-events-none" />

                <div className="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-full bg-slate-950/80 backdrop-blur-md px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-white border border-white/20 shadow-lg">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#005CE6] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#005CE6]" />
                  </span>
                  {t("Northpointe, Tomball, TX 77377", "Northpointe, Tomball, TX 77377")}
                </div>

                <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2.5 rounded-2xl bg-white/95 backdrop-blur-md px-4 py-2.5 shadow-xl border border-white/50 text-slate-900">
                  <div className="w-8 h-8 rounded-xl bg-[#005CE6] text-white flex items-center justify-center shrink-0 shadow-md">
                    <Award className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col text-left leading-none">
                    <span className="text-[11px] font-black uppercase text-[#005CE6] tracking-wider">
                      {t("TACLA133609C", "TACLA133609C")}
                    </span>
                    <span className="text-xs font-extrabold text-slate-800 mt-0.5">
                      {t("EPA Section 608 Certified", "Certificado por EPA 608")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

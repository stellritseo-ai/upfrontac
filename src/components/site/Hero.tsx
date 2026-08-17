import { Link } from "@tanstack/react-router";
import { ArrowRight, Calculator, Clock, CreditCard, ShieldCheck, Star, Tag, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroVideo from "@/assets/herovideo.mp4";
import { useLanguage } from "@/hooks/useLanguage";
import { AutoPlayVideo } from "@/components/ui/AutoPlayVideo";

export function Hero() {
  const { t } = useLanguage();

  const badges = [
    { icon: <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400 shrink-0" />, label: t("5★ Google Reviews", "5★ Reseñas de Google") },
    { icon: <ShieldCheck className="h-3.5 w-3.5 text-sky-400 shrink-0" />, label: t("Licensed & Insured", "Licencia y Seguro") },
    { icon: <Clock className="h-3.5 w-3.5 text-cyan-400 shrink-0" />, label: t("Same-Day Service", "Servicio el Mismo Día") },
    { icon: <CreditCard className="h-3.5 w-3.5 text-emerald-400 shrink-0" />, label: t("Financing Available", "Financiamiento Disponible") },
    { icon: <Users className="h-3.5 w-3.5 text-indigo-300 shrink-0" />, label: t("Family Owned", "Empresa Familiar") },
  ];

  return (
    <section className="relative isolate min-h-screen overflow-hidden pt-16 md:pt-20 flex items-center select-none">
      {/* Background Video */}
      <div className="absolute inset-0 -z-10">
        <AutoPlayVideo
          src={heroVideo}
          className="h-full w-full object-cover pointer-events-none"
        />
        {/* Horizontal gradient overlay: dark navy on the left for text readability, blending to transparent on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/90 via-[#0F172A]/40 to-transparent" />
      </div>

      {/* Animated blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/3 h-72 w-72 rounded-full bg-primary/10 blur-3xl animate-blob" />
        <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-accent/10 blur-3xl animate-blob" style={{ animationDelay: "3s" }} />
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-14 pt-10 sm:px-6 sm:pb-20 lg:px-8 lg:pt-20 w-full flex justify-start">
        <div className="animate-fade-up text-white flex flex-col items-start text-left max-w-4xl w-full">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold backdrop-blur-md shadow-md">
            <span className="flex text-amber-400 gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-current text-amber-400" />
              ))}
            </span>
            {t("EPA-Certified · Licensed · Insured in Texas", "EPA-Certified · Licensed · Insured in Texas")}
          </span>

          <h1 className="mt-6 font-display text-[26px] leading-[36px] sm:text-[36px] sm:leading-[48px] md:text-[45px] md:leading-[58px] font-extrabold tracking-tight max-w-3xl">
            {t("AC not cooling in Houston heat? ", "AC no enfría en el calor de Houston?")}
            <span className="gradient-text-orange">
              {t("Emergency HVAC Repair", "Reparación de HVAC de Emergencia")}
            </span>{" "}
            {t("in 60 minutes or less.", "en 60 minutos o menos")}
          </h1>

          <p className="max-w-2xl mt-0 mb-[-10px] text-white text-[15px] sm:text-[17px] leading-relaxed sm:leading-[40px]">
            {t(
              "Upfront AC delivers fast, reliable heating and cooling solutions across Houston, TX — for homes and businesses. In-house EPA-certified technicians, transparent pricing, and 24/7 emergency dispatch from North Houston to Katy, Tomball, Cypress, Sugar Land and The Woodlands.",
              "Upfront AC ofrece soluciones rápidas y confiables de calefacción y refrigeración en toda el área metropolitana de Houston, TX, tanto para hogares como para negocios. Contamos con técnicos certificados por la EPA, precios transparentes y servicio de emergencia disponible las 24 horas del día, los 7 días de la semana, desde el norte de Houston hasta Katy, Tomball, Cypress, Sugar Land y The Woodlands."
            )}
          </p>

          {/* Primary CTA Buttons */}
          <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
            <Button
              asChild
              className="bg-[#005CE6] hover:bg-[#0047B3] text-white text-xs sm:text-sm font-extrabold px-6 sm:px-8 py-5 sm:py-6 rounded-2xl shadow-xl shadow-[#005CE6]/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Link to="/request-free-estimate" className="flex items-center justify-center gap-2">
                <Calculator className="h-4 w-4" />
                <span>{t("Request Free Estimate", "Solicitar Presupuesto Gratis")}</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="bg-white/10 hover:bg-white/20 text-white border-white/25 backdrop-blur-md text-xs sm:text-sm font-bold px-6 py-5 sm:py-6 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Link to="/upfront-pricing" className="flex items-center justify-center gap-2">
                <Tag className="h-4 w-4 text-cyan-300" />
                <span>{t("Explore Upfront Pricing", "Ver Precios Transparentes")}</span>
              </Link>
            </Button>
          </div>

          {/* Glass Badge Pills - Single Line */}
          <div className="mt-8 flex flex-row flex-nowrap items-center gap-2 sm:gap-2.5 w-full max-w-full overflow-x-auto no-scrollbar py-2">
            {badges.map((b, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 shrink-0 rounded-full border border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 shadow-md"
              >
                {b.icon}
                <span className="text-[11px] sm:text-xs font-bold text-white whitespace-nowrap">
                  {b.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Calculator,
  Clock,
  CreditCard,
  PhoneCall,
  ShieldCheck,
  Star,
  Tag,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import { AutoPlayVideo } from "@/components/ui/AutoPlayVideo";
import { BUSINESS } from "@/data/business";

const HERO_VIDEO_URL =
  "https://res.cloudinary.com/swvkivle/video/upload/f_auto,q_auto/v1787599071/herovideo.mp4";

export function Hero() {
  const { t } = useLanguage();

  const badges = [
    {
      icon: <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400 shrink-0" />,
      label: t("5.0★ Google Rating (50+ Reviews)", "5.0★ en Google (50+ Reseñas)"),
    },
    {
      icon: <ShieldCheck className="h-3.5 w-3.5 text-sky-400 shrink-0" />,
      label: t("TDLR License TACLA133609C", "Licencia TDLR TACLA133609C"),
    },
    {
      icon: <Clock className="h-3.5 w-3.5 text-cyan-400 shrink-0" />,
      label: t("Same-Day & Emergency Dispatch", "Servicio el Mismo Día y Emergencias"),
    },
    {
      icon: <CreditCard className="h-3.5 w-3.5 text-emerald-400 shrink-0" />,
      label: t("Upfront Flat-Rate Pricing", "Precios Fijos por Adelantado"),
    },
    {
      icon: <Users className="h-3.5 w-3.5 text-indigo-300 shrink-0" />,
      label: t("Family Owned · 15+ Yrs Trade Exp.", "Familiar · 15+ Años de Experiencia"),
    },
  ];

  return (
    <section className="relative isolate min-h-[88vh] overflow-hidden pt-16 md:pt-20 flex items-center select-none bg-[#0F172A]">
      {/* Background Video */}
      <div className="absolute inset-0 -z-10">
        <AutoPlayVideo
          src={HERO_VIDEO_URL}
          priority={true}
          className="h-full w-full object-cover pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/92 via-[#0F172A]/65 to-[#0F172A]/30" />
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-14 pt-10 sm:px-6 sm:pb-20 lg:px-8 lg:pt-16 w-full flex justify-start">
        <div className="text-white flex flex-col items-start text-left max-w-4xl w-full">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold backdrop-blur-md shadow-md">
            <span className="flex text-amber-400 gap-0.5" aria-hidden="true">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-current text-amber-400" />
              ))}
            </span>
            {t(
              "Licensed Texas HVAC Contractor · TACLA133609C · Northpointe, Tomball, TX",
              "Contratista HVAC con Licencia en Texas · TACLA133609C · Tomball, TX"
            )}
          </span>

          <h1 className="mt-6 font-display text-[28px] leading-[38px] sm:text-[38px] sm:leading-[48px] md:text-[46px] md:leading-[56px] font-extrabold tracking-tight max-w-3xl">
            {t(
              "Reliable HVAC Repair, AC Installation & ",
              "Reparación Confiable de HVAC, Instalación de AC y "
            )}
            <span className="gradient-text-orange">
              {t("Heating Services in Houston, TX", "Servicios de Calefacción en Houston, TX")}
            </span>
          </h1>

          <p className="max-w-2xl mt-4 text-slate-100 text-[15px] sm:text-[17px] leading-relaxed">
            {t(
              "Upfront AC & Heating is a family-owned, BBB-accredited HVAC contractor based in Tomball, TX and led by founder Allen Swindell with 15+ years of hands-on HVAC industry experience. Our EPA-certified in-house technicians deliver honest diagnostics, published flat-rate repair pricing, and residential and commercial HVAC service across Tomball, Cypress, Houston, Katy, Spring, Magnolia, The Woodlands, and Sugar Land.",
              "Upfront AC & Heating es un contratista familiar de HVAC con sede en Tomball, TX, dirigido por su fundador Allen Swindell con más de 15 años de experiencia en la industria. Nuestros técnicos internos certificados por la EPA ofrecen diagnósticos honestos, precios transparentes y servicio residencial y comercial en Tomball, Cypress, Houston, Katy, Spring, Magnolia, The Woodlands y Sugar Land."
            )}
          </p>

          {/* Primary CTA Buttons */}
          <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3.5">
            <a
              href={`tel:${BUSINESS.phoneE164}`}
              data-track-cta="hero-phone"
              className="inline-flex items-center justify-center gap-2.5 bg-[#005CE6] hover:bg-[#0047B3] text-white text-xs sm:text-sm font-extrabold px-6 sm:px-7 py-4 sm:py-4 rounded-2xl shadow-xl shadow-[#005CE6]/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <PhoneCall className="h-4 w-4 shrink-0" />
              <span>{t(`Call ${BUSINESS.phoneDisplay}`, `Llamar al ${BUSINESS.phoneDisplay}`)}</span>
            </a>

            <Button
              asChild
              className="bg-white text-slate-950 hover:bg-slate-100 text-xs sm:text-sm font-extrabold px-6 sm:px-7 py-5 sm:py-6 rounded-2xl shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Link
                to="/request-free-estimate"
                data-track-cta="hero-estimate"
                className="flex items-center justify-center gap-2"
              >
                <Calculator className="h-4 w-4 text-[#005CE6]" />
                <span>{t("Request Free Estimate", "Solicitar Presupuesto Gratis")}</span>
                <ArrowRight className="h-4 w-4 ml-0.5 text-[#005CE6]" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="bg-white/10 hover:bg-white/20 text-white border-white/25 backdrop-blur-md text-xs sm:text-sm font-bold px-6 py-5 sm:py-6 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Link
                to="/upfront-pricing"
                data-track-cta="hero-pricing"
                className="flex items-center justify-center gap-2"
              >
                <Tag className="h-4 w-4 text-cyan-300" />
                <span>{t("View Flat-Rate Pricing", "Ver Precios Fijos")}</span>
              </Link>
            </Button>
          </div>

          {/* Glass Badge Pills */}
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

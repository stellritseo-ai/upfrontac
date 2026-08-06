import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Process } from "@/components/site/Process";
import { EmergencyCTA } from "@/components/site/EmergencyCTA";
import { CheckCircle2, Phone, Snowflake } from "lucide-react";
import img from "@/assets/service-air-conditioning.png";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

export const Route = createFileRoute("/services/air-conditioning")({
  head: () => ({
    meta: [
      { title: "Air Conditioning Services | Upfront Air Conditioning & Heating" },
      { name: "description", content: "Complete AC repair, installation, and cooling maintenance in Tomball & Cypress, TX." },
    ],
  }),
  component: AirConditioningPage,
});

function AirConditioningPage() {
  const { t } = useLanguage();

  const features = [
    t("High-efficiency central air conditioner installation", "Instalación de AC central de alta eficiencia"),
    t("24/7 emergency AC repair & troubleshooting", "Reparación y diagnóstico de AC de emergencia 24/7"),
    t("Refrigerant leak detection & R410A / R32 recharges", "Detección de fugas de refrigerante y recargas R410A / R32"),
    t("Evaporator & condenser coil cleaning", "Limpieza de serpentín evaporador y condensador"),
    t("Smart thermostat installation & programming", "Instalación y programación de termostato inteligente"),
    t("Full home cooling air distribution tuning", "Ajuste de distribución de aire de enfriamiento para todo el hogar"),
  ];

  return (
    <>
      <PageHeader
        eyebrow={t("Air Conditioning", "Aire Acondicionado")}
        title={t("Complete Air Conditioning & Cooling Solutions", "Soluciones Completas de Aire Acondicionado")}
        subtitle={t("Keep your home cool and comfortable through the Texas heat with our certified AC installation, repair, and maintenance services.", "Mantenga su hogar fresco y cómodo durante el calor de Texas con nuestros servicios certificados de AC.")}
      />

      <section className="py-20 bg-[#F8FAFC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center">
            <div className="space-y-6 text-left">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#005CE6]/10 px-4 py-1.5 text-xs font-black uppercase text-[#005CE6]">
                <Snowflake className="w-4 h-4" /> {t("Cooling Experts", "Expertos en Enfriamiento")}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {t("Reliable AC Performance When You Need It Most", "Rendimiento Confiable de AC Cuando Más lo Necesita")}
              </h2>
              <p className="text-slate-600 leading-relaxed text-base">
                {t(
                  "When the Texas heat sets in, having a fully functioning air conditioner is essential. Our licensed technicians respond fast to fix cooling issues, replace old inefficient units, and optimize your system for lower electric bills.",
                  "Cuando llega el calor de Texas, tener un aire acondicionado en perfecto funcionamiento es esencial. Nuestros técnicos con licencia responden rápidamente para solucionar problemas de enfriamiento."
                )}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                {features.map((f, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-200/80 shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-[#005CE6] shrink-0 mt-0.5" />
                    <span className="text-xs font-bold text-slate-800 leading-snug">{f}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6 flex flex-wrap gap-4">
                <Button asChild size="lg" className="rounded-full font-extrabold px-8 bg-[#005CE6] hover:bg-[#0047B3]">
                  <Link to="/contact">{t("Schedule AC Service", "Programar Servicio de AC")}</Link>
                </Button>
                <a href="tel:8326830537" className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-xs font-extrabold text-slate-800 hover:bg-slate-100">
                  <Phone className="w-4 h-4 text-[#005CE6]" /> (832) 683-0537
                </a>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
              <img src={img} alt="Air Conditioning Services" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <Process />
      <EmergencyCTA />
    </>
  );
}

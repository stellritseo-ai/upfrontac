import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Process } from "@/components/site/Process";
import { EmergencyCTA } from "@/components/site/EmergencyCTA";
import { CheckCircle2, Phone, Home } from "lucide-react";
import img from "@/assets/service-residential-hvac.png";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

export const Route = createFileRoute("/services/residential-hvac")({
  head: () => ({
    meta: [
      { title: "Residential HVAC Services | Upfront Air Conditioning & Heating" },
      { name: "description", content: "Complete home heating & cooling installation, repair, smart thermostats, and ductwork in Cypress & Tomball, TX." },
    ],
  }),
  component: ResidentialHVACPage,
});

function ResidentialHVACPage() {
  const { t } = useLanguage();

  const features = [
    t("Complete home heating & air conditioning system replacement", "Reemplazo completo de sistema de calefacción y aire acondicionado del hogar"),
    t("Custom home zoning & temperature balance tuning", "Zonificación personalizada e igualación de temperatura en el hogar"),
    t("Smart Nest & Honeywell thermostat integration", "Integración de termostato inteligente Nest y Honeywell"),
    t("Attic insulation & ductwork leakage repair", "Aislamiento en ático y reparación de fugas en ductos"),
    t("Quiet high-efficiency 16-20 SEER2 equipment", "Equipos silenciosos de alta eficiencia 16-20 SEER2"),
    t("Family-owned BBB-accredited master HVAC contractor", "Contratista HVAC familiar acreditado por el BBB"),
  ];

  return (
    <>
      <PageHeader
        eyebrow={t("Residential HVAC", "HVAC Residencial")}
        title={t("Complete Home Climate Care & System Replacements", "Cuidado Completo del Clima del Hogar y Reemplazos de Sistemas")}
        subtitle={t("Custom residential heating and cooling solutions engineered for Texas heat. Family-owned contractor dedicated to Your Comfort Matters since 2005.", "Soluciones residenciales personalizadas de calefacción y aire acondicionado diseñadas para el calor de Texas. Contratista familiar desde 2005.")}
      />

      <section className="py-20 bg-[#F8FAFC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center">
            <div className="space-y-6 text-left">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#005CE6]/10 px-4 py-1.5 text-xs font-black uppercase text-[#005CE6]">
                <Home className="w-4 h-4" /> {t("Residential Specialists", "Especialistas Residenciales")}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {t("Your Comfort Matters — Personal Climate Solutions", "Su Confort Importa — Soluciones de Clima Personalizadas")}
              </h2>
              <p className="text-slate-600 leading-relaxed text-base">
                {t(
                  "Not every homeowner is the same — why should every system be? Upfront AC takes pride in quality over quantity, recommending and installing the exact right heating and cooling system for your home.",
                  "No todos los propietarios son iguales, ¿por qué debería serlo cada sistema? Upfront AC se enorgullece de la calidad sobre la cantidad, recomendando e instalando el sistema ideal."
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
                  <Link to="/contact">{t("Get Home Estimate", "Obtener Presupuesto para el Hogar")}</Link>
                </Button>
                <a href="tel:8326830537" className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-xs font-extrabold text-slate-800 hover:bg-slate-100">
                  <Phone className="w-4 h-4 text-[#005CE6]" /> (832) 683-0537
                </a>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
              <img src={img} alt="Residential HVAC Services" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <Process />
      <EmergencyCTA />
    </>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Process } from "@/components/site/Process";
import { EmergencyCTA } from "@/components/site/EmergencyCTA";
import { CheckCircle2, Phone, ShieldCheck, Clock, Award, Wrench } from "lucide-react";
import img from "@/assets/service-hvac-install.png";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

export const Route = createFileRoute("/services/hvac-install")({
  head: () => ({
    meta: [
      { title: "HVAC System Installation | Upfront Air Conditioning & Heating" },
      { name: "description", content: "Professional heating and cooling system design and installation in Tomball, Cypress, and Greater Houston, TX." },
    ],
  }),
  component: HVACInstallPage,
});

function HVACInstallPage() {
  const { t } = useLanguage();

  const features = [
    t("Custom system sizing & load calculations (Manual J)", "Cálculo de carga y tamaño del sistema personalizado (Manual J)"),
    t("High-efficiency SEER2 air conditioning units", "Unidades de aire acondicionado SEER2 de alta eficiencia"),
    t("Gas furnaces & hybrid heat pump installations", "Instalaciones de hornos de gas y bombas de calor híbridas"),
    t("Ductwork design, sealing, and airflow balancing", "Diseño de ductos, sellado y balanceo de flujo de aire"),
    t("Smart Wi-Fi thermostat integration (Nest, Honeywell)", "Integración de termostato inteligente Wi-Fi (Nest, Honeywell)"),
    t("Licensed TACLA133609C master technicians", "Técnicos calificados con licencia TACLA133609C"),
  ];

  return (
    <>
      <PageHeader
        eyebrow={t("HVAC Installation", "Instalación HVAC")}
        title={t("Custom Heating & Cooling System Installation", "Instalación Personalizada de Calefacción y AC")}
        subtitle={t("Professional system design, high-efficiency SEER2 equipment, and guaranteed comfort for your home or business in Cypress & Tomball, TX.", "Diseño profesional del sistema, equipos SEER2 de alta eficiencia y confort garantizado para su hogar o negocio en Cypress y Tomball, TX.")}
      />

      <section className="py-20 bg-[#F8FAFC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center">
            <div className="space-y-6 text-left">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#005CE6]/10 px-4 py-1.5 text-xs font-black uppercase text-[#005CE6]">
                <Wrench className="w-4 h-4" /> {t("Premium Installation", "Instalación Premium")}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {t("Engineered for Maximum Efficiency & Comfort", "Diseñado para Máxima Eficiencia y Confort")}
              </h2>
              <p className="text-slate-600 leading-relaxed text-base">
                {t(
                  "A proper HVAC installation is the most critical factor in your system's efficiency, comfort, and longevity. At Upfront Air Conditioning & Heating, we custom design every system specifically for your property layout, insulation, and family comfort needs.",
                  "Una instalación adecuada de HVAC es el factor más crítico en la eficiencia, el confort y la longevidad de su sistema. En Upfront Air Conditioning & Heating, diseñamos a medida cada sistema específicamente para la distribución de su propiedad."
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
                  <Link to="/contact">{t("Get Free Installation Estimate", "Obtener Presupuesto Gratis")}</Link>
                </Button>
                <a href="tel:8326830537" className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-xs font-extrabold text-slate-800 hover:bg-slate-100">
                  <Phone className="w-4 h-4 text-[#005CE6]" /> (832) 683-0537
                </a>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
              <img src={img} alt="HVAC Installation" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <Process />
      <EmergencyCTA />
    </>
  );
}

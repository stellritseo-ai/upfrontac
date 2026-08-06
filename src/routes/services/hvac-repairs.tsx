import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Process } from "@/components/site/Process";
import { EmergencyCTA } from "@/components/site/EmergencyCTA";
import { CheckCircle2, Phone, Activity } from "lucide-react";
import img from "@/assets/service-hvac-repairs.png";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

export const Route = createFileRoute("/services/hvac-repairs")({
  head: () => ({
    meta: [
      { title: "24/7 Emergency HVAC Repairs | Upfront Air Conditioning & Heating" },
      { name: "description", content: "Fast 24/7 emergency AC and heating repair services in Tomball, Cypress, and Greater Houston, TX." },
    ],
  }),
  component: HVACRepairsPage,
});

function HVACRepairsPage() {
  const { t } = useLanguage();

  const features = [
    t("24/7 Emergency HVAC dispatch with no hidden fees", "Despacho HVAC de emergencia 24/7 sin tarifas ocultas"),
    t("Frozen evaporator coil thawing & repair", "Descongelamiento y reparación de serpentín evaporador"),
    t("Capacitor, contactor, and fan motor replacements", "Reemplazo de capacitores, contactores y motores de ventilador"),
    t("Freon / Refrigerant leak detection & sealing", "Detección y sellado de fugas de freón / refrigerante"),
    t("Thermostat signal repair & electrical diagnostics", "Reparación de señal de termostato y diagnóstico eléctrico"),
    t("All major AC & heating brands serviced", "Servicio para todas las marcas principales de AC y calefacción"),
  ];

  return (
    <>
      <PageHeader
        eyebrow={t("HVAC Repairs", "Reparaciones HVAC")}
        title={t("Fast & Reliable 24/7 HVAC Emergency Repair", "Reparación Rápida y Confiable de HVAC las 24 Horas")}
        subtitle={t("Don't suffer in the heat. Our master technicians provide rapid same-day diagnostics and upfront repairs across Cypress & Tomball, TX.", "No sufra por el calor. Nuestros técnicos expertos ofrecen diagnósticos rápidos el mismo día y reparaciones transparentes en Cypress y Tomball, TX.")}
      />

      <section className="py-20 bg-[#F8FAFC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center">
            <div className="space-y-6 text-left">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#005CE6]/10 px-4 py-1.5 text-xs font-black uppercase text-[#005CE6]">
                <Activity className="w-4 h-4" /> {t("24/7 Rapid Repair", "Reparación Rápida 24/7")}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {t("Upfront Pricing & Same-Day Dispatch", "Precios Transparentes y Despacho el Mismo Día")}
              </h2>
              <p className="text-slate-600 leading-relaxed text-base">
                {t(
                  "When your air conditioner stops blowing cold air or your heater fails on a cold night, Upfront AC is on standby. We arrive fully equipped with stock parts to complete most repairs right on the first visit.",
                  "Cuando su aire acondicionado deja de soplar aire frío o su calefacción falla en una noche fría, Upfront AC está listo. Llegamos totalmente equipados para completar la mayoría de las reparaciones en la primera visita."
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
                <a href="tel:8326830537" className="inline-flex items-center gap-2 rounded-full font-extrabold px-8 py-3.5 bg-[#005CE6] hover:bg-[#0047B3] text-white shadow-lg">
                  <Phone className="w-4 h-4" /> {t("Call Emergency Hotline (832) 683-0537", "Llamar a Emergencias (832) 683-0537")}
                </a>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
              <img src={img} alt="HVAC Emergency Repairs" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <Process />
      <EmergencyCTA />
    </>
  );
}

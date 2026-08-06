import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Process } from "@/components/site/Process";
import { EmergencyCTA } from "@/components/site/EmergencyCTA";
import { CheckCircle2, Phone } from "lucide-react";
import img from "@/assets/service-hvac-maintenance.png";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

export const Route = createFileRoute("/services/hvac-maintenance")({
  head: () => ({
    meta: [
      { title: "HVAC Maintenance & Tune-Ups | Upfront Air Conditioning & Heating" },
      { name: "description", content: "21-point seasonal HVAC tune-ups, filter replacements, and coil cleaning in Cypress & Tomball, TX." },
    ],
  }),
  component: HVACMaintenancePage,
});

function HVACMaintenancePage() {
  const { t } = useLanguage();

  const features = [
    t("Comprehensive 21-point seasonal system tune-up", "Puesta a punto estacional integral de 21 puntos"),
    t("Evaporator & condenser coil chemical cleaning", "Limpieza química de serpentín evaporador y condensador"),
    t("Blower motor & electrical terminal inspection", "Inspección de motor de ventilador y terminales eléctricas"),
    t("Condensate drain line flush & algaecide treatment", "Lavado de línea de drenaje de condensado y tratamiento"),
    t("Thermostat calibration & airflow balance check", "Calibración de termostato y revisión de flujo de aire"),
    t("Extends system lifespan and lowers monthly power bills", "Extiende la vida útil y reduce facturas de energía"),
  ];

  return (
    <>
      <PageHeader
        eyebrow={t("HVAC Maintenance", "Mantenimiento HVAC")}
        title={t("Preventative HVAC Tune-Ups & Maintenance", "Mantenimiento Preventivo y Puestas a Punto de HVAC")}
        subtitle={t("Protect your investment, prevent costly breakdowns, and lower monthly utility bills with our 21-point seasonal maintenance service.", "Proteja su inversión, evite averías costosas y reduzca las facturas de luz con nuestro servicio de mantenimiento de 21 puntos.")}
      />

      <section className="py-20 bg-[#F8FAFC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center">
            <div className="space-y-6 text-left">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#005CE6]/10 px-4 py-1.5 text-xs font-black uppercase text-[#005CE6]">
                <CheckCircle2 className="w-4 h-4" /> {t("Preventative Care", "Cuidado Preventivo")}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {t("Avoid Unexpected Breakdowns With Regular Care", "Evite Averías Inesperadas con Cuidado Regular")}
              </h2>
              <p className="text-slate-600 leading-relaxed text-base">
                {t(
                  "Just like a car, your AC and heating system needs annual tune-ups to operate at peak performance. Regular maintenance catches small issues before they become expensive repair emergencies.",
                  "Al igual que un vehículo, su sistema de AC y calefacción necesita puestas a punto anuales para funcionar al máximo rendimiento."
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
                  <Link to="/contact">{t("Book Maintenance Tune-Up", "Reservar Puesta a Punto")}</Link>
                </Button>
                <a href="tel:8326830537" className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-xs font-extrabold text-slate-800 hover:bg-slate-100">
                  <Phone className="w-4 h-4 text-[#005CE6]" /> (832) 683-0537
                </a>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
              <img src={img} alt="HVAC Maintenance" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <Process />
      <EmergencyCTA />
    </>
  );
}

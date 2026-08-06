import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Process } from "@/components/site/Process";
import { EmergencyCTA } from "@/components/site/EmergencyCTA";
import { CheckCircle2, Phone, Flame } from "lucide-react";
import img from "@/assets/service-heating.png";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

export const Route = createFileRoute("/services/heating")({
  head: () => ({
    meta: [
      { title: "Heating & Furnace Services | Upfront Air Conditioning & Heating" },
      { name: "description", content: "Gas furnace repair, heat pump maintenance, and winter heating system installation in Cypress & Tomball, TX." },
    ],
  }),
  component: HeatingPage,
});

function HeatingPage() {
  const { t } = useLanguage();

  const features = [
    t("Gas furnace igniter, flame sensor & pilot repair", "Reparación de encendedor, sensor de llama y piloto de horno de gas"),
    t("Heat pump reversing valve & defrost control fixes", "Reparación de válvula de inversión y control de descongelamiento"),
    t("Heat exchanger carbon monoxide safety inspection", "Inspección de seguridad de monóxido de carbono en intercambiador"),
    t("High-efficiency gas furnace replacement & installation", "Reemplazo e instalación de horno de gas de alta eficiencia"),
    t("Electric air handler heating element replacement", "Reemplazo de elementos calefactores en manejadoras de aire"),
    t("Licensed TACLA133609C heating technicians", "Técnicos de calefacción calificados con licencia TACLA133609C"),
  ];

  return (
    <>
      <PageHeader
        eyebrow={t("Heating Services", "Servicios de Calefacción")}
        title={t("Gas Furnace & Heat Pump Heating Solutions", "Soluciones de Calefacción en Hornos de Gas y Bombas de Calor")}
        subtitle={t("Stay warm and safe all winter long with our expert furnace repair, heat pump maintenance, and heating system installations in Cypress & Tomball, TX.", "Manténgase abrigado y seguro durante todo el invierno con nuestra reparación de hornos, mantenimiento de bombas de calor e instalaciones.")}
      />

      <section className="py-20 bg-[#F8FAFC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center">
            <div className="space-y-6 text-left">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#005CE6]/10 px-4 py-1.5 text-xs font-black uppercase text-[#005CE6]">
                <Flame className="w-4 h-4" /> {t("Heating Specialists", "Especialistas en Calefacción")}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {t("Safe, Efficient Heating For Your Home", "Calefacción Segura y Eficiente Para Su Hogar")}
              </h2>
              <p className="text-slate-600 leading-relaxed text-base">
                {t(
                  "While Texas is known for heat, winter freezes can be severe. Upfront AC provides complete heating system diagnostics, gas furnace safety checks, and heat pump tune-ups to keep your family warm.",
                  "Aunque Texas es conocido por el calor, las heladas invernales pueden ser severas. Upfront AC brinda diagnósticos completos de calefacción y revisiones de seguridad en hornos de gas."
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
                  <Link to="/contact">{t("Schedule Heating Service", "Programar Servicio de Calefacción")}</Link>
                </Button>
                <a href="tel:8326830537" className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-xs font-extrabold text-slate-800 hover:bg-slate-100">
                  <Phone className="w-4 h-4 text-[#005CE6]" /> (832) 683-0537
                </a>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
              <img src={img} alt="Heating Services" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <Process />
      <EmergencyCTA />
    </>
  );
}

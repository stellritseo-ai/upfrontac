import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Process } from "@/components/site/Process";
import { EmergencyCTA } from "@/components/site/EmergencyCTA";
import { CheckCircle2, Phone, Sparkles } from "lucide-react";
import img from "@/assets/service-indoor-air-quality.png";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

export const Route = createFileRoute("/services/indoor-air-quality")({
  head: () => ({
    meta: [
      { title: "Indoor Air Quality Services | Upfront Air Conditioning & Heating" },
      { name: "description", content: "Whole-home UV germicidal air purifiers, HEPA filtration systems, and humidity control in Cypress & Tomball, TX." },
    ],
  }),
  component: IndoorAirQualityPage,
});

function IndoorAirQualityPage() {
  const { t } = useLanguage();

  const features = [
    t("Whole-home UV germicidal light air purification", "Purificación de aire con luz germicida UV para todo el hogar"),
    t("High-MERV media filters & HEPA filtration systems", "Filtros de medios de alto MERV y sistemas de filtración HEPA"),
    t("Whole-house dehumidifier & humidity management", "Deshumidificadores para toda la casa y control de humedad"),
    t("Air duct sanitation, cleaning, and sealing", "Sanitización, limpieza y sellado de ductos de aire"),
    t("REMO HALO & Air Scrubber technology installation", "Instalación de tecnología REMO HALO y Air Scrubber"),
    t("Eliminates allergens, mold spores, pet dander, and odors", "Elimina alérgenos, esporas de moho, caspa de mascotas y olores"),
  ];

  return (
    <>
      <PageHeader
        eyebrow={t("Indoor Air Quality", "Calidad del Aire Interior")}
        title={t("Clean, Healthy Air for Your Home & Family", "Aire Limpio y Saludable Para Su Hogar y Familia")}
        subtitle={t("Eliminate airborne allergens, dust, mold, viruses, and humidity with our advanced whole-home air purification and HEPA filtration systems.", "Elimine alérgenos, polvo, moho, virus y humedad con nuestros sistemas avanzados de purificación de aire y filtración HEPA.")}
      />

      <section className="py-20 bg-[#F8FAFC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center">
            <div className="space-y-6 text-left">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#005CE6]/10 px-4 py-1.5 text-xs font-black uppercase text-[#005CE6]">
                <Sparkles className="w-4 h-4" /> {t("Clean Air Specialists", "Especialistas en Aire Limpio")}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {t("Breathe Fresh, Purified Air Every Day", "Respire Aire Fresco y Purificado Todos los Días")}
              </h2>
              <p className="text-slate-600 leading-relaxed text-base">
                {t(
                  "Indoor air can be up to 5 times more polluted than outdoor air. Upfront AC installs hospital-grade air purifiers and humidity control systems directly into your existing ductwork.",
                  "El aire interior puede estar hasta 5 veces más contaminado que el exterior. Upfront AC instala purificadores de aire de grado hospitalario y control de humedad directamente en sus ductos."
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
                  <Link to="/contact">{t("Get Air Quality Quote", "Cotizar Calidad del Aire")}</Link>
                </Button>
                <a href="tel:8326830537" className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-xs font-extrabold text-slate-800 hover:bg-slate-100">
                  <Phone className="w-4 h-4 text-[#005CE6]" /> (832) 683-0537
                </a>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
              <img src={img} alt="Indoor Air Quality" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <Process />
      <EmergencyCTA />
    </>
  );
}

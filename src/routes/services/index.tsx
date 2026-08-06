import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Services } from "@/components/site/Services";
import { Process } from "@/components/site/Process";
import { EmergencyCTA } from "@/components/site/EmergencyCTA";
import { useLanguage } from "@/hooks/useLanguage";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "HVAC Services | Upfront Air Conditioning & Heating" },
      { name: "description", content: "Residential and commercial heating, AC repair, installation, maintenance, and air quality services in Tomball, Cypress, and Greater Houston, TX." },
      { property: "og:title", content: "HVAC Services | Upfront Air Conditioning & Heating" },
      { property: "og:description", content: "Full-spectrum HVAC services across Tomball & Cypress, TX." },
    ],
  }),
  component: ServicesIndex,
});

function ServicesIndex() {
  const { t } = useLanguage();
  return (
    <>
      <PageHeader
        eyebrow={t("Our Services", "Nuestros Servicios")}
        title={t("Every Room. Perfect Comfort.", "Cada Habitación. Confort Perfecto.")}
        subtitle={t("One licensed team for all your heating, cooling, and air quality needs — residential to commercial in Cypress & Tomball, TX.", "Un equipo con licencia para todas sus necesidades de calefacción, aire acondicionado y calidad del aire.")}
      />
      <Services />
      <Process />
      <EmergencyCTA />
    </>
  );
}

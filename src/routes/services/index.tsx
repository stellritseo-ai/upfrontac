import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Services } from "@/components/site/Services";
import { Process } from "@/components/site/Process";
import { EmergencyCTA } from "@/components/site/EmergencyCTA";
import { useLanguage } from "@/hooks/useLanguage";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "HVAC Services Tomball & Cypress, TX | Upfront AC & Heating" },
      { name: "description", content: "Complete residential & commercial HVAC services in Tomball, Cypress, & Greater Houston, TX. 24/7 AC repair, heating maintenance, system install, & air quality." },
      { property: "og:title", content: "HVAC Services Tomball & Cypress, TX | Upfront AC & Heating" },
      { property: "og:description", content: "Full-spectrum HVAC services across Tomball & Cypress, TX. In-house licensed technicians & 100% upfront pricing." },
    ],
    links: [
      { rel: "canonical", href: "https://www.upfrontac.com/services" }
    ],
  }),
  component: ServicesIndex,
});

function ServicesIndex() {
  const { t } = useLanguage();
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.upfrontac.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "HVAC Services",
            "item": "https://www.upfrontac.com/services"
          }
        ]
      },
      {
        "@type": "Service",
        "name": "HVAC Services",
        "provider": {
          "@type": "HVACBusiness",
          "name": "Upfront AC & Heating",
          "telephone": "+17138197908",
          "url": "https://www.upfrontac.com/"
        },
        "areaServed": ["Tomball", "Cypress", "Houston", "Katy", "Spring", "The Woodlands"],
        "description": "Comprehensive residential and commercial heating, cooling, and air quality solutions in Greater Northwest Houston."
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <PageHeader
        eyebrow={t("Our HVAC Services", "Nuestros Servicios HVAC")}
        title={t("Every Room. Perfect Comfort.", "Cada Habitación. Confort Perfecto.")}
        subtitle={t("One licensed team for all your heating, cooling, and air quality needs — residential to commercial in Cypress & Tomball, TX.", "Un equipo con licencia para todas sus necesidades de calefacción, aire acondicionado y calidad del aire.")}
      />
      <Services />
      <Process />
      <EmergencyCTA />
    </>
  );
}

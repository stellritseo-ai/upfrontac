import { createFileRoute } from "@tanstack/react-router";
import { HeatingPageDetail } from "@/components/site/HeatingPageDetail";

function Page() {
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
            "name": "Services",
            "item": "https://www.upfrontac.com/services"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Heating & Furnace",
            "item": "https://www.upfrontac.com/services/heating"
          }
        ]
      },
      {
        "@type": "Service",
        "name": "Furnace Repair & Heating Services",
        "serviceType": "Heating & Furnace Services",
        "provider": {
          "@type": "HVACBusiness",
          "name": "Upfront AC & Heating",
          "telephone": "+17138197908",
          "url": "https://www.upfrontac.com/",
          "hasCredential": {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "Texas HVAC Contractor License",
            "identifier": "TACLA133609C"
          }
        },
        "areaServed": ["Tomball", "Cypress", "Houston", "Katy", "Spring", "The Woodlands"],
        "description": "Gas furnace repair, electric heat pump maintenance, heat exchanger inspections, carbon monoxide testing, and emergency heating repairs across Greater Houston."
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <HeatingPageDetail />
    </>
  );
}

export const Route = createFileRoute("/services/heating")({
  head: () => ({
    meta: [
      { title: "Furnace Repair & Heating Services Tomball & Houston | Upfront AC" },
      { name: "description", content: "Gas furnace repair, heat pump maintenance, CO safety inspections, and emergency heating solutions across Tomball, Cypress, and Northwest Houston." },
      { property: "og:title", content: "Emergency Heating & Furnace Repair · Tomball, TX | Upfront AC" },
      { property: "og:description", content: "12,000+ HVAC jobs completed since 2005. TACLA133609C licensed, EPA-certified, flat-rate pricing." },
      { property: "og:url", content: "https://www.upfrontac.com/services/heating" },
    ],
    links: [
      { rel: "canonical", href: "https://www.upfrontac.com/services/heating" }
    ],
  }),
  component: Page,
});

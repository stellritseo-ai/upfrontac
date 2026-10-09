import { createFileRoute } from "@tanstack/react-router";
import { CommercialHvacPageDetail } from "@/components/site/CommercialHvacPageDetail";

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
            "name": "Commercial HVAC",
            "item": "https://www.upfrontac.com/services/commercial-hvac"
          }
        ]
      },
      {
        "@type": "Service",
        "name": "Commercial HVAC Repair & Maintenance",
        "serviceType": "Commercial HVAC Services",
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
        "areaServed": ["Houston", "Tomball", "Cypress", "Katy", "Spring", "The Woodlands"],
        "description": "Heavy-duty commercial HVAC solutions: RTU rooftop package units, split systems, multi-zone VAV controls, ventilation, and planned commercial maintenance contracts."
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <CommercialHvacPageDetail />
    </>
  );
}

export const Route = createFileRoute("/services/commercial-hvac")({
  head: () => ({
    meta: [
      { title: "24/7 Commercial HVAC Repair & Maintenance Houston | Upfront AC" },
      { name: "description", content: "Heavy-duty commercial HVAC solutions, rooftop package units (RTUs), VAV multi-zone systems, and commercial maintenance contracts across Tomball, Cypress, & Houston." },
      { property: "og:title", content: "24/7 Commercial HVAC · Houston, TX | Upfront AC" },
      { property: "og:description", content: "Reliable commercial heating & cooling for offices, restaurants, retail, and warehouses. Texas TDLR licensed & EPA 608 certified." },
      { property: "og:url", content: "https://www.upfrontac.com/services/commercial-hvac" },
    ],
    links: [
      { rel: "canonical", href: "https://www.upfrontac.com/services/commercial-hvac" }
    ],
  }),
  component: Page,
});

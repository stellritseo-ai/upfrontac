import { createFileRoute } from "@tanstack/react-router";
import { IndoorAirQualityPageDetail } from "@/components/site/IndoorAirQualityPageDetail";

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
            "name": "Indoor Air Quality",
            "item": "https://www.upfrontac.com/services/indoor-air-quality"
          }
        ]
      },
      {
        "@type": "Service",
        "name": "Indoor Air Quality & Purification",
        "serviceType": "Indoor Air Quality Services",
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
        "description": "Whole-home indoor air quality solutions: germicidal UV lights, whole-home dehumidifiers, MERV 11–16 hospital-grade media filtration, and air duct sanitization."
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <IndoorAirQualityPageDetail />
    </>
  );
}

export const Route = createFileRoute("/services/indoor-air-quality")({
  head: () => ({
    meta: [
      { title: "Indoor Air Quality & Whole-Home Purification | Upfront AC" },
      { name: "description", content: "Duct cleaning, UV germicidal lights, whole-home dehumidifiers, and MERV 11-16 filtration in Tomball, Cypress, Katy, & Houston, TX." },
      { property: "og:title", content: "Indoor Air Quality · Tomball & Cypress, TX | Upfront AC" },
      { property: "og:description", content: "Breathe cleaner air done right the first time. Diagnoses, treats, and verifies your home air quality with 100% itemized pricing." },
      { property: "og:url", content: "https://www.upfrontac.com/services/indoor-air-quality" },
    ],
    links: [
      { rel: "canonical", href: "https://www.upfrontac.com/services/indoor-air-quality" }
    ],
  }),
  component: Page,
});

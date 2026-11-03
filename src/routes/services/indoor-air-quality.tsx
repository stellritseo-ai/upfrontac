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
        "areaServed": ["Tomball", "Cypress", "Houston", "Katy", "Spring", "Magnolia", "The Woodlands", "Sugar Land"],
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

import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/services/indoor-air-quality")({
  head: () =>
    pageHead({
      title: "Indoor Air Quality, Dehumidifiers & Media Filtration in Houston | Upfront AC",
      description:
        "Whole-home dehumidifiers, UV germicidal lights, MERV 11–16 media air cleaners, and duct sealing across Tomball, Cypress, Katy & Houston, TX.",
      path: "/services/indoor-air-quality",
    }),
  component: Page,
});

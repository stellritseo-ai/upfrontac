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
        "areaServed": ["Tomball", "Cypress", "Houston", "Katy", "Spring", "Magnolia", "The Woodlands", "Sugar Land"],
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

import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/services/heating")({
  head: () =>
    pageHead({
      title: "Furnace Repair & Heating Services in Tomball, Cypress & Houston | Upfront AC",
      description:
        "Gas furnace repair, heat pump maintenance, heat exchanger safety inspections, and emergency heating service across Tomball, Cypress, Katy & Greater Houston, TX.",
      path: "/services/heating",
    }),
  component: Page,
});

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
        "areaServed": ["Houston", "Tomball", "Cypress", "Katy", "Spring", "Magnolia", "The Woodlands", "Sugar Land"],
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

import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/services/commercial-hvac")({
  head: () =>
    pageHead({
      title: "Commercial HVAC Repair & Rooftop Unit Service in Houston & Tomball | Upfront AC",
      description:
        "Commercial HVAC repair, rooftop package units (RTUs), split systems, and preventative maintenance contracts across Tomball, Cypress, Katy & Houston, TX.",
      path: "/services/commercial-hvac",
    }),
  component: Page,
});

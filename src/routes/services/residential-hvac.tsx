import { createFileRoute } from "@tanstack/react-router";
import { ResidentialHvacPageDetail } from "@/components/site/ResidentialHvacPageDetail";

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
            "name": "Residential HVAC",
            "item": "https://www.upfrontac.com/services/residential-hvac"
          }
        ]
      },
      {
        "@type": "Service",
        "name": "Residential HVAC Services",
        "serviceType": "Residential HVAC Services",
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
        "description": "Complete residential heating and cooling solutions: central air conditioning, heat pumps, gas furnaces, ductless mini-splits, and duct airflow balancing for Greater Houston homes."
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ResidentialHvacPageDetail />
    </>
  );
}

import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/services/residential-hvac")({
  head: () =>
    pageHead({
      title: "Residential HVAC Services in Tomball, Cypress & Houston, TX | Upfront AC",
      description:
        "Complete home heating and cooling solutions: central AC repair, Manual J load calculations, SEER2 replacements, heat pumps, and duct balancing across Tomball, Cypress & Houston.",
      path: "/services/residential-hvac",
    }),
  component: Page,
});

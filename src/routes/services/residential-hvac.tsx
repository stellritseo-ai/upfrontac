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
        "areaServed": ["Tomball", "Cypress", "Houston", "Katy", "Spring", "The Woodlands"],
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

export const Route = createFileRoute("/services/residential-hvac")({
  head: () => ({
    meta: [
      { title: "Residential HVAC Services Tomball & Cypress, TX | Upfront AC" },
      { name: "description", content: "Complete home heating & cooling done right for Texas. Home HVAC repair, Manual J load calculations, system replacements, and ductless mini-splits in Tomball & Houston." },
      { property: "og:title", content: "Residential HVAC Services in Tomball, TX | Upfront AC" },
      { property: "og:description", content: "Same-day service on most calls. TACLA133609C licensed, EPA-certified, flat-rate itemized pricing." },
      { property: "og:url", content: "https://www.upfrontac.com/services/residential-hvac" },
    ],
    links: [
      { rel: "canonical", href: "https://www.upfrontac.com/services/residential-hvac" }
    ],
  }),
  component: Page,
});

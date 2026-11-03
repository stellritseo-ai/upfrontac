import { createFileRoute } from "@tanstack/react-router";
import { AcRepairCypressPageDetail } from "@/components/site/AcRepairCypressPageDetail";

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
            "name": "AC Repair Cypress",
            "item": "https://www.upfrontac.com/services/ac-repair-cypress"
          }
        ]
      },
      {
        "@type": "Service",
        "name": "AC Repair Services Cypress, TX",
        "serviceType": "Air Conditioning Repair",
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
        "areaServed": {
          "@type": "City",
          "name": "Cypress",
          "sameAs": "https://en.wikipedia.org/wiki/Cypress,_Texas"
        },
        "description": "Fast, reliable emergency AC repair, compressor diagnostics, and Freon leak detection in Cypress, TX including Towne Lake, Bridgeland, and Fairfield."
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <AcRepairCypressPageDetail />
    </>
  );
}

import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/services/ac-repair-cypress")({
  head: () =>
    pageHead({
      title: "AC Repair Services in Cypress, TX (77429 & 77433) | Upfront AC & Heating",
      description:
        "Fast, reliable AC repair in Cypress, TX. 24/7 emergency dispatch, capacitor & refrigerant diagnostics, and upfront flat-rate pricing across Bridgeland, Towne Lake, Fairfield & Coles Crossing.",
      path: "/services/ac-repair-cypress",
    }),
  component: Page,
});

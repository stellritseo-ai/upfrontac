import { createFileRoute } from "@tanstack/react-router";
import { AcRepairTomballPageDetail } from "@/components/site/AcRepairTomballPageDetail";

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
            "name": "AC Repair Tomball",
            "item": "https://www.upfrontac.com/services/ac-repair-tomball"
          }
        ]
      },
      {
        "@type": "Service",
        "name": "AC Repair Tomball, TX",
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
          "name": "Tomball",
          "sameAs": "https://en.wikipedia.org/wiki/Tomball,_Texas"
        },
        "description": "Dependable, repair-first AC service in Tomball, TX. Fast diagnostic response, transparent flat-rate pricing and clear repair warranty terms. Serving Old Town, Northpointe, and FM 2920."
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <AcRepairTomballPageDetail />
    </>
  );
}

import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/services/ac-repair-tomball")({
  head: () =>
    pageHead({
      title: "Trusted AC Repair in Tomball, TX (77375 & 77377) | Upfront AC & Heating",
      description:
        "Dependable AC repair Tomball homeowners trust. Dispatched from Northpointe (77377) with honest diagnostics and published flat-rate pricing across Old Town Tomball, Northpointe, Rosehill & Creekside Park.",
      path: "/services/ac-repair-tomball",
    }),
  component: Page,
});

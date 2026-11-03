import { createFileRoute } from "@tanstack/react-router";
import { AirConditioningPageDetail } from "@/components/site/AirConditioningPageDetail";

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
            "name": "Air Conditioning",
            "item": "https://www.upfrontac.com/services/air-conditioning"
          }
        ]
      },
      {
        "@type": "Service",
        "name": "Air Conditioning Services",
        "serviceType": "Air Conditioning Services",
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
        "description": "Complete high-efficiency air conditioning solutions: rapid cooling repairs, SEER2 system replacements, compressor troubleshooting, and preventative tune-ups in Greater Houston."
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <AirConditioningPageDetail />
    </>
  );
}

import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/services/air-conditioning")({
  head: () =>
    pageHead({
      title: "Air Conditioning Services in Tomball, Cypress & Houston, TX | Upfront AC",
      description:
        "High-efficiency AC repairs, SEER2 system installations, and routine maintenance across Tomball, Cypress, Katy & Greater Houston, TX. 24/7 emergency cooling dispatch.",
      path: "/services/air-conditioning",
    }),
  component: Page,
});

import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { UpfrontPricingPageDetail } from "@/components/site/UpfrontPricingPageDetail";

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
            "name": "Upfront Pricing",
            "item": "https://www.upfrontac.com/upfront-pricing"
          }
        ]
      },
      {
        "@type": "WebPage",
        "name": "100% Upfront Pricing Guide",
        "url": "https://www.upfrontac.com/upfront-pricing",
        "description": "Transparent flat-rate pricing menu for AC repairs, diagnostic inspections, tune-ups, and equipment replacements with no hidden fees.",
        "provider": {
          "@type": "HVACBusiness",
          "name": "Upfront AC & Heating",
          "telephone": "+17138197908",
          "url": "https://www.upfrontac.com/"
        }
      }
    ]
  };

  return (
    <SiteLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <UpfrontPricingPageDetail />
    </SiteLayout>
  );
}

import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/upfront-pricing")({
  head: () =>
    pageHead({
      title: "100% Upfront Pricing Guide | Flat-Rate AC & Heating Repair | Upfront AC",
      description:
        "Transparent flat-rate pricing menu for AC repair, capacitors, refrigerant service, blower motors, thermostats, and HVAC maintenance across Tomball, Cypress & Houston, TX.",
      path: "/upfront-pricing",
    }),
  component: Page,
});

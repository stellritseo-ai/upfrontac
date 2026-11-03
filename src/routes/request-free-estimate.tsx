import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { RequestFreeEstimatePageDetail } from "@/components/site/RequestFreeEstimatePageDetail";

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
            "name": "Request Free Estimate",
            "item": "https://www.upfrontac.com/request-free-estimate"
          }
        ]
      },
      {
        "@type": "WebPage",
        "name": "Request a Free HVAC Estimate",
        "url": "https://www.upfrontac.com/request-free-estimate",
        "description": "Request a free in-home estimate for AC installation, heating replacement, or emergency repair in Greater Houston.",
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
      <RequestFreeEstimatePageDetail />
    </SiteLayout>
  );
}

import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/request-free-estimate")({
  head: () =>
    pageHead({
      title: "Request a Free HVAC Estimate | Tomball, Cypress & Houston, TX | Upfront AC",
      description:
        "Request a free, no-obligation HVAC replacement estimate or schedule AC & heating repair in Tomball, Cypress, Katy & Greater Houston, TX. Call (713) 819-7908.",
      path: "/request-free-estimate",
    }),
  component: Page,
});

import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { FinancePageDetail } from "@/components/site/FinancePageDetail";

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
            "name": "Financing",
            "item": "https://www.upfrontac.com/finance"
          }
        ]
      },
      {
        "@type": "WebPage",
        "name": "Air Conditioning & Heating Financing",
        "url": "https://www.upfrontac.com/finance",
        "description": "Flexible residential HVAC financing options: low monthly payments, 0% promotional APR, and fast approvals via Synchrony, Microf, JBFin, and Acorn.",
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
      <FinancePageDetail />
    </SiteLayout>
  );
}

import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/finance")({
  head: () =>
    pageHead({
      title: "HVAC Financing Options in Tomball & Houston, TX | Upfront AC",
      description:
        "Flexible residential HVAC financing options with low monthly payments and fast online approvals through Synchrony, Microf, JBFin & Acorn in Tomball, Cypress & Houston, TX.",
      path: "/finance",
    }),
  component: Page,
});

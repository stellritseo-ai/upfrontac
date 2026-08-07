import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { RequestFreeEstimatePageDetail } from "@/components/site/RequestFreeEstimatePageDetail";

function Page() {
  return (
    <SiteLayout>
      <RequestFreeEstimatePageDetail />
    </SiteLayout>
  );
}

export const Route = createFileRoute("/request-free-estimate")({
  head: () => ({
    meta: [
      { title: "Request a Free HVAC Estimate | Upfront AC | Tomball & Houston, TX" },
      { name: "description", content: "Request a free, no-obligation estimate for AC repair, furnace maintenance, or new HVAC installation in Tomball, Cypress, Katy, & Greater Houston. Call (713) 819-7908." },
      { property: "og:title", content: "Request a Free HVAC Estimate | Upfront AC" },
      { property: "og:description", content: "Fast 60-minute emergency dispatch. Licensed TACLA133609C and 100% upfront transparent pricing." },
    ],
  }),
  component: Page,
});

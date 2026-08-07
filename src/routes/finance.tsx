import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { FinancePageDetail } from "@/components/site/FinancePageDetail";

function Page() {
  return (
    <SiteLayout>
      <FinancePageDetail />
    </SiteLayout>
  );
}

export const Route = createFileRoute("/finance")({
  head: () => ({
    meta: [
      { title: "Air Conditioning & Heating Financing | Flexible Payment Plans | Upfront AC" },
      { name: "description", content: "Flexible HVAC financing options with zero-down payments, 0% promotional APR, and quick approvals through Synchrony, Microf, JBFin & Acorn in Tomball, Cypress, & Houston." },
      { property: "og:title", content: "Air Conditioning & Heating Financing | Upfront AC" },
      { property: "og:description", content: "Home comfort without financial stress. Fast approval and flexible monthly terms for new AC & heating systems. Call (713) 819-7908." },
    ],
  }),
  component: Page,
});

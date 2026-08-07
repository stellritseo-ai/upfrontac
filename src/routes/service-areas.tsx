import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ServiceAreasPageDetail } from "@/components/site/ServiceAreasPageDetail";

function Page() {
  return (
    <SiteLayout>
      <ServiceAreasPageDetail />
    </SiteLayout>
  );
}

export const Route = createFileRoute("/service-areas")({
  head: () => ({
    meta: [
      { title: "HVAC Service Areas | Tomball, Cypress, Katy & Houston | Upfront AC" },
      { name: "description", content: "Upfront AC provides HVAC repairs, AC installation, and indoor air quality services across Tomball, Cypress, Katy, Houston, Spring, Magnolia, Sugar Land, & The Woodlands, TX." },
      { property: "og:title", content: "Our Service Areas – Upfront AC" },
      { property: "og:description", content: "Fast same-day AC repair and installation across Northwest Houston. Call (713) 819-7908." },
    ],
  }),
  component: Page,
});

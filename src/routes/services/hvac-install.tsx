import { createFileRoute } from "@tanstack/react-router";
import { HvacInstallPageDetail } from "@/components/site/HvacInstallPageDetail";

function Page() {
  return <HvacInstallPageDetail />;
}

export const Route = createFileRoute("/services/hvac-install")({
  head: () => ({
    meta: [
      { title: "Emergency HVAC Installation Services Cypress, TX | Upfront AC" },
      { name: "description", content: "From load calculations to final commissioning, Upfront AC installs HVAC systems engineered for Houston’s climate in Cypress, Tomball, Katy, & Houston, TX." },
      { property: "og:title", content: "Emergency HVAC Installation · Cypress & Tomball, TX | Upfront AC" },
      { property: "og:description", content: "Built for Texas heat — efficient, affordable & built to last. Free itemized estimates & financing available." },
    ],
  }),
  component: Page,
});

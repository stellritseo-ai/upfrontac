import { createFileRoute } from "@tanstack/react-router";
import { HvacRepairsPageDetail } from "@/components/site/HvacRepairsPageDetail";

function Page() {
  return <HvacRepairsPageDetail />;
}

export const Route = createFileRoute("/services/hvac-repairs")({
  head: () => ({
    meta: [
      { title: "Same-Day Emergency HVAC Repair Tomball & Cypress, TX | Upfront AC" },
      { name: "description", content: "Fast, reliable emergency HVAC repair across Tomball, Cypress and Houston. 10+ years local experience, EPA-certified, 1-year repair warranty." },
      { property: "og:title", content: "Emergency HVAC Repair · Tomball & Cypress, TX | Upfront AC" },
      { property: "og:description", content: "Same-day HVAC repair & emergency AC service. Certified in-house technicians, 100% upfront flat-rate pricing." },
    ],
  }),
  component: Page,
});

import { createFileRoute } from "@tanstack/react-router";
import { ResidentialHvacPageDetail } from "@/components/site/ResidentialHvacPageDetail";

function Page() {
  return <ResidentialHvacPageDetail />;
}

export const Route = createFileRoute("/services/residential-hvac")({
  head: () => ({
    meta: [
      { title: "Residential HVAC Services Tomball & Cypress, TX | Upfront AC" },
      { name: "description", content: "Complete home heating & cooling done right for Texas. Home HVAC repair, Manual J load calculations, system replacements, and ductless mini-splits in Tomball & Houston." },
      { property: "og:title", content: "Residential HVAC Services in Tomball, TX | Upfront AC" },
      { property: "og:description", content: "Same-day service on most calls. TACLA133609C licensed, EPA-certified, flat-rate itemized pricing." },
    ],
  }),
  component: Page,
});

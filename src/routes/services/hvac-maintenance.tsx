import { createFileRoute } from "@tanstack/react-router";
import { HvacMaintenancePageDetail } from "@/components/site/HvacMaintenancePageDetail";

function Page() {
  return <HvacMaintenancePageDetail />;
}

export const Route = createFileRoute("/services/hvac-maintenance")({
  head: () => ({
    meta: [
      { title: "HVAC Maintenance & Tune-Up Services Tomball & Cypress, TX | Upfront AC" },
      { name: "description", content: "Systematic HVAC tune-ups built for Texas weather. Coil cleaning, refrigerant checks, 16-point checklists, and written reports across Tomball, Cypress, & Houston." },
      { property: "og:title", content: "HVAC Maintenance Tomball, TX | Upfront AC" },
      { property: "og:description", content: "Keep your HVAC running all year long. Extended lifespan to 15–18 years with bi-annual Texas-tailored tune-ups." },
    ],
  }),
  component: Page,
});


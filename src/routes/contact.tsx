import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ContactPageDetail } from "@/components/site/ContactPageDetail";

function Page() {
  return (
    <SiteLayout>
      <ContactPageDetail />
    </SiteLayout>
  );
}

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us Today | Upfront AC | Tomball & Houston, TX" },
      { name: "description", content: "Contact Upfront AC for free quotes on new heating & AC equipment installation and same-day emergency HVAC repairs across Tomball, Cypress, Katy, & Houston, TX. Call +1 (713) 819-7908." },
      { property: "og:title", content: "Contact Us Today | Upfront AC" },
      { property: "og:description", content: "Fast 24-hour response guarantee. Professional residential & commercial HVAC services in Tomball, TX." },
    ],
  }),
  component: Page,
});

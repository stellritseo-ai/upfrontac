import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { Testimonials } from "@/components/site/Testimonials";
import { EmergencyCTA } from "@/components/site/EmergencyCTA";
import { useLanguage } from "@/hooks/useLanguage";

function ReviewsPage() {
  const { t } = useLanguage();
  const schema = {
    "@context": "https://schema.org",
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
        "name": "Reviews",
        "item": "https://www.upfrontac.com/reviews"
      }
    ]
  };

  return (
    <SiteLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <PageHeader
        eyebrow={t("Verified Reviews", "Opiniones Verificadas")}
        title={t("Trusted by Greater Houston Homeowners", "Con la Confianza de Familias en Greater Houston")}
        subtitle={t("Read genuine reviews from local homeowners and businesses who rely on Upfront AC & Heating for honest repairs and transparent pricing.", "Vea lo que dicen nuestros clientes locales sobre la experiencia y el servicio honesto de Upfront AC & Heating.")}
      />
      <Testimonials isGrid={true} />
      <EmergencyCTA />
    </SiteLayout>
  );
}

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Customer Reviews & Testimonials | Upfront AC & Heating" },
      { name: "description", content: "Read verified customer reviews for Upfront AC & Heating. 5-star HVAC repair, AC installation, and heating maintenance across Tomball, Cypress, & Greater Houston, TX." },
      { property: "og:title", content: "Customer Reviews & Testimonials | Upfront AC & Heating" },
      { property: "og:description", content: "Top-rated heating & cooling solutions in Tomball & Cypress, TX. Honest HVAC service and upfront flat-rate pricing." },
    ],
    links: [
      { rel: "canonical", href: "https://www.upfrontac.com/reviews" }
    ],
  }),
  component: ReviewsPage,
});


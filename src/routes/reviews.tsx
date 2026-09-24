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
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.randeelectrical.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Reviews",
        item: "https://www.randeelectrical.com/reviews",
      },
    ],
  };

  return (
    <SiteLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <PageHeader
        eyebrow={t("Reviews", "Opiniones")}
        title={t(
          "Trusted by 300+ homes & businesses.",
          "Con la confianza de más de 300 hogares y empresas.",
        )}
        subtitle={t(
          "See what our customers say about the R&E Electrical Contractor Corp experience.",
          "Vea lo que dicen nuestros clientes sobre la experiencia con R&E Electrical Contractor Corp.",
        )}
      />
      <Testimonials isGrid={true} />
      <EmergencyCTA />
    </SiteLayout>
  );
}

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Customer Reviews | R&E Electrical Contractor Corp" },
      {
        name: "description",
        content:
          "Read 300+ five-star reviews from R&E Electrical Contractor Corp's residential and commercial electrical clients.",
      },
      {
        property: "og:title",
        content: "Customer Reviews | R&E Electrical Contractor Corp",
      },
      {
        property: "og:description",
        content: "4.9 average rating from 300+ customers.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://www.randeelectrical.com/reviews" },
    ],
  }),
  component: ReviewsPage,
});

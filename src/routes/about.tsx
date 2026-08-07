import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { About } from "@/components/site/About";
import { EmergencyCTA } from "@/components/site/EmergencyCTA";
import { useLanguage } from "@/hooks/useLanguage";

function AboutPage() {
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
        "name": "About Us",
        "item": "https://www.upfrontac.com/about"
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
        eyebrow={t("Excellence Since 2010", "Excelencia Desde 2010")}
        title={t("About Upfront Air Conditioning", "Acerca de Upfront Air Conditioning")}
        subtitle={t("Family-owned residential & commercial HVAC experts dedicated to quality over quantity in Tomball, Cypress, and Greater Houston, TX.", "Expertos en HVAC residencial y comercial dedicados a la calidad sobre la cantidad en Tomball, Cypress y Greater Houston, TX.")}
      />
      <About />
      <EmergencyCTA />
    </SiteLayout>
  );
}

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | Upfront Air Conditioning & Heating" },
      { name: "description", content: "Family-owned BBB accredited residential and commercial HVAC contractor serving Tomball, Cypress, and Greater Houston, TX since 2005." },
      { property: "og:title", content: "About Upfront Air Conditioning & Heating" },
      { property: "og:description", content: "Your comfort matters. BBB accredited licensed HVAC experts in Texas." },
    ],
    links: [
      { rel: "canonical", href: "https://www.upfrontac.com/about" }
    ],
  }),
  component: AboutPage,
});

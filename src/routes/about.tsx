import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/PageHeader";
import { About } from "@/components/site/About";
import { EmergencyCTA } from "@/components/site/EmergencyCTA";
import { useLanguage } from "@/hooks/useLanguage";
import { pageHead, breadcrumbSchema, businessSchema, graph } from "@/lib/seo";

function AboutPage() {
  const { t } = useLanguage();
  const schema = graph(
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "About Us", path: "/about" },
    ]),
    businessSchema(),
  );

  return (
    <SiteLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <PageHeader
        eyebrow={t("15+ Years Industry Experience", "15+ Años de Experiencia en la Industria")}
        title={t("About Upfront Air Conditioning & Heating", "Acerca de Upfront Air Conditioning & Heating")}
        subtitle={t("Family-owned residential & commercial HVAC contractor dedicated to honest diagnostics and upfront pricing across Tomball, Cypress, and Greater Houston, TX.", "Expertos en HVAC residencial y comercial dedicados a la calidad sobre la cantidad en Tomball, Cypress y Greater Houston, TX.")}
      />
      <About />
      <EmergencyCTA />
    </SiteLayout>
  );
}

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead({
      title: "About Upfront AC & Heating | Licensed HVAC Contractor in Tomball & Houston, TX",
      description:
        "Learn about Upfront AC & Heating — a BBB-accredited, family-owned HVAC contractor in Tomball, TX (License TACLA133609C) founded by Allen Swindell with 15+ years of trade experience.",
      path: "/about",
    }),
  component: AboutPage,
});

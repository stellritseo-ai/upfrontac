import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ContactPageDetail } from "@/components/site/ContactPageDetail";

function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
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
            "name": "Contact",
            "item": "https://www.upfrontac.com/contact"
          }
        ]
      },
      {
        "@type": "ContactPage",
        "name": "Contact Upfront AC & Heating",
        "url": "https://www.upfrontac.com/contact",
        "description": "Contact Upfront AC for free replacement estimates, emergency HVAC repairs, and scheduling across Tomball, Cypress, and Greater Houston.",
        "mainEntity": {
          "@type": "HVACBusiness",
          "name": "Upfront AC & Heating",
          "telephone": "+17138197908",
          "email": "allen@upfrontac.com",
          "url": "https://www.upfrontac.com/",
          "hasCredential": {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "Texas HVAC Contractor License",
            "identifier": "TACLA133609C"
          },
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              "opens": "07:00",
              "closes": "19:00"
            },
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Saturday", "Sunday"],
              "opens": "00:00",
              "closes": "23:59",
              "description": "24/7 Emergency Dispatch Available"
            }
          ]
        }
      }
    ]
  };

  return (
    <SiteLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
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
      { property: "og:url", content: "https://www.upfrontac.com/contact" },
    ],
    links: [
      { rel: "canonical", href: "https://www.upfrontac.com/contact" }
    ],
  }),
  component: Page,
});

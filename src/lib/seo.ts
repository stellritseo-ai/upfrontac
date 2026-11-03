import { BUSINESS, SITE_URL } from "@/data/business";

/** Absolute, crawlable social-share image (1200x630). Served from /public. */
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.jpg`;

export const absoluteUrl = (path: string) =>
  `${SITE_URL}${path === "/" ? "" : path}`.replace(/\/+$/, "") || SITE_URL;

interface PageHeadInput {
  title: string;
  description: string;
  /** Path beginning with "/", used for canonical + og:url. */
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  noindex?: boolean;
  /** Extra meta tags (e.g. article:published_time). */
  extraMeta?: Array<Record<string, string>>;
}

/**
 * One consistent <head> for every public page: unique title/description, a single canonical,
 * Open Graph + Twitter tags and an absolute share image. Using this everywhere removes the
 * old drift where og:url fell back to the homepage and og:image was a relative asset path.
 */
export function pageHead({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  imageAlt = "Upfront AC & Heating technician servicing an air conditioning system",
  type = "website",
  noindex = false,
  extraMeta = [],
}: PageHeadInput) {
  const url = path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large" },
      { property: "og:type", content: type },
      { property: "og:site_name", content: BUSINESS.legalName },
      { property: "og:locale", content: "en_US" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:image", content: image },
      { property: "og:image:alt", content: imageAlt },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
      ...extraMeta,
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

export interface Crumb {
  name: string;
  path: string;
}

export const breadcrumbSchema = (crumbs: Crumb[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    item: c.path === "/" ? `${SITE_URL}/` : `${SITE_URL}${c.path}`,
  })),
});

export const BUSINESS_ID = `${SITE_URL}/#business`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/**
 * Business entity. Only facts that are visible on the site and confirmed by the owner are included.
 * Deliberately omitted: aggregateRating / review markup (not eligible for self-serving local-business
 * reviews and must match a verifiable source), geo coordinates and street address (not supplied),
 * 24/7 opening hours (not confirmed).
 */
export const businessSchema = () => ({
  "@type": ["HVACBusiness", "LocalBusiness"],
  "@id": BUSINESS_ID,
  name: BUSINESS.legalName,
  alternateName: BUSINESS.shortName,
  url: `${SITE_URL}/`,
  logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png`, width: 512, height: 512 },
  image: DEFAULT_OG_IMAGE,
  telephone: BUSINESS.phoneE164,
  email: BUSINESS.email,
  priceRange: "$$",
  description:
    "Licensed Texas HVAC contractor in Tomball providing AC repair, HVAC installation, heating, maintenance and indoor air quality services for homes and businesses across northwest Houston and surrounding communities.",
  address: {
    "@type": "PostalAddress",
    addressLocality: BUSINESS.address.city,
    addressRegion: BUSINESS.address.region,
    postalCode: BUSINESS.address.postalCode,
    addressCountry: BUSINESS.address.country,
  },
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "Texas Air Conditioning and Refrigeration Contractor License",
    recognizedBy: { "@type": "GovernmentOrganization", name: BUSINESS.licenseAuthority },
    identifier: BUSINESS.licenseNumber,
  },
  areaServed: BUSINESS.serviceAreas.map((a) => ({
    "@type": "City",
    name: `${a.name}, TX`,
    sameAs: a.wiki,
  })),
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [...BUSINESS.hours.days],
      opens: BUSINESS.hours.opens,
      closes: BUSINESS.hours.closes,
    },
  ],
  founder: { "@id": `${SITE_URL}/about-owner#allen-swindell` },
  sameAs: [...BUSINESS.sameAs],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: BUSINESS.phoneE164,
      email: BUSINESS.email,
      contactType: "customer service",
      areaServed: "US-TX",
      availableLanguage: ["English", "Spanish"],
    },
  ],
});

export const websiteSchema = () => ({
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: BUSINESS.legalName,
  publisher: { "@id": BUSINESS_ID },
  inLanguage: "en-US",
});

/** Service entity that points back to the single business entity instead of duplicating it. */
export const serviceSchema = (opts: {
  name: string;
  serviceType: string;
  description: string;
  path: string;
  areaServed?: string[];
}) => ({
  "@type": "Service",
  "@id": `${SITE_URL}${opts.path}#service`,
  name: opts.name,
  serviceType: opts.serviceType,
  description: opts.description,
  url: `${SITE_URL}${opts.path}`,
  provider: { "@id": BUSINESS_ID },
  areaServed: (opts.areaServed ?? BUSINESS.serviceAreas.map((a) => a.name)).map((n) => ({
    "@type": "City",
    name: `${n}, TX`,
  })),
});

export const graph = (...nodes: object[]) => ({
  "@context": "https://schema.org",
  "@graph": nodes,
});

/** Escape "<" so JSON can never terminate the script tag. */
export const jsonLd = (data: object) =>
  JSON.stringify(data).replace(/</g, "\\u003c");

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  /** Highlighted box for "call a professional" situations. */
  | { type: "callout"; title: string; text: string };

export interface Article {
  slug: string;
  /** H1 — phrased as the customer's real question. */
  title: string;
  /** <title> tag, <= 60 chars before the " | Upfront AC" suffix is appended. */
  metaTitle: string;
  /** <meta description>, 140–160 chars. */
  metaDescription: string;
  /** Direct 1–3 sentence answer shown first (and used as the lead paragraph). */
  answer: string;
  category: "Cooling" | "Heating" | "Maintenance" | "Buying Guide" | "Costs";
  /** ISO dates. datePublished is the day the article was written. */
  datePublished: string;
  dateModified: string;
  readingMinutes: number;
  body: ArticleBlock[];
  /** Internal links rendered in the "Related services" box. */
  relatedServices: { label: string; to: string }[];
  /** Slugs of other articles. */
  relatedArticles: string[];
  faqs?: { q: string; a: string }[];
}

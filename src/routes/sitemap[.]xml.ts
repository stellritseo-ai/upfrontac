import { createFileRoute } from "@tanstack/react-router";
import { ARTICLES } from "@/data/articles";
import { PROJECT_CASES } from "@/data/projects";

interface SitemapEntry {
  path: string;
  changefreq: "weekly" | "monthly";
  priority: string;
  lastmod?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const BASE_URL = "https://www.upfrontac.com";
        const today = "2026-11-03";

        const staticEntries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0", lastmod: today },
          { path: "/about", changefreq: "monthly", priority: "0.8", lastmod: today },
          { path: "/about-owner", changefreq: "monthly", priority: "0.8", lastmod: today },
          { path: "/services", changefreq: "weekly", priority: "0.9", lastmod: today },
          { path: "/services/hvac-install", changefreq: "monthly", priority: "0.9", lastmod: today },
          { path: "/services/air-conditioning", changefreq: "monthly", priority: "0.9", lastmod: today },
          { path: "/services/hvac-repairs", changefreq: "weekly", priority: "0.9", lastmod: today },
          { path: "/services/ac-repair-tomball", changefreq: "weekly", priority: "0.9", lastmod: today },
          { path: "/services/ac-repair-cypress", changefreq: "weekly", priority: "0.9", lastmod: today },
          { path: "/services/heating", changefreq: "monthly", priority: "0.8", lastmod: today },
          { path: "/services/hvac-maintenance", changefreq: "monthly", priority: "0.8", lastmod: today },
          { path: "/services/indoor-air-quality", changefreq: "monthly", priority: "0.8", lastmod: today },
          { path: "/services/commercial-hvac", changefreq: "monthly", priority: "0.8", lastmod: today },
          { path: "/services/residential-hvac", changefreq: "monthly", priority: "0.8", lastmod: today },
          { path: "/service-areas", changefreq: "weekly", priority: "0.9", lastmod: today },
          { path: "/upfront-pricing", changefreq: "monthly", priority: "0.8", lastmod: today },
          { path: "/finance", changefreq: "monthly", priority: "0.8", lastmod: today },
          { path: "/request-free-estimate", changefreq: "weekly", priority: "0.9", lastmod: today },
          { path: "/projects", changefreq: "weekly", priority: "0.8", lastmod: today },
          { path: "/knowledge-center", changefreq: "weekly", priority: "0.8", lastmod: today },
          { path: "/reviews", changefreq: "monthly", priority: "0.8", lastmod: today },
          { path: "/careers", changefreq: "monthly", priority: "0.6", lastmod: today },
          { path: "/contact", changefreq: "monthly", priority: "0.8", lastmod: today },
        ];

        const projectEntries: SitemapEntry[] = PROJECT_CASES.map((p) => ({
          path: `/projects/${p.slug}`,
          changefreq: "monthly",
          priority: "0.7",
          lastmod: today,
        }));

        const articleEntries: SitemapEntry[] = ARTICLES.map((a) => ({
          path: `/knowledge-center/${a.slug}`,
          changefreq: "monthly",
          priority: "0.7",
          lastmod: a.dateModified || today,
        }));

        const allEntries = [...staticEntries, ...projectEntries, ...articleEntries];

        const urls = allEntries.map(
          (e) =>
            `  <url><loc>${BASE_URL}${e.path}</loc><lastmod>${e.lastmod || today}</lastmod><changefreq>${e.changefreq}</changefreq><priority>${e.priority}</priority></url>`,
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});

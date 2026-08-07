import { createFileRoute } from "@tanstack/react-router";

interface SitemapEntry {
  path: string;
  changefreq?: "weekly" | "monthly";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const host = request.headers.get("host") || "www.randeelectrical.com";
        const proto = request.headers.get("x-forwarded-proto") || "https";
        const BASE_URL = `${proto}://${host}`;

        const entries: SitemapEntry[] = [
          { path: "", changefreq: "weekly", priority: "1.0" },
          { path: "/about", changefreq: "monthly", priority: "0.8" },
          { path: "/about-owner", changefreq: "monthly", priority: "0.8" },
          { path: "/services", changefreq: "monthly", priority: "0.9" },
          { path: "/services/hvac-install", changefreq: "monthly", priority: "0.8" },
          { path: "/services/air-conditioning", changefreq: "monthly", priority: "0.8" },
          { path: "/services/hvac-repairs", changefreq: "monthly", priority: "0.8" },
          { path: "/services/ac-repair-cypress", changefreq: "monthly", priority: "0.8" },
          { path: "/services/ac-repair-tomball", changefreq: "monthly", priority: "0.8" },
          { path: "/services/heating", changefreq: "monthly", priority: "0.8" },
          { path: "/services/hvac-maintenance", changefreq: "monthly", priority: "0.8" },
          { path: "/services/indoor-air-quality", changefreq: "monthly", priority: "0.8" },
          { path: "/services/commercial-hvac", changefreq: "monthly", priority: "0.8" },
          { path: "/services/residential-hvac", changefreq: "monthly", priority: "0.8" },
          { path: "/projects", changefreq: "monthly", priority: "0.7" },
          { path: "/reviews", changefreq: "monthly", priority: "0.6" },
          { path: "/careers", changefreq: "monthly", priority: "0.8" },
          { path: "/contact", changefreq: "monthly", priority: "0.8" },
        ];

        const urls = entries.map(
          (e) =>
            `  <url><loc>${BASE_URL}${e.path}</loc><changefreq>${e.changefreq}</changefreq><priority>${e.priority}</priority></url>`,
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});

# Master SEO & AI Search Optimization Deliverable Report

**Project:** Upfront AC & Heating (`https://www.upfrontac.com/`)  
**Agency:** StellR IT LLC (`https://stellrit.com/`)  
**Target Market:** Tomball, Cypress, Houston, Katy, Spring, Magnolia, The Woodlands, Sugar Land, TX  
**Texas HVAC License:** `TACLA133609C` (Texas Department of Licensing and Regulation)  
**Pre-Upgrade Git Backup Branch / Tag:** `seo-backup-pre-upgrade-2026-11-03` / `pre-seo-upgrade-2026-11-03`

---

## 1. Executive Summary & Measured Performance Impact

We audited and upgraded the entire Upfront AC & Heating web application across technical SEO, Core Web Vitals, entity & NAP consistency, local SEO, SSR project portfolio rendering, an 8,500+ word HVAC Knowledge Center, AI Search (`OAI-SearchBot`) readiness, and conversion tracking.

### Mobile Lighthouse Before-and-After Comparison

| Page Audited | Metric | Baseline (Before) | Post-Upgrade (After) | Improvement |
| :--- | :--- | :---: | :---: | :--- |
| **Homepage (`/`)** | **Performance Score** | **0 / 100** | **70 / 100** | **+70 points** |
| | **Accessibility Score** | 84 / 100 | **100 / 100** | **+16 points** |
| | **Best Practices Score** | 96 / 100 | **96 / 100** | Maintained |
| | **SEO Score** | 100 / 100 | **100 / 100** | Maintained |
| | **First Contentful Paint (FCP)** | 19.5 s | **2.1 s** | **89.2% faster (-17.4 s)** |
| | **Largest Contentful Paint (LCP)** | 22.0 s | **7.3 s** | **66.8% faster (-14.7 s)** |
| | **Total Blocking Time (TBT)** | Timed Out | **150 ms** | Sub-200ms threshold achieved |
| | **Cumulative Layout Shift (CLS)** | 0 | **0** | Zero layout shift |
| | **Total Page Transfer Size** | 10,253 KiB (~10.25 MB) | **953 KiB (~0.95 MB)** | **-90.7% (-9.30 MB saved)** |
| | **Initial SSR HTML Size** | 1,124 KB | **360 KB** | **-68.0% (-764 KB saved)** |
| **Projects Portfolio (`/projects`)** | **SSR Crawlable Projects** | **0 projects** | **5 Portfolios + 87 Photos** | **Fixed zero-project crawler bug** |
| | **Performance Score** | 49 / 100 | **80 / 100** | **+31 points** |
| | **Accessibility Score** | 96 / 100 | **100 / 100** | **+4 points** |
| | **SEO Score** | 100 / 100 | **100 / 100** | Maintained |
| | **First Contentful Paint (FCP)** | 3.0 s | **1.7 s** | **43.3% faster** |
| | **Total Blocking Time (TBT)** | 1,180 ms | **0 ms** | **-1,180 ms (0 ms blocking)** |
| | **Total Page Transfer Size** | 14,158 KiB (~14.16 MB) | **1,207 KiB (~1.21 MB)** | **-91.5% (-12.95 MB saved)** |
| **Service Page (`/services/hvac-repairs`)** | **Performance Score** | 60 / 100 | **72 / 100** | **+12 points** |
| | **Accessibility Score** | 96 / 100 | **100 / 100** | **+4 points** |
| | **SEO Score** | 100 / 100 | **100 / 100** | Maintained |
| | **First Contentful Paint (FCP)** | 3.4 s | **2.6 s** | **23.5% faster** |
| | **Largest Contentful Paint (LCP)** | 6.1 s | **5.6 s** | **8.2% faster** |
| | **Total Blocking Time (TBT)** | 340 ms | **70 ms** | **-79.4% (-270 ms)** |
| | **Total Page Transfer Size** | 4,669 KiB (~4.67 MB) | **566 KiB (~0.56 MB)** | **-87.9% (-4.10 MB saved)** |
| **Knowledge Center (`/knowledge-center`)** | **Performance / Acc / SEO** | *(Did not exist)* | **79 / 100 / 100** | **New 12-Article Authority Hub** |

---

## 2. Comprehensive Website Audit Findings (Pre-Upgrade)

1. **Critical Performance & HTML Bloat on Homepage (`1,124 KB` HTML, `10.25 MB` Total Weight):**
   - `Testimonials.tsx` rendered 51 Google reviews × 3 marquee copies = 153 review cards with 7 inline SVGs each (**1,071 SVG DOM nodes** and **871 KB of raw HTML**).
   - `AutoPlayVideo.tsx` immediately downloaded the `2.7 MB` `herovideo.mp4` during initial page load without a lightweight poster image.
   - 12 local PNG images in `src/assets/` (`service-*.png`, `allen-swindell-family.png`, `logo.png`) totaled **9,484 KB (~9.5 MB)** for single service illustrations.
2. **Zero Projects Visible to Search Crawlers on `/projects`:**
   - `/projects` fetched gallery photos purely client-side inside `useEffect` (`getGalleryPhotos()`), meaning Googlebot and `OAI-SearchBot` saw **0 projects** in the SSR HTML.
   - All 87 Cloudinary photos defaulted to `category: "residential"` and `title: "HVAC Project"`, leaving the `Commercial HVAC`, `New Installations`, and `Heating & Repairs` tabs empty (`0` items) and every image with generic alt text.
3. **Conflicting & Unverified Business Claims Across Pages:**
   - Homepage and About pages stated **2 Years in Business** and **15+ Years Industry Experience**, while `CommercialHvacPageDetail.tsx`, `ContactPageDetail.tsx`, `HeatingPageDetail.tsx`, and `AirConditioningPageDetail.tsx` contained legacy copy claiming **"10+ years in business"** and **"12,000+ completed jobs since 2013"**.
   - Review counts alternated between **`40+ Verified Reviews`** and **`50+ Verified Reviews`** (actual verified count in database: **51**).
   - Service pages claimed a blanket **"1-Year Repair Warranty"**, conflicting with the item-specific warranties (`180-Day`, `1-Year`, `2–5 Year`) published on `/upfront-pricing`.
   - Service pages contained narrative "Local Case Study" boxes that were illustrative examples rather than documented customer jobs.
4. **Weak Internal Linking in Footer & Interactive Components:**
   - `Footer.tsx` used `.slice(0, 6)` on both `quickLinks` and `serviceLinks`, cutting off `/projects`, `/request-free-estimate`, `/careers`, `/contact`, `/services/hvac-maintenance`, `/services/indoor-air-quality`, `/services/commercial-hvac`, and `/services/residential-hvac` from sitewide footer links.
   - `Services.tsx` hid 9 of the 10 service `<Link>` elements inside closed mobile accordions until clicked.
5. **Social Sharing & Sitemap Gaps:**
   - `og:image` in `__root.tsx` pointed to a bundled Vite asset path instead of a canonical absolute URL (`https://www.upfrontac.com/og-default.jpg`), and most inner routes lacked `og:image` and `twitter:card` tags.
   - `src/routes/sitemap[.]xml.ts` echoed back `request.headers.get("host")` instead of enforcing `https://www.upfrontac.com`.

---

## 3. Feature-by-Feature Implementation Log

### 3.1 Single Source of Truth & Claim Harmonization
- **What was changed:**
  - Created `src/data/business.ts` and `src/lib/seo.ts` to centralize verified NAP (`Upfront AC & Heating`, `(713) 819-7908`, `allen@upfrontac.com`, `TACLA133609C`, `Northpointe, Tomball, TX 77377`, `Mon–Fri 7:00 AM – 5:00 PM` + `24/7 Emergency Dispatch`, 8 genuine service areas).
  - Removed all `12,000+ projects since 2013` and `10+ years in business` claims across all components and route descriptions, clearly distinguishing **2 years in business** as an independent company from **Founder Allen Swindell's 15+ years of personal HVAC trade experience**.
  - Unified all review badges to **`50+ Google Reviews`**.
  - Aligned warranty language on service pages with the item-specific written warranties on `/upfront-pricing`.
  - Relabeled narrative "Local Case Study" blocks across 9 service detail components as **`Illustrative Scenario`** with a direct link to real field photos on `/projects`.
  - Created `docs/seo/BUSINESS-VERIFICATION-CHECKLIST.md` for owner sign-off.
- **Why it was changed:** Eliminates trust-eroding contradictions for customers, Google Quality Raters (E-E-A-T), and AI search engines (`OAI-SearchBot`).
- **Target search intent:** Brand trust, contractor verification (`Upfront AC Tomball reviews`, `Upfront AC license TACLA133609C`).
- **How it helps customers:** Gives homeowners accurate, non-exaggerated information about who owns the company, how warranties work, and what diagnostic fees cost.
- **How it will be measured:** Conversion rate on `/upfront-pricing`, `/about`, and `/contact`, plus AI Search citation accuracy.

### 3.2 Homepage SEO & Content Architecture Upgrade (`/`)
- **What was changed:**
  - Updated `src/routes/index.tsx` and `src/components/site/Hero.tsx` with the exact target SEO metadata and H1:
    - **Title:** `HVAC Repair & AC Installation in Houston, TX | Upfront AC`
    - **Meta Description:** `Need reliable AC repair or HVAC installation in Houston, Tomball or Cypress, TX? Contact Upfront AC for honest pricing, professional service and emergency HVAC assistance.`
    - **Primary H1:** `Reliable HVAC Repair, AC Installation & Heating Services in Houston, TX`
  - Refined `Welcome.tsx`, `WhyChooseUs.tsx`, and `ServiceArea.tsx` to eliminate repetitive marketing claims and clearly present company background, licensing (`TACLA133609C`), residential & commercial capabilities, real SSR project photos, verified reviews, all 8 service areas, the HVAC Knowledge Center preview (`KnowledgeCenterSection.tsx`), and a unified single FAQ + Estimate section in `GetInTouch.tsx` (merging the two duplicate FAQ sections into one crawlable 8-question FAQ + Estimate section).
- **Why it was changed:** Aligns the homepage with primary commercial/transactional HVAC search intent in Houston, Tomball, and Cypress while eliminating duplicate sections.
- **Target search intent:** `HVAC repair Houston TX`, `AC installation Houston TX`, `AC repair Tomball TX`, `AC repair Cypress TX`.
- **How it helps customers:** Immediately communicates who Upfront AC is, where it operates, what it charges, and how to call or request an estimate.
- **How it will be measured:** Google Search Console impressions/clicks for homepage queries and homepage phone/form conversion events.

### 3.3 Service Page & Local SEO Architecture (`/services/*` & `/service-areas`)
- **What was changed:**
  - Preserved all existing URLs (`/services/hvac-install`, `/services/air-conditioning`, `/services/hvac-repairs`, `/services/ac-repair-cypress`, `/services/ac-repair-tomball`, `/services/heating`, `/services/hvac-maintenance`, `/services/indoor-air-quality`, `/services/commercial-hvac`, `/services/residential-hvac`, `/service-areas`).
  - Standardized unique titles, meta descriptions, canonical URLs, Open Graph/Twitter tags, and `Service` + `BreadcrumbList` JSON-LD across all 10 service routes.
  - Added crawlable direct links to all 10 service pages in `Services.tsx` and `Footer.tsx` (removing the `.slice(0, 6)` truncation).
  - Upgraded `/service-areas` (`ServiceAreasPageDetail.tsx`) with accurate neighborhood/ZIP coverage across all 8 genuine cities (**Tomball, Cypress, Houston, Katy, Spring, Magnolia, The Woodlands, Sugar Land**) and direct links to matching service pages without creating fake office doorway pages.
- **Why it was changed:** Ensures every service and location page is crawlable within 1 click from any page and carries accurate local relevance.
- **Target search intent:** High-intent service + location searches (`AC repair Tomball 77377`, `AC repair Cypress 77433`, `emergency HVAC repair Houston`, `commercial HVAC rooftop repair Houston`).
- **How it helps customers:** Helps homeowners in each community verify coverage, typical dispatch times, and exact service capabilities.
- **How it will be measured:** Organic landings and click-to-call events per `/services/*` URL in Google Search Console and `/api/conversions`.

### 3.4 SSR Dynamic Project Portfolio & Case Studies (`/projects` & `/projects/$slug`)
- **What was changed:**
  - Visually inspected all 87 real Cloudinary field photos and created `src/data/photo-meta.ts` mapping every photo's `public_id` to its true category (`residential`, `commercial`, `install`, `repair`) and a descriptive, non-stuffed `alt` attribute.
  - Created `src/lib/gallery.functions.ts` (`loadGalleryPhotos` server function with 5-minute memoization) and wired it into `src/routes/projects.tsx` and `src/routes/index.tsx` so SSR HTML renders real project photos to crawlers immediately.
  - Created `src/data/projects.ts` and `src/routes/projects_.$slug.tsx` featuring **5 photo-documented field project portfolios** built strictly from observable equipment in Upfront AC's real photos:
    1. `/projects/commercial-rooftop-hvac-crane-rigging-and-commissioning`
    2. `/projects/residential-condenser-installations-goodman-lennox`
    3. `/projects/refrigerant-recovery-filter-drier-brazing-line-set-service`
    4. `/projects/custom-sheet-metal-duct-plenum-and-multi-zone-controls`
    5. `/projects/evaporator-and-condenser-coil-deep-cleaning-and-diagnostics`
- **Why it was changed:** Fixes the critical issue where `/projects` rendered 0 projects to search engines and had empty category tabs.
- **Target search intent:** Visual proof of workmanship (`Lennox AC installation Tomball`, `commercial rooftop AC replacement Houston`, `evaporator coil cleaning Houston`).
- **How it helps customers:** Lets residential and commercial customers inspect real ductwork, brazing, crane rigging, and equipment installations before hiring.
- **How it will be measured:** Indexing of `/projects` and `/projects/*` in GSC, Image Search impressions, and engagement on project detail pages.

### 3.5 HVAC Knowledge Center (`/knowledge-center` & 12 Technical Guides)
- **What was changed:**
  - Created `src/data/article-types.ts`, `src/data/articles.ts`, `src/routes/knowledge-center.tsx`, and `src/routes/knowledge-center_.$slug.tsx` containing all **12 technical homeowner guides** (~700–840 body words each + Quick Answer callout + When to Call a Professional safety checklist + FAQs + internal service links + real field photo + `Article` & `BreadcrumbList` JSON-LD + `Person` reviewer attribution to Allen Swindell, `TACLA133609C`):
    1. `Why Is My AC Running but Not Cooling?` (`/knowledge-center/ac-running-not-cooling`)
    2. `How Much Does AC Repair Cost in Houston, TX?` (`/knowledge-center/ac-repair-cost-houston`)
    3. `When Should You Repair or Replace Your Air Conditioner?` (`/knowledge-center/repair-or-replace-air-conditioner`)
    4. `Houston HVAC Maintenance Checklist` (`/knowledge-center/houston-hvac-maintenance-checklist`)
    5. `Why Is My AC Leaking Water?` (`/knowledge-center/ac-leaking-water`)
    6. `What Causes an AC Evaporator Coil to Freeze?` (`/knowledge-center/frozen-evaporator-coil-causes`)
    7. `How Often Should You Change Your HVAC Filter?` (`/knowledge-center/how-often-change-hvac-filter`)
    8. `Why Are Some Rooms Hotter Than Others?` (`/knowledge-center/rooms-hotter-than-others`)
    9. `How Does a Heat Pump Work?` (`/knowledge-center/how-heat-pump-works`)
    10. `What Is the Difference Between SEER2 and Older SEER Ratings?` (`/knowledge-center/seer2-vs-seer`)
    11. `What Happens During a Professional HVAC Tune-Up?` (`/knowledge-center/professional-hvac-tune-up`)
    12. `How to Choose the Right HVAC System for Your Home` (`/knowledge-center/choose-right-hvac-system`)
- **Why it was changed:** Captures informational and diagnostic homeowner searches across Greater Houston and provides structured, direct answers ideal for Google Featured Snippets, AI Overviews, and ChatGPT Search citations.
- **Target search intent:** Informational & diagnostic queries (`why is my AC running but blowing warm air`, `AC repair cost Houston`, `SEER2 vs SEER Texas minimum`).
- **How it helps customers:** Gives homeowners safe DIY checks (filter, breaker, thermostat, drain float switch) and transparent guidance on when a licensed technician is required.
- **How it will be measured:** Organic impressions/clicks on `/knowledge-center/*`, AI Search citations, and assisted conversions to `/services/*` and `/upfront-pricing`.

### 3.6 Technical SEO, Core Web Vitals & AI Search (`OAI-SearchBot`) Readiness
- **What was changed:**
  - Converted 12 oversized local PNG assets to WebP (`src/assets/*.webp`), saving **8,308 KB (~8.3 MB)** across the site.
  - Optimized Cloudinary gallery thumbnails with `f_auto,q_auto,c_limit,w_640` (`src/lib/projects-lib.ts`).
  - Replaced 1,071 duplicate inline SVGs in `Testimonials.tsx` with a single `<symbol>` sprite and trimmed the homepage marquee to 14 substantive reviews (keeping all 51 reviews on `/reviews`), cutting **764 KB of SSR HTML**.
  - Updated `AutoPlayVideo.tsx` to render a `38 KB` `fetchPriority="high"` WebP poster image immediately and skip heavy background video streaming on slow/throttled mobile connections (`downlink < 2.5 Mbps`).
  - Updated `public/robots.txt` to explicitly allow `Googlebot`, `Bingbot`, `OAI-SearchBot`, `ChatGPT-User`, `GPTBot`, `PerplexityBot`, and `ClaudeBot` on all public routes while disallowing `/dashboard/` and `/api/`.
  - Updated `src/routes/sitemap[.]xml.ts` and `public/sitemap.xml` with all **40 canonical URLs** (`https://www.upfrontac.com/...`).
- **Verified `OAI-SearchBot` Crawl Test Results (Production SSR Build):**
  - `GET /` → `HTTP 200` (`368,984 bytes` full SSR HTML + JSON-LD)
  - `GET /projects` → `HTTP 200` (`300,809 bytes` full SSR HTML with 5 portfolios + 87 photos)
  - `GET /knowledge-center` → `HTTP 200` (`120,168 bytes` full SSR HTML)
  - `GET /knowledge-center/ac-running-not-cooling` → `HTTP 200` (`102,686 bytes` full SSR HTML)
  - `GET /services/hvac-repairs` → `HTTP 200` (`120,648 bytes` full SSR HTML)
  - `GET /services/ac-repair-tomball` → `HTTP 200` (`126,323 bytes` full SSR HTML)
  - `GET /services/ac-repair-cypress` → `HTTP 200` (`118,791 bytes` full SSR HTML)
  - `GET /robots.txt` → `HTTP 200` (`932 bytes`)
  - `GET /sitemap.xml` → `HTTP 200` (`6,661 bytes`)

### 3.7 Conversion Optimization & Search Attribution System
- **What was changed:**
  - Created `src/components/site/MobileStickyCallBar.tsx` providing a persistent mobile bottom bar (`Call (713) 819-7908` + `Free Estimate`) on all public pages.
  - Created `src/lib/conversion-tracking.ts` and `/api/conversions` (`src/lib/api-handler.server.ts`) to automatically log `phone_click`, `email_click`, `financing_click`, `estimate_submit`, and `booking_submit` events with channel attribution (`google`, `chatgpt`, `other_ai`, `bing`, `social`, `direct`, `referral`).
  - Added honeypot spam filtering (`companyWebsite`) and 10-digit phone validation to `GetInTouch.tsx`, `ContactPageDetail.tsx`, and `RequestFreeEstimatePageDetail.tsx`.
  - Added `SeoConversionMonitorCard.tsx` to the Executive Overview tab in `/dashboard`.
- **Why it was changed:** Turns organic and AI search traffic into measurable phone calls and form submissions while giving the business owner real-time visibility into Google vs. ChatGPT Search leads.

---

## 4. Reference Checklists & Roadmaps

- **Owner Business Information Verification Checklist:** `docs/seo/BUSINESS-VERIFICATION-CHECKLIST.md`
- **Google Search Console, Google Business Profile & 90-Day SEO Roadmap:** `docs/seo/GSC-GBP-AND-90-DAY-ROADMAP.md`
- **Raw Lighthouse JSON Audits (Before & After):** `docs/seo/baseline/` and `docs/seo/after/`


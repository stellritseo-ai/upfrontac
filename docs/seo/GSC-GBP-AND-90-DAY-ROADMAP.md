# Google Search Console, Google Business Profile & 90-Day SEO Action Plan

**Project:** Upfront AC & Heating (`https://www.upfrontac.com/`)  
**Agency:** StellR IT LLC (`https://stellrit.com/`)  
**Target Market:** Tomball, Cypress, Houston, Katy, Spring, Magnolia, The Woodlands, Sugar Land, TX

---

## 1. Google Search Console (GSC) Implementation & Verification Checklist

The site root (`src/routes/__root.tsx`) includes the Google Site Verification meta tag (`3Q8KuRC5Igy3P0PuIgeKYm4XlsEPzJXnH3dv9ZvvWOE`) and serves a clean, canonicalized 40-URL XML sitemap at `https://www.upfrontac.com/sitemap.xml`.

### Step-by-Step GSC Action Checklist
- [ ] **1. Confirm Domain Property Ownership:** Verify both the URL-prefix property (`https://www.upfrontac.com/`) and the Domain property (`upfrontac.com` via DNS TXT record) in Google Search Console.
- [ ] **2. Submit Updated XML Sitemap:** Navigate to **Indexing → Sitemaps** and submit `https://www.upfrontac.com/sitemap.xml` (40 indexable URLs: 23 core/hub pages + 5 photo-documented project portfolios + 12 HVAC Knowledge Center articles).
- [ ] **3. Request Priority Indexing via URL Inspection:** Manually inspect and click **Request Indexing** for the newly created and upgraded high-priority URLs:
  - `https://www.upfrontac.com/` (Upgraded Homepage title, H1, FAQ & Knowledge Center sections)
  - `https://www.upfrontac.com/projects` (SSR-loaded project portfolio — previously rendered 0 projects to crawlers)
  - `https://www.upfrontac.com/projects/lennox-goodman-attic-furnace-coil-installations`
  - `https://www.upfrontac.com/projects/residential-outdoor-condenser-installations`
  - `https://www.upfrontac.com/projects/commercial-rooftop-package-unit-service`
  - `https://www.upfrontac.com/projects/ac-troubleshooting-refrigerant-diagnostics-repairs`
  - `https://www.upfrontac.com/projects/attic-ductwork-zoning-media-air-filtration`
  - `https://www.upfrontac.com/knowledge-center` (plus top troubleshooting guides)
  - `https://www.upfrontac.com/services/ac-repair-tomball`
  - `https://www.upfrontac.com/services/ac-repair-cypress`
- [ ] **4. Audit Page Indexing Report:** Check **Indexing → Pages** weekly for:
  - *Crawled - currently not indexed*
  - *Duplicate without user-selected canonical* (verify non-`www` `http://upfrontac.com` 301-redirects to `https://www.upfrontac.com` at Vercel domain settings)
  - *Soft 404* (previously caused by `/projects` having 0 SSR items — now resolved)
- [ ] **5. Monitor Rich Results & Enhancement Reports:** Check **Enhancements → Breadcrumbs** to confirm zero structured data errors across all 40 pages.
- [ ] **6. Review Core Web Vitals Report:** Monitor mobile and desktop LCP, INP, and CLS field data (`CrUX`) over the next 28-day rolling window following the 8.3 MB WebP image and HTML payload reduction.

---

## 2. Google Business Profile (GBP) Optimization Checklist

Local Map Pack rankings in Tomball, Cypress, and Northwest Houston depend heavily on alignment between the website's structured data (`HVACBusiness` JSON-LD) and the Google Business Profile.

### GBP Configuration & Alignment Checklist
- [ ] **1. Exact Business Name Consistency:** Ensure GBP name matches legal/DBA branding (`Upfront AC & Heating` or `Upfront AC`) without keyword stuffing.
- [ ] **2. Primary & Secondary Categories:**
  - **Primary Category:** `HVAC contractor`
  - **Secondary Categories:** `Air conditioning repair service`, `Air conditioning contractor`, `Heating contractor`, `Furnace repair service`, `Air duct cleaning service`
- [ ] **3. NAP & Website URL Alignment:**
  - **Address / Service Area Configuration:** `Northpointe, Tomball, TX 77377` (configured as a Service Area Business or staffed office in accordance with Google guidelines)
  - **Service Areas Listed in GBP:** `Tomball, TX`, `Cypress, TX`, `Houston, TX`, `Katy, TX`, `Spring, TX`, `Magnolia, TX`, `The Woodlands, TX`, `Sugar Land, TX`
  - **Primary Phone:** `(713) 819-7908`
  - **Website Link:** `https://www.upfrontac.com/?utm_source=google&utm_medium=gbp&utm_campaign=local_maps`
  - **Appointment Link:** `https://www.upfrontac.com/request-free-estimate?utm_source=google&utm_medium=gbp`
- [ ] **4. Populate GBP Services Menu (Matching Website Service Architecture):**
  - Add each of the 10 website services (`HVAC Installation`, `Air Conditioning`, `HVAC Repairs`, `AC Repair Tomball`, `AC Repair Cypress`, `Heating Services`, `HVAC Maintenance`, `Indoor Air Quality`, `Commercial HVAC`, `Residential HVAC`) with descriptions and flat-rate diagnostic pricing (`$99 diagnostic waived with repair`).
- [ ] **5. Upload Geotagged / Authentic Field Photos Monthly:**
  - Upload the 87 real field photos (Lennox/Goodman attic installations, commercial Carrier RTU cranes, manifold gauge diagnostics, branded service truck) directly to GBP Photos.
- [ ] **6. Review Generation & Owner Response Protocol:**
  - Send SMS/email review link immediately after job completion.
  - Respond to every Google review within 24–48 hours, naturally mentioning the service performed and general area (e.g., *"Thank you for trusting Upfront AC with your capacitor replacement in Tomball!"*).

---

## 3. Local Authority, Citations & Ethical Backlink Strategy

Never purchase spammy link packages or create fake doorway pages. Build genuine local authority across Greater Houston:

1. **Core Local Citations & Trade Directories (NAP + License `TACLA133609C`):**
   - Better Business Bureau (`bbb.org` — already A+ accredited; ensure URL points to `https://www.upfrontac.com/`)
   - Greater Tomball Area Chamber of Commerce (`tomballchamber.org`)
   - Cy-Fair Houston Chamber of Commerce (`cyfairchamber.com`)
   - Texas Department of Licensing and Regulation (`tdlr.texas.gov` license verification record for `TACLA133609C`)
   - Apple Business Connect, Bing Places for Business (critical for ChatGPT Search local entity resolution), Yelp, Nextdoor Business, Angi, Thumbtack.
2. **Manufacturer Dealer Locators:**
   - Register Upfront AC & Heating on official dealer locator directories for brands installed (`Goodman`, `Lennox`, `Carrier`, `Bryant`, `Ruud`, `York`, `Coleman`).
3. **Local Community & Commercial Partnerships:**
   - Partner with local home inspectors, realtors, and property managers in Tomball (`77375`, `77377`) and Cypress (`77429`, `77433`) using the educational guides in `/knowledge-center` (such as the SEER2 guide and Repair vs. Replace guide) as a reference resource for homebuyers.

---

## 4. Prioritized 90-Day SEO & AI Search Action Plan

### Days 1–30: Technical Foundation, Indexing & Local Entity Alignment
1. **Deploy the SEO & Performance Upgrade to Production (`upfrontac.com`)** and verify `https://www.upfrontac.com/robots.txt` and `https://www.upfrontac.com/sitemap.xml`.
2. **Complete the Owner Business Verification Checklist** (`docs/seo/BUSINESS-VERIFICATION-CHECKLIST.md`) with Allen Swindell to confirm exact founding date and total completed jobs.
3. **Submit Sitemap & Request Indexing in Google Search Console** for all 40 URLs (especially `/projects`, the 5 `/projects/$slug` portfolios, and the 12 `/knowledge-center/$slug` articles).
4. **Verify Bing Webmaster Tools & IndexNow** (ChatGPT Search and `OAI-SearchBot` heavily cross-reference Bing's index alongside direct `OAI-SearchBot` crawls).
5. **Audit & Update Google Business Profile and Bing Places** with UTM-tagged links (`?utm_source=google&utm_medium=gbp`) so leads are tracked in the Dashboard's new **Website Conversion & Search Channel Monitor**.

### Days 31–60: Content Expansion, Real Project Case Studies & Review Velocity
1. **Capture Job-Specific Metadata on New Field Uploads:** When uploading new photos in the Admin Dashboard (`/dashboard` → Cloud Media Showcase), include the neighborhood/city (e.g., *Bridgeland, Cypress* or *Northpointe, Tomball*), equipment model, and problem solved.
2. **Add 2–4 Individual Project Case Studies per Month:** Expand `src/data/projects.ts` with specific completed jobs as owner-verified details become available.
3. **Evaluate City Landing Page Expansion:** Monitor Google Search Console queries for **Katy**, **Spring**, **Magnolia**, and **The Woodlands**. Once Upfront AC accumulates 3+ verified project photos and customer reviews in a specific city, launch a dedicated city service page modeled on `/services/ac-repair-tomball`.
4. **Publish 2 Seasonal Knowledge Center Articles:** Add targeted guides ahead of seasonal transitions (e.g., *Pre-Summer Attic Condenser & Drain Line Prep in Houston* and *Preparing Your Gas Furnace for North Texas & Houston Cold Fronts*).

### Days 61–90: Conversion Rate Optimization (CRO), AI Search Citation Monitoring & Authority Building
1. **Review Dashboard Conversion Telemetry (`/dashboard`):** Analyze the **Top Converting Pages** and **Traffic Source Attribution** (`Google Search` vs. `ChatGPT / AI` vs. `Bing`) to see which service pages and knowledge articles drive the most phone clicks and estimate requests.
2. **Run Monthly AI Search Citation Checks:** Test real homeowner prompts in ChatGPT Search, Perplexity, and Google AI Overviews (e.g., *"Who is a licensed HVAC contractor in Tomball TX with upfront pricing?"*, *"How much does AC repair cost in Houston TX?"*) and refine quick-answer callouts on matching pages.
3. **Local Chamber & Trade Backlink Outreach:** Finalize Greater Tomball Area Chamber of Commerce and Cy-Fair Chamber memberships and verify all directory citations match `Northpointe, Tomball, TX 77377` and `(713) 819-7908`.


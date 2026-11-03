# Routes & SEO Architecture

TanStack Start uses **file-based routing**. Every `.tsx` file in this directory is a route. Do **not** create `src/pages/`, `src/routes/_app/index.tsx`, or `app/layout.tsx` — those are Next.js / Remix conventions. The only root layout is `src/routes/__root.tsx`.

## Framework Conventions

| File Pattern | URL Equivalent | Description |
| --- | --- | --- |
| `index.tsx` | `/` | Root / index page |
| `about.tsx` | `/about` | Top-level static route |
| `services/index.tsx` | `/services` | Directory index route |
| `services.tsx` | Layout wrapper | Wraps `/services/*` with `<SiteLayout>` and `<Outlet />` |
| `__root.tsx` | App shell | Wraps every page with HTML `<head>`, scripts, and global providers |
| `routeTree.gen.ts` | Auto-generated | Managed by `@tanstack/router-plugin/vite`. **Do not edit manually.** |

---

## SEO Keyword Metrics & Summary

| Metric | Count | Details / Description |
|---|---|---|
| **Total Tracked Keyword Placements** | **135** | Gross total of all primary, secondary, geotargeted, and meta keywords across the repository |
| **Total Distinct / Unique Target Keywords** | **116+** | Unique search queries actively targeted across page routes and cluster definitions |
| **Indexable Public Pages / Routes** | **22** | All public-facing lead generation and commercial landing pages |
| **Primary Route Target Keywords** | **22** | 1 dedicated high-intent head keyword per indexable public route |
| **Secondary & Long-Tail Route Keywords** | **78** | Specific service, localized, and feature-related variations |
| **Geotargeted Core Market Pack Queries** | **15** | High-priority local pack terms across Tomball, Cypress, and Houston |
| **Expansion Market Geo Keywords** | **8** | Secondary local coverage queries (Katy, Spring, Magnolia, Woodlands, Sugar Land) |
| **HTML Document Meta Tag Keywords** | **12** | Core keywords embedded in `<head>` meta tags (`__root.tsx` and `index.tsx`) |
| **Non-Indexed Utility / Admin Routes** | **3** | Under construction and internal admin dashboard routes (`noindex, nofollow`) |

---

### Keyword Distribution by Category

| Category | Unique Keywords | Key Search Phrases Target Examples |
|---|---|---|
| **1. AC Repair & Emergency Cooling** | **21** | `AC repair Tomball TX`, `AC repair Cypress TX`, `Emergency AC repair Houston`, `fast AC repair FM 2920` |
| **2. HVAC Installation & Replacement** | **13** | `HVAC installation Houston`, `AC replacement Houston`, `SEER2 air conditioner installation`, `Manual J load calculation` |
| **3. Heating, Furnace & Heat Pumps** | **9** | `Furnace repair Tomball TX`, `Heating repair Houston`, `gas furnace tune up`, `heat pump repair` |
| **4. Maintenance, Inspections & Tune-Ups** | **9** | `HVAC maintenance Cypress TX`, `AC tune-up Tomball`, `21-point AC inspection`, `coil cleaning` |
| **5. Indoor Air Quality (IAQ) & Purification** | **5** | `Indoor air quality Houston`, `Whole home dehumidifier Houston`, `UV germicidal air purifier`, `MERV filtration` |
| **6. Commercial & Light Commercial HVAC** | **7** | `Commercial HVAC Houston`, `Rooftop AC repair Houston (RTU)`, `commercial HVAC maintenance contract` |
| **7. Residential & Home Comfort** | **6** | `Residential HVAC services Tomball TX`, `Home heating and cooling Houston`, `multi-zone HVAC` |
| **8. Transparent Pricing & Financing** | **10** | `Upfront HVAC pricing`, `Flat rate AC repair costs`, `HVAC diagnostic fee Houston`, `AC replacement financing 0% APR` |
| **9. Brand, Trust, E-E-A-T & Leadership** | **19** | `HVAC company Tomball TX`, `Christian HVAC contractor`, `Allen Swindell HVAC Houston`, `Upfront AC reviews` |
| **10. Hiring & Technical Careers** | **4** | `HVAC technician jobs Houston`, `HVAC installer hiring Tomball`, `EPA certified tech jobs` |
| **11. Direct Contact & Fast Dispatch** | **4** | `Contact HVAC technician Houston`, `schedule AC repair Tomball`, `emergency dispatch` |
| **12. Proof of Work & Project Gallery** | **3** | `HVAC installations Houston gallery`, `AC installation photos Tomball`, `before and after HVAC work` |
| **13. Regional Expansion Markets** | **6** | `HVAC service areas Houston`, `AC repair Katy TX`, `AC repair Spring TX`, `HVAC repair Magnolia TX` |

---

### Master Keyword Catalog

<details open>
<summary><strong>Click to expand / collapse the full list of all 116+ unique target keywords</strong></summary>

#### 1. Air Conditioning & Emergency Cooling (21 Keywords)
- `AC repair Tomball TX`
- `AC repair Cypress TX`
- `Air conditioning services Houston`
- `Emergency HVAC repair Houston`
- `Emergency AC repair Tomball`
- `Emergency AC repair Cypress`
- `Emergency AC repair Houston`
- `Emergency AC repair Bridgeland`
- `AC repair Houston`
- `air conditioning repair 77375 77377`
- `fast AC repair FM 2920`
- `AC repair Bridgeland`
- `Towne Lake HVAC repair`
- `Fairfield AC repair`
- `central air repair`
- `central air conditioning repair`
- `Same day HVAC repair`
- `24/7 AC repair Tomball`
- `AC compressor repair`
- `capacitor replacement`
- `emergency ac repair`

#### 2. HVAC Installation, Replacement & Sizing (13 Keywords)
- `HVAC installation Houston`
- `AC replacement Houston`
- `AC installation Tomball`
- `Air conditioning installation Cypress TX`
- `Air conditioning installation Houston TX`
- `new HVAC system Cypress`
- `SEER2 air conditioner installation`
- `SEER2 AC replacement Houston`
- `Manual J load calculation`
- `Free HVAC estimate Houston`
- `Free AC replacement estimate Tomball`
- `new AC quote Cypress`
- `in-home HVAC consultation`

#### 3. Heating, Furnace & Heat Pumps (9 Keywords)
- `Furnace repair Tomball TX`
- `Furnace repair Tomball`
- `Heating repair Houston`
- `Emergency heating repair Tomball`
- `emergency heating Cypress`
- `heat pump repair`
- `heat pump service`
- `gas furnace tune up`
- `Heating and air conditioning services`

#### 4. Preventative Maintenance & Tune-Ups (9 Keywords)
- `HVAC maintenance Cypress TX`
- `HVAC maintenance Towne Lake Cypress`
- `AC tune-up Tomball`
- `AC tune-up Cypress`
- `Air conditioning tune-up Tomball TX`
- `seasonal HVAC maintenance Houston`
- `21-point AC inspection`
- `coil cleaning`
- `HVAC tune-up Cinco Ranch`

#### 5. Indoor Air Quality (IAQ) & Air Purification (5 Keywords)
- `Indoor air quality Houston`
- `Whole home dehumidifier Houston`
- `UV germicidal air purifier`
- `HVAC duct cleaning Tomball`
- `MERV filtration`

#### 6. Commercial & Light Commercial HVAC (7 Keywords)
- `Commercial HVAC Houston`
- `Commercial HVAC repair Houston TX`
- `commercial HVAC contractors`
- `Rooftop AC repair Houston (RTU)`
- `commercial heating repair Tomball`
- `commercial HVAC maintenance contract`
- `commercial RTU replacements`

#### 7. Residential & Home Comfort (6 Keywords)
- `Residential HVAC services Tomball TX`
- `residential HVAC`
- `Home heating and cooling Houston`
- `residential AC replacement Cypress`
- `multi-zone HVAC`
- `Residential AC repair Sugar Land TX`

#### 8. Transparent Pricing & Flexible Financing (10 Keywords)
- `Upfront HVAC pricing`
- `Flat rate AC repair costs`
- `HVAC diagnostic fee Houston`
- `transparent AC repair prices`
- `upfront pricing ac`
- `upfront pricing HVAC`
- `HVAC financing Houston`
- `AC replacement financing 0% APR`
- `monthly payment AC install Tomball`
- `Synchrony Microf HVAC financing`

#### 9. Brand, Trust, E-E-A-T & Leadership (19 Keywords)
- `HVAC company Tomball TX`
- `HVAC company in Tomball TX`
- `HVAC contractor tomball`
- `HVAC contractor Cypress Texas`
- `hvac service houston`
- `Christian HVAC contractor`
- `Christian HVAC company Houston`
- `family owned HVAC Tomball`
- `15+ years industry experience`
- `Allen Swindell HVAC Houston`
- `Upfront AC founder`
- `licensed HVAC technician Tomball TX`
- `Christian business owner`
- `Upfront AC reviews`
- `HVAC reviews Tomball TX`
- `5 star AC repair Cypress`
- `customer testimonials Upfront AC`
- `upfront ac`
- `About Upfront AC & Heating`

#### 10. Hiring & Technical Careers (4 Keywords)
- `HVAC technician jobs Houston`
- `HVAC installer hiring Tomball`
- `HVAC apprentice jobs Cypress TX`
- `EPA certified tech jobs`

#### 11. Direct Contact & Fast Dispatch (4 Keywords)
- `Contact HVAC technician Houston`
- `Phone number Upfront AC (713) 819-7908`
- `schedule AC repair Tomball`
- `emergency dispatch`

#### 12. Proof of Work & Project Gallery (3 Keywords)
- `HVAC installations Houston gallery`
- `AC installation photos Tomball`
- `before and after HVAC work`

#### 13. Regional Geo & Expansion Markets (6 Keywords)
- `HVAC service areas Houston`
- `AC repair Katy TX`
- `AC repair Spring TX`
- `Champion Forest HVAC`
- `HVAC repair Magnolia TX`
- `AC replacement The Woodlands TX`

</details>

---

## Complete SEO Keyword & Route Inventory

All public pages are configured with **unique meta titles, descriptions, OpenGraph tags, absolute canonical URLs**, and **JSON-LD schema markup**.

| Route File | Canonical URL | Primary Target Keyword | Secondary & Long-Tail Keywords | Primary Intent | H1 Tag | Schema Type |
|---|---|---|---|---|---|---|
| `index.tsx` | `https://www.upfrontac.com/` | HVAC company Tomball TX | AC repair Houston, heating and cooling Cypress TX, Christian HVAC contractor, upfront pricing HVAC | Branded & Local Pack | *Hero visual H1 on homepage* | `HVACBusiness` (TACLA133609C) |
| `about.tsx` | `https://www.upfrontac.com/about` | About Upfront AC & Heating | Christian HVAC company Houston, family owned HVAC Tomball, 15+ years industry experience | Trust / E-E-A-T | About Upfront AC & Heating | `BreadcrumbList` |
| `about-owner.tsx` | `https://www.upfrontac.com/about-owner` | Allen Swindell HVAC Houston | Upfront AC founder, licensed HVAC technician Tomball TX, Christian business owner | Trust / E-E-A-T | About The Owner — Allen Swindell | `Person` + `BreadcrumbList` |
| `services/index.tsx` | `https://www.upfrontac.com/services` | HVAC services Houston TX | Heating and air conditioning services, residential HVAC, commercial HVAC contractors | Commercial Hub | Full-Service Heating & Air Conditioning in Greater Houston | `Service` + `BreadcrumbList` |
| `services/ac-repair-tomball.tsx` | `https://www.upfrontac.com/services/ac-repair-tomball` | AC repair Tomball TX | Emergency AC repair Tomball, air conditioning repair 77375 77377, fast AC repair FM 2920 | Emergency / Local | Trusted, Same-Day AC Repair in Tomball, TX | `Service` + `BreadcrumbList` |
| `services/ac-repair-cypress.tsx` | `https://www.upfrontac.com/services/ac-repair-cypress` | AC repair Cypress TX | Emergency AC repair Cypress, AC repair Bridgeland, Towne Lake HVAC repair, Fairfield AC repair | Emergency / Local | Same-Day, Transparent AC Repair in Cypress, TX | `Service` + `BreadcrumbList` |
| `services/air-conditioning.tsx` | `https://www.upfrontac.com/services/air-conditioning` | Air conditioning services Houston | AC repair Houston, AC installation Tomball, AC tune-up Cypress, central air repair | Commercial / Service | Same-Day AC Repair, Installation & Maintenance You Can Trust | `Service` + `BreadcrumbList` |
| `services/hvac-repairs.tsx` | `https://www.upfrontac.com/services/hvac-repairs` | Emergency HVAC repair Houston | Same day HVAC repair, 24/7 AC repair Tomball, AC compressor repair, capacitor replacement | Emergency / Transactional | Same-Day Emergency HVAC Repair in Tomball, Cypress & Houston | `Service` + `BreadcrumbList` |
| `services/hvac-install.tsx` | `https://www.upfrontac.com/services/hvac-install` | HVAC installation Houston | AC replacement Houston, new HVAC system Cypress, SEER2 air conditioner installation, Manual J load calculation | High-Ticket Transactional | Professional HVAC Installation & AC Replacement | `Service` + `BreadcrumbList` |
| `services/heating.tsx` | `https://www.upfrontac.com/services/heating` | Furnace repair Tomball TX | Heating repair Houston, emergency heating Cypress, heat pump repair, gas furnace tune up | Seasonal / Transactional | Furnace Repair, Emergency Installation & Maintenance Done Right | `Service` + `BreadcrumbList` |
| `services/hvac-maintenance.tsx` | `https://www.upfrontac.com/services/hvac-maintenance` | HVAC maintenance Cypress TX | AC tune-up Tomball, seasonal HVAC maintenance Houston, 21-point AC inspection, coil cleaning | Preventative Care | Precision HVAC Maintenance & Seasonal Tune-Ups in Tomball & Cypress | `Service` + `BreadcrumbList` |
| `services/indoor-air-quality.tsx` | `https://www.upfrontac.com/services/indoor-air-quality` | Indoor air quality Houston | Whole home dehumidifier Houston, UV germicidal air purifier, HVAC duct cleaning Tomball, MERV filtration | Health / Solution | Whole-Home Indoor Air Quality & Purification in Houston & Tomball | `Service` + `BreadcrumbList` |
| `services/commercial-hvac.tsx` | `https://www.upfrontac.com/services/commercial-hvac` | Commercial HVAC Houston | Rooftop AC repair Houston (RTU), commercial heating repair Tomball, commercial HVAC maintenance contract | B2B Commercial | Commercial HVAC Repair, Installation & Preventative Maintenance | `Service` + `BreadcrumbList` |
| `services/residential-hvac.tsx` | `https://www.upfrontac.com/services/residential-hvac` | Residential HVAC services Tomball TX | Home heating and cooling Houston, residential AC replacement Cypress, multi-zone HVAC | Residential | Reliable Residential HVAC Services in Tomball, Cypress & Houston | `Service` + `BreadcrumbList` |
| `service-areas.tsx` | `https://www.upfrontac.com/service-areas` | HVAC service areas Houston | AC repair Tomball, AC repair Cypress, AC repair Katy, AC repair Spring, AC repair Magnolia, AC repair The Woodlands, AC repair Sugar Land TX | Geo Hub | Communities We Proudly Serve Across Greater Houston | `HVACBusiness` (Coverage) |
| `upfront-pricing.tsx` | `https://www.upfrontac.com/upfront-pricing` | Upfront HVAC pricing | Flat rate AC repair costs, HVAC diagnostic fee Houston, transparent AC repair prices | Price Transparency | 100% Upfront, Flat-Rate Pricing — No Hidden Fees, No Surprises | `WebPage` |
| `finance.tsx` | `https://www.upfrontac.com/finance` | HVAC financing Houston | AC replacement financing 0% APR, monthly payment AC install Tomball, Synchrony Microf HVAC financing | Buyer Enablement | Flexible HVAC Financing Solutions for Every Budget | `WebPage` |
| `projects.tsx` | `https://www.upfrontac.com/projects` | HVAC installations Houston gallery | AC installation photos Tomball, commercial RTU replacements, before and after HVAC work | Social Proof / Proof of Work | Real Workmanship. Real Houston Homes & Businesses. | `CollectionPage` |
| `reviews.tsx` | `https://www.upfrontac.com/reviews` | Upfront AC reviews | HVAC reviews Tomball TX, 5 star AC repair Cypress, customer testimonials Upfront AC | Reputation & Trust | Real Reviews from Real Homeowners & Business Owners | `Review` / `WebPage` |
| `careers.tsx` | `https://www.upfrontac.com/careers` | HVAC technician jobs Houston | HVAC installer hiring Tomball, HVAC apprentice jobs Cypress TX, EPA certified tech jobs | Recruitment | Join the Upfront AC Team: High-Integrity HVAC Careers | `WebPage` |
| `contact.tsx` | `https://www.upfrontac.com/contact` | Contact HVAC technician Houston | Phone number Upfront AC (713) 819-7908, schedule AC repair Tomball, emergency dispatch | Direct Lead Gen | Get in Touch — Fast, Honest HVAC Help When You Need It | `ContactPage` |
| `request-free-estimate.tsx` | `https://www.upfrontac.com/request-free-estimate` | Free HVAC estimate Houston | Free AC replacement estimate Tomball, new AC quote Cypress, in-home HVAC consultation | High-Intent Lead Gen | Request Your Free In-Home HVAC Estimate | `WebPage` |
| `under-construction.tsx` | *N/A* | *Excluded from search* | Utility maintenance placeholder | Utility | Under Construction | `noindex, nofollow` |
| `dashboard/login.tsx` | *N/A* | *Excluded from search* | Internal CMS admin authentication | Internal Tool | Upfront A/C & Heating — Command Portal | `noindex, nofollow` |
| `dashboard/index.tsx` | *N/A* | *Excluded from search* | Internal dispatch & lead operations | Internal Tool | Upfront A/C & Heating — Command Portal | `noindex, nofollow` |

---

## Geotargeted Keyword Clusters

### 1. Primary Market: Tomball, TX (HQ Zone)
- **Zip Codes**: `77375`, `77377`
- **Neighborhoods**: Old Town Tomball, Northpointe, Rose Hill, FM 2920 corridor, Inverness Crossing
- **Core Queries**:
  - `AC repair Tomball TX`
  - `HVAC company in Tomball TX`
  - `Emergency heating repair Tomball`
  - `Air conditioning tune-up Tomball TX`
  - `Furnace repair Tomball`

### 2. Primary Market: Cypress, TX
- **Zip Codes**: `77429`, `77433`
- **Neighborhoods**: Bridgeland, Towne Lake, Fairfield, Coles Crossing, Blackhorse Ranch
- **Core Queries**:
  - `AC repair Cypress TX`
  - `Emergency AC repair Bridgeland`
  - `HVAC maintenance Towne Lake Cypress`
  - `Air conditioning installation Cypress TX`
  - `HVAC contractor Cypress Texas`

### 3. Primary Market: Greater Houston Metro (Northwest Sector)
- **Highways & Arterials**: Hwy 249, Hwy 290, Grand Parkway (SH 99), Beltway 8
- **Core Queries**:
  - `HVAC repair Houston TX`
  - `Emergency AC repair Houston`
  - `Air conditioning installation Houston TX`
  - `SEER2 AC replacement Houston`
  - `Commercial HVAC repair Houston TX`

### 4. Secondary Expansion Markets
- **Katy, TX** (`77449`, `77450`, `77493`, `77494`): AC repair Katy TX, HVAC tune-up Cinco Ranch
- **Spring, TX** (`77379`, `77388`, `77389`): AC repair Spring TX, Champion Forest HVAC
- **Magnolia, TX** (`77354`, `77355`): HVAC repair Magnolia TX, heat pump service
- **The Woodlands, TX** (`77380`, `77381`, `77382`): AC replacement The Woodlands TX
- **Sugar Land, TX** (`77478`, `77479`): Residential AC repair Sugar Land TX

---

## Technical SEO Directives & Standards

1. **Host Standardization**: All URLs strictly resolve and canonicalize to `https://www.upfrontac.com` (with `www`).
2. **Heading Rule**: Every indexable page has **strictly ONE `<h1>`** rendered by `<PageHeader />` or hero section. Interior spotlight sections use `<h2>`.
3. **Structured Data**: Every service page has an embedded JSON-LD script containing both `BreadcrumbList` and `Service` schema linking to provider license `TACLA133609C`.
4. **Sitemap Synchronization**:
   - Dynamic: `src/routes/sitemap[.]xml.ts` (API route)
   - Static: `public/sitemap.xml` (Root static feed for CDN/crawlers)
5. **Crawl Exclusions**: `robots.txt` explicitly disallows `/dashboard/` and `/api/`. Both routes also output `<meta name="robots" content="noindex, nofollow" />`.
6. **E-E-A-T Consistency**: Clearly distinguishes company operating history (2 years in business, BBB accredited) from founder & team trade experience (15+ years in the HVAC industry) across all site pages and metadata.

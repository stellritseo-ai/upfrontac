# Business Information Verification Checklist (Owner Sign-Off)

**Project:** Upfront AC & Heating (`https://www.upfrontac.com/`)  
**Prepared By:** StellR IT LLC (`https://stellrit.com/`)  
**Owner / Reviewer:** Allen Swindell (`allen@upfrontac.com` · `(713) 819-7908`)  
**Texas HVAC License:** `TACLA133609C` (Texas Department of Licensing and Regulation)

> **Why This Checklist Exists:**  
> During the technical and content audit of `upfrontac.com`, several conflicting claims were found across different pages (for example: `2 Years in Business` vs. `10+ Years in Business` vs. `12,000+ Projects Completed Since 2013`, `40+ Verified Reviews` vs. `50+ Verified Reviews`, and `1-Year Repair Warranty` vs. item-specific warranties on the pricing page).  
> All unverified or conflicting claims have been removed or harmonized in the codebase. Before publishing any additional quantitative claims, please verify and initial each item below.

---

## 1. Core NAP (Name, Address, Phone) & Licensing

| Item | Current Value Published on Website | Verified by Owner? | Notes / Corrections |
| :--- | :--- | :--- | :--- |
| **Legal / DBA Business Name** | Upfront AC & Heating | [ ] Yes / [ ] Update | Ensure identical match on Google Business Profile & BBB |
| **Primary Phone Number** | `(713) 819-7908` | [ ] Yes / [ ] Update | Used across Header, Sticky Call Bar, Schema & GBP |
| **Primary Customer Email** | `allen@upfrontac.com` | [ ] Yes / [ ] Update | Used on Header, Footer, Contact & Schema |
| **TDLR License Number** | `TACLA133609C` | [ ] Yes / [ ] Update | Regulated by Texas Dept. of Licensing and Regulation |
| **Office / Dispatch Location** | `Northpointe, Tomball, TX 77377` | [ ] Yes / [ ] Update | Do not list virtual offices or unstaffed addresses |

---

## 2. Company History vs. Owner Experience (Resolved Conflict)

* **Audit Finding:** The homepage and About pages stated **2 Years in Business** and **15+ Years Industry Experience**, while the Commercial HVAC, Heating, Air Conditioning, and Contact pages contained legacy template text claiming **"10+ years in business"** and **"12,000+ completed jobs since 2013"**.
* **Resolution Applied:** All pages now consistently distinguish **Upfront AC & Heating's 2 years in business** as an independent, family-owned company from **Founder Allen Swindell's 15+ years of personal hands-on HVAC and mechanical trade experience**. All `12,000+ projects since 2013` claims were removed.

| Verification Question | Current Website Statement | Owner Confirmation |
| :--- | :--- | :--- |
| **Exact Business Founding Year / Month** | Operating for 2+ years (Founded ~2024) | Exact Founding Date: `_______________` |
| **Founder's Personal Trade Experience** | 15+ years in HVAC & mechanical trades | Exact Years of Experience: `_________` |
| **Actual Completed Jobs / Service Calls** | Numeric claim removed until verified | Actual Completed Jobs to Date: `_____` |

---

## 3. Customer Reviews, Accreditations & Technician Qualifications

* **Audit Finding:** Some badges displayed `40+ Verified Reviews` while others displayed `50+ Verified Reviews`. The database currently holds **51 verified 5-star Google reviews**.
* **Resolution Applied:** Standardized sitewide to **`50+ Google Reviews`**. No `aggregateRating` JSON-LD was injected on self-serving `LocalBusiness` markup to comply with Google Review Snippet guidelines.

| Verification Question | Current Website Statement | Owner Confirmation |
| :--- | :--- | :--- |
| **Current Google Business Profile Review Count & Rating** | `5.0 ★ (50+ Google Reviews)` | Current Live GBP Count: `____________` |
| **BBB Accreditation Status** | BBB Accredited Business (`A+` Rating) | Verified Active? [ ] Yes / [ ] No |
| **Technician Certifications** | TDLR Licensed (`TACLA133609C`), EPA Section 608 Certified | Additional Certs (e.g., NATE): `_____` |
| **General Liability & Workers' Comp Insurance** | Fully Insured Residential & Commercial Contractor | Policy Active? [ ] Yes / [ ] No |

---

## 4. Operating Hours, Emergency Response & Service Areas

* **Audit Finding:** Footer listed `Monday – Friday: 7:00 AM - 5:00 PM` with `Saturday & Sunday: Emergency Calls Only`, whereas `contact.tsx` JSON-LD previously listed `07:00 - 19:00`.
* **Resolution Applied:** Standardized `OpeningHoursSpecification` and visible hours to **Monday–Friday 7:00 AM – 5:00 PM** with **24/7 Emergency Dispatch Available**.

| Verification Question | Current Website Statement | Owner Confirmation |
| :--- | :--- | :--- |
| **Standard Weekday Hours (Mon–Fri)** | `7:00 AM – 5:00 PM` | [ ] Confirmed / [ ] Change to: `_____` |
| **Weekend / After-Hours Policy (Sat–Sun)** | `24/7 Emergency Dispatch Available` | [ ] Confirmed / [ ] Change to: `_____` |
| **Primary Service Areas (8 Cities)** | Tomball, Cypress, Houston, Katy, Spring, Magnolia, The Woodlands, Sugar Land, TX | Confirm all 8 are actively served: [ ] Yes |
| **Any Listed Areas to Exclude?** | None | Exclude: `___________________________` |

---

## 5. Pricing, Diagnostic Fees, Warranties & Financing Terms

* **Audit Finding:** Service pages previously claimed a blanket `"1-Year Repair Warranty"`, whereas `/upfront-pricing` lists item-specific warranties (`180-Day Warranty` on capacitors/contactors/drain clearing, `1-Year Warranty` on motors/control boards/gas valves, `2–5 Year Warranty` on coils/compressors, and `10-Year Manufacturer Parts Warranty` on registered new equipment).
* **Resolution Applied:** Updated service pages to state **itemized written parts and labor warranties stated upfront on your invoice** and linked directly to `/upfront-pricing`.

| Verification Question | Current Website Statement | Owner Confirmation |
| :--- | :--- | :--- |
| **Standard Residential Diagnostic / Service Call Fee** | `$99` (`$149` after-hours) — waived with qualifying repair | [ ] Confirmed / [ ] Update: `________` |
| **Free Estimate Conditions** | Free in-home estimates on new system installations & replacements | [ ] Confirmed / [ ] Update: `________` |
| **Repair Warranty Policy** | Item-specific written warranties (`180-day` to `5-year` depending on component) | [ ] Confirmed / [ ] Update: `________` |
| **New Installation Labor & Parts Warranty** | `10-Year` OEM registered parts warranty + written labor warranty | Labor Warranty Length: `_____________` |
| **Active Financing Partners** | Synchrony, Microf, JBFin, Acorn Finance (subject to credit approval) | Confirm all 4 links active: [ ] Yes |


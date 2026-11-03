/**
 * Single source of truth for business facts used in visible copy, metadata and JSON-LD.
 *
 * IMPORTANT: Every value here must be confirmed by the owner before it is published.
 * See docs/seo/business-verification-checklist.md. Do not add a claim to a page without
 * adding (and verifying) it here first, so pages can never contradict one another again.
 */
export const SITE_URL = "https://www.upfrontac.com";

export const BUSINESS = {
  legalName: "Upfront AC & Heating",
  shortName: "Upfront AC",
  phoneDisplay: "(713) 819-7908",
  phoneE164: "+17138197908",
  email: "allen@upfrontac.com",
  licenseNumber: "TACLA133609C",
  licenseAuthority: "Texas Department of Licensing and Regulation (TDLR)",
  address: {
    // The owner supplied "Northpointe, Tomball, TX 77377". No street address is published,
    // so none is emitted in structured data (we never invent one).
    neighborhood: "Northpointe",
    city: "Tomball",
    region: "TX",
    postalCode: "77377",
    country: "US",
  },
  /** Regular office/dispatch hours as shown in the footer today. Owner must confirm. */
  hours: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const,
    opens: "07:00",
    closes: "17:00",
    display: "Mon–Fri, 7:00 AM – 5:00 PM",
  },
  /**
   * Operating history. Company history and the owner's personal experience are different facts
   * and must never be merged into one claim (e.g. "15+ years in business").
   */
  history: {
    companyYearsInBusiness: 2, // per owner statement, commit 26f88ef
    ownerYearsInHvacIndustry: "15+", // Allen Swindell, personal industry experience
  },
  /** Google review summary. Verify against the live Google Business Profile before publishing. */
  reviews: {
    rating: "5.0",
    countLabel: "50+",
    profileNote: "Reviews are shown as supplied by customers on Google.",
  },
  owner: {
    name: "Allen Swindell",
    jobTitle: "Founder & Lead HVAC Technician",
    url: `${SITE_URL}/about-owner`,
  },
  sameAs: [
    "https://www.facebook.com/upfrontac",
    "https://www.instagram.com/upfrontac/",
    "https://www.bbb.org/us/tx/tomball/profile/heating-and-air-conditioning/upfront-ac-0915-90074209",
  ],
  /** Cities the owner has stated they serve. Do not add cities without owner confirmation. */
  serviceAreas: [
    { name: "Tomball", wiki: "https://en.wikipedia.org/wiki/Tomball,_Texas" },
    { name: "Cypress", wiki: "https://en.wikipedia.org/wiki/Cypress,_Texas" },
    { name: "Houston", wiki: "https://en.wikipedia.org/wiki/Houston" },
    { name: "Katy", wiki: "https://en.wikipedia.org/wiki/Katy,_Texas" },
    { name: "Spring", wiki: "https://en.wikipedia.org/wiki/Spring,_Texas" },
    { name: "Magnolia", wiki: "https://en.wikipedia.org/wiki/Magnolia,_Texas" },
    { name: "The Woodlands", wiki: "https://en.wikipedia.org/wiki/The_Woodlands,_Texas" },
    { name: "Sugar Land", wiki: "https://en.wikipedia.org/wiki/Sugar_Land,_Texas" },
  ],
} as const;

export const LOGO_URL = `${SITE_URL}/logo.png`;

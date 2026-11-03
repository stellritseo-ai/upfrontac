/**
 * Client-side conversion & referrer attribution tracker for Upfront AC & Heating.
 *
 * Tracks:
 *  - phone_click          (any click on a tel: link)
 *  - email_click          (any click on a mailto: link)
 *  - financing_click      (clicks to /finance or financing CTAs)
 *  - estimate_submit      (submissions of the free estimate form)
 *  - booking_submit       (submissions of contact / service request forms)
 *  - session_attribution  (first-touch referrer classification: google, chatgpt, bing, direct, referral)
 *
 * Forwards events to:
 *  1. Google Analytics 4 (`window.gtag`), when configured via VITE_GA4_MEASUREMENT_ID
 *  2. Vercel Web Analytics (`window.va`)
 *  3. Internal `/api/conversions` endpoint + localStorage fallback for the admin dashboard
 */

export type ConversionEventType =
  | "phone_click"
  | "email_click"
  | "financing_click"
  | "estimate_submit"
  | "booking_submit"
  | "session_attribution";

export type TrafficChannel =
  | "google"
  | "chatgpt"
  | "other_ai"
  | "bing"
  | "social"
  | "direct"
  | "referral";

export interface ConversionEventRecord {
  id: string;
  type: ConversionEventType;
  channel: TrafficChannel;
  path: string;
  label?: string;
  referrer?: string;
  createdAt: string;
}

const ATTRIBUTION_KEY = "upfront_traffic_attribution_v1";
const SESSION_LOGGED_KEY = "upfront_session_logged_v1";
const LOCAL_EVENTS_KEY = "upfront_conversion_events_v1";

export function detectTrafficChannel(): {
  channel: TrafficChannel;
  referrer: string;
} {
  if (typeof window === "undefined") {
    return { channel: "direct", referrer: "" };
  }

  try {
    const existing = sessionStorage.getItem(ATTRIBUTION_KEY);
    if (existing) {
      return JSON.parse(existing);
    }
  } catch {}

  const params = new URLSearchParams(window.location.search);
  const utmSource = (params.get("utm_source") || "").toLowerCase();
  const ref = (document.referrer || "").toLowerCase();
  const combined = `${utmSource} ${ref}`;

  let channel: TrafficChannel = "direct";
  if (
    combined.includes("chatgpt.com") ||
    combined.includes("chat.openai.com") ||
    combined.includes("openai.com")
  ) {
    channel = "chatgpt";
  } else if (
    combined.includes("perplexity.ai") ||
    combined.includes("claude.ai") ||
    combined.includes("copilot.microsoft.com") ||
    combined.includes("gemini.google.com")
  ) {
    channel = "other_ai";
  } else if (combined.includes("google.")) {
    channel = "google";
  } else if (combined.includes("bing.com") || combined.includes("duckduckgo.com")) {
    channel = "bing";
  } else if (
    combined.includes("facebook.com") ||
    combined.includes("instagram.com") ||
    combined.includes("nextdoor.com") ||
    combined.includes("yelp.com")
  ) {
    channel = "social";
  } else if (ref && !ref.includes(window.location.hostname)) {
    channel = "referral";
  }

  const result = { channel, referrer: document.referrer || utmSource || "direct" };
  try {
    sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(result));
  } catch {}
  return result;
}

export function trackConversion(
  type: ConversionEventType,
  meta?: { label?: string; value?: number }
) {
  if (typeof window === "undefined") return;

  const { channel, referrer } = detectTrafficChannel();
  const path = window.location.pathname;

  const record: ConversionEventRecord = {
    id: `conv-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    type,
    channel,
    path,
    label: meta?.label,
    referrer,
    createdAt: new Date().toISOString(),
  };

  // 1. Google Analytics 4 (gtag)
  try {
    const gtag = (window as any).gtag;
    if (typeof gtag === "function") {
      gtag("event", type, {
        event_category: "lead_generation",
        event_label: meta?.label || path,
        traffic_channel: channel,
        page_path: path,
        value: meta?.value ?? 1,
      });
    }
  } catch {}

  // 2. Vercel Analytics
  try {
    const va = (window as any).va;
    if (typeof va === "function") {
      va("event", {
        name: type,
        data: { channel, path, label: meta?.label || "" },
      });
    }
  } catch {}

  // 3. Persist locally & send asynchronously to /api/conversions
  try {
    const existingRaw = localStorage.getItem(LOCAL_EVENTS_KEY);
    const list: ConversionEventRecord[] = existingRaw ? JSON.parse(existingRaw) : [];
    list.unshift(record);
    localStorage.setItem(LOCAL_EVENTS_KEY, JSON.stringify(list.slice(0, 300)));
  } catch {}

  try {
    const payload = JSON.stringify(record);
    if (navigator.sendBeacon) {
      const blob = new Blob([payload], { type: "application/json" });
      navigator.sendBeacon("/api/conversions", blob);
    } else {
      fetch("/api/conversions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      }).catch(() => {});
    }
  } catch {}
}

export function initSessionAttributionAndClickTracking(): () => void {
  if (typeof window === "undefined") return () => {};

  try {
    if (!sessionStorage.getItem(SESSION_LOGGED_KEY)) {
      sessionStorage.setItem(SESSION_LOGGED_KEY, "1");
      trackConversion("session_attribution", {
        label: document.referrer || "direct_entry",
      });
    }
  } catch {}

  const onClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement | null;
    const anchor = target?.closest?.("a") as HTMLAnchorElement | null;
    if (!anchor) return;

    const href = anchor.getAttribute("href") || "";
    const ctaTag = anchor.getAttribute("data-track-cta") || "";

    if (href.startsWith("tel:")) {
      trackConversion("phone_click", {
        label: ctaTag || window.location.pathname,
      });
    } else if (href.startsWith("mailto:")) {
      trackConversion("email_click", {
        label: ctaTag || href.replace("mailto:", ""),
      });
    } else if (
      href === "/finance" ||
      href.startsWith("/finance?") ||
      ctaTag.includes("finance")
    ) {
      trackConversion("financing_click", {
        label: ctaTag || window.location.pathname,
      });
    }
  };

  document.addEventListener("click", onClick, { capture: true });
  return () => document.removeEventListener("click", onClick, { capture: true });
}


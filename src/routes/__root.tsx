import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useLocation,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import logoImg from "../assets/logo.webp";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { LanguageProvider } from "../hooks/useLanguage";
import { SiteSettingsProvider, useSiteSettings } from "../hooks/useSiteSettings";
import { getSiteSettings } from "../lib/leads-store";
import { Analytics } from "@vercel/analytics/next";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: any; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "HVAC Repair & AC Installation in Houston, TX | Upfront AC" },
      { name: "description", content: "Need reliable AC repair or HVAC installation in Houston, Tomball or Cypress, TX? Contact Upfront AC for honest pricing, professional service and emergency HVAC assistance." },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { name: "google-site-verification", content: "3Q8KuRC5Igy3P0PuIgeKYm4XlsEPzJXnH3dv9ZvvWOE" },
      { name: "author", content: "Upfront AC & Heating" },
      { property: "og:title", content: "HVAC Repair & AC Installation in Houston, TX | Upfront AC" },
      { property: "og:description", content: "Need reliable AC repair or HVAC installation in Houston, Tomball or Cypress, TX? Contact Upfront AC for honest pricing, professional service and emergency HVAC assistance." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.upfrontac.com/" },
      { property: "og:image", content: "https://www.upfrontac.com/og-default.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:site_name", content: "Upfront AC & Heating" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://www.upfrontac.com/og-default.jpg" },
    ],
    links: [
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "shortcut icon", href: "/favicon.png", type: "image/png" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "preconnect", href: "https://res.cloudinary.com" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

const GA4_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID as string | undefined;

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        {GA4_ID ? (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${GA4_ID}', { send_page_view: true });`,
              }}
            />
          </>
        ) : null}
      </head>
      <body>
        {children}
        <Analytics />
        <Scripts />
      </body>
    </html>
  );
}

import { UnderConstruction } from "@/components/site/UnderConstruction";

function RootContent() {
  const location = useLocation();
  const { settings } = useSiteSettings();
  const isDashboard = location.pathname.startsWith("/dashboard");
  const isApi = location.pathname.startsWith("/api");
  const isUnderConstructionRoute = location.pathname === "/under-construction";

  // If maintenance mode is enabled in DB settings, render Under Construction for public site
  if (settings?.maintenanceMode && !isDashboard && !isApi && !isUnderConstructionRoute) {
    return <UnderConstruction />;
  }

  return <Outlet />;
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <SiteSettingsProvider>
        <LanguageProvider>
          <RootContent />
        </LanguageProvider>
      </SiteSettingsProvider>
    </QueryClientProvider>
  );
}

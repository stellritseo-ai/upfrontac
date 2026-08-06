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
import logoImg from "../assets/logo.png";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { LanguageProvider } from "../hooks/useLanguage";
import { getSiteSettings } from "../lib/leads-store";

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

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
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
      { title: "Upfront AC | 24/7 Heating & Air Conditioning Service Tomball & Houston, TX" },
      { name: "description", content: "Upfront AC delivers fast, reliable 24/7 emergency AC repair, heating maintenance, and HVAC installation across Tomball, Cypress, and Greater Houston, TX." },
      { name: "keywords", content: "AC repair tomball tx, AC repair cypress tx, hvac service houston, emergency ac repair, upfront ac, central air conditioning repair" },
      { name: "robots", content: "index, follow" },
      { name: "author", content: "Upfront AC" },
      { property: "og:title", content: "Upfront AC | 24/7 HVAC Service Tomball & Houston, TX" },
      { property: "og:description", content: "Powering Houston & Tomball homes with expert heating & cooling solutions." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.upfrontac.com" },
      { property: "og:image", content: logoImg },
      { property: "og:site_name", content: "Upfront AC" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "icon", href: logoImg, type: "image/png" },
      { rel: "shortcut icon", href: logoImg, type: "image/png" },
      { rel: "apple-touch-icon", href: logoImg },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
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

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");
  const isApi = location.pathname.startsWith("/api");
  const [maintenance, setMaintenance] = useState(false);

  useEffect(() => {
    if (!isDashboard && !isApi) {
      getSiteSettings()
        .then((settings) => {
          if (settings && settings.maintenanceMode) {
            setMaintenance(true);
          } else {
            setMaintenance(false);
          }
        })
        .catch((err) => {
          console.warn("Failed to check maintenance mode status", err);
          setMaintenance(false);
        });
    } else {
      setMaintenance(false);
    }
  }, [location.pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        {maintenance ? (
          <MaintenanceScreen />
        ) : (
          <Outlet />
        )}
      </LanguageProvider>
    </QueryClientProvider>
  );
}

function MaintenanceScreen() {
  return (
    <div className="min-h-screen w-full bg-[#0F172A] relative flex flex-col items-center justify-center p-6 overflow-hidden font-sans text-white select-none">
      {/* Dynamic Background Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#005CE6]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#0047B3]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      {/* Main Glassmorphic Container */}
      <div className="relative z-10 max-w-xl w-full bg-white/5 backdrop-blur-xl border border-white/10 p-8 sm:p-12 rounded-[32px] text-center shadow-[0_24px_60px_rgba(0,0,0,0.4)] flex flex-col items-center gap-6">
        
        {/* Pulsing Lightning Bolt Icon */}
        <div className="relative flex items-center justify-center w-20 h-20 bg-gradient-to-tr from-[#005CE6]/20 to-[#0047B3]/20 border border-[#005CE6]/30 rounded-full shadow-[0_0_30px_rgba(255,107,0,0.15)] animate-pulse">
          <svg className="w-10 h-10 text-[#005CE6] fill-[#005CE6]" viewBox="0 0 24 24">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        </div>

        {/* Badge */}
        <span className="bg-[#005CE6]/10 border border-[#005CE6]/20 text-[#005CE6] text-[10px] font-black uppercase tracking-[0.25em] px-4 py-1.5 rounded-full">
          System Update in Progress
        </span>

        {/* Title */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-none">
            Under <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#005CE6] to-[#0047B3]">Construction</span>
          </h1>
          <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-md mx-auto">
            We are currently optimizing R&E Electrical Contractor Corp's portal to serve you better. We'll be back online shortly.
          </p>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10" />

        {/* Urgent Service Block */}
        <div className="space-y-4 w-full">
          <div className="text-left bg-white/[0.02] border border-white/5 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h3 className="text-xs font-black uppercase tracking-wider text-[#005CE6]">24/7 Emergency Dispatch</h3>
              <p className="text-[11px] text-slate-400 font-semibold mt-0.5">Electrical hazards don't wait. We remain fully open.</p>
            </div>
            <a 
              href="tel:+17863075933" 
              className="bg-[#005CE6] hover:bg-[#0047B3] text-white text-xs font-black uppercase tracking-wider px-5 py-3 rounded-xl transition-all duration-300 shadow-[0_4px_12px_rgba(255,107,0,0.3)] hover:-translate-y-0.5 active:translate-y-0 text-center whitespace-nowrap"
            >
              Call (786) 307-5933
            </a>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between text-xs text-slate-400 font-bold px-1.5">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#005CE6] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Williams@electricalcontractorcorp.com</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#005CE6] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Licensed & Insured</span>
            </div>
          </div>
        </div>

      </div>

      {/* Footer */}
      <span className="relative z-10 text-[9px] uppercase font-bold tracking-[0.2em] text-slate-500 mt-8">
        &copy; {new Date().getFullYear()} R&E Electrical Contractor Corp. All rights reserved.
      </span>
    </div>
  );
}

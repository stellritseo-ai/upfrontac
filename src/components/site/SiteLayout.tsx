import { useEffect, type ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MobileStickyCallBar } from "./MobileStickyCallBar";
import { initSessionAttributionAndClickTracking } from "@/lib/conversion-tracking";
// import { FloatingChat } from "./FloatingChat";

export function SiteLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    return initSessionAttributionAndClickTracking();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col pb-16 md:pb-0">
      <Header />
      <main className="flex-grow pt-[100px] md:pt-[124px]">{children}</main>
      <Footer />
      <MobileStickyCallBar />
      {/* Live chat is hidden per request (do not remove, just hide) */}
      {/* <FloatingChat /> */}
    </div>
  );
}

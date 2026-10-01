import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
// import { FloatingChat } from "./FloatingChat";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="flex-grow pt-[100px] md:pt-[124px]">{children}</main>
      <Footer />
      {/* Live chat is hidden per request (do not remove, just hide) */}
      {/* <FloatingChat /> */}
    </div>
  );
}

"use client";

import { useEffect } from "react";
import { useDiyaAI } from "@/hooks/useDiyaAI";
import Header from "@/components/layout/Header";
import DiyaAIPanel from "@/components/layout/DiyaAIPanel";
import MobileNav from "@/components/layout/MobileNav";

interface MainLayoutProps {
  children: React.ReactNode;
}

const PANEL_WIDTH = "w-[380px] xl:w-[420px]";
const PANEL_MARGIN = "lg:pr-[380px] xl:pr-[420px]";

export default function MainLayout({ children }: MainLayoutProps) {
  const { isPanelOpen, setIsPanelOpen } = useDiyaAI();

  // Close mobile panel on escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsPanelOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setIsPanelOpen]);

  return (
    <div className="min-h-screen bg-[#131315]">
      <Header />

      {/* Desktop: 70/30 layout with fixed right panel */}
      <div className={`pt-14 ${PANEL_MARGIN}`}>
        <main className="min-h-screen">{children}</main>
        <MobileNav />
      </div>

      {/* Desktop sticky right panel */}
      <aside
        className={`hidden lg:flex flex-col fixed top-14 right-0 ${PANEL_WIDTH} h-[calc(100vh-3.5rem)] border-l border-white/10 z-40 overflow-hidden`}
      >
        <DiyaAIPanel />
      </aside>

      {/* Mobile: overlay panel */}
      {isPanelOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsPanelOpen(false)}
          />
          <div className="relative mt-14 flex-1 flex flex-col overflow-hidden mx-4 mb-24 rounded-2xl border border-white/10">
            <DiyaAIPanel />
          </div>
        </div>
      )}
    </div>
  );
}

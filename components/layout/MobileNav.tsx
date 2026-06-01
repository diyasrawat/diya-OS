"use client";

import Link from "next/link";
import { useDiyaAI } from "@/hooks/useDiyaAI";

const tabs = [
  { href: "/", icon: "home", label: "Home" },
  { href: "/#projects", icon: "grid_view", label: "Projects" },
];

export default function MobileNav() {
  const { isPanelOpen, setIsPanelOpen } = useDiyaAI();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-6 px-4">
      <nav className="bg-surface-container/20 backdrop-blur-2xl border border-white/10 rounded-full flex gap-1 p-2 shadow-[0_0_20px_rgba(173,198,255,0.15)]">
        {tabs.map(({ href, icon, label }) => (
          <Link
            key={href}
            href={href}
            className="flex flex-col items-center justify-center text-on-surface-variant px-5 py-2 hover:bg-white/5 transition-all duration-300 rounded-full"
          >
            <span className="material-symbols-outlined text-[22px]">{icon}</span>
            <span className="font-label-md text-[11px] mt-0.5">{label}</span>
          </Link>
        ))}
        <button
          onClick={() => setIsPanelOpen(!isPanelOpen)}
          className={`flex flex-col items-center justify-center px-5 py-2 rounded-full transition-all duration-300 ${
            isPanelOpen
              ? "bg-primary/20 text-primary"
              : "text-on-surface-variant hover:bg-white/5"
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">smart_toy</span>
          <span className="font-label-md text-[11px] mt-0.5">Chat</span>
        </button>
      </nav>
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { timeline } from "@/lib/data/timeline";
import { TimelineEvent, TimelineCategory } from "@/lib/types";

// ── Color map ─────────────────────────────────────────────────────────────────

const colorMap: Record<
  TimelineEvent["color"],
  { text: string; dot: string }
> = {
  primary: { text: "text-primary", dot: "bg-primary" },
  secondary: { text: "text-secondary", dot: "bg-secondary" },
  tertiary: { text: "text-tertiary", dot: "bg-[#c9c6c5]" },
};

// ── Filter tab definitions ────────────────────────────────────────────────────

type TabValue = "all" | TimelineCategory;

const TABS: { label: string; value: TabValue }[] = [
  { label: "All", value: "all" },
  { label: "Hackathons", value: "hackathon" },
  { label: "Certifications", value: "certification" },
  { label: "Education", value: "education" },
  { label: "Awards", value: "award" },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function LivingCV() {
  const [activeTab, setActiveTab] = useState<TabValue>("all");

  const filtered =
    activeTab === "all"
      ? timeline
      : timeline.filter((e) => e.category === activeTab);

  return (
    <section className="mb-40 px-6 md:px-margin-desktop" id="experience">
      <h2 className="font-headline-xl text-headline-xl text-on-surface mb-8">
        Log History
      </h2>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-12">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-4 py-1.5 rounded-full font-label-md text-label-md transition-all ${
              activeTab === tab.value
                ? "bg-primary/10 border border-primary/20 text-primary"
                : "text-on-surface-variant hover:text-on-surface border border-transparent"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative space-y-12 before:absolute before:left-3 md:before:left-1/2 before:w-px before:h-full before:bg-white/10">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 && (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-body-md text-body-md text-on-surface-variant py-8 text-center"
            >
              No entries in this category yet.
            </motion.p>
          )}

          {filtered.map((entry) => {
            // Preserve left/right side regardless of which items are filtered out
            const originalIdx = timeline.findIndex((t) => t.id === entry.id);
            const isLeft = originalIdx % 2 === 0;
            const colors = colorMap[entry.color];

            return (
              <motion.div
                key={entry.id}
                layout="position"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
                transition={{ duration: 0.35 }}
                className={`relative flex flex-col items-center justify-between md:gap-24 group ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div
                  className={`md:w-1/2 mb-4 md:mb-0 pl-8 md:pl-0 ${
                    isLeft ? "md:text-right" : "md:text-left"
                  }`}
                >
                  <p className={`font-label-md text-label-md ${colors.text}`}>
                    {entry.date}
                  </p>
                  <h4 className="font-headline-lg text-headline-lg mt-1">
                    {entry.link ? (
                      <a
                        href={entry.link}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-primary transition-colors"
                      >
                        {entry.title}
                        <span className="material-symbols-outlined text-sm ml-1 align-middle opacity-50">
                          open_in_new
                        </span>
                      </a>
                    ) : (
                      entry.title
                    )}
                  </h4>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    {entry.description}
                  </p>
                </div>

                {/* Dot */}
                <div
                  className={`absolute left-3 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full ${colors.dot} border-4 border-[#131315] z-10`}
                />

                <div className="md:w-1/2 hidden md:block" />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
}

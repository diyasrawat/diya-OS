"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { stackDistribution } from "@/lib/data/skills";

const GRID_COLS = 26;
const GRID_ROWS = 7;

function seededIntensity(idx: number): number {
  const h = ((idx * 1664525 + 1013904223) & 0xffffffff) >>> 0;
  const levels = [0.04, 0.08, 0.15, 0.25, 0.4, 0.6, 0.8, 0.9];
  return levels[h % levels.length];
}

const colorVarMap: Record<string, string> = {
  primary: "#adc6ff",
  secondary: "#d1bdf4",
  tertiary: "#c9c6c5",
};

export default function GitHubIntelligence() {
  const cells = useMemo(
    () =>
      Array.from({ length: GRID_COLS * GRID_ROWS }, (_, i) =>
        seededIntensity(i)
      ),
    []
  );

  return (
    <section className="mb-40 px-6 md:px-margin-desktop overflow-hidden">
      <h2 className="font-headline-xl text-headline-xl text-on-surface mb-12">
        GitHub Intelligence
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Contribution grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:col-span-8 glass-panel rounded-2xl p-8 relative overflow-hidden"
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <p className="text-primary font-label-md text-label-md">
                CONTRIBUTIONS
              </p>
              <p className="font-headline-lg text-headline-lg mt-1">
                1,240 Total Commits
              </p>
            </div>
            <div className="flex gap-2">
              <span className="px-2 py-1 rounded bg-white/5 text-xs text-on-surface-variant">
                2024
              </span>
              <span className="px-2 py-1 rounded bg-white/5 text-xs text-on-surface-variant">
                Last 365 Days
              </span>
            </div>
          </div>

          <div
            className="grid gap-1 opacity-80"
            style={{ gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)` }}
          >
            {cells.map((opacity, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: `rgba(173, 198, 255, ${opacity})`,
                  borderRadius: "2px",
                  aspectRatio: "1",
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Stack distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="md:col-span-4 glass-panel rounded-2xl p-8 flex flex-col justify-center"
        >
          <p className="text-secondary font-label-md text-label-md mb-6 uppercase tracking-widest">
            Stack Distribution
          </p>
          <div className="space-y-6">
            {stackDistribution.map((item) => (
              <div key={item.name}>
                <div className="flex justify-between mb-2">
                  <span className="font-body-md text-body-md">{item.name}</span>
                  <span className="font-body-md text-body-md text-on-surface-variant">
                    {item.percent}%
                  </span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.percent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: colorVarMap[item.color] }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

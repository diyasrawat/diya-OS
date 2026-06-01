"use client";

import { motion } from "framer-motion";
import { FocusItem } from "@/lib/types";
import { focusItems as defaultFocusItems } from "@/lib/data/focus";
import { useAdminData } from "@/hooks/useAdminData";

const accentMap: Record<FocusItem["accentColor"], string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  tertiary: "text-tertiary",
};

export default function CurrentlyBuilding() {
  const focusItems = useAdminData<FocusItem[]>("focus_override", defaultFocusItems);
  return (
    <section className="mb-40 px-6 md:px-margin-desktop" id="system">
      <div className="flex items-end justify-between mb-12">
        <h2 className="font-headline-xl text-headline-xl text-on-surface">
          Currently Building
        </h2>
        <span className="font-label-md text-label-md text-on-surface-variant">
          Active now
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {focusItems.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="glass-panel rounded-2xl p-8 glow-hover transition-all"
          >
            <div className="mb-12">
              <span
                className={`material-symbols-outlined text-4xl ${accentMap[item.accentColor]}`}
              >
                {item.icon}
              </span>
            </div>
            <h3 className="font-headline-lg text-headline-lg text-on-surface mb-2">
              {item.label}
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              {item.content}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

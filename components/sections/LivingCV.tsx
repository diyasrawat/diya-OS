"use client";

import { motion } from "framer-motion";
import { timeline } from "@/lib/data/timeline";
import { TimelineEvent } from "@/lib/types";

const colorMap: Record<TimelineEvent["color"], { text: string; dot: string }> = {
  primary: { text: "text-primary", dot: "bg-primary" },
  secondary: { text: "text-secondary", dot: "bg-secondary" },
  tertiary: { text: "text-tertiary", dot: "bg-tertiary" },
};

export default function LivingCV() {
  return (
    <section className="mb-40 px-6 md:px-margin-desktop" id="experience">
      <h2 className="font-headline-xl text-headline-xl text-on-surface mb-12">
        Log History
      </h2>

      <div className="space-y-12 relative before:absolute before:left-3 md:before:left-1/2 before:w-px before:h-full before:bg-white/10">
        {timeline.map((entry, i) => {
          const colors = colorMap[entry.color];
          const isEven = i % 2 === 0;

          return (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className={`relative flex flex-col items-center justify-between md:gap-24 group ${
                isEven ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Content */}
              <div
                className={`md:w-1/2 mb-4 md:mb-0 pl-8 md:pl-0 ${
                  isEven ? "md:text-right" : "md:text-left"
                }`}
              >
                <p className={`font-label-md text-label-md ${colors.text}`}>
                  {entry.date}
                </p>
                <h4 className="font-headline-lg text-headline-lg mt-1">
                  {entry.title}
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
      </div>
    </section>
  );
}

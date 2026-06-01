"use client";

import { motion } from "framer-motion";
import { timeline } from "@/lib/data/timeline";
import { skills } from "@/lib/data/skills";

const categoryOrder = ["ml", "data", "backend", "frontend", "tools"] as const;

export default function LivingCV() {
  return (
    <section className="container mx-auto px-4 py-20 space-y-14">
      {/* Timeline */}
      <div>
        <h2 className="mb-8 text-2xl font-semibold tracking-tight">Timeline</h2>
        <ol className="relative border-l border-border space-y-8 pl-6">
          {timeline.map((entry, i) => (
            <motion.li
              key={entry.id}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative"
            >
              <span className="absolute -left-[1.65rem] flex h-5 w-5 items-center justify-center rounded-full border bg-background text-xs">
                {entry.type === "education"
                  ? "🎓"
                  : entry.type === "achievement"
                  ? "🏆"
                  : entry.type === "work"
                  ? "💼"
                  : "🛠️"}
              </span>
              <p className="text-xs text-muted-foreground">{entry.date}</p>
              <h3 className="mt-0.5 font-medium">{entry.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {entry.description}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>

      {/* Skills */}
      <div id="skills">
        <h2 className="mb-8 text-2xl font-semibold tracking-tight">Skills</h2>
        <div className="space-y-6">
          {categoryOrder.map((cat) => {
            const catSkills = skills.filter((s) => s.category === cat);
            if (!catSkills.length) return null;
            return (
              <div key={cat}>
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {cat}
                </p>
                <div className="flex flex-wrap gap-2">
                  {catSkills.map((s) => (
                    <span
                      key={s.name}
                      className="rounded-md border px-3 py-1 text-sm"
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

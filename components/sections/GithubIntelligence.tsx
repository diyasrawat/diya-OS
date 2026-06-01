"use client";

import { motion } from "framer-motion";

// Placeholder: replace with live GitHub API data via /api/github
const stats = [
  { label: "Public Repos", value: "—" },
  { label: "Total Stars", value: "—" },
  { label: "Contributions (yr)", value: "—" },
  { label: "Top Language", value: "Python" },
];

export default function GithubIntelligence() {
  return (
    <section className="container mx-auto px-4 py-20">
      <h2 className="mb-2 text-2xl font-semibold tracking-tight">
        GitHub Intelligence
      </h2>
      <p className="mb-8 text-sm text-muted-foreground">
        Live stats from GitHub — wire up the API to see real numbers.
      </p>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="rounded-xl border bg-card p-5 text-center"
          >
            <p className="text-3xl font-bold">{s.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

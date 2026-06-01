"use client";

import { motion } from "framer-motion";

const focusItems = [
  { emoji: "🧠", label: "Deep learning for medical imaging" },
  { emoji: "📊", label: "MLOps & model deployment pipelines" },
  { emoji: "🔬", label: "Reading: Attention Is All You Need (revisiting)" },
  { emoji: "🛠️", label: "Building this AI-native portfolio" },
];

export default function CurrentFocus() {
  return (
    <section className="container mx-auto px-4 py-20">
      <h2 className="mb-8 text-2xl font-semibold tracking-tight">
        Current Focus
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {focusItems.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-3 rounded-lg border bg-card p-4 text-sm text-card-foreground"
          >
            <span className="text-xl">{item.emoji}</span>
            <span>{item.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

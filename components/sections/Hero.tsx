"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useDiyaAI } from "@/hooks/useDiyaAI";

export default function Hero() {
  const { setIsPanelOpen } = useDiyaAI();

  return (
    <section className="min-h-[calc(100vh-3.5rem)] flex flex-col justify-center items-start px-6 md:px-margin-desktop mb-40">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-4xl"
      >
        <h1 className="font-display-lg text-headline-xl md:text-display-lg text-on-surface mb-6 leading-tight">
          Hi, I&apos;m Diya Rawat.
          <br />
          <span className="text-on-surface-variant">
            Building AI systems, analyzing data,
            <br className="hidden md:block" />
            and documenting the journey.
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 mt-8"
        >
          <button
            onClick={() => setIsPanelOpen(true)}
            className="bg-primary text-on-primary px-8 py-4 rounded-full font-label-md text-label-md hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              smart_toy
            </span>
            Talk to Diya AI
          </button>
          <Link
            href="/recruiter"
            className="border border-outline text-on-surface px-8 py-4 rounded-full font-label-md text-label-md hover:bg-white/5 transition-colors flex items-center justify-center"
          >
            Recruiter Mode
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

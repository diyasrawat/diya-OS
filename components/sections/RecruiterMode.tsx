"use client";

import { motion } from "framer-motion";
import { recruiterConfig } from "@/lib/data/recruiter-config";

export default function RecruiterMode() {
  return (
    <section className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-2xl border border-primary/30 bg-primary/5 p-8 space-y-6"
      >
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Recruiter View
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {recruiterConfig.availability}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <h3 className="mb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Open Roles
            </h3>
            <ul className="space-y-1.5">
              {recruiterConfig.roles.map((role) => (
                <li key={role} className="flex items-center gap-2 text-sm">
                  <span className="text-primary">▸</span> {role}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Key Highlights
            </h3>
            <ul className="space-y-1.5">
              {recruiterConfig.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-sm">
                  <span className="mt-0.5 text-primary">✓</span> {h}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          Contact:{" "}
          <a
            href={`mailto:${recruiterConfig.preferredContact}`}
            className="text-foreground underline underline-offset-4 hover:text-primary"
          >
            {recruiterConfig.preferredContact}
          </a>
        </p>
      </motion.div>
    </section>
  );
}

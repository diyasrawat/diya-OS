"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { recruiterRoles } from "@/lib/data/recruiter-config";

const roleColors = ["text-primary", "text-secondary", "text-tertiary"];
const roleDots = ["bg-primary", "bg-secondary", "bg-tertiary"];

export default function RecruiterModeTeaser() {
  return (
    <section
      className="mb-40 px-6 md:px-margin-desktop"
      id="experience"
    >
      <div className="py-24 px-8 md:px-16 bg-primary/5 rounded-3xl border border-primary/10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-headline-xl text-headline-xl text-on-surface mb-6">
            Professional Summary
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            A streamlined overview for talent acquisition teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Role pills */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-panel p-8 rounded-2xl"
          >
            <h3 className="font-label-md text-label-md text-primary mb-6 uppercase tracking-widest">
              Target Roles
            </h3>
            <ul className="space-y-4">
              {recruiterRoles.map((role, i) => (
                <li
                  key={role.id}
                  className={`flex items-center gap-4 ${i > 0 ? "opacity-60" : ""}`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${roleDots[i]}`}
                  />
                  <span
                    className={`font-headline-lg text-headline-lg ${i === 0 ? roleColors[i] : ""}`}
                  >
                    {role.title}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center items-center gap-6 glass-panel p-8 rounded-2xl"
          >
            <p className="font-body-md text-body-md text-on-surface-variant text-center">
              Full recruiter dashboard with role-specific projects, competency
              charts, and AI Q&A.
            </p>
            <Link
              href="/recruiter"
              className="bg-on-surface text-surface px-10 py-5 rounded-full font-label-md text-label-md hover:scale-105 transition-transform flex items-center gap-3"
            >
              <span className="material-symbols-outlined">work</span>
              Enter Recruiter Mode
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

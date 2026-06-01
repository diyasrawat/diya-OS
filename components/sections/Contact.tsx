"use client";

import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { recruiterConfig } from "@/lib/data/recruiter-config";

export default function Contact() {
  return (
    <section
      id="contact"
      className="container mx-auto px-4 py-20 text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-4"
      >
        <h2 className="text-2xl font-semibold tracking-tight">Get in Touch</h2>
        <p className="text-muted-foreground">
          Open to internships, collaborations, and interesting conversations.
        </p>
        <a
          href={`mailto:${recruiterConfig.preferredContact}`}
          className={buttonVariants()}
        >
          {recruiterConfig.preferredContact}
        </a>
      </motion.div>
    </section>
  );
}

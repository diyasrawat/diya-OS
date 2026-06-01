"use client";

import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="container mx-auto flex min-h-[80vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <p className="text-sm uppercase tracking-widest text-muted-foreground">
          AI & Data Science
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Hi, I&apos;m{" "}
          <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
            Diya Rawat
          </span>
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          I build ML systems, wrangle data, and ship intelligent products.
          Currently studying AI &amp; Data Science — always learning, always building.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="flex gap-3"
      >
        <Link href="/#projects" className={buttonVariants()}>
          View Projects
        </Link>
        <Link href="/recruiter" className={buttonVariants({ variant: "outline" })}>
          Recruiter View
        </Link>
      </motion.div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRecruiterMode } from "@/hooks/useRecruiterMode";

export default function Header() {
  const { isRecruiterMode, toggle } = useRecruiterMode();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          diya.dev
        </Link>

        <nav className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link href="/#projects" className="hover:text-foreground transition-colors">
            Projects
          </Link>
          <Link href="/#skills" className="hover:text-foreground transition-colors">
            Skills
          </Link>
          <Link href="/#contact" className="hover:text-foreground transition-colors">
            Contact
          </Link>
          <Button
            variant={isRecruiterMode ? "default" : "outline"}
            size="sm"
            onClick={toggle}
          >
            {isRecruiterMode ? "Exit Recruiter Mode" : "Recruiter Mode"}
          </Button>
        </nav>
      </div>
    </motion.header>
  );
}

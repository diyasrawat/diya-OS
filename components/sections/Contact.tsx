"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SafeInput from "@/components/ui/SafeInput";
import SafeButton from "@/components/ui/SafeButton";
import SafeTextarea from "@/components/ui/SafeTextarea";

export default function Contact() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    // TODO: connect to a form service (Formspree, Resend, etc.)
    setSubmitted(true);
    setName("");
    setMessage("");
  }

  return (
    <footer
      className="px-6 md:px-margin-desktop mb-24"
      id="contact"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-panel p-12 rounded-3xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Left: info */}
          <div>
            <h2 className="font-headline-xl text-headline-xl text-on-surface mb-6">
              Contact
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-8">
              Let&apos;s collaborate on something great.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-primary">
                  alternate_email
                </span>
                <a
                  href="mailto:diya@rawat.dev"
                  className="font-body-md text-body-md hover:text-primary transition-colors"
                >
                  diya@rawat.dev
                </a>
              </div>
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-primary">
                  terminal
                </span>
                <a
                  href="https://github.com/diyarawat"
                  target="_blank"
                  rel="noreferrer"
                  className="font-body-md text-body-md hover:text-primary transition-colors"
                >
                  github.com/diyarawat
                </a>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 py-8">
                <span className="material-symbols-outlined text-primary text-4xl">
                  check_circle
                </span>
                <p className="font-headline-lg text-headline-lg text-on-surface">
                  Message received.
                </p>
                <SafeButton
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-primary font-label-md text-label-md hover:underline"
                >
                  Send another
                </SafeButton>
              </div>
            ) : (
              <>
                <SafeInput
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:ring-1 focus:ring-primary focus:outline-none text-on-surface font-mono placeholder:opacity-30"
                  placeholder="IDENTITY"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <SafeTextarea
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:ring-1 focus:ring-primary focus:outline-none text-on-surface font-mono placeholder:opacity-30 resize-none"
                  placeholder="MESSAGE_STRING"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <SafeButton
                  type="submit"
                  className="w-full bg-primary/10 border border-primary/30 text-primary py-4 rounded-xl font-label-md text-label-md hover:bg-primary hover:text-on-primary transition-all"
                >
                  Submit
                </SafeButton>
              </>
            )}
          </form>
        </div>

        {/* Footer bar */}
        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-[10px] text-on-surface-variant opacity-40">
            © 2024 DIYA RAWAT — POWERED BY DIYA.OS 2.0
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="font-mono text-[10px] text-on-surface-variant hover:text-primary uppercase tracking-widest"
            >
              Privacy
            </a>
            <a
              href="#"
              className="font-mono text-[10px] text-on-surface-variant hover:text-primary uppercase tracking-widest"
            >
              Logs
            </a>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}

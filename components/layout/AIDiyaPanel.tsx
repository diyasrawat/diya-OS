"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAIDiya } from "@/hooks/useAIDiya";

export default function AIDiyaPanel() {
  const { messages, isLoading, isOpen, setIsOpen, sendMessage } = useAIDiya();
  const [input, setInput] = useState("");

  async function handleSend() {
    const trimmed = input.trim();
    if (!trimmed) return;
    setInput("");
    await sendMessage(trimmed);
  }

  return (
    <>
      {/* Floating trigger */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg"
        aria-label="Open AI Diya chat"
      >
        <span className="text-lg">✦</span>
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-6 z-50 flex w-80 flex-col rounded-xl border border-border bg-background shadow-xl"
          >
            <div className="flex items-center justify-between border-b px-4 py-3">
              <span className="text-sm font-medium">Ask AI Diya</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-6 w-6 p-0"
              >
                ✕
              </Button>
            </div>

            <div className="flex-1 space-y-2 overflow-y-auto p-4 text-sm max-h-64">
              {messages.length === 0 && (
                <p className="text-muted-foreground text-xs">
                  Ask me anything about Diya's work, skills, or availability.
                </p>
              )}
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`rounded-lg px-3 py-2 ${
                    m.role === "user"
                      ? "ml-6 bg-primary text-primary-foreground"
                      : "mr-6 bg-muted"
                  }`}
                >
                  {m.content}
                </div>
              ))}
              {isLoading && (
                <div className="mr-6 rounded-lg bg-muted px-3 py-2 text-muted-foreground">
                  Thinking…
                </div>
              )}
            </div>

            <div className="flex gap-2 border-t p-3">
              <input
                className="flex-1 rounded-md border bg-background px-3 py-1.5 text-sm outline-none focus:ring-1 focus:ring-ring"
                placeholder="Ask something…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <Button size="sm" onClick={handleSend} disabled={isLoading}>
                Send
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

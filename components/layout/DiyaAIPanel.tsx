"use client";

import { useRef, useEffect } from "react";
import { useDiyaAI } from "@/hooks/useDiyaAI";

export default function DiyaAIPanel() {
  const { messages, isLoading, input, setInput, sendMessage } = useDiyaAI();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  async function handleSend() {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    setInput("");
    await sendMessage(trimmed);
  }

  return (
    <div className="flex flex-col h-full glass-panel border-0">
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/10 bg-white/5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span
              className="material-symbols-outlined text-on-primary text-sm"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              smart_toy
            </span>
          </div>
          <div>
            <p className="font-label-md text-label-md text-on-surface leading-none">
              Diya AI
            </p>
            <span className="text-[10px] text-primary flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              ONLINE
            </span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-5 min-h-0">
        {messages.length === 0 && (
          <div className="text-center pt-8 space-y-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
              <span
                className="material-symbols-outlined text-primary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                smart_toy
              </span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Hi! I&apos;m Diya AI. Ask me about projects, skills, or anything
              on this portfolio.
            </p>
            <div className="space-y-2 text-left">
              {[
                "What's your strongest project?",
                "Are you open to internships?",
                "Tell me about your ML experience.",
              ].map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="w-full text-left px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex gap-3 ${m.role === "assistant" ? "" : "flex-row-reverse"}`}
          >
            <div
              className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs ${
                m.role === "assistant"
                  ? "bg-primary"
                  : "bg-white/10"
              }`}
            >
              {m.role === "assistant" ? (
                <span
                  className="material-symbols-outlined text-on-primary"
                  style={{
                    fontVariationSettings: "'FILL' 1",
                    fontSize: "14px",
                  }}
                >
                  smart_toy
                </span>
              ) : (
                <span className="material-symbols-outlined text-on-surface-variant" style={{ fontSize: "14px" }}>
                  person
                </span>
              )}
            </div>
            <div
              className={`max-w-[82%] px-4 py-3 font-body-md text-body-md whitespace-pre-wrap leading-relaxed ${
                m.role === "assistant"
                  ? "bg-primary/10 border border-primary/20 rounded-xl rounded-tl-none text-on-surface"
                  : "bg-white/5 rounded-xl rounded-tr-none text-on-surface"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-full bg-primary flex-shrink-0 flex items-center justify-center">
              <span
                className="material-symbols-outlined text-on-primary"
                style={{ fontVariationSettings: "'FILL' 1", fontSize: "14px" }}
              >
                smart_toy
              </span>
            </div>
            <div className="bg-primary/10 border border-primary/20 rounded-xl rounded-tl-none px-4 py-3 flex gap-1 items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce [animation-delay:0ms]" />
              <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce [animation-delay:150ms]" />
              <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce [animation-delay:300ms]" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/10 bg-surface-container-low shrink-0">
        <div className="relative flex items-center">
          <input
            className="w-full bg-surface-container-highest rounded-full px-5 py-3 font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-1 focus:ring-primary border-none pr-20"
            placeholder="Ask Diya AI anything…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
          />
          <div className="absolute right-2 flex gap-1">
            <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[20px]">mic</span>
            </button>
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="p-2 text-primary disabled:opacity-40 transition-opacity"
            >
              <span className="material-symbols-outlined text-[20px]">send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

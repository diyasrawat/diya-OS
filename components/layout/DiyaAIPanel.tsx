"use client";

import { useRef, useEffect } from "react";
import { useDiyaAI } from "@/hooks/useDiyaAI";

const QUICK_PROMPTS = [
  "What are your strongest skills?",
  "Tell me about your best project",
  "Are you open to internships?",
  "What are you currently building?",
];

export default function DiyaAIPanel() {
  const { messages, isStreaming, input, setInput, sendMessage } = useDiyaAI();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on every new token or message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend() {
    const trimmed = input.trim();
    if (!trimmed || isStreaming) return;
    setInput("");
    await sendMessage(trimmed);
  }

  // The last assistant message is empty only while waiting for the first token
  const lastMsg = messages[messages.length - 1];
  const isAwaitingFirstToken =
    isStreaming &&
    lastMsg?.role === "assistant" &&
    lastMsg?.content === "";

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
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isStreaming ? "bg-amber-400" : "bg-primary"
                } animate-pulse`}
              />
              {isStreaming ? "THINKING" : "ONLINE"}
            </span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-5 min-h-0">
        {messages.map((m, i) => (
          <div key={i}>
            <div
              className={`flex gap-3 ${
                m.role === "assistant" ? "" : "flex-row-reverse"
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center ${
                  m.role === "assistant" ? "bg-primary" : "bg-white/10"
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
                  <span
                    className="material-symbols-outlined text-on-surface-variant"
                    style={{ fontSize: "14px" }}
                  >
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
                {/* Streaming cursor on the last assistant message */}
                {isStreaming &&
                  i === messages.length - 1 &&
                  m.role === "assistant" &&
                  m.content !== "" && (
                    <span className="inline-block w-0.5 h-4 bg-primary ml-0.5 align-middle animate-pulse" />
                  )}
              </div>
            </div>

            {/* Quick-prompt chips below the welcome message */}
            {i === 0 && messages.length === 1 && m.role === "assistant" && (
              <div className="mt-4 space-y-2 pl-10">
                {QUICK_PROMPTS.map((q) => (
                  <button
                    key={q}
                    disabled={isStreaming}
                    onClick={() => sendMessage(q)}
                    className="w-full text-left px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-all disabled:opacity-40"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Typing dots — only while waiting for the first token */}
        {isAwaitingFirstToken && (
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
            className="w-full bg-surface-container-highest rounded-full px-5 py-3 font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-1 focus:ring-primary border-none pr-20 disabled:opacity-60"
            placeholder={isStreaming ? "Diya AI is thinking…" : "Ask Diya AI anything…"}
            value={input}
            disabled={isStreaming}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
          />
          <div className="absolute right-2 flex gap-1">
            <button
              className="p-2 text-on-surface-variant hover:text-primary transition-colors"
              disabled={isStreaming}
            >
              <span className="material-symbols-outlined text-[20px]">mic</span>
            </button>
            <button
              onClick={handleSend}
              disabled={isStreaming || !input.trim()}
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

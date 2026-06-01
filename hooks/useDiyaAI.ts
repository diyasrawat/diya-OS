"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
  createElement,
} from "react";
import { ChatMessage, Project } from "@/lib/types";

interface DiyaAIState {
  messages: ChatMessage[];
  isLoading: boolean;
  isPanelOpen: boolean;
  selectedProject: Project | null;
  input: string;
  setInput: (v: string) => void;
  setIsPanelOpen: (v: boolean) => void;
  sendMessage: (msg: string) => Promise<void>;
  selectProject: (project: Project) => void;
}

const DiyaAIContext = createContext<DiyaAIState | null>(null);

export function DiyaAIProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (!selectedProject) return;
    const s = selectedProject.summary;
    const summary: ChatMessage = {
      role: "assistant",
      content: `**${selectedProject.title}**\n\nProblem: ${s.problem}\n\nSolution: ${s.solution}\n\nTech: ${s.tech}\n\nKey Learning: ${s.keyLearning}`,
    };
    setMessages((prev) => [...prev, summary]);
    setIsPanelOpen(true);
  }, [selectedProject]);

  const sendMessage = useCallback(
    async (userInput: string) => {
      const userMsg: ChatMessage = { role: "user", content: userInput };
      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: [...messages, userMsg] }),
        });
        if (!res.ok) throw new Error("Request failed");
        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.message },
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "I ran into an issue connecting. Add an Anthropic API key to get full AI responses.",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages]
  );

  const selectProject = useCallback((project: Project) => {
    setSelectedProject(project);
  }, []);

  return createElement(
    DiyaAIContext.Provider,
    {
      value: {
        messages,
        isLoading,
        isPanelOpen,
        selectedProject,
        input,
        setInput,
        setIsPanelOpen,
        sendMessage,
        selectProject,
      },
    },
    children
  );
}

export function useDiyaAI(): DiyaAIState {
  const ctx = useContext(DiyaAIContext);
  if (!ctx) throw new Error("useDiyaAI must be used inside DiyaAIProvider");
  return ctx;
}

"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  ReactNode,
  createElement,
} from "react";
import { ChatMessage, Project } from "@/lib/types";

const WELCOME: ChatMessage = {
  role: "assistant",
  content:
    "Hi! I'm Diya AI. Ask me anything about Diya's projects, skills, or experience — or click any project card to get an instant summary.",
};

interface DiyaAIState {
  messages: ChatMessage[];
  isStreaming: boolean;
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
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [input, setInput] = useState("");

  // Refs to avoid stale closures inside sendMessage
  const messagesRef = useRef<ChatMessage[]>([WELCOME]);
  const selectedProjectRef = useRef<Project | null>(null);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    selectedProjectRef.current = selectedProject;
  }, [selectedProject]);

  // Inject project summary when a card is clicked
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

  const sendMessage = useCallback(async (userInput: string) => {
    const trimmed = userInput.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = { role: "user", content: trimmed };

    // Snapshot before any state updates to avoid stale closure
    const snapshot = [...messagesRef.current, userMsg];

    // Append user message + empty assistant placeholder
    setMessages((prev) => [
      ...prev,
      userMsg,
      { role: "assistant", content: "" },
    ]);
    setIsStreaming(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: snapshot,
          projectContext: selectedProjectRef.current,
        }),
      });

      if (!res.ok || !res.body) {
        throw new Error(`HTTP ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const next = [...prev];
          const last = next[next.length - 1];
          next[next.length - 1] = { ...last, content: last.content + chunk };
          return next;
        });
      }
    } catch {
      setMessages((prev) => {
        const next = [...prev];
        next[next.length - 1] = {
          role: "assistant",
          content: "Diya AI is unavailable right now. Please try again.",
        };
        return next;
      });
    } finally {
      setIsStreaming(false);
    }
  }, []); // No deps — uses refs for latest state

  const selectProject = useCallback((project: Project) => {
    setSelectedProject(project);
  }, []);

  return createElement(
    DiyaAIContext.Provider,
    {
      value: {
        messages,
        isStreaming,
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

"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  createElement,
} from "react";

export type RecruiterRoleId = "ai-engineer" | "data-scientist" | "ml-researcher";

interface RecruiterModeState {
  activeRole: RecruiterRoleId;
  setActiveRole: (role: RecruiterRoleId) => void;
}

const RecruiterModeContext = createContext<RecruiterModeState | null>(null);

export function RecruiterModeProvider({ children }: { children: ReactNode }) {
  const [activeRole, setActiveRole] = useState<RecruiterRoleId>("ai-engineer");

  return createElement(
    RecruiterModeContext.Provider,
    { value: { activeRole, setActiveRole } },
    children
  );
}

export function useRecruiterMode(): RecruiterModeState {
  const ctx = useContext(RecruiterModeContext);
  if (!ctx)
    throw new Error("useRecruiterMode must be used inside RecruiterModeProvider");
  return ctx;
}

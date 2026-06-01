"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
  createElement,
} from "react";
import { Project, Skill, RecruiterRole } from "@/lib/types";
import { recruiterRoles } from "@/lib/data/recruiter-config";
import { projects } from "@/lib/data/projects";
import { recruiterSkills } from "@/lib/data/skills";

export type RecruiterRoleId = "ai-engineer" | "data-scientist" | "ml-researcher";

interface RecruiterModeState {
  /** Full active role object */
  activeRole: RecruiterRole;
  /** Set the active role by string ID */
  setActiveRole: (id: string) => void;
  /** Projects ordered by role.projectIds */
  filteredProjects: Project[];
  /** Competency skills ordered by role.skillIds */
  filteredSkills: Skill[];
  /** True for ~300 ms on role change (for exit animation gate) */
  isTransitioning: boolean;
}

const RecruiterModeContext = createContext<RecruiterModeState | null>(null);

function deriveProjects(role: RecruiterRole): Project[] {
  return role.projectIds
    .map((id) => projects.find((p) => p.id === id))
    .filter((p): p is Project => p !== undefined);
}

function deriveSkills(role: RecruiterRole): Skill[] {
  return role.skillIds
    .map((id) => recruiterSkills[id])
    .filter((s): s is Skill => s !== undefined);
}

export function RecruiterModeProvider({ children }: { children: ReactNode }) {
  const [activeRoleId, setActiveRoleId] = useState<RecruiterRoleId>("ai-engineer");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeRole = recruiterRoles.find((r) => r.id === activeRoleId)!;
  const filteredProjects = deriveProjects(activeRole);
  const filteredSkills = deriveSkills(activeRole);

  function setActiveRole(id: string) {
    if (id === activeRoleId) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsTransitioning(true);
    setActiveRoleId(id as RecruiterRoleId);
    timerRef.current = setTimeout(() => setIsTransitioning(false), 350);
  }

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  return createElement(
    RecruiterModeContext.Provider,
    { value: { activeRole, setActiveRole, filteredProjects, filteredSkills, isTransitioning } },
    children
  );
}

export function useRecruiterMode(): RecruiterModeState {
  const ctx = useContext(RecruiterModeContext);
  if (!ctx)
    throw new Error("useRecruiterMode must be used inside RecruiterModeProvider");
  return ctx;
}

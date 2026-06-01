export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageGradient: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  status: "completed" | "in-progress" | "archived";
  year: number;
  summary: {
    problem: string;
    solution: string;
    tech: string;
    keyLearning: string;
  };
}

export interface StackItem {
  name: string;
  percent: number;
  color: "primary" | "secondary" | "tertiary";
}

/** Recruiter-page competency bar entry, keyed in skills.ts recruiterSkills */
export interface Skill {
  id: string;
  name: string;
  category: string;
  percent: number;
  color: "primary" | "secondary" | "tertiary";
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  color: "primary" | "secondary" | "tertiary";
}

export interface FocusItem {
  id: string;
  icon: string;
  label: string;
  content: string;
  accentColor: "primary" | "secondary" | "tertiary";
}

export interface RecruiterRole {
  id: "ai-engineer" | "data-scientist" | "ml-researcher";
  /** Display name in sidebar + headline */
  label: string;
  icon: string;
  /** Short one-line persona tagline */
  headline: string;
  /** Two-sentence recruiter pitch shown under the headline */
  description: string;
  /** Ordered project IDs — first = most relevant */
  projectIds: string[];
  /** Ordered skill IDs referencing recruiterSkills record */
  skillIds: string[];
  primaryColor: "primary" | "secondary" | "tertiary";
  tags: string[];
  insightQA: { question: string; answer: string }[];
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

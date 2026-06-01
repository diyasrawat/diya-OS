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

export type TimelineCategory =
  | "hackathon"
  | "certification"
  | "milestone"
  | "education"
  | "publication"
  | "award";

export interface TimelineEvent {
  id: string;
  date: string;        // "MMM YYYY"
  title: string;
  description: string;
  category: TimelineCategory;
  color: "primary" | "secondary" | "tertiary";
  link?: string;       // optional external URL
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
  label: string;
  icon: string;
  headline: string;
  description: string;
  projectIds: string[];
  skillIds: string[];
  primaryColor: "primary" | "secondary" | "tertiary";
  tags: string[];
  insightQA: { question: string; answer: string }[];
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

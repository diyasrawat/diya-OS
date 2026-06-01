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
  id: string;
  title: string;
  icon: string;
  description: string;
  coreSkills: { category: string; name: string; percent: number }[];
  tags: string[];
  matchedProjectIds: string[];
  insightQA: { question: string; answer: string }[];
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  status: "completed" | "in-progress" | "archived";
  year: number;
}

export interface Skill {
  name: string;
  category: "ml" | "frontend" | "backend" | "data" | "tools";
  level: "beginner" | "intermediate" | "advanced";
}

export interface TimelineEntry {
  id: string;
  date: string;
  title: string;
  description: string;
  type: "education" | "project" | "achievement" | "work";
}

export interface RecruiterConfig {
  roles: string[];
  highlights: string[];
  availability: string;
  preferredContact: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

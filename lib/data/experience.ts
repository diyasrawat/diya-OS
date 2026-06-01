export type WorkType = "Full-time" | "Internship" | "Contract" | "Part-time";

export interface WorkEntry {
  id: string;
  company: string;
  role: string;
  type: WorkType;
  startDate: string; // "Mon YYYY"
  endDate: string;   // "Mon YYYY" or "Present"
  current: boolean;
  description: string;
  tags: string[];
  color: "primary" | "secondary" | "tertiary";
}

/**
 * Edit this file to add your real work experience.
 * startDate / endDate format: "Jun 2023" (first 3 letters of month + year)
 */
export const workExperience: WorkEntry[] = [
  {
    id: "exp-1",
    company: "Independent",
    role: "AI Agent Developer",
    type: "Contract",
    startDate: "Sep 2024",
    endDate: "Present",
    current: true,
    description:
      "Designing and shipping agentic AI systems. Flagship project: multi-agent identity verification using LangGraph + Groq. Exploring LoRA fine-tuning for edge deployment.",
    tags: ["LangGraph", "Groq", "Python", "LLMs", "FastAPI"],
    color: "primary",
  },
  {
    id: "exp-2",
    company: "— Add your company here —",
    role: "Machine Learning Intern",
    type: "Internship",
    startDate: "May 2024",
    endDate: "Aug 2024",
    current: false,
    description:
      "Update this entry in lib/data/experience.ts with your real internship details — company, role, what you built, and the tech you used.",
    tags: ["Python", "Scikit-learn", "Pandas"],
    color: "secondary",
  },
  {
    id: "exp-3",
    company: "University AI & Data Science Dept.",
    role: "Research Contributor",
    type: "Part-time",
    startDate: "Aug 2022",
    endDate: "May 2024",
    current: false,
    description:
      "Contributed to ML research in medical imaging and predictive analytics. Key outputs: NIR vein detection CV pipeline and heart failure ensemble model achieving 90.5% CV score.",
    tags: ["TensorFlow", "OpenCV", "XGBoost", "Research"],
    color: "tertiary",
  },
];

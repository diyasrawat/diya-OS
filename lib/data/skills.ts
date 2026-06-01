import { Skill, StackItem } from "@/lib/types";

/** Home-page GitHub Intelligence stack distribution */
export const stackDistribution: StackItem[] = [
  { name: "Python", percent: 68, color: "secondary" },
  { name: "TypeScript", percent: 22, color: "primary" },
  { name: "PyTorch", percent: 10, color: "tertiary" },
];

/**
 * Recruiter-page competency entries.
 * Color is scoped to each role's primary accent so bars
 * change hue when the recruiter switches persona.
 */
export const recruiterSkills: Record<string, Skill> = {
  // ── AI Engineer ────────────────────────────────────────
  python: { id: "python", name: "Python", category: "Language", percent: 95, color: "primary" },
  pytorch: { id: "pytorch", name: "PyTorch", category: "Framework", percent: 88, color: "primary" },
  langchain: { id: "langchain", name: "LangChain", category: "Orchestration", percent: 92, color: "primary" },
  vectordbs: { id: "vectordbs", name: "VectorDBs", category: "Storage", percent: 85, color: "primary" },

  // ── Data Scientist ──────────────────────────────────────
  pandas: { id: "pandas", name: "Pandas", category: "Library", percent: 95, color: "secondary" },
  numpy: { id: "numpy", name: "NumPy", category: "Numerical", percent: 88, color: "secondary" },
  sklearn: { id: "sklearn", name: "Scikit-learn", category: "ML", percent: 92, color: "secondary" },
  sql: { id: "sql", name: "SQL", category: "Database", percent: 85, color: "secondary" },

  // ── ML Researcher ───────────────────────────────────────
  "pytorch-vision": { id: "pytorch-vision", name: "PyTorch", category: "Framework", percent: 90, color: "tertiary" },
  opencv: { id: "opencv", name: "OpenCV", category: "Vision", percent: 85, color: "tertiary" },
  transformers: { id: "transformers", name: "Transformers", category: "NLP", percent: 88, color: "tertiary" },
  cuda: { id: "cuda", name: "CUDA", category: "Training", percent: 72, color: "tertiary" },
};

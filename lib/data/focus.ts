import { FocusItem } from "@/lib/types";

export const focusItems: FocusItem[] = [
  {
    id: "building",
    icon: "terminal",
    label: "What I'm Building",
    content:
      "Scaling a multi-agent identity verification system using LangGraph and Groq.",
    accentColor: "primary",
  },
  {
    id: "learning",
    icon: "psychology",
    label: "What I'm Learning",
    content:
      "Deep diving into Low-Rank Adaptation (LoRA) for LLM fine-tuning and Quantization.",
    accentColor: "secondary",
  },
  {
    id: "goal",
    icon: "flag",
    label: "Current Goal",
    content:
      "Land an AI Engineering role and ship 3 production-grade agent systems.",
    accentColor: "tertiary",
  },
  {
    id: "reading",
    icon: "menu_book",
    label: "Currently Reading",
    content: "Designing Machine Learning Systems by Chip Huyen.",
    accentColor: "primary",
  },
];
